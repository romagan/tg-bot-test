module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/tg-bot-test/' : '/',
    configureWebpack: {
        devServer: {
            compress: true,
            historyApiFallback: true,
            disableHostCheck: true,
        }
    }
}