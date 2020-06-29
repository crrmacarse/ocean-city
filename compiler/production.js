import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { DefinePlugin } from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin';
import {
  entry, output, moduleResolver,
  rules, plugins, optimization,
} from './common'

export default {
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
      'process.env.HOST': JSON.stringify(process.env.HOST),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.GA_TRACKING_CODE': JSON.stringify(process.env.GA_TRACKING_CODE),
      'process.env.SENTRY_API_KEY': JSON.stringify(process.env.SENTRY_API_KEY),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
    }),
    ...plugins,
    new HtmlWebpackPlugin({
      template: join(process.cwd(), '/compiler/template.html'),
      filename: join(process.cwd(), '/build/resources/views/layouts/main.edge'),
      inject: 'body',
      favicon: join(process.cwd(), '/public/assets/logo.png'),
    }),
    new GenerateSW({
      swDest: join(process.cwd(), '/build/public/service-worker.js'),
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CompressionPlugin(),
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
}
