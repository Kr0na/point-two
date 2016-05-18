/**@flow*/

const env = process.env.NODE_ENV || 'development'

export default {
  env,
  debug: env !== 'production',
  staticPath: __dirname + '/../../static',
  server: {
    instanceHost: 'localhost',
    instancePort: 7070
  },
  hotLoad: {
    hotHost: 'localhost',
    hotPort: 7071
  }
}
