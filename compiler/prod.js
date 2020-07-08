import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {
  entry, output, moduleResolver,
  rules, plugins, optimization,
} from './common';

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry,
  output,
  resolve: moduleResolver,
  module: {
    rules: [
      ...rules,
      {
        test: /\.(ts|js)x?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              ['react-remove-properties', { properties: ['data-test'] }],
            ],
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.SLACK_CLIENT_ID': JSON.stringify(process.env.SLACK_CLIENT_ID),
      'process.env.SLACK_CLIENT_SECRET': JSON.stringify(process.env.SLACK_CLIENT_SECRET),
      'process.env.TEST_TOKEN': JSON.stringify(process.env.TEST_TOKEN),
    }),
    ...plugins,
    // new GenerateSW({
    //   swDest: join(process.cwd(), '/build/public/service-worker.js'),
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    // new CompressionPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[contentHash].[hash].css',
      chunkFilename: '[contentHash].[hash].css',
    }),
  ],
  optimization: {
    ...optimization,
    minimizer: [new TerserPlugin({
      terserOptions: {
        safari10: true,
      },
    })],
  },
};

export default prodConfig;
