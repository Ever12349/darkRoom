const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const webpack = require("webpack");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;


module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    };
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];

  },
  chainWebpack: config => {
    if (IS_PROD) {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        });

      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);

      const cdn = {
        // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
        css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
        js: [
          "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
          "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
          "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
          "//unpkg.com/axios@0.19.0/dist/axios.min.js",
          "//unpkg.com/element-ui@2.10.1/lib/index.js"
        ]
      };

      // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
      config.plugin("html").tap(args => {
        // html中添加cdn
        args[0].cdn = cdn;
        return args;
      });

      config
        .plugin("ignore")
        .use(
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
        );

      return config;

    }
  },
  css: {

    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
}
