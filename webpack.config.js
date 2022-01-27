const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const styleRules = {
  test: /\.(sass|scss)$/,
  use: [
    'style-loader',
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            esModule: false,
            publicPath: '',
        },
    },
    'css-loader',
    'sass-loader',
  ],
};
const jsRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};


module.exports = {
  entry: {
    main: './src/index.js',
    style: './src/styles.scss',
  },
  output: {
    path: __dirname +'/build',
  },
  module: {
    rules: [jsRules, styleRules],
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
};
