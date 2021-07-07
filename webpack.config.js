const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require('./build-utils/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      entry: ['./src/index.js'],
      mode,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env'],
              },
            },
            exclude: '/node_modules/',
          },
          {
            test: /\.(jpg|jpeg|png|ico|gif|ttf)$/,
            use: [{ loader: 'url-loader', options: { limit: 5000 } }],
          },
          {
            test: /\.mp4$/,
            use: 'file-loader',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          favicon: './src/assets/image/favicon.ico',
        }),
        new webpack.ProgressPlugin(),
      ],
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets: presets || [] }),
  );
};
