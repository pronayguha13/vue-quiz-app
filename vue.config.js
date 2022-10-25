const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/vue-quiz-app/" : "/",
  transpileDependencies: true,
});
