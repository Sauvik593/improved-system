import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const localeMap = {
  en: 'en-GB',
  ca: 'es-ES',
  da: 'da-DK',
  de: 'de-DE',
  es: 'es-ES',
  fi: 'fi-FI',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
  no: 'no-NO',
  pt: 'pt-PT',
  ru: 'ru-RU',
  sv: 'sv-SE',
};

export const TrustPilotWidget = (props: { locale: string }) => {
  const widgetRef = useRef(null);
  const loadScript = (callback: () => void, async = true, type = 'text/javascript') => {
    try {
      const scriptElement = document.createElement('script');
      scriptElement.type = type;
      scriptElement.async = async;
      scriptElement.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

      scriptElement.addEventListener('load', (ev) => {
        callback();
      });

      scriptElement.addEventListener('error', (ev) => {});

      document.body.appendChild(scriptElement);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWidget = () => {
    // @ts-ignore
    window.Trustpilot.loadFromElement(widgetRef.current, true);
  };

  const { ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    onChange: (inView) => {
      if (inView) {
        window.Trustpilot ? loadWidget() : loadScript(loadWidget);
      }
    },
  });

  return (
    <div className="relative my-8 min-h-[20px] w-full" ref={ref}>
      <div
        id="trustbox"
        className="trustpilot-widget"
        data-locale={localeMap[props.locale as keyof typeof localeMap]}
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="5cadfaa08abadb0001cf1f4a"
        data-style-height="20px"
        data-style-width="100%"
        data-theme="light"
        ref={widgetRef}
      >
        {/* eslint-disable-next-line  */}
        <a
          href="https://uk.trustpilot.com/review/kyero.com"
          target="_blank"
          rel="noopener"
          className="block w-full text-center"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
};
