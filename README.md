# km-color

Description:this package is color generator

## Installation

Use the package manager [npm](https://www.npmjs.com/package/km-color) to install km-color.

```bash
npm install km-color
```

## Usage

```typescript
import kmColor from 'km-color';

// Themes example
// ----------------------------
const themes = kmColor.registerThemes(
  {
    wood: {
      dark: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
      light: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
    },

    pastele: {
      dark: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
      light: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
    },
    chrome: {
      dark: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
      light: kmColor.makePalette(
        {
          primary: '#FF5733',
          secondary: '#C70039',
          background: '#900C3F',
          surface: '#581845',
          error: '#FFC300',
          text: '#FFFFFF',
          onPrimary: '#000000',
          onSecondary: '#FFFFFF',
          onBackground: '#FFFFFF',
          onSurface: '#FFFFFF',
          onError: '#000000',
        },
        {}
      ),
    },
  },
  'wood',
  'dark'
);
// ----------------------------
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
