import { convert, invert, invertDarkLight, gammaCorrection, contrastBrightness } from '../src';

describe('convert', () => {
  it('converts CSS string to RGBA', () => {
    expect(convert('#fff', 'rgb')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
  });
  it('converts CSS colorname string to CSS hex string', () => {
    expect(convert('rebeccapurple', 'css-hex')).toStrictEqual('#663399');
  });
  it('converts RGBA to CSS rgb string', () => {
    expect(convert({ r: 255, g: 255, b: 255, a: 1 }, 'css-rgb')).toStrictEqual('rgb(255, 255, 255)');
  });
  it('converts RGBA to CSS hex string', () => {
    expect(convert({ r: 255, g: 255, b: 255, a: 0.5 }, 'css-hex')).toStrictEqual('#ffffff80');
  });
  it('converts RGBA to CSS hsl string', () => {
    expect(convert({ r: 255, g: 255, b: 255, a: 1 }, 'css-hsl')).toStrictEqual('hsl(0, 0%, 100%)');
  });
  it('converts RGBA to HSLA', () => {
    expect(convert({ r: 255, g: 255, b: 255, a: 1 }, 'hsl')).toStrictEqual({ h: 0, s: 0, l: 1, a: 1 });
  });
  it('converts HSLA to RGBA', () => {
    expect(convert({ h: 0, s: 0, l: 1, a: 1 }, 'rgb')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
  });
  it('throws error with invalid outputType', () => {
    expect(() => convert({ h: 0, s: 0, l: 1, a: 1 }, 'invalid' as 'rgb')).toThrow("Unsupported outputType 'invalid'");
  });
  it('converts CSS (hex-)string to CSS string, using "invert" convertFunction', () => {
    expect(convert('#ffffff', 'css-hex', invert)).toStrictEqual('#000000');
    expect(convert('#ab1b77', 'css-hex', invert)).toStrictEqual('#54e488');
    expect(convert('#9288a4', 'css-hex', invert)).toStrictEqual('#6d775b');
  });
});

describe('conversion functions', () => {
  it('inverts colors', () => {
    expect(invert({ r: 100, g: 100, b: 100, a: 0.5 })).toStrictEqual({ r: 155, g: 155, b: 155, a: 0.5 });
    expect(invert({ r: 100, g: 155, b: 100 })).toStrictEqual({ r: 155, g: 100, b: 155, a: 1.0 });
  });
  it('inverts colors using dark and light colors', () => {
    expect(invertDarkLight()({ r: 100, g: 100, b: 100 })).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(invertDarkLight()({ r: 5, g: 255, b: 155, a: 0.5 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(invertDarkLight()({ r: 5, g: 255, b: 155, a: 0.5 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });

    const differentColors = invertDarkLight({ dark: '#111', light: '#eee' });
    expect(differentColors({ r: 5, g: 255, b: 155 })).toStrictEqual({ r: 17, g: 17, b: 17, a: 1 });
    expect(differentColors({ r: 5, g: 55, b: 155 })).toStrictEqual({ r: 238, g: 238, b: 238, a: 1 });

    const smallThreshold = invertDarkLight({ threshold: 0.000001 });
    expect(smallThreshold({ r: 0, g: 0, b: 0 })).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(smallThreshold({ r: 0, g: 0, b: 1 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });

    const bigThreshold = invertDarkLight({ threshold: 0.999999 });
    expect(bigThreshold({ r: 254, g: 255, b: 255 })).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(bigThreshold({ r: 255, g: 255, b: 255 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });

    const useInputAlpha = invertDarkLight({ useInputAlpha: true });
    expect(useInputAlpha({ r: 0, g: 30, b: 0, a: 0.5 })).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.5 });
    expect(useInputAlpha({ r: 255, g: 255, b: 255 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1.0 });
  });

  it('applies gamma correction', () => {
    expect(gammaCorrection()({ r: 5, g: 55, b: 155 })).toStrictEqual({
      r: 42.694498694422045,
      g: 126.97909574340359,
      b: 203.3590936393338,
      a: 1.0,
    });
    expect(gammaCorrection({ factor: 1.0 })({ r: 5, g: 55, b: 155, a: 0.5 })).toStrictEqual({
      r: 5,
      g: 55,
      b: 155,
      a: 0.5,
    });
  });
  it('applies contrast and brightness', () => {
    expect(contrastBrightness()({ r: 5, g: 55, b: 155, a: 0.5 })).toStrictEqual({
      r: 5,
      g: 55,
      b: 155,
      a: 0.5,
    });
    expect(contrastBrightness({ contrast: 2.0, brightness: 20 })({ r: 5, g: 55, b: 155 })).toStrictEqual({
      r: 0,
      g: 2,
      b: 202,
      a: 1.0,
    });
  });
});
