import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { useTranslation } from 'next-i18next';

const data = [
  { name: 'Kyero.com', Domestic: 20, International: 82, unit: '%' },
  { name: 'idealista.com', Domestic: 82, International: 20, unit: '%' },
  { name: 'fotocasa.es', Domestic: 85, International: 10, unit: '%' },
  { name: 'habitaclia.com', Domestic: 82, International: 20, unit: '%' },
  { name: 'pisos.com', Domestic: 85, International: 12, unit: '%' },
];

interface EntryProps {
  color: string;
  value: string;
}

const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className="flex space-x-8">
      {payload.reverse().map((entry: EntryProps, index: number) => {
        const { t } = useTranslation('common');
        const lowercaseValue = entry.value.toLocaleLowerCase();
        return (
          <div key={`item-${index}`} className="flex items-center gap-x-4 font-bold">
            <div
              style={{
                backgroundColor: entry.color,
              }}
              className="flex h-6 w-6 rounded-md"
            ></div>
            {t(`homepage.market_chart.${lowercaseValue}`)}
          </div>
        );
      })}
    </div>
  );
};

export const InternationalBuyers = () => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-sierra-night-5 py-5 lg:py-10">
      <div className="container mx-auto ">
        <div className="w-full rounded-lg bg-white py-10">
          <h1 className="text-h-4 md:text-h-3 text-sierra-night-100 mb-5 text-center font-bold">
            {t('homepage.market_chart.title')}
          </h1>
          <div className="international-buyers-chart">
            <div className="inner-scroll">
              <ResponsiveContainer width={'100%'} height={400}>
                <BarChart
                  data={data}
                  margin={{ top: 50, right: 30, left: 30, bottom: 10 }}
                  barGap={15}
                >
                  <XAxis dataKey="name" stroke="#133250" height={1} tickLine={false} />
                  <YAxis axisLine={false} tickFormatter={(tick) => `${tick}%`} tickLine={false} />
                  <CartesianGrid vertical={false} />
                  <Legend
                    wrapperStyle={{
                      top: 0,
                      left: 25,
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    content={renderLegend}
                  />
                  <Tooltip
                    wrapperStyle={{ outline: 'none' }}
                    cursor={false}
                    content={CustomTooltipDomestic}
                  />
                  <Bar dataKey="Domestic" fill="#D3D3DE" barSize={40} radius={[10, 10, 0, 0]} />
                  <Bar
                    dataKey="International"
                    fill="#1F4DEF"
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomTooltipDomestic = ({ active, label, payload }: any) => {
  const { t } = useTranslation('common');
  if (active && label) {
    return (
      <div className="grid items-center rounded-lg bg-[#133250] p-2 lg:w-full">
        <div>
          <p className="text-sm text-white">
            {`${payload[0].payload.Domestic}${payload[0].payload.unit}`}
            <span className="ml-2">{t('homepage.market_chart.domestic_percentage')}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-white">
            {`${payload[0].payload.International}${payload[0].payload.unit}`}
            <span className="ml-2">{t('homepage.market_chart.international_percentage')}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
