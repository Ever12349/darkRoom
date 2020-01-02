const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// const IS_PROD = true;
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

// const AliOssPlugin = require("webpack-oss");

// const format = AliOssPlugin.getFormat();

// var PostCompilePlugin = require('webpack-post-compile-plugin')
// var TransformModulesPlugin = require('webpack-transform-modules-plugin')

const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const webpack = require("webpack");

// const CompressionWebpackPlugin = require("compression-webpack-plugin");

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// const path = require('path')
// console.log(!IS_PROD, 'IS_PROD')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // // // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  // productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  filenameHashing: !IS_PROD,
  pwa: {},
  // autoOpenBrowser: !IS_PROD,
  configureWebpack: config => {
    // console.log(config.output, 'configconfig')
    if (IS_PROD) {
      // delete config.output.chunkFilename
    }
    if (IS_PROD) {
      config.externals = {
        vue: "Vue",
        // "element-ui": "ELEMENT",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        // "cube-ui": "Cube",
        "socket.io": 'io',
        // "mint-ui": 'mintUi',
        "crypto-js": 'CryptoJS',
        // "moment": "moment",
        // "core-js":"core"
      };

    }
    const plugins = [];
    if (IS_PROD) {
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8
      //   })
      // );
      // plugins.push(new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_debugger: true,
      //       drop_console: true
      //     },
      //     mangle: {
      //       safari10: true
      //     }
      //   }
      // }));
      plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/));

    }
    // if (IS_PROD) {
    //   plugins.push(
    //     new AliOssPlugin({
    //       accessKeyId: process.env.ACCESS_KEY_ID,
    //       accessKeySecret: process.env.ACCESS_KEY_SECRET,
    //       region: process.env.REGION,
    //       bucket: process.env.BUCKET,
    //       prefix: process.env.PREFIX,
    //       exclude: /.*\.html$/,
    //       format
    //     })
    //   );
    // }

    if (IS_PROD) {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            // common: {
            //   name: "chunk-common",
            //   chunks: "initial",
            //   minChunks: 2,
            //   maxInitialRequests: 5,
            //   minSize: 0,
            //   priority: 1,
            //   reuseExistingChunk: true,
            //   enforce: true
            // },
            // vendors: {
            //   name: "chunk-vendors",
            //   test: /[\\/]node_modules[\\/]/,
            //   chunks: "initial",
            //   priority: 2,
            //   reuseExistingChunk: true,
            //   enforce: true
            // },
            // elementUI: {
            //   name: "chunk-elementui",
            //   test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            //   chunks: "all",
            //   priority: 3,
            //   reuseExistingChunk: true,
            //   enforce: true
            // },
            // echarts: {
            //   name: "chunk-echarts",
            //   test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            //   chunks: "all",
            //   priority: 4,
            //   reuseExistingChunk: true,
            //   enforce: true
            // },
            // cubeui: {
            //   name: "chunk-cubeui",
            //   test: /[\\/]node_modules[\\/]cube-ui[\\/]/,
            //   chunks: "all",
            //   priority: 5,
            //   reuseExistingChunk: true,
            //   enforce: true
            // },
            // mintui: {
            //   name: "chunk-cubeui",
            //   test: /[\\/]node_modules[\\/]mint-ui[\\/]/,
            //   chunks: "all",
            //   priority: 6,
            //   reuseExistingChunk: true,
            //   enforce: true
            // }
          }
        },
        // minimizer:[new UglifyJsPlugin()]
      };
    }
    // const ppppppp = path.resolve(__dirname, 'public/index.html')
    // console.log(ppppppp)
    // plugins.push(new HtmlWebpackPlugin({
    //   templateParameters: function () { /* omitted long function */ },
    //   template: 
    // }))
    config.plugins = [...config.plugins, ...plugins];

  },
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"));

    config.plugin("html").tap(args => {
      args[0].is_prod = IS_PROD;
      return args;
    });


    if (IS_PROD) {
      config.entry('app').clear().add('./src/main-prod.js')
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

      // config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
      //   {
      //     analyzerMode: "static"
      //   }
      // ]);

      const cdn = {
        // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
        css: [
          // "//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css",
          // "https://unpkg.com/cube-ui/lib/cube.min.css",
          // "https://unpkg.com/mint-ui/lib/style.css"
        ],
        js: [
          "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
          "https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.2/vuex.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js",
          // "https://unpkg.com/cube-ui/lib/cube.min.js",
          // "https://unpkg.com/mint-ui/lib/index.js",
          "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js",
          "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js",
          // "https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js",
          // "https://lib.baomitu.com/core-js/2.6.11/library.min.js"
          // "//unpkg.com/element-ui@2.10.1/lib/index.js"
        ]
      };

      // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
      config.plugin("html").tap(args => {
        // html中添加cdn
        // console.log(args, 'args')
        args[0].cdn = cdn;
        return args;
      });


      // config
      //   .plugin("ignore")
      //   .use(
      //     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      //   );


      // // config.optimization
      // // console.log('config.optimization', config.optimization.splitChunks.set)
      // config.optimization.delete('splitChunks')
      // // config.optimization.splitChunks(value => {
      // //   console.log(value, 'valuevalue')
      // //   return value
      // // })
      // // for(let key in config.optimization){
      // //   console.log(key)
      // // }
      return config;

    } else {
      config.entry('app').clear().add('./src/main-dev.js')
    }


  },
  css: {
    sourceMap: !IS_PROD,
    extract: IS_PROD,
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
