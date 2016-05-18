/**@flow*/
import Express from 'express'
import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import WebpackConfig from '../webpack/index'
import Config from '../config/index'
import ReactMiddleWare from './middleware/react'
import {AUTH_SUCCESS, TODO_CREATE} from '../constants'

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
  app = Express()

app.use(Express.static(staticPath))
app.use(ReactMiddleWare)

app.get('/unsafe', (req, res) => {
  req.store.dispatch({
    type: AUTH_SUCCESS,
    data: {
      id: 1,
      login: 'admin'
    },
    token: {
      token: 'asdfaf'
    }
  })
  req.store.dispatch({
    type: TODO_CREATE,
    value: 'dddd'
  })
  req.store.dispatch({
    type: TODO_CREATE,
    value: 'cccc'
  })
  req.store.dispatch({
    type: TODO_CREATE,
    value: 'bbbb'
  })
  res.renderMarkup()
})

app.get('*', (req, res) => {
  res.renderMarkup()
})

app.listen(instancePort, instanceHost)

if (debug) {
  const devServer = new WebpackDevServer(Webpack(WebpackConfig), {
    hot: true,
    publicPath: WebpackConfig.output.publicPath,
    stats: {color: true},
    proxy: {
     "*": `http://${instanceHost}:${instancePort}`
   }
  })
  devServer.listen(hotPort, hotHost, err => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Hot Loader serves on http://${hotHost}:${hotPort}`)
    }
  })
}
