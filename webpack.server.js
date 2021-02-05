/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./webpack.config');

module.exports = (env, argv) => {
  const modeEnv = argv.mode || 'development';
  // const isProd = modeEnv === 'production';
  const {
    modules, resolve, watch, watchOptions,
  } = webpackConfig(modeEnv);

  const optimizations = {
    minimizer: [
      new TerserPlugin(),
    ],
  };

  return {
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
    resolve,
    module: {
      rules: [
        modules.js,
        modules.sassIsomorph,
      ],
    },
    entry: {
      main: path.resolve(__dirname, 'src/Server.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'server'),
    },
    performance: {
      hints: false,
    },
    optimization: optimizations,
    target: 'node',
    externals: [nodeExternals()],
    watch,
    watchOptions,
  };
};
