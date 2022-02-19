const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@outline-blur-size': '0',
              '@outline-width': '2px',
              '@outline-color': '@primary-color',
              '@outline-fade': '50%',
              '@link-focus-outline': '2px',
              '@primary-color-outline': '#000000'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};