import lib from './lib';
const kmColor = lib;
export default kmColor;

// @ts-ignore
const themes = kmColor.makeThemes(
  {
    wood: {
      dark: {
        secondary: '#ffdd00',
        onPrimary: '#ffdd00',
      },
      light: {
        primary: '#ffdd00',
        lll: '#ffdd00',
      },
    },
    // @ts-ignore
  },
  'wood',
  'light',
  {
    alpha: 'NO',
    blacken: 'YES',
  }
);

// @ts-ignore

console.log('activeTheme', themes.activeTheme.get());
