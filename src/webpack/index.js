/**@flow weak*/
import Webpack from 'webpack'
import Config from '../config/index'
const
  {
    debug,
    staticPath,
    server: {
      instanceHost,
      instancePort
    },
    hotLoad: {
      hotHost,
      hotPort
    }
  } = Config,
  HotModuleReplacementPlugin: Object = new Webpack.HotModuleReplacementPlugin(),
  NoErrorsPlugin: Object = new Webpack.NoErrorsPlugin()

export default {
  devtool: debug ? 'eval' : 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${hotHost}:${hotPort}`,
    'webpack/hot/dev-server',
    `${__dirname}/../client/client.js`
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: /src|flow|interfaces/
      }
    ]
  },
  output: {
    path: `${staticPath}/js/`,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    HotModuleReplacementPlugin,
    NoErrorsPlugin
  ],
}
