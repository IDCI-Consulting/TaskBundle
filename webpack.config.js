const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry: {
    'load-extract-rule-editor': './Resources/public/js/editor/src/extract-rule/entrypoint.js',
    'load-workflow-editor': './Resources/public/js/editor/src/workflow/entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js/editor/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: "/bundles/idcitask/js/editor/dist/"
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'TaskBundle': path.resolve(
        __dirname,
        'Resources/public/js/editor/src/'
      )
    }
  },
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /load-editors\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
  ])
}
