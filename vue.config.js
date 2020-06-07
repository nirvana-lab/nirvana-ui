module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.PROXY || 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js');
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
};
