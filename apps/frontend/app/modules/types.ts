export interface OldAppLocation {
  boundingBox: number[];
  locId: number;
  id: number;
  type: string;
  costaId: number;
  provinceId: number | null;
  regionId: number;
  nationId: number;
  continentId: number;
  fullName: string;
  nationName: string;
  label: string;
  slug: string;
  lat: string;
  lon: string;
  coverImageUrl: string;
  nameTranslations: {
    [key: string]: string;
  };
  searchPath: string;
  toRentPath: string;
  forSalePath: string;
  ancestors: {
    [key: string]: string[];
  };
}
