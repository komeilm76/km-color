import Color from 'color';
import _ from 'lodash';
import { KMColorGenerator } from './schema';
// @ts-ignore
import { computed, ref } from 'km-fresh';

const make = Color;

const makeGradesAsObject = <
  NAME extends string,
  GM extends KMColorGenerator.IGradeMode = KMColorGenerator.IGradeMode,
  GL extends KMColorGenerator.IGradeLevel = KMColorGenerator.IGradeLevel,
  SPLITER extends KMColorGenerator.ISpliter = '_',
  MAX extends KMColorGenerator.IMax = '0.7'
>(
  name: NAME,
  color: KMColorGenerator.IColorLike,
  gradeLevel: GL,
  spliter: SPLITER,
  method: GM,
  max: MAX,
  reverse: boolean = false
) => {
  // @ts-ignore
  let list = Array.from({ length: Number(gradeLevel) }).map((item, index) => {
    let gradeNumber = index + 1;
    const gradeValue = (Number(max) / Number(gradeLevel)) * gradeNumber;

    return {
      ...(name !== ''
        ? {
            [`${name}${spliter}${method}${spliter}${index + 1}`]: make(color)
              [method](reverse == true ? 1 - gradeValue : gradeValue)
              // @ts-ignore
              .hexa(),
          }
        : {
            [`${method}${spliter}${index + 1}`]: make(color)
              [method](reverse == true ? 1 - gradeValue : gradeValue)
              // @ts-ignore
              .hexa(),
          }),
    };
  });
  return _.merge({}, ...list) as KMColorGenerator.IColorOutput<GM, GL, SPLITER, NAME>['grades'];
};

const makeColor = <
  COLOR extends KMColorGenerator.IColorLike,
  GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
  MAX extends KMColorGenerator.IMax = '0.7',
  PREFIX extends string = '',
  SPLITER extends KMColorGenerator.ISpliter = '_',
  DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
  LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
  ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
  FADE extends KMColorGenerator.IGradeStatus = 'YES',
  OPAQUER extends KMColorGenerator.IGradeStatus = 'YES',
  WHITEN extends KMColorGenerator.IGradeStatus = 'YES',
  BLACKEN extends KMColorGenerator.IGradeStatus = 'YES'
>(
  color: COLOR,
  entryOptions: Partial<KMColorGenerator.IColorOptions<GRADELEVEL, MAX, PREFIX, SPLITER>>,
  gradeOptions: Partial<
    KMColorGenerator.IGradeOptions<DARKEN, LIGHTEN, ALPHA, FADE, OPAQUER, WHITEN, BLACKEN>
  >
) => {
  const options: KMColorGenerator.IColorOptions<GRADELEVEL, MAX, PREFIX, SPLITER> = {
    gradeLevel: '4' as GRADELEVEL,
    max: '0.7' as MAX,
    prefix: '' as PREFIX,
    spliter: '_' as SPLITER,
    ...entryOptions,
  };

  const baseColor = make(color);
  const reverseColor = baseColor.negate();
  const grayScale = baseColor.grayscale();
  const colorMode: KMColorGenerator.IColorMode = baseColor.luminosity() > 0.5 ? 'light' : 'dark';
  const useIn =
    colorMode == 'dark'
      ? 'use this color between light colors'
      : 'use this color between dark colors';

  let darkenGrades = {
    ...(gradeOptions.darken == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'darken',
        options.max
      ),
    }),
  } as DARKEN extends 'YES'
    ? KMColorGenerator.IColorOutput<'darken', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let lightenGrades = {
    ...(gradeOptions.lighten == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'lighten',
        options.max
      ),
    }),
  } as LIGHTEN extends 'YES'
    ? KMColorGenerator.IColorOutput<'lighten', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let alphaGrades = {
    ...(gradeOptions.alpha == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'alpha',
        options.max
      ),
    }),
  } as ALPHA extends 'YES'
    ? KMColorGenerator.IColorOutput<'alpha', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let fadeGrades = {
    ...(gradeOptions.fade == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'fade',
        options.max
      ),
    }),
  } as FADE extends 'YES'
    ? KMColorGenerator.IColorOutput<'fade', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let opaquerGrades = {
    ...(gradeOptions.opaquer == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'opaquer',
        options.max
      ),
    }),
  } as OPAQUER extends 'YES'
    ? KMColorGenerator.IColorOutput<'opaquer', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let whitenGrades = {
    ...(gradeOptions.whiten == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'whiten',
        options.max
      ),
    }),
  } as WHITEN extends 'YES'
    ? KMColorGenerator.IColorOutput<'whiten', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};
  let blackenGrades = {
    ...(gradeOptions.blacken == 'YES' && {
      ...makeGradesAsObject(
        options.prefix,
        baseColor,
        options.gradeLevel,
        options.spliter,
        'blacken',
        options.max
      ),
    }),
  } as BLACKEN extends 'YES'
    ? KMColorGenerator.IColorOutput<'blacken', GRADELEVEL, SPLITER, PREFIX>['grades']
    : {};

  return {
    baseColor: baseColor.hexa(),
    reverseColor: reverseColor.hexa(),
    grayScale: grayScale.hexa(),
    colorMode,
    useIn,
    spliter: options.spliter,
    grades: {
      ...darkenGrades,
      ...lightenGrades,
      ...alphaGrades,
      ...fadeGrades,
      ...opaquerGrades,
      ...whitenGrades,
      ...blackenGrades,
    },
  };
};

