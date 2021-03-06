require('dotenv').config();
const express = require('express');
const proxy = require('http-proxy-middleware');
require('isomorphic-fetch');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const API_URL = process.env.API_URL;

console.log(API_URL);

const app = express();

app.use(express.static('public'));

const apiProxy = proxy({
  target: API_URL,
  changeOrigin: true
});

app.use('/auth', apiProxy);
app.use('/graphql', apiProxy);

if (IS_PROD) {
  const serverRenderer = require('./build/ssr').default;

  app.use(express.static('build'));
  app.use(serverRenderer());
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('./webpack.config');

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
      serverSideRender: true
    })
  );
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});
