const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'web',
  entry: './src/_bundle/main.js',
  mode: process.env.NODE_ENV,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    ...(!isDev ? [new CompressionPlugin({
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    })] : []),
  ],
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.pcss', '.tsx', '.ts', '...'],
    alias: {
      '@bundle': path.resolve(__dirname, 'src/_bundle'),
      '@data': path.resolve(__dirname, 'src/_data'),
    }
  },
  module: {
    rules: [
      {
        test: /\.pcss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false  // This fixes the url option issue
            }
          },
          'postcss-loader'
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: 'main.js',
    library: 'wp'
  }
};