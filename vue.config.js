const isServer = process.argv.includes("--server");
console.log("isServer: ", isServer);
const webpackNodeExternals = require("webpack-node-externals");

const platfortmChainWebpack = isServer
  ? (config) => {
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    }
  : (config) => {
      config.plugin("html").tap((args) => {
        args[0].minify = false;
        return args;
      });
    };

function chainWebpack(config) {
  config.plugin("define").tap((options) => {
    options[0]["prosecc.isClient"] = !isServer;
    options[0]["prosecc.isServer"] = isServer;
    return options;
  });
  platfortmChainWebpack(config);
}

const configureWebpack = isServer
  ? {
      target: "node",
      entry: {
        app: "./src/entry-server.js"
      },
      output: {
        libraryTarget: "commonjs2",
        libraryExport: "default",
        filename: "js/server-bundle.js"
      },
      optimization: {
        splitChunks: false
      },
      externals: [webpackNodeExternals()]
    }
  : {
      entry: {
        app: "./src/entry-client.js"
      }
    };

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack,
  configureWebpack
});

// module.exports = {
//   transpileDependencies: true,
//   chainWebpack
// }