const makePalette = <
  COLORS extends KMColorGenerator.IPalleteInput,
  GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
  MAX extends KMColorGenerator.IMax = '0.7',
  PREFIX extends string = '',
  SPLITER extends KMColorGenerator.ISpliter = '_',
  DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
  LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
  ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
  FADE extends KMColorGenerator.IGradeStatus = 'NO',
  OPAQUER extends KMColorGenerator.IGradeStatus = 'NO',
  WHITEN extends KMColorGenerator.IGradeStatus = 'NO',
  BLACKEN extends KMColorGenerator.IGradeStatus = 'NO'
>(
  colors: COLORS,
  entryOptions: Partial<
    KMColorGenerator.IPaletteOptions<
      GRADELEVEL,
      MAX,
      PREFIX,
      SPLITER,
      DARKEN,
      LIGHTEN,
      ALPHA,
      FADE,
      OPAQUER,
      WHITEN,
      BLACKEN
    >
  >
) => {
  let options: KMColorGenerator.IPaletteOptions<
    GRADELEVEL,
    MAX,
    PREFIX,
    SPLITER,
    DARKEN,
    LIGHTEN,
    ALPHA,
    FADE,
    OPAQUER,
    WHITEN,
    BLACKEN
  > = {
    gradeLevel: '4',
    max: '0.7',
    prefix: '' as PREFIX,
    spliter: '_',
    darken: 'YES',
    lighten: 'YES',
    alpha: 'YES',
    fade: 'NO',
    opaquer: 'NO',
    whiten: 'NO',
    blacken: 'NO',
    ...entryOptions,
  };

  let output = {} as Record<
    keyof COLORS,
    ReturnType<
      typeof makeColor<
        KMColorGenerator.IColorLike,
        GRADELEVEL,
        MAX,
        PREFIX,
        SPLITER,
        DARKEN,
        LIGHTEN,
        ALPHA,
        FADE,
        OPAQUER,
        WHITEN,
        BLACKEN
      >
    >
  >;
  for (const _key in colors) {
    if (Object.prototype.hasOwnProperty.call(colors, _key)) {
      const colorValue = colors[_key];
      let colorName = _key;
      output[colorName] = makeColor(
        colorValue,
        {
          gradeLevel: options.gradeLevel,
          max: options.max,
          prefix: options.prefix,
          spliter: options.spliter,
        },
        {
          darken: options.darken,
          lighten: options.lighten,
          alpha: options.alpha,
          fade: options.fade,
          opaquer: options.opaquer,
          whiten: options.whiten,
          blacken: options.blacken,
        }
      );
    }
  }

  return output;
};

