import { ColorLike } from 'color';

export namespace KMColorGenerator {
  export type IGrades = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  export type IMax = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
  export type IColorMode = 'light' | 'dark';

  export type IMakeColorOptions = {
    grades: IGrades;
    max: IMax;
    darken: boolean;
    lighten: boolean;
    fade: boolean;
    alpha: boolean;
    opaquer: boolean;
    whiten: boolean;
    blacken: boolean;
  };
  export type IColorLike = ColorLike;
}
