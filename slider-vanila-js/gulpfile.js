const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const browserSync = require('browser-sync').create();

//styles
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// scripts
// const gulpWebpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const webpackConfig = require('./webpack.config.js')

const paths = {
	root: './build',

	templates: {
		pages: './src/views/pages/*.pug',
		src: 'src/views/**/*.pug',
		dest: 'build/assets/'
	},

	styles: {
		src: 'src/scss/**/*.scss',
		dest: 'build/assets/css/'
	},

	scripts: {
		src: 'src/js/**/*.js',
		dest: 'build/assets/js/'
	},

	images: {
		src: 'src/img/**/*.*',
		dest: 'build/assets/img/'
	}
}

// pug
function templates() {
	return gulp.src('./src/views/pages/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(paths.root));
};

// scss
function styles() {
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
};

// webpack
function scripts() {
	return gulp.src('src/js/index.js')
		.pipe(webpack(webpackConfig, compiler))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest));
}

// просто переносим картинки
function images() {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest))
}

// очистка
function clean() {
	return del(paths.root)
}

// следим за исходниками src
function watch() {
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.templates.src, templates)
	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.images.src, images)
}

// следим за build и обновляем страницу в браузере
function server() {
	browserSync.init({
		server: paths.root,
		notify: false,
		open: false,
		cors: true,
		ui: false
	});

	browserSync.watch(paths.root + '/**/*.*', browserSync.reload)
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.watch = watch;

// режим разработки
gulp.task('default', gulp.series(
	clean,
	gulp.parallel(templates, styles, scripts, images),
	gulp.parallel(watch, server)

))

// сборка проекта
gulp.task('build', gulp.series(
	clean,
	gulp.parallel(templates, styles, scripts, images),
))