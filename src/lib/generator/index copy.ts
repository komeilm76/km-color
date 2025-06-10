// import Color from 'color';
// import _ from 'lodash';
// import { KMColorGenerator } from './schema';
// import { computed, ref } from 'km-fresh';

// const make = Color;

// const makeGradesAsObject = <
//     NAME extends string,
//     GM extends KMColorGenerator.IGradeMode = KMColorGenerator.IGradeMode,
//     GL extends KMColorGenerator.IGradeLevel = KMColorGenerator.IGradeLevel,
//     SPLITER extends KMColorGenerator.ISpliter = '_',
//     MAX extends KMColorGenerator.IMax = '0.7'
// >(
//     name: NAME,
//     color: KMColorGenerator.IColorLike,
//     gradeLevel: GL,
//     spliter: SPLITER,
//     method: GM,
//     max: MAX,
//     reverse: boolean = false
// ) => {
//     // @ts-ignore
//     let list = Array.from({ length: Number(gradeLevel) }).map((item, index) => {
//         let gradeNumber = index + 1;
//         const gradeValue = (Number(max) / Number(gradeLevel)) * gradeNumber;

//         return {
//             ...(name !== ''
//                 ? {
//                     [`${name}${spliter}${method}${spliter}${index + 1}`]: make(color)
//                     [method](reverse == true ? 1 - gradeValue : gradeValue)
//                         // @ts-ignore
//                         .hexa(),
//                 }
//                 : {
//                     [`${method}${spliter}${index + 1}`]: make(color)
//                     [method](reverse == true ? 1 - gradeValue : gradeValue)
//                         // @ts-ignore
//                         .hexa(),
//                 }),
//         };
//     });
//     return _.merge({}, ...list) as KMColorGenerator.IColorOutput<GM, GL, SPLITER, NAME>['grades'];
// };

// const makeColor = <
//     COLOR extends KMColorGenerator.IColorLike,
//     GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
//     PREFIX extends string = '',
//     SPLITER extends KMColorGenerator.ISpliter = '_',
//     MAX extends KMColorGenerator.IMax = '0.7',
//     DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
//     LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
//     ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
//     FADE extends KMColorGenerator.IGradeStatus = 'YES',
//     OPAQUER extends KMColorGenerator.IGradeStatus = 'YES',
//     WHITEN extends KMColorGenerator.IGradeStatus = 'YES',
//     BLACKEN extends KMColorGenerator.IGradeStatus = 'YES'
// >(
//     color: COLOR,
//     entryOptions: Partial<KMColorGenerator.IColorOptions<GRADELEVEL, MAX, SPLITER, PREFIX>>,
//     gradeOptions: Partial<
//         KMColorGenerator.IGradeOptions<DARKEN, LIGHTEN, ALPHA, FADE, OPAQUER, WHITEN, BLACKEN>
//     >
// ) => {
//     const options: KMColorGenerator.IColorOptions<GRADELEVEL, MAX, SPLITER, PREFIX> = {
//         gradeLevel: '4' as GRADELEVEL,
//         max: '0.7' as MAX,
//         prefix: '' as PREFIX,
//         spliter: '_' as SPLITER,
//         ...entryOptions,
//     };

//     const baseColor = make(color);
//     const reverseColor = baseColor.negate();
//     const grayScale = baseColor.grayscale();
//     const colorMode: KMColorGenerator.IColorMode = baseColor.luminosity() > 0.5 ? 'light' : 'dark';
//     const useIn =
//         colorMode == 'dark'
//             ? 'use this color between light colors'
//             : 'use this color between dark colors';

//     let darkenGrades = {
//         ...(gradeOptions.darken == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'darken',
//                 options.max
//             ),
//         }),
//     } as DARKEN extends 'YES'
//         ? KMColorGenerator.IColorOutput<'darken', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let lightenGrades = {
//         ...(gradeOptions.lighten == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'lighten',
//                 options.max
//             ),
//         }),
//     } as LIGHTEN extends 'YES'
//         ? KMColorGenerator.IColorOutput<'lighten', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let alphaGrades = {
//         ...(gradeOptions.alpha == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'alpha',
//                 options.max
//             ),
//         }),
//     } as ALPHA extends 'YES'
//         ? KMColorGenerator.IColorOutput<'alpha', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let fadeGrades = {
//         ...(gradeOptions.fade == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'fade',
//                 options.max
//             ),
//         }),
//     } as FADE extends 'YES'
//         ? KMColorGenerator.IColorOutput<'fade', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let opaquerGrades = {
//         ...(gradeOptions.opaquer == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'opaquer',
//                 options.max
//             ),
//         }),
//     } as OPAQUER extends 'YES'
//         ? KMColorGenerator.IColorOutput<'opaquer', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let whitenGrades = {
//         ...(gradeOptions.whiten == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'whiten',
//                 options.max
//             ),
//         }),
//     } as WHITEN extends 'YES'
//         ? KMColorGenerator.IColorOutput<'whiten', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};
//     let blackenGrades = {
//         ...(gradeOptions.blacken == 'YES' && {
//             ...makeGradesAsObject(
//                 options.prefix,
//                 baseColor,
//                 options.gradeLevel,
//                 options.spliter,
//                 'blacken',
//                 options.max
//             ),
//         }),
//     } as BLACKEN extends 'YES'
//         ? KMColorGenerator.IColorOutput<'blacken', GRADELEVEL, SPLITER, PREFIX>['grades']
//         : {};

