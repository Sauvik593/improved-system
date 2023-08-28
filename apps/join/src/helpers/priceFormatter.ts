interface Props {
  locale: string;
  value: number;
  decimal?: number;
}

const LOCALES: Record<string, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
  it: 'it-IT',
  es: 'es-ES',
  pt: 'pt-PT',
};

export const formattedPrice = ({ locale, value, decimal = 0 }: Props) =>
  new Intl.NumberFormat(LOCALES[locale], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: decimal,
    minimumFractionDigits: decimal,
  }).format(value);
