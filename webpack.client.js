/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = (env, argv) => {
  const watchMode = argv.liveReload || false;
  const modeEnv = argv.mode || 'development';
  const isProd = modeEnv === 'production';
  const {
    modules, resolve, watch, watchOptions,
  } = webpackConfig(modeEnv);

  const optimizations = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [],
  };

  if (isProd) {
    optimizations.minimizer.push(new TerserPlugin());
  }

  return {
    // target: 'node',
    devServer: {
      contentBase: [path.join(__dirname, 'dist')],
      compress: true,
      port: 4200,
      watchContentBase: true,
      progress: true,
      hot: true,
      open: false,
      historyApiFallback: true,
    },
    resolve,
    module: {
      rules: [
        modules.js,
        modules.sass,
        modules.woff,
        modules.files,
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/Html/Browser.html',
      }),
      new WebpackNotifierPlugin({ alwaysNotify: false }),
      new Dotenv(),
    ],
    entry: {
      main: './src/client/index.tsx',
    },
    output: {
      filename: watchMode ? 'assets/[name].[hash].js' : 'assets/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    performance: {
      hints: false,
    },
    optimization: optimizations,
    watch,
    watchOptions,
  };
};
