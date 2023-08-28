import { loadScripts } from './non-essential-scripts';

const scripts = [
  {
    src: `https://www.example-third-party.com/_key_.js`,
    key: '321321',
    active: true,
  },
  {
    src: `https://www.example-third-party-2.com/_key_.js`,
    key: '123123',
    active: false,
  },
  {
    src: `https://www.example-third-party-no-key.com/no-key.js`,
    key: null,
    active: true,
  },
];

describe('loadScripts', () => {
  it('should load active scripts', () => {
    expect(document.querySelectorAll('script').length).toEqual(0);

    loadScripts(scripts);

    const scriptTags = document.querySelectorAll('script');

    expect(scriptTags.length).toEqual(2);
    expect(scriptTags[0].src).toEqual(`https://www.example-third-party.com/321321.js`);
    expect(scriptTags[1].src).toEqual(`https://www.example-third-party-no-key.com/no-key.js`);
  });
});
