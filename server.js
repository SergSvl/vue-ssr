const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const port = 3000;
const template = fs.readFileSync('./dist/index.html', 'utf-8');
const { renderToString } = require('vue/server-renderer');
const serverBundle = require('./dist/js/server-bundle.js');

server.use('/css', express.static(path.resolve(__dirname, './dist/css')));
server.use('/js', express.static(path.resolve(__dirname, './dist/js')));
server.use('/img', express.static(path.resolve(__dirname, './dist/img')));
server.use('/favicon.ico', express.static(path.resolve(__dirname, './dist/favicon.ico')));

server.get('*', function(request, response) {
  serverBundle({ url: request.url }).then(({ app, store }) => {
    // console.log('app: ', app);
  
    renderToString(app).then(
      html => {
        console.log('store: ', store);
        const initialState = JSON.stringify(store.state);
        const page = template
          .replace('<!--ssr-app-->', html)
          .replace('<!--ssr-state-->', `<script>window.INITIAL_STATE = ${initialState};</script>`);
        response.end(page);
      },
      err => {
        console.log('Server error: ', err);
        response.end('error');
      }
    );
  });
});

server.listen(port);
console.log('Server started at port: ', port);