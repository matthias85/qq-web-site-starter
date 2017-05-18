// require('./components/layout/layout');
// require('./components/icons/icons');
//
// require('./components/header/header');
// require('./components/sidebar/sidebar');

// Require font-files
require.context("./fonts", true, /^\.\/.*\.*$/);

// Require assets-files
require.context("./assets", true, /^\.\/.*\.*$/);

// Require js-files
require.context("./components", true, /^\.\/.*\.js$/);