//     return {
//         baseColor: baseColor.hexa(),
//         reverseColor: reverseColor.hexa(),
//         grayScale: grayScale.hexa(),
//         colorMode,
//         useIn,
//         spliter: options.spliter,
//         grades: {
//             ...darkenGrades,
//             ...lightenGrades,
//             ...alphaGrades,
//             ...fadeGrades,
//             ...opaquerGrades,
//             ...whitenGrades,
//             ...blackenGrades,
//         },
//     };
// };

// const makePalette = <
//     COLORS extends KMColorGenerator.IPalleteInput,
//     GRADELEVEL extends KMColorGenerator.IGradeLevel = '4',
//     PREFIX extends string = '',
//     SPLITER extends KMColorGenerator.ISpliter = '_',
//     MAX extends KMColorGenerator.IMax = '0.7',
//     DARKEN extends KMColorGenerator.IGradeStatus = 'YES',
//     LIGHTEN extends KMColorGenerator.IGradeStatus = 'YES',
//     ALPHA extends KMColorGenerator.IGradeStatus = 'YES',
//     FADE extends KMColorGenerator.IGradeStatus = 'NO',
//     OPAQUER extends KMColorGenerator.IGradeStatus = 'NO',
//     WHITEN extends KMColorGenerator.IGradeStatus = 'NO',
//     BLACKEN extends KMColorGenerator.IGradeStatus = 'NO'
// >(
//     colors: COLORS,
//     entryOptions: Partial<
//         KMColorGenerator.IPaletteOptions<
//             GRADELEVEL,
//             MAX,
//             SPLITER,
//             PREFIX,
//             DARKEN,
//             LIGHTEN,
//             ALPHA,
//             FADE,
//             OPAQUER,
//             WHITEN,
//             BLACKEN
//         >
//     >
// ) => {
//     let options: KMColorGenerator.IPaletteOptions<
//         GRADELEVEL,
//         MAX,
//         SPLITER,
//         PREFIX,
//         DARKEN,
//         LIGHTEN,
//         ALPHA,
//         FADE,
//         OPAQUER,
//         WHITEN,
//         BLACKEN
//     > = {
//         gradeLevel: '4',
//         max: '0.7',
//         spliter: '_',
//         prefix: '' as PREFIX,
//         darken: 'YES',
//         lighten: 'YES',
//         alpha: 'YES',
//         fade: 'NO',
//         opaquer: 'NO',
//         whiten: 'NO',
//         blacken: 'NO',
//         ...entryOptions,
//     };

//     let output = {} as Record<
//         keyof COLORS,
//         ReturnType<
//             typeof makeColor<
//                 KMColorGenerator.IColorLike,
//                 GRADELEVEL,
//                 PREFIX,
//                 SPLITER,
//                 MAX,
//                 DARKEN,
//                 LIGHTEN,
//                 ALPHA,
//                 FADE,
//                 OPAQUER,
//                 WHITEN,
//                 BLACKEN
//             >
//         >
//     >;
//     for (const _key in colors) {
//         if (Object.prototype.hasOwnProperty.call(colors, _key)) {
//             const colorValue = colors[_key];
//             let colorName = _key;
//             output[colorName] = makeColor(
//                 colorValue,
//                 {
//                     gradeLevel: options.gradeLevel,
//                     max: options.max,
//                     prefix: options.prefix,
//                     spliter: options.spliter,
//                 },
//                 {
//                     darken: options.darken,
//                     lighten: options.lighten,
//                     alpha: options.alpha,
//                     fade: options.fade,
//                     opaquer: options.opaquer,
//                     whiten: options.whiten,
//                     blacken: options.blacken,
//                 }
//             );
//         }
//     }

//     return output;
// };

