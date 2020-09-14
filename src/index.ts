import { parse, rgbToHexString, hslToString, rgbToString, hslToRGB, rgbToHSL, RGBA, HSLA } from './color';

export * from './color';

export type CssColor = string;

export type Color = CssColor | RGBA | HSLA;

export type ConvertFunction = (c: RGBA) => RGBA;

type OutputTypes = 'rgb' | 'hsl' | 'css-rgb' | 'css-hex' | 'css-hsl';

type InferOutputType<OutputType extends OutputTypes> = OutputType extends 'rgb'
  ? RGBA
  : OutputType extends 'hsl'
    ? HSLA
    : CssColor;

export function colorToRGBA(color: Color) {
  if (typeof color === 'string') {
    return parse(color);
  }
  if (Object.prototype.hasOwnProperty.call(color, 'r')) {
    return { ...(color as RGBA) };
  }
  return hslToRGB(color as HSLA);
}

export function convert<OutputType extends OutputTypes>(
  color: Color,
  outputType: OutputType,
  convertFunction?: ConvertFunction
): InferOutputType<OutputType>;

export function convert(color: Color, outputType: OutputTypes, convertFunction = (c: RGBA) => c): Color {
  const colorResult = convertFunction(colorToRGBA(color));

  switch (outputType) {
    case 'rgb':
      return colorResult;
    case 'hsl':
      return rgbToHSL(colorResult);
    case 'css-rgb':
      return rgbToString(colorResult);
    case 'css-hex':
      return rgbToHexString(colorResult);
    case 'css-hsl':
      return hslToString(rgbToHSL(colorResult));
    default:
      throw new Error(`Unsupported outputType '${outputType}'`);
  }
}

// -------------------------------------------------------- conversion functions

export function invert(c: RGBA): RGBA {
  return {
    r: 255 - c.r,
    g: 255 - c.g,
    b: 255 - c.b,
    a: c.a === undefined ? 1.0 : c.a,
  };
}

function getLuminance(c: RGBA): number {
  const l = (v: number) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * l(c.r) + 0.7152 * l(c.g) + 0.0722 * l(c.b);
}

type InvertDarkLightOptions = {
  threshold?: number;
  dark?: Color;
  light?: Color;
  useInputAlpha?: boolean;
};

export function invertDarkLight({
  threshold = Math.sqrt(1.05 * 0.05) - 0.05,
  dark = 'black',
  light = 'white',
  useInputAlpha = false,
}: InvertDarkLightOptions = {}): (c: RGBA) => RGBA {
  const _dark = colorToRGBA(dark);
  const _light = colorToRGBA(light);
  return (c) => {
    const result = getLuminance(c) > threshold ? _dark : _light;
    return useInputAlpha ? { ...result, a: c.a === undefined ? 1.0 : c.a } : result;
  };
}

export function gammaCorrection({ factor = 2.2 }: { factor?: number } = {}): (c: RGBA) => RGBA {
  const f = (v: number) => 255.0 * (v / 255.0) ** (1.0 / factor);
  return (c) => {
    return {
      r: f(c.r),
      g: f(c.g),
      b: f(c.b),
      a: c.a === undefined ? 1.0 : c.a,
    };
  };
}

type ContrastOptions = { contrast?: number; brightness?: number };

export function contrastBrightness({ contrast = 1.0, brightness = 0.0 }: ContrastOptions = {}): (c: RGBA) => RGBA {
  const f = (v: number) => Math.min(255, Math.max(0, contrast * (v - 128) + 128 + brightness));
  return (c) => {
    return {
      r: f(c.r),
      g: f(c.g),
      b: f(c.b),
      a: c.a === undefined ? 1.0 : c.a,
    };
  };
}
