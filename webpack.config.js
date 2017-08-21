var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: {
    'load-extract-rule-editor': './Resources/public/js/editor/src/extract-rule-entrypoint.js',
    'load-action-editor': './Resources/public/js/editor/src/action-entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js/editor/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: "/bundles/idcitask/js/editor/dist/"
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
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
