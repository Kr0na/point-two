# Point Two - Skeleton isomorphic application with hot-reload, react-router, point-one, express
[![Build Status](https://travis-ci.org/Kr0na/point-two.svg?branch=master)](https://travis-ci.org/Kr0na/point-two)

Point two is an skeleton for those who want to create isomorphic application w/t
waste of time.

It's use:

1. React - 15
2. React-router - 15
3. Express
4. Point-one - 0.4.7
5. Point-reducer-builder - 0.4.2
6. Point-simple-router - 1.0.1
7. Webpack
8. Webpack-dev-server
9. React-hot-loader - 3!

## Structure

```
src/
|-- client/
|   |-- actions/            - action creators related to auth and todo
|   |-- pages/              - all client pages
|   |-- App.js              - Root component with Router
|   |-- client.js           - entry point of client that creates store
|   |-- routes.js           - configureRoutes method for make safe routing
|-- config\index.js         - main config that used for all application
|-- reducer\                - reducers placement
|-- server\
|   |-- middleware\react.js - react middleware that render full page and create store for user request
|   |-- server.js           - starts express server and WebpackDevServer
|-- store\configureStore    - store creaction
|-- webpack\index.js        - webpack config
|-- constants.js            - App constants
static\                     - placement of static files
```
