const typographyProps = [
  'fontSize', 'fontWeight', 'fontStyle', 'fontFamily',
  'textAlign', 'textDecoration', 'color',
];

const typographyAdvProps = [
  'lineHeight', 'letterSpacing', 'wordSpacing',
  'textTransform', 'whiteSpace'
];

const layoutProps = [
  'width', 'height', 'display', 'position',
  'top', 'left', 'right', 'bottom', 'zIndex', 'overflow'
];

const layoutAdvProps = [
  'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'flexDirection', 'justifyContent', 'alignItems', 'alignContent',
  'flexWrap', 'order'
];

const spacingProps = ['margin', 'padding', 'gap'];

const borderProps = ['border', 'borderWidth', 'borderColor', 'borderRadius'];

const backgroundProps = ['backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundRepeat'];

const effectProps = ['boxShadow', 'opacity', 'visibility', 'transition', 'transform'];

const mediaProps = ['objectFit', 'objectPosition'];

const interactiveProps = ['cursor', 'pointerEvents'];



export const componentProperty = {
  div: {
    basic: [...layoutProps, ...spacingProps, ...backgroundProps],
    advanced: [...layoutAdvProps, ...borderProps, ...effectProps, ...interactiveProps],
  },
  main: {
    basic: [...layoutProps, ...spacingProps, ...backgroundProps],
    advanced: [...layoutAdvProps, ...borderProps, ...effectProps, ...interactiveProps],
  },
  p: {
    basic: [...typographyProps, ...spacingProps],
    advanced: [...typographyAdvProps],
  },
  h1: {
    basic: [...typographyProps, ...spacingProps],
    advanced: [...typographyAdvProps],
  },
  span: {
    basic: [...typographyProps],
    advanced: [...typographyAdvProps],
  },
  img: {
    basic: ['width', 'height'],
    advanced: [...mediaProps, ...borderProps],
  },
  button: {
    basic: [...typographyProps, ...spacingProps, 'backgroundColor', 'border', 'cursor'],
    advanced: [...borderProps, ...effectProps, ...interactiveProps],
  },
  input: {
    basic: ['width', 'height', 'padding', 'fontSize', 'color', 'border'],
    advanced: [...backgroundProps, 'borderRadius'],
  },
  textarea: {
    basic: ['width', 'height', 'padding', 'fontSize', 'color', 'border'],
    advanced: ['resize', ...backgroundProps, 'borderRadius'],
  },
  ul: {
    basic: ['listStyle', 'margin', 'padding'],
    advanced: [],
  },
  li: {
    basic: [...typographyProps, 'margin'],
    advanced: [...typographyAdvProps],
  },
  a: {
    basic: ['color', 'textDecoration', 'fontSize'],
    advanced: ['cursor', ...typographyAdvProps],
  },
  section: {
    basic: [...layoutProps, ...spacingProps],
    advanced: [...backgroundProps, ...borderProps],
  },
  form: {
    basic: [...layoutProps, 'gap'],
    advanced: [...spacingProps],
  },
  h2: {
    basic: [...typographyProps, ...spacingProps],
    advanced: [...typographyAdvProps],
  },
  h3: {
    basic: [...typographyProps, ...spacingProps],
    advanced: [...typographyAdvProps],
  },
};
