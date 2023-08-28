import winston, { format, transports } from 'winston';

winston.addColors({ request: 'bold', message: 'blue' });
const colorizer = winston.format.colorize();

const API_COLOR_FORMAT = format.printf(
  ({ level, timestamp, message, method, timing }) =>
    `${timestamp} ${level}: Kyero API ${colorizer.colorize('request', method)} ${colorizer.colorize(
      'message',
      message,
    )} ${colorizer.colorize('request', timing)} ms`,
);

const REDIS_COLOR_FORMAT = format.printf(
  ({ level, timestamp, message, timing, method }) =>
    `${timestamp} ${level}: RedisCache ${colorizer.colorize(
      'message',
      method,
    )} ${colorizer.colorize('message', message)} ${colorizer.colorize('message', timing)} ms`,
);

export const APILogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    format.colorize({
      all: true,
    }),
    API_COLOR_FORMAT,
  ),
  transports: [new transports.Console()],
  silent: process.env.SUPRESS_LOGS === 'true',
});

export const RedisLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    format.colorize({
      all: true,
    }),
    REDIS_COLOR_FORMAT,
  ),
  transports: [new transports.Console()],
  silent: process.env.SUPRESS_LOGS === 'true',
});
