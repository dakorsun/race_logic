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
    woff: {
      test: /\.(woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: 'fonts/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff',
        },
      },
    },
    files: {
      test: /\.(ttf|eot|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },
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
      test: /\.(sa|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
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
    // modules.sass.use.splice(2, 0, { loader: 'postcss-loader' });
    // modules.sassIsomorph.use.splice(2, 0, { loader: 'postcss-loader' });

    console.log('modules.sass.use: ', modules.sass.use);
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
