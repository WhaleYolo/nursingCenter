module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    outputDir: 'dist',
    assetsDir: 'assets',
}