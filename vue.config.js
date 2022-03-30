const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath:"",
    //关闭语法检查
    lintOnSave: false,

    devServer: {
        // host:"localhost",
        // port:"8080",
        // 就没生效
        // proxy: {
        //     '/api': { //"/api"是请求前缀，加前缀vue会认为你走代理，不加就不走代理
        //         target: 'http://127.0.0.1:8888/',
        //         pathRewrite: {"/^api": ''},//把前缀替换为空字符
        //         changeOrigin: true  //true代表跨域伪装，false表示原地址访问，默认为true
        //     },
        // },
    }
})
