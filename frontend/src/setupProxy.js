const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api',{
            // target: 'http://39.106.5.232:8000/',
            target: 'http://39.106.5.232',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }}
        )
    );
};