// const cssVariableAsObjectToCssString = (object: object) => {
//     return JSON.stringify(object)
//         .split(',')
//         .join(';')
//         .split('{')
//         .join('')
//         .split('}')
//         .join('')
//         .split('"')
//         .join('');
// };

// const makeCssVariablesFromPalette = (palette: ReturnType<typeof makePalette>) => {
//     let output = {} as any;
//     for (const colorName in palette) {
//         if (Object.prototype.hasOwnProperty.call(palette, colorName)) {
//             const colorContent = palette[colorName];
//             const base = colorContent.baseColor;
//             output[`--${colorName}${colorContent.spliter}base`] = base;
//             for (const gradeName in colorContent.grades) {
//                 if (Object.prototype.hasOwnProperty.call(colorContent.grades, gradeName)) {
//                     // @ts-ignore
//                     const gradeValue = colorContent.grades[gradeName];
//                     output[`--${colorName}${colorContent.spliter}${gradeName}`] = gradeValue;
//                 }
//             }
//         }
//     }
//     return output;
// };

// const paletteToCssVariables = (palette: ReturnType<typeof makePalette>) => {
//     return {
//         asObject: () => makeCssVariablesFromPalette(palette),
//         asString: () => cssVariableAsObjectToCssString(makeCssVariablesFromPalette(palette)),
//     };
// };

// // type ITheme<PALETTE extends ReturnType<typeof makePalette>> = {
// //   palette: PALETTE;
// //   // comming soon
// //   // shadows: Record<string, string>;
// //   // typography: Record<string, string>;
// //   // breakpoints: Record<string, string>;
// //   // spacing: Record<string, string>;
// //   // borderRadius: Record<string, string>;
// //   // transitions: Record<string, string>;
// // };

// // type IThemeEntry<
// //   PALETTE extends ReturnType<typeof makePalette>,
// //   NAMES extends string = string
// // > = Record<NAMES, ITheme<PALETTE>>;

// // const makeThemes = <PALETTE extends ReturnType<typeof makePalette>, NAMES extends string>(
// //   themes: IThemeEntry<PALETTE, NAMES>
// // ) => {
// //   return themes;
// // };
// const registerThemes = <
//     OBJECT extends Object,
//     THEMES extends keyof OBJECT,
//     THEMETYPES extends keyof OBJECT[THEMES]
// >(
//     entryThemes: OBJECT,
//     defaultTheme: THEMES,
//     defaultThemeType: THEMETYPES
// ) => {
//     const activeTheme = ref<THEMES>(defaultTheme);
//     const activeThemeType = ref<THEMETYPES>(defaultThemeType);

//     let variables = {};
//     for (const themeName in entryThemes) {
//         if (Object.prototype.hasOwnProperty.call(entryThemes, themeName)) {
//             let themeType = entryThemes[themeName];
//             // @ts-ignore
//             variables[themeName] = {};
//             for (const themeKey in themeType) {
//                 if (Object.prototype.hasOwnProperty.call(themeType, themeKey)) {
//                     const themeValue = themeType[themeKey];
//                     // @ts-ignore
//                     variables[themeName][themeKey] = paletteToCssVariables(themeValue);
//                 }
//             }
//         }
//     }
//     return {
//         activeTheme,
//         activeThemeType,
//         activeThemeVariables: computed<ReturnType<typeof paletteToCssVariables>>(
//             { activeTheme, activeThemeType },
//             () => {
//                 // @ts-ignore
//                 return variables[activeTheme.value][activeThemeType.value] as ReturnType<
//                     typeof paletteToCssVariables
//                 >;
//             }
//         ),
//         setTheme(theme: THEMES) {
//             activeTheme.setHard(theme);
//         },
//         setThemeType(themeType: THEMETYPES) {
//             activeThemeType.setHard(themeType);
//         },
//         getActiveTheme() {
//             return entryThemes[activeTheme.value][activeThemeType.value];
//         },
//         getActiveThemeType() {
//             return activeThemeType.value;
//         },
//         getActiveThemeName() {
//             return activeTheme.value;
//         },

//         getThemeNameList() {
//             return Object.keys(entryThemes).map((theme) => {
//                 return theme;
//             }) as THEMES[];
//         },
//         getThemeTypeList() {
//             // @ts-ignore
//             return Object.keys(entryThemes[activeTheme.value]).map((themeType) => {
//                 return themeType;
//             }) as THEMETYPES[];
//         },
//     };
// };

// export default {
//     // makeColor,
//     makePalette,
//     registerThemes,
//     // paletteToCssVariables,
//     // makeThemes,
// };
