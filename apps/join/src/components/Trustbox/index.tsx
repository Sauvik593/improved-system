import React, { useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '@contexts/LanguageContext';

const runScripts = () => {
  const trustpilotScript = document.createElement('script');
  trustpilotScript.type = 'text/javascript';
  trustpilotScript.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
  trustpilotScript.async = true;
  document.head.appendChild(trustpilotScript);
  trustpilotScript.onload = () => {
    const trustbox = document.getElementById('trustbox');
    // eslint-disable-next-line
    // @ts-ignore
    window.Trustpilot.loadFromElement(trustbox);
  };
};

const Trustbox = ({ trustBoxRef }: { trustBoxRef: React.RefObject<HTMLDivElement> }) => {
  const { locale } = useContext(LanguageContext);
  const checkedLocale = locale.match('pt') ? 'pt-pt' : locale;

  return (
    <section className="container mx-auto my-8">
      <a
        href={`https://${locale}.trustpilot.com/review/kyero.com`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <section className="text-h-2 flex items-center justify-center rounded-md bg-white pt-4">
          <div
            className="trustpilot-widget"
            ref={trustBoxRef}
            data-locale={checkedLocale}
            data-template-id="53aa8807dec7e10d38f59f32"
            data-businessunit-id="5cadfaa08abadb0001cf1f4a"
            data-style-height="150px"
            data-style-width="100%"
            data-theme="light"
          />
        </section>
      </a>
    </section>
  );
};

export const TrustboxContainer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) {
      return;
    }

    if (!loaded.current) {
      runScripts();
      loaded.current = true;
    }

    return () => {
      loaded.current = true;
    };
  }, []);

  return <Trustbox trustBoxRef={ref} />;
};
