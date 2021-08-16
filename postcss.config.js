module.exports = {
  plugins: {
    'postcss-import': {
      path: ['./src']
    },
    'postcss-advanced-variables': {},
    'postcss-inline-svg': {
      paths: ['./src/'],
      removeFill: true,
      removeStroke: true
    },
    'postcss-preset-env': {
      autoprefixer: {
        grid: true,
        flexbox: 'no-2009',
      },
      browsers: ['last 2 versions'],
      stage: 0,
    },
    'cssnano': {},
  },
}
