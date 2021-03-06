const {mix} = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({
	processCssUrls: false
});

//--  Style Files --//
// ========================= //
mix.sass('resources/assets/sass/app.scss', 'public/assets/css');
mix.sass('resources/assets/sass/login/login.scss', 'public/assets/css/login/login.css');

mix.styles([
	'node_modules/animate.css/animate.min.css',
], 'public/assets/css/animations.css');

//--  Javascript Files --//
// ========================= //
mix.js('resources/assets/js/pages/tickets.js', 'public/assets/js/pages/tickets.js')

//--  Combine Files --//
// ========================= //
mix.combine([
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/foundation-sites/dist/js/foundation.min.js',
	'node_modules/smoothstate/jquery.smoothState.min.js',
	'resources/assets/js/foundation/foundation.reveal.min.js',
	'resources/assets/js/animations.js'
], 'public/assets/js/app.js');


//--  React Files --//
// ========================= //
//-- Date Controls --//
mix.react([
	'resources/assets/js/react/components/dates/req-eta.jsx',
	'resources/assets/js/react/components/dates/dev-eta.jsx',
	'resources/assets/js/react/components/dates/qa-eta.jsx',
	'resources/assets/js/react/components/dates/uat-eta.jsx',
	'resources/assets/js/react/components/dates/prod-eta.jsx',
], 'public/assets/js/react/components/date-controls.js');

//-- Components --//
mix.react([
	'resources/assets/js/react/app.jsx',
], 'public/assets/js/react/app-components.js');

//-- Admin --//
mix.react('resources/assets/js/react/pages/admin/projects/index.jsx', 'public/assets/js/react/pages/admin/projects.js');
mix.react('resources/assets/js/react/pages/admin/users/index.jsx', 'public/assets/js/react/pages/admin/users.js');

//-- Public Facing --//
mix.react('resources/assets/js/react/pages/public/projects/index.jsx', 'public/assets/js/react/pages/public/projects.js');
