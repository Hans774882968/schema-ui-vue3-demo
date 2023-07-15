const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    port: 8090,
  },
  transpileDependencies: true,
});
