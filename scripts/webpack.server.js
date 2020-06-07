
const { resolve } = require('path');
const webpack = require('webpack');

const root = (path) => resolve(__dirname, `../${path}`);
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './server/server.js',
  },
  output: {
    path: root('dist/'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
