const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');

const { createRequestHandler } = require('@remix-run/express');
const { createEnvContext } = require('./env.server');
const { KyeroRouter } = require('@kyero/router');
const { wrapExpressCreateRequestHandler } = require('@sentry/remix');
const { broadcastDevReady } = require('@remix-run/node');

const BUILD_DIR = path.join(process.cwd(), 'build');
const build = require(BUILD_DIR);

const app = express();

// https://github.com/epicweb-dev/epic-stack/blob/1bf64d36eea8222b505110bbc2a72806c3c5d6b9/server/index.ts#L51
app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safepath + query);
  } else {
    next();
  }
});

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

app.use((req, res, next) => {
  const proxyHeader = req.headers['k-proxy-key'];
  const productionHeaderInvalid =
    typeof proxyHeader === 'undefined' || proxyHeader !== process.env['K_PROXY_KEY'];

  const askForBaseAuth = () => {
    return basicAuth({
      users: { portal47: 'nevergonnagiveyouup' },
      challenge: true,
    })(req, res, next);
  };

  switch (true) {
    case process.env.CI === 'true':
      return next();
    case process.env.KYERO_ENV === 'staging':
      return askForBaseAuth();
    case process.env.KYERO_ENV === 'production':
      return productionHeaderInvalid ? askForBaseAuth() : next();
    default:
      return next();
  }
});

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/new-frontend-assets/build',
  express.static('public/build', { immutable: true, maxAge: '1y' }),
);

// Aggressively cache fonts for a year
app.use(
  '/new-frontend-assets/fonts',
  express.static('public/fonts', { immutable: true, maxAge: '1y' }),
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use('/new-frontend-assets', express.static('public', { maxAge: '1h' }));
app.use('/favicon.ico', express.static('public/favicon.ico', { maxAge: '1h' }));

if (process.env.CI !== 'true') {
  app.use(
    morgan('dev', ':method :url :status :res[content-length] - :response-time ms - [:date[clf]]'),
  );
}

async function startApp() {
  const port = process.env.PORT || 3000;

  const router = new KyeroRouter();

  await router.preloadRoutes();

  function getLoadContext() {
    return {
      ...createEnvContext(),
      KyeroRouter: router,
    };
  }

  const createSentryRequestHandler = wrapExpressCreateRequestHandler(createRequestHandler);

  app.all(
    '*',
    createSentryRequestHandler({
      build,
      getLoadContext,
      mode: process.env.NODE_ENV,
    }),
  );

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);

    if (process.env.NODE_ENV === 'development') {
      broadcastDevReady(build);
    }
  });
}

startApp();
