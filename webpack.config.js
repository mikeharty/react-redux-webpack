const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

// todo: Webpack hash in file name?
const outputName = 'bundle';

const postCssOptions = [
  autoprefixer({
    browsers: ['ie 8-11', 'last 10 versions'],
    map: dev
  })
];

const plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: postCssOptions
    }
  }),
  new ExtractTextPlugin(outputName+'.css'),
];

if (!dev) {
  postCssOptions.push(require('cssnano'));
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: outputName+'.js',
    publicPath: '/assets/'
  },
  devtool: dev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: dev
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                localIdentName: '[hash:base64]-[name]-[local]',
                sourceMap: dev
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: dev,
                includePaths: [path.resolve(__dirname, './src')]
              }
            }
          ]
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
  },
  plugins: plugins,
  externals: {'react': 'var React', 'jQuery': 'var jQuery'},
};

module.exports = config;
