const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'http://39.106.5.232:8000/',
            target: 'http://localhost:8000/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }
        })
    );
};