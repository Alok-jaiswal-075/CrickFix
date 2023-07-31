const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://backend-crickfix.onrender.com',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/hello',
    createProxyMiddleware(proxy)
  );
  app.use(
    '/players',
    createProxyMiddleware(proxy)
  );
  app.use(
    '/teams',
    createProxyMiddleware(proxy)
  );
  app.use(
    '/matches',
    createProxyMiddleware(proxy)
  );

  


  
};