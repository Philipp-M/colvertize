<p align="center">
    <a href="https://github.com/Philipp-M/colvertize/" title="Visit colvertize home page">
        <img src="https://raw.githubusercontent.com/Philipp-M/colvertize/master/colvertize.png?token=ACGWRZW6PKAMLIFS4Q2XJOS7M6GPW" alt="colvertize" width="1889">
    </a>
</p>
<p align="center">
  <a href="https://github.com/Philipp-M/colvertize/actions?query=workflow%3A%22Automated+Build%2C+Tests+and+Linting%22" title="Visit build status on github">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Philipp-M/colvertize/Automated%20Build,%20Tests%20and%20Linting">
  </a>
  <a href="https://www.npmjs.com/package/colvertize" title="Visit colvertize on npm.js">
    <img src="https://img.shields.io/npm/v/colvertize.svg" alt="npm version" >
  </a>
  <a href="https://bundlephobia.com/result?p=colvertize" title="Visit colvertize on bundlephobia">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/colvertize">
  </a>
  <a href="https://codecov.io/gh/Philipp-M/colvertize" title="Visit colvertize on codecov.io">
    <img alt="code coverage" src="https://img.shields.io/codecov/c/github/Philipp-M/colvertize?token=1E5QNDEC88">
  </a>
  <a href="https://github.com/Philipp-M/colvertize/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/colvertize.svg" alt="License">
  </a>
  <a href="https://david-dm.org/Philipp-M/colvertize">
    <img alt="dependency status" src="https://img.shields.io/david/Philipp-M/colvertize">
  </a>
</p>

## Overview

Colvertize allows to conveniently convert colors between different
formats and can apply conversion functions (like color inversion) using
function composition.

It is heavily based on the color implementation of the excellent
[darkreader](https://github.com/darkreader/darkreader)

## Usage

Installation:
```bash
npm i --save colvertize
# or
yarn add colvertize
```

UMD support in browser:
```html
<script type="text/javascript" src="https://unpkg.com/colvertize@0.1.0"></script>
```

Examples:

``` typescript
import { convert, RGBA } from 'colvertize';

convert('rebeccapurple', 'css-hex');
// -> '#663399'
convert('#123456', 'css-rgb');
// -> 'rgb(18, 52, 86)'
convert('#123456', 'css-hsl');
// -> 'hsl(210, 65%, 20%)'
convert('#123456', 'rgb');
// -> {'r': 18, 'g': 52, 'b': 86, 'a': 1}
convert('#123456', 'hsl');
// -> {'h': 210, 's': 0.653846153846154, 'l': 0.20392156862745098, 'a': 1}


// custom conversion functions

function invertColor(c: RGBA): RGBA {
  return {
    r: 255 - c.r,
    g: 255 - c.g,
    b: 255 - c.b,
    a: c.a,
  };
}

convert('#ffffff', 'css-hex', invertColor)
// -> '#000000'
```

This following built-in conversion functions are supported:

``` typescript
import {
  convert,
  invert,
  invertDarkLight,
  gammaCorrection,
  contrastBrightness
} from 'colvertize';

convert('#ff0000', 'css-hex', invert)
// -> '#00ffff'

// dark (default: black), light (default: white), and threshold (default: 0.179) are optional options
convert('#ffff00', 'css-hex', invertDarkLight({dark: '#111', light: '#eee'}))
// -> '#111111'

// factor (default: 2.2) is an optional option
convert('#773300', 'css-hex', gammaCorrection())
// -> '#b47b00'

// contrast (default: 1.0) and brightness (default: 0) are optional options
convert('#993300', 'css-hex', contrastBrightness({ contrast: 1.5 }))
// -> '#a60d00'
```

For more usage information checkout the
[tests](https://github.com/Philipp-M/colvertize/blob/master/test/index.test.ts)

## License

[MIT](https://github.com/Philipp-M/colvertize/blob/master/LICENSE)
