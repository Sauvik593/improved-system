import cn from 'classnames';
import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useInView } from 'react-intersection-observer';

import { FloatingElement } from './floating-element';
import { useAppContext } from '~/common/contexts/app.context';
import { type Region } from '../../api/get-country-regions.server';

interface GeoData {
  rsmKey: string;
  properties: {
    NAME_1: string;
    ID: number;
  };
}

export interface FloatingElementData {
  x: number;
  y: number;
  entered: boolean;
  id: number | null;
}

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

interface Props {
  regions: Region[];
}

export const RegionMap = ({ regions }: Props) => {
  const { country } = useAppContext();

  const handleFetch = async () => {
    const resp = await fetch(`/kyero-api/map/${country?.key}.json`);
    const data = await resp.json();

    setMaps({
      country: data.country,
      europe: data.europe,
      africa: data.africa,
    });
    setProjectionConfig(data.projectionConfig);
  };

  const fireElement = async () => {
    await Promise.all([handleFetch(), wait(1000)]);

    setLoading(false);
  };

  const { ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    onChange: (inView, entry) => {
      if (inView) {
        fireElement();
      }
    },
  });

  const [floatingElementData, setFloatingElementData] = useState<FloatingElementData>({
    x: 0,
    y: 0,
    entered: false,
    id: null,
  });

  const [maps, setMaps] = useState<Record<string, Record<string, any> | undefined>>({
    spain: undefined,
    europe: undefined,
    africa: undefined,
  });

  const [projectionConfig, setProjectionConfig] = useState({});
  const [loading, setLoading] = useState(true);

  const handleRegionActive = (target: SVGPathElement, geoData: GeoData) => {
    if (loading) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    setFloatingElementData({
      x: centerX,
      y: centerY,
      entered: false,
      id: geoData.properties.ID,
    });
  };

  const handleRegionLeave = (ev) => {
    if (ev?.currentTarget !== ev.target) {
      setFloatingElementData({ x: 0, y: 0, entered: false, id: null });
    }
  };

  const handleFloatingElementEnter = () => {
    setFloatingElementData((prev) => ({ ...prev, entered: true }));
  };

  const handleFloatingElementLeave = () => {
    setFloatingElementData({ x: 0, y: 0, entered: false, id: null });
  };

  const activeRegion = useMemo(() => {
    if (!floatingElementData.id) return null;

    return regions.find((region) => region.id === floatingElementData.id);
  }, [floatingElementData, regions]);

  return (
    <div
      onMouseLeave={() => {
        setFloatingElementData({ x: 0, y: 0, entered: false, id: null });
      }}
      ref={ref}
    >
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={projectionConfig}
        className={cn(
          "map-animation bg-[#CBE6EE] bg-opacity-70 bg-[url('/new-frontend-assets/images/shapes/waves.png')] bg-[length:100px] bg-repeat",
          {
            'map-animation--stop': !loading,
          },
        )}
      >
        <Geographies
          geography={maps.europe}
          fill="#ffffff"
          focusable={false}
          className={cn('transform transition delay-100 duration-300 ease-in-out', {
            'opacity-0': loading,
            'opacity-100': !loading,
          })}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} focusable={false} />
            ))
          }
        </Geographies>
        <Geographies
          geography={maps.africa}
          fill="#ffffff"
          focusable={false}
          className={cn('transform transition delay-100 duration-300 ease-in-out', {
            'opacity-0': loading,
            'opacity-100': !loading,
          })}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} focusable={false} />
            ))
          }
        </Geographies>
        <Geographies
          geography={maps.country}
          stroke="#ffffff"
          strokeWidth={1.5}
          className={cn('transform transition delay-500 duration-300 ease-in-out ', {
            'opacity-0': loading,
            'opacity-100': !loading,
          })}
        >
          {({ geographies }) =>
            geographies.map((geo: GeoData) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#ffffff"
                fill="#F5B333"
                style={{ hover: { fill: '#EFA008' } }}
                onFocus={(event) => handleRegionActive(event.currentTarget, geo)}
                onMouseEnter={(event) => handleRegionActive(event.currentTarget, geo)}
                onMouseLeave={handleRegionLeave}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <FloatingElement
        activeRegion={activeRegion}
        onEnter={handleFloatingElementEnter}
        onLeave={handleFloatingElementLeave}
        floatingElementData={floatingElementData}
      />
    </div>
  );
};
