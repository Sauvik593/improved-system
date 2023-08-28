import {
  type RecentSearch,
  getRecentSearches,
  addRecentSearch,
  updateRecentSearch,
} from './helpers';

const NATION_1_ID = 1111;

const createRecentSearch = (props: Partial<RecentSearch> = {}) => ({
  mainFeature: 'near_beach',
  location: 'location',
  nationId: props.nationId,
  params: {
    paymentSchema: 0,
  },
  url: '?params=1',
  createdAt: 123123123,
  ...props,
});

afterEach(() => {
  localStorage.clear();
});

describe('getRecentSearches', () => {
  describe('when there are no recent searches', () => {
    it('should return empty array', () => {
      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([]);
    });
  });

  describe('when there are recent searches', () => {
    it('should return recent searches for given nation', () => {
      const recentSearches = [
        createRecentSearch({ nationId: NATION_1_ID }),
        createRecentSearch({ nationId: NATION_1_ID }),
      ];

      localStorage.setItem(
        'ky.recentSearches',
        JSON.stringify({
          [NATION_1_ID]: recentSearches,
        }),
      );

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual(recentSearches);
    });

    it('should return recent searched for given nation and search type', () => {
      const recentSearches = [
        createRecentSearch({ nationId: NATION_1_ID, params: { paymentSchema: 1 } }),
        createRecentSearch({ nationId: NATION_1_ID, params: { paymentSchema: 0 } }),
      ];

      localStorage.setItem(
        'ky.recentSearches',
        JSON.stringify({
          [NATION_1_ID]: recentSearches,
        }),
      );

      expect(getRecentSearches(NATION_1_ID, 'rent')).toEqual([recentSearches[0]]);
    });
  });
});

describe('addRecentSearch', () => {
  describe('when there are no recent searches for given nation', () => {
    it('should add new recent search', () => {
      const recentSearch = createRecentSearch({ nationId: NATION_1_ID });

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([]);

      addRecentSearch(recentSearch as unknown as RecentSearch);

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([recentSearch]);
    });
  });

  describe('when there are recent searches for given nation', () => {
    const initialSearches = [createRecentSearch({ nationId: NATION_1_ID })];
    beforeAll(() => {
      localStorage.setItem(
        'ky.recentSearches',
        JSON.stringify({
          [NATION_1_ID]: initialSearches,
        }),
      );
    });

    it('should add new recent search', () => {
      const newSearch = createRecentSearch({ nationId: NATION_1_ID });

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual(initialSearches);

      addRecentSearch(newSearch as unknown as RecentSearch);

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([newSearch, initialSearches[0]]);
    });
  });

  describe('when there are 3 recent searches for given nation', () => {
    const initialSearches = [
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 1111 }),
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 2222 }),
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 3333 }),
    ];

    beforeAll(() => {
      localStorage.setItem(
        'ky.recentSearches',
        JSON.stringify({
          [NATION_1_ID]: initialSearches,
        }),
      );
    });

    it('should add new recent search and remove oldest one', () => {
      const newSearch = createRecentSearch({ nationId: NATION_1_ID, createdAt: 4444 });

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([
        initialSearches[2],
        initialSearches[1],
        initialSearches[0],
      ]);

      addRecentSearch(newSearch as unknown as RecentSearch);

      // Should be returned in order of the newest to oldest
      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([
        newSearch,
        initialSearches[1],
        initialSearches[0],
      ]);
    });
  });

  describe('updateRecentSearch', () => {
    const initialSearches = [
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 1111 }),
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 2222 }),
      createRecentSearch({ nationId: NATION_1_ID, createdAt: 3333 }),
    ];

    beforeAll(() => {
      localStorage.setItem(
        'ky.recentSearches',
        JSON.stringify({
          [NATION_1_ID]: initialSearches,
        }),
      );
    });

    it('should update recent search', () => {
      const updatedSearch = {
        ...initialSearches[1],
        location: 'updated location',
      };

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([
        initialSearches[2],
        initialSearches[1],
        initialSearches[0],
      ]);

      updateRecentSearch(
        updatedSearch.createdAt,
        updatedSearch.nationId as number,
        updatedSearch as unknown as RecentSearch,
      );

      expect(getRecentSearches(NATION_1_ID, 'buy')).toEqual([
        initialSearches[2],
        updatedSearch,
        initialSearches[0],
      ]);
    });
  });
});
