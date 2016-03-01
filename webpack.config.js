var path = require('path'),
    webpack = require('webpack');


var webpackConfig = {
  context: __dirname + '/src',
  entry: {
    'app': './main',
    'vendor': [
      'babel-polyfill',
      'jquery',
      'bootstrap/modal',
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/bower_components/, /node_modules/]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['', '.jsx', '.js', '.json'],
    alias: {
      bootstrap: path.resolve(__dirname, 'node_modules/bootstrap/dist/js/umd'),
    }
  },
  output: {
    publicPath: '/build/',
    path: __dirname + '/build',
    filename: '[name].js'
  }
};



if(process.argv.indexOf('-p') >= 0) {
  webpackConfig['devtool'] = 'source-map';
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production')}
    })
  );
}

else {
  webpackConfig['devtool'] = 'inline-source-map';
}

module.exports = webpackConfig;
