const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)


// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000, (err) =>{
    if(err) throw err;
    console.log('Proof of Existence is ready at localhost:3000')
  })
})
