import Color from 'color';
import convert from 'color-convert';
import _ from 'lodash';
import { KMColorGenerator } from './schema';

const useColorGenerator = () => {
  const make = Color;
  const converter = convert;

  const makeGrades = <
    KEY extends 'darken' | 'lighten' | 'alpha' | 'fade' | 'opaquer' | 'whiten' | 'blacken'
  >(
    color: KMColorGenerator.IColorLike,
    grade: KMColorGenerator.IGrades,
    max: KMColorGenerator.IMax = 0.7,
    method: KEY,
    reverse: boolean = false
  ) => {
    // @ts-ignore
    let list = Array.from({ length: grade }).map((item, index) => {
      let gradeNumber = index + 1;
      const gradeValue = (max / grade) * gradeNumber;
      return (
        make(color)
          [method](reverse == true ? 1 - gradeValue : gradeValue)
          // @ts-ignore
          .hexa()
      );
    });
    return list;
  };

  const makeColors = (
    colors: { name: string; color: KMColorGenerator.IColorLike }[],
    entryOptions: Partial<KMColorGenerator.IMakeColorOptions> = {}
  ) => {
    const options: KMColorGenerator.IMakeColorOptions = {
      grades: 4,
      max: 0.7,
      darken: true,
      lighten: true,
      fade: true,
      alpha: false,
      opaquer: false,
      whiten: false,
      blacken: false,
      ...entryOptions,
    };
    let output = colors.map((item) => {
      const baseColor = make(item.color);
      const reverseColor = baseColor.negate();
      const grayScale = baseColor.grayscale();
      const colorMode: KMColorGenerator.IColorMode =
        baseColor.luminosity() > 0.5 ? 'light' : 'dark';
      const useIn =
        colorMode == 'dark'
          ? 'use this color between light colors'
          : 'use this color between dark colors';
      return {
        name: item.name,
        base: baseColor.hexa(),
        reverseColor: reverseColor.hexa(),
        grayScale: grayScale.hexa(),
        colorMode,
        useIn,
        grades: {
          ...(options.darken && {
            darken: [...makeGrades(baseColor, options.grades, options.max, 'darken')],
          }),
          ...(options.lighten && {
            lighten: [...makeGrades(baseColor, options.grades, options.max, 'lighten')],
          }),
          ...(options.fade && {
            fade: [...makeGrades(baseColor, options.grades, options.max, 'fade')],
          }),
          ...(options.opaquer && {
            opaquer: [...makeGrades(baseColor, options.grades, options.max, 'opaquer')],
          }),
          ...(options.whiten && {
            whiten: [...makeGrades(baseColor, options.grades, options.max, 'whiten')],
          }),
          ...(options.blacken && {
            blacken: [...makeGrades(baseColor, options.grades, options.max, 'blacken')],
          }),
          ...(options.alpha && {
            alpha: [...makeGrades(baseColor, options.grades, options.max, 'alpha')],
          }),
        },
      };
    });
    return output;
  };

  const makeCssVariables = (config: ReturnType<typeof makeColors>, prefix: string = '--t-') => {
    let colorVariables = config.map((item) => {
      let grades = Object.entries(item.grades);
      let gradesCreated = grades.map((grade) => {
        let values = grade[1];
        let gradeName = grade[0];
        return values.map((item, index) => {
          const gradeNumber = index + 1;
          return {
            gradeName: `${gradeName}-${gradeNumber}`,
            value: item,
          };
        });
      });
      let flattenGrades = _.flatten(gradesCreated);
      const cssProperties = flattenGrades.map((flattenGrade) => {
        return {
          [`${prefix}${item.name}-${flattenGrade.gradeName}`]: flattenGrade.value,
        };
      });

      return {
        [`${prefix}${item.name}-base`]: item.base,
        ..._.merge({}, ...cssProperties),
      };
    });
    let asObject = _.merge({}, ...colorVariables);

    return {
      asObject,
      asString: objectToCssString(asObject),
    };
  };

  const objectToCssString = (object: object) => {
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

  return {
    converter,
    make,
    // makeGrades,
    makeColors,
    makeCssVariables,
    // objectToCssString,
  };
};

export default { use: useColorGenerator };
