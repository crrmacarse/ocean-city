import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  entry, output, moduleResolver,
  rules, plugins, optimization,
} from './common';

const hotConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry,
  output,
  resolve: moduleResolver,
  module: {
    rules: [
      ...rules,
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: join(process.cwd(), '/frontend/index.html'),
      filename: join(process.cwd(), '/dist/index.html'),
      inject: 'body',
      favicon: join(process.cwd(), '/public/assets/logo.png'),
    }),
  ],
  optimization,
  devServer: {
    open: true,
    hot: true,
    contentBase: join(process.cwd(), 'dist'),
    writeToDisk: true,
    historyApiFallback: true,
    compress: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
};

export default hotConfig;
