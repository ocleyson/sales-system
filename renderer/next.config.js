const withCss = require('@zeit/next-css');

module.exports = withCss({
    webpack: (config) => {
      config.target = 'electron-renderer';
  
      config.externals.push({'sqlite3':'commonjs sqlite3',});
  
      return config
    },
});
