module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  devServer: {
    host: "localhost",
    hot: true,
    compress: true,
  },
};
