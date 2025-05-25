module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules[1].oneOf.unshift({
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: /node_modules\/bpk-component-calendar/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['react-app'],
          },
        });
        return webpackConfig;
      },
    },
  };
  