const cssVariableAsObjectToCssString = (object: object) => {
  return JSON.stringify(object)
    .split(',')
    .join(';')
    .split('{')
    .join('')
    .split('}')
    .join('')
    .split('"')
    .join('');
};

const makeCssVariablesFromPalette = (palette: ReturnType<typeof makePalette>) => {
  let output = {} as any;
  for (const colorName in palette) {
    if (Object.prototype.hasOwnProperty.call(palette, colorName)) {
      const colorContent = palette[colorName];
      const base = colorContent.baseColor;
      output[`--${colorName}${colorContent.spliter}base`] = base;
      for (const gradeName in colorContent.grades) {
        if (Object.prototype.hasOwnProperty.call(colorContent.grades, gradeName)) {
          // @ts-ignore
          const gradeValue = colorContent.grades[gradeName];
          output[`--${colorName}${colorContent.spliter}${gradeName}`] = gradeValue;
        }
      }
    }
  }
  return output;
};

// @ts-ignore
const paletteToCssVariables = (palette: ReturnType<typeof makePalette>) => {
  return {
    asObject: () => makeCssVariablesFromPalette(palette),
    asString: () => cssVariableAsObjectToCssString(makeCssVariablesFromPalette(palette)),
  };
};

type IThemeEntry<NAME extends string, COLORS extends KMColorGenerator.IPalleteInput> = {
  [key in NAME]: {
    dark: COLORS;
    light: COLORS;
  };
};

type IThemeOutput<
  THEME extends IThemeEntry<NAME, COLORS>,
  NAME extends string,
  COLORS extends KMColorGenerator.IPalleteInput,
  GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
  MAX extends KMColorGenerator.IMax = '0.7',
  PREFIX extends string = '',
  SPLITER extends KMColorGenerator.ISpliter = '_',
  DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
  LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
  ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
  FADE extends KMColorGenerator.IGradeStatus = 'YES',
  OPAQUER extends KMColorGenerator.IGradeStatus = 'YES',
  WHITEN extends KMColorGenerator.IGradeStatus = 'YES',
  BLACKEN extends KMColorGenerator.IGradeStatus = 'YES'
> = {
  [key in keyof THEME]: {
    dark: ReturnType<
      typeof makePalette<
        THEME[key]['dark'],
        GRADELEVEL,
        MAX,
        PREFIX,
        SPLITER,
        DARKEN,
        LIGHTEN,
        ALPHA,
        FADE,
        OPAQUER,
        WHITEN,
        BLACKEN
      >
    >;
    light: ReturnType<
      typeof makePalette<
        THEME[key]['light'],
        GRADELEVEL,
        MAX,
        PREFIX,
        SPLITER,
        DARKEN,
        LIGHTEN,
        ALPHA,
        FADE,
        OPAQUER,
        WHITEN,
        BLACKEN
      >
    >;
  };
};
// type IThemeOutput<NAME extends string, COLORS extends KMColorGenerator.IPalleteInput,
//   GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
//   MAX extends KMColorGenerator.IMax = '0.7',
//   PREFIX extends string = '',
//   SPLITER extends KMColorGenerator.ISpliter = '_',
//   DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
//   LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
//   ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
//   FADE extends KMColorGenerator.IGradeStatus = 'YES',
//   OPAQUER extends KMColorGenerator.IGradeStatus = 'YES',
//   WHITEN extends KMColorGenerator.IGradeStatus = 'YES',
//   BLACKEN extends KMColorGenerator.IGradeStatus = 'YES'
// > = {
//     [key in NAME]: {
//       dark: string
//       // light: ReturnType<typeof makePalette<COLORS,
//       //   GRADELEVEL,
//       //   MAX,
//       //   PREFIX,
//       //   SPLITER,
//       //   DARKEN,
//       //   LIGHTEN,
//       //   ALPHA,
//       //   FADE,
//       //   OPAQUER,
//       //   WHITEN,
//       //   BLACKEN
//       // >>,
//     }
//   }

