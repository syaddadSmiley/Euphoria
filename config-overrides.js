// const webpack = require('webpack');
module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
      fs: false,
      // url: require.resolve('url'),
      // assert: require.resolve('assert'),
      // crypto: require.resolve('crypto-browserify'),
      // util: require.resolve('util'),
      // stream: require.resolve('stream-browserify'),
      // vm: require.resolve('vm-browserify'),
    };

    // config.plugins.push(
    //   new webpack.ProvidePlugin({
    //     process: 'process/browser',
    //     Buffer: ['buffer', 'Buffer'],
    //   })
    // );

    return config;
};