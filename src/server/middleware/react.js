/**@flow*/
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import Provider from '../../client/Provider'
import type {ExpressResponse, ExpressRequest} from '../types'

function renderFullPage(html: string, initialState: Object): string {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Point Two</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
        <link rel="stylesheet" href="//todomvc.com/examples/react/node_modules/todomvc-common/base.css">
        <link rel="stylesheet" href="//todomvc.com/examples/react/node_modules/todomvc-app-css/index.css">
      </head>
      <body>
      <section class="todoapp" id="wrapper">${html}</section>
      <footer class="info">
        <p>You can additionaly install Redux DevTools and use it for inspect events</p>
        <p>Created by <a href="http://github.com/Arilas/">Alex Grand</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/js/bundle.js"></script>
      </body>
    </html>
    `
}

export default function handleRender(req: ExpressRequest, res: ExpressResponse, next: Function) {

  const {configureStore} = require('../../store/configureStore')
  const {configureRoutes} = require('../../client/routes')
  req.store = configureStore({})
  res.renderMarkup = () => {
      // Note that req.url here should be the full URL path from
      // the original request, including the query string.
    match({ routes: configureRoutes(req.store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        res.status(200).send(renderFullPage(renderToString(<Provider store={req.store}><RouterContext {...renderProps} /></Provider>), req.store.getState()))
      } else {
        res.status(404).send('Not found')
      }
    })
    return res;
  }
  next()
}
