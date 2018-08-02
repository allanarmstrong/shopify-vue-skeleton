/* eslint-disable no-undef */

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
  vue: path.resolve('./node_modules/vue/dist/vue.js'),
};

module.exports = {
  slateCssVarLoader: {
    cssVarLoaderLiquidPath: ['src/snippets/css-variables.liquid'],
  },
  slateTools: {
    extends: {
      dev: {
        resolve: {alias},
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader',
            },
          ],
        },
        plugins: [
          new VueLoaderPlugin(),
        ],
      },
      prod: {
        resolve: {alias},
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader',
            },
          ],
        },
        plugins: [
          new VueLoaderPlugin(),
        ],
      },
    },
  },
};
