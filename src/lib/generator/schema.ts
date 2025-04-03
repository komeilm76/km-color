import { ColorLike } from 'color';

export namespace KMColorGenerator {
  export type IGradeLevel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  export type IMax = '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
  export type IColorMode = 'light' | 'dark';
  export type ISpliter = '-' | '_';
  export type IGradeMode =
    | 'darken'
    | 'lighten'
    | 'alpha'
    | 'fade'
    | 'opaquer'
    | 'whiten'
    | 'blacken';

  export type IGradeKeysWithOutPrefix<
    GM extends IGradeMode,
    GL extends IGradeLevel,
    SPLITER extends ISpliter
  > = GL extends '1'
    ? `${GM}${SPLITER}${'1'}`
    : GL extends '2'
    ? `${GM}${SPLITER}${'1'}` | `${GM}${SPLITER}${'2'}`
    : GL extends '3'
    ? `${GM}${SPLITER}${'1'}` | `${GM}${SPLITER}${'2'}` | `${GM}${SPLITER}${'3'}`
    : GL extends '4'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
    : GL extends '5'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
    : GL extends '6'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
        | `${GM}${SPLITER}${'6'}`
    : GL extends '7'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
        | `${GM}${SPLITER}${'6'}`
        | `${GM}${SPLITER}${'7'}`
    : GL extends '8'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
        | `${GM}${SPLITER}${'6'}`
        | `${GM}${SPLITER}${'7'}`
        | `${GM}${SPLITER}${'8'}`
    : GL extends '9'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
        | `${GM}${SPLITER}${'6'}`
        | `${GM}${SPLITER}${'7'}`
        | `${GM}${SPLITER}${'8'}`
        | `${GM}${SPLITER}${'9'}`
    : GL extends '10'
    ?
        | `${GM}${SPLITER}${'1'}`
        | `${GM}${SPLITER}${'2'}`
        | `${GM}${SPLITER}${'3'}`
        | `${GM}${SPLITER}${'4'}`
        | `${GM}${SPLITER}${'5'}`
        | `${GM}${SPLITER}${'6'}`
        | `${GM}${SPLITER}${'7'}`
        | `${GM}${SPLITER}${'8'}`
        | `${GM}${SPLITER}${'9'}`
        | `${GM}${SPLITER}${'10'}`
    : '';

  export type IGradeKeysWithPrefix<
    GM extends IGradeMode,
    GL extends IGradeLevel,
    SPLITER extends ISpliter,
    PREFIX extends string
  > = GL extends '1'
    ? `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
    : GL extends '2'
    ? `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}` | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
    : GL extends '3'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
    : GL extends '4'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
    : GL extends '5'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
    : GL extends '6'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'6'}`
    : GL extends '7'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'6'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'7'}`
    : GL extends '8'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'6'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'7'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'8'}`
    : GL extends '9'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'6'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'7'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'8'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'9'}`
    : GL extends '10'
    ?
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'1'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'2'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'3'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'4'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'5'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'6'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'7'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'8'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'9'}`
        | `${PREFIX}${SPLITER}${GM}${SPLITER}${'10'}`
    : '';

  export type IGradeKeys<
    GM extends IGradeMode,
    GL extends IGradeLevel,
    SPLITER extends ISpliter,
    PREFIX extends string
  > = PREFIX extends ''
    ? IGradeKeysWithOutPrefix<GM, GL, SPLITER>
    : IGradeKeysWithPrefix<GM, GL, SPLITER, PREFIX>;

  export type IGradeStatus = 'YES' | 'NO';
  export type IGradeOptions<
    DARKEN extends IGradeStatus = 'YES',
    LIGHTEN extends IGradeStatus = 'YES',
    ALPHA extends IGradeStatus = 'YES',
    FADE extends IGradeStatus = 'YES',
    OPAQUER extends IGradeStatus = 'YES',
    WHITEN extends IGradeStatus = 'YES',
    BLACKEN extends IGradeStatus = 'YES'
  > = {
    darken: DARKEN | IGradeStatus;
    lighten: LIGHTEN | IGradeStatus;
    alpha: ALPHA | IGradeStatus;
    fade: FADE | IGradeStatus;
    opaquer: OPAQUER | IGradeStatus;
    whiten: WHITEN | IGradeStatus;
    blacken: BLACKEN | IGradeStatus;
  };

  export type IColorOptions<
    GRADELEVEL extends IGradeLevel = '4',
    MAX extends IMax = '0.7',
    SPLITER extends ISpliter = '_',
    PREFIX extends string = ''
  > = {
    gradeLevel: GRADELEVEL | IGradeLevel;
    max: MAX | IMax;
    spliter: SPLITER | ISpliter;
    prefix: PREFIX;
  };

  export type IColorOutput<
    GM extends IGradeMode,
    GL extends IGradeLevel,
    SPLITER extends ISpliter,
    PREFIX extends string = ''
  > = {
    base: string;
    reverseColor: string;
    grayScale: string;
    useIn: string;
    colorMode: IColorMode;
    grades: {
      [key in IGradeKeys<GM, GL, SPLITER, PREFIX>]: string;
    };
  };

  export type IPalleteInput = {
    [key: string]: IColorLike;
  };

  export type IPaletteOptions<
    GRADELEVEL extends IGradeLevel = '4',
    MAX extends IMax = '0.7',
    SPLITER extends ISpliter = '_',
    PREFIX extends string = '',
    DARKEN extends IGradeStatus = 'YES',
    LIGHTEN extends IGradeStatus = 'YES',
    ALPHA extends IGradeStatus = 'YES',
    FADE extends IGradeStatus = 'YES',
    OPAQUER extends IGradeStatus = 'YES',
    WHITEN extends IGradeStatus = 'YES',
    BLACKEN extends IGradeStatus = 'YES'
  > = {
    gradeLevel: GRADELEVEL | IGradeLevel;
    max: MAX | IMax;
    spliter: SPLITER | ISpliter;
    prefix: PREFIX;
    darken: DARKEN | IGradeStatus;
    lighten: LIGHTEN | IGradeStatus;
    alpha: ALPHA | IGradeStatus;
    fade: FADE | IGradeStatus;
    opaquer: OPAQUER | IGradeStatus;
    whiten: WHITEN | IGradeStatus;
    blacken: BLACKEN | IGradeStatus;
  };
  export type IColorLike = ColorLike;
}