const makeThemes = <
  COLORS extends KMColorGenerator.IPalleteInput,
  PREFIX extends string = '',
  SPLITER extends KMColorGenerator.ISpliter = '_',
  MAX extends KMColorGenerator.IMax = '0.7',
  DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
  LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
  ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
  FADE extends KMColorGenerator.IGradeStatus = 'NO',
  OPAQUER extends KMColorGenerator.IGradeStatus = 'NO',
  WHITEN extends KMColorGenerator.IGradeStatus = 'NO',
  BLACKEN extends KMColorGenerator.IGradeStatus = 'NO',
  GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
  THEME_NAME extends string = string,
  THEMES_ENTRY extends IThemeEntry<THEME_NAME, COLORS> = IThemeEntry<THEME_NAME, COLORS>,
  THEMES_OUTPUT extends IThemeOutput<
    THEMES_ENTRY,
    THEME_NAME,
    COLORS,
    GRADELEVEL,
    MAX,
    PREFIX,
    SPLITER,
    DARKEN,
    LIGHTEN,
    ALPHA,
    FADE,
    OPAQUER,
    WHITEN,
    BLACKEN
  > = IThemeOutput<
    THEMES_ENTRY,
    THEME_NAME,
    COLORS,
    GRADELEVEL,
    MAX,
    PREFIX,
    SPLITER,
    DARKEN,
    LIGHTEN,
    ALPHA,
    FADE,
    OPAQUER,
    WHITEN,
    BLACKEN
  >
  // @ts-ignore
>(
  entryThemes: THEMES_ENTRY,
  defaultTheme: keyof THEMES_ENTRY,
  defaultThemeType: 'dark' | 'light',
  entryOptions: Partial<
    KMColorGenerator.IPaletteOptions<
      GRADELEVEL,
      MAX,
      PREFIX,
      SPLITER,
      DARKEN,
      LIGHTEN,
      ALPHA,
      FADE,
      OPAQUER,
      WHITEN,
      BLACKEN
    >
  >
) => {
  // @ts-ignore
  const activeThemeName = ref<keyof THEMES_ENTRY>(defaultTheme);
  // @ts-ignore
  const activeThemeType = ref<'dark' | 'light'>(defaultThemeType);
  // @ts-ignore
  let output = {} as THEMES_OUTPUT;

  const setActiveTheme = (name: keyof THEMES_ENTRY) => {
    return activeThemeName.setHard(name);
  };
  const setActiveThemeType = (type: 'dark' | 'light') => {
    return activeThemeType.setHard(type);
  };
  // @ts-ignore

  const activeTheme = computed({ activeThemeName, activeThemeType }, () => {
    return output[activeThemeName.value]?.[
      activeThemeType.value
    ] as THEMES_OUTPUT[keyof THEMES_OUTPUT]['dark'] & THEMES_OUTPUT[keyof THEMES_OUTPUT]['light'];
  });

  for (const themes in entryThemes) {
    if (Object.prototype.hasOwnProperty.call(entryThemes, themes)) {
      // @ts-ignore
      output[themes] = {};
      const themeListInTypes = entryThemes[themes];
      for (const themeType in themeListInTypes) {
        if (Object.prototype.hasOwnProperty.call(themeListInTypes, themeType)) {
          // @ts-ignore
          output[themes][themeType] = makePalette(themeListInTypes[themeType], entryOptions);

          // const element = themeListInTypes[themeType];
        }
      }
    }
  }

  setActiveTheme(defaultTheme);
  setActiveThemeType(defaultThemeType);
  return {
    themes: output,
    setActiveTheme,
    setActiveThemeType,
    activeTheme,
  };
};

export default {
  makePalette,
  makeThemes,
};
