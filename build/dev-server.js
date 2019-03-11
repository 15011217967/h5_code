require('./check-versions')()
const Koa = require('koa');
const serve = require('koa-static');
const config = require('./config-base');

const app = new Koa();

const path = __dirname.substring(0,__dirname.length-6);

app.use(serve(path+"/dist"));


module.exports = app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:'+config.port;
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
