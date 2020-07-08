import { join } from 'path';
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
  plugins,
  optimization,
  devServer: {
    open: true,
    hot: true,
    contentBase: join(process.cwd(), 'public'),
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
