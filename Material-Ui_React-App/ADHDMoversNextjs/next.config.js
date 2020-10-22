// next.config.js. Установка плагинов. https://www.npmjs.com/package/next-optimized-images
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([//будут использоваться эти плагины по оптимизации картинок jpg и png
  [optimizedImages, {
    /* config for next-optimized-images */
  }],

  // your other plugins here

]);