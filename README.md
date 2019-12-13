# AngularJS Movies Test for GFI 

Project running under gulp serve, bower and npm with the omDB movie api to test. Angular 1.414 and angular 1.414 router. 

The entire output AngularJS project is located into the
files: `index.html`, 

## What do it contents?

[AngularJS](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.14/angular.min.js) with [UI-Router](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.14/angular-route.js) to manage routing with 
[$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache) to encapsulate all HTML templates in the app JavaScript bundle for production environment.

[Bower](https://bower.io) with [Wiredep](https://www.npmjs.com/package/wiredep) to automate vendor dependencies
injecting into the app scripts and styles.

A bunch of [Gulp](https://gulpjs.com) tasks to manage templates, scripts, styles, assets, translations, source maps, and
to prepare the app for production deployment.

[Browsersync](https://browsersync.io) for live reloading and synchronised testing across browsers and devices.

[Babel](https://babeljs.io) to transpile ES2015 and beyond to vanilla JavaScript.

[ESLint](https://eslint.org) with AngularJS [plugin](https://www.npmjs.com/package/eslint-plugin-angular) to lint your
code online and keep it clean.

[Sass](https://sass-lang.com) compiler with [Autoprefixer](https://autoprefixer.github.io) and
[Normalize.css](https://necolas.github.io/normalize.css).

## Quick start

AngularJS Movies Test for GFI is located in **Node.js** environment, so you need to install Node.js from
[official website](https://nodejs.org) or use [NVM](https://github.com/creationix/nvm)
([NVM for Windows](https://github.com/coreybutler/nvm-windows)) first.   

**Caution! This project still uses Gulp 3 which is not supported for newest node versions!

After setting up Node.js you can use **npm** or **yarn** to install
[Bower](https://bower.io) and [Gulp](https://gulpjs.com) globally:

```sh
npm install -g bower gulp-cli
```

### Install

Clone repository from GitHub:

```sh
git clone https://github.com/racortes/GFI_MoviesTestAngularJS.git <myLocalProject>
```

Jump into `myLocalProject` directory and install dependencies from npm registry:

```sh
cd MyProject
npm install
```

Install dependencies from Bower registry:

```sh
bower install
```

And that's all!

### Use

Execute Gulp serving task to check if everything is fine:

```sh
gulp serve
```

Your default browser will be launched at `http://localhost:3000` serving project (if port is available)


### Most used gulp tasks

* `gulp serve` or `npm start` - Launch local project server, start watching for all changes.
* `gulp default` or `npm run build` - Clean used directories and build production version ready to deploy and made the bundle package.

### Other gulp tasks

* `gulp build` - Build production version ready to deploy.
* `gulp build-app` - Build production version of app only, without assets.
* `gulp clean` - Clean distribution and temporary directories.
* `gulp fonts` - Copy and flatten fonts from Bower packages to distribution dir.
* `gulp inject` - Inject scripts and styles into HTML entry.
* `gulp inject:reload` - Start `inject` task and launch Browsersync reloading after.
* `gulp locales` - Build locales.
* `gulp locales-angular` - Build Angular locales only.
* `gulp locales-angular:dist` - Build Angular locales only to distribution dir.
* `gulp locales:dist` - Build locales to distribution dir.
* `gulp locales:watch` - Build locales and watch for changes.
* `gulp other` - Copy various not handled stuff to distribution dir.
* `gulp partials` - Create template cache from HTML partials.
* `gulp scripts` - Build scripts.
* `gulp scripts:clean` - Clean temporary scripts.
* `gulp scripts:watch` - Build scripts and watch for changes.
* `gulp serve:dist` or `npm run start:dist` - Build production version and serve it using Browsersync.
* `gulp styles` - Build styles.
* `gulp styles:watch` - Build styles and watch for changes.
* `gulp watch` - Build project and watch for all changes.

## Npm common tasks

* `npm run docs:gulp` - Make markdown file containing Gulp tasks description as in the list above.
* `npm run lint` - Lint JavaScript files.
* `npm run update:bower` - Update dependencies versions in `bower.json` to the latest.
* `npm run update:dev` - Update dependencies versions in `package.json` to the latest.

After updating dependencies versions you actually need to install them, do it with the following commands:

```sh
bower install
npm install
```

### Enjoy the project and your favourite movies!
