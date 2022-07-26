const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const app = express()
const config = require('./build/base.config.js')
const complier = webpack(config)
app.use(webpackDevMiddleware(complier))
app.listen(8888,()=>{
    console.log('server run in port 8888')
})