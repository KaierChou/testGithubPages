module.exports = {
  productionSourceMap: false,
  baseUrl: '/',
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
