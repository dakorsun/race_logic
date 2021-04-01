/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  let watch; let
    watchOptions;
  const modules = {
    js: {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
        },
      ],
    },
    sass: {
      test: /\.(sa|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ],
    },
    sassIsomorph: {
      test: /\.sass$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ],
    },
  };

  if (env === 'production') {
    modules.sass.use.splice(2, 0, { loader: 'postcss-loader' });
    modules.sassIsomorph.use.splice(2, 0, { loader: 'postcss-loader' });
  }
  // else {
  //   watch = true;
  //   watchOptions = {
  //     ignored: ['/node_modules', '/server', '/dist'],
  //   };
  // }

  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      App: path.resolve(__dirname, 'src/App/'),
      Pages: path.resolve(__dirname, 'src/Pages/'),
    },
  };

  return {
    modules,
    resolve,
    watch,
    watchOptions,
  };
};
