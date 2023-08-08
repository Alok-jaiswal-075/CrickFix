const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'http://127.0.0.1:5000',
    changeOrigin: true
}

module.exports = function(app) {

  app.use(
    '/api/players',
    createProxyMiddleware(proxy)
  );
  app.use(
    '/api/teams',
    createProxyMiddleware(proxy)
  );
  app.use(
    '/api/matches',
    createProxyMiddleware(proxy)
  );

  


  
};