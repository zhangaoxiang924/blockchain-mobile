const proxy = require('http-proxy-middleware')

/**
 * 不添加hash的图片 src/img-not-hash
 * 不进行代码检测与压缩的JS src/js-not-lint
 * ESLint忽略文件 .eslintignore
 * Stylelint忽略文件 .stylelintrc -> ignoreFiles
 * publicPath (1:此处publicPath;   2:libs/scss/util-pc或libs/scss/util-m;   3:自定义JS中加载的图片--src/js/public/public)
 */
module.exports = {
    host: '192.168.1.7',
    port: '8060',
    publicPath: 'http://m.huoxing24.com',
    vendors: [],
    proxy: [
        proxy(['/*/*/*'], {
            target: 'http://m.huoxing24.com',
            // target: 'http://47.52.210.208:81',
            changeOrigin: true
        })
    ]
}
