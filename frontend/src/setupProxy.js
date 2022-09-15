const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(createProxyMiddleware('/forward', {
   	target: "http://localhost:4800",  // 就是上面示例接口的 ip地址和端口号
   	changeOrigin: true,
   	pathRewrite: { "^/forward": "" }
   }))
}