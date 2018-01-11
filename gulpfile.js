var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	htmlMin = require('gulp-htmlmin'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();


// vars to handle file pathing
var src_scss = './src/scss/**/*.scss',
	dist_css = './dist/css',
	src_js = './src/js/**/*.js',
	dist_js = './dist/js',
	src_index = './src/index.html',
	dist_index = './dist/',
	src_html = './src/**/*.html',
	dist_html = './dist/';




// Browser-sync for live reloads
// ---
// Set up a test server and open in browser

gulp.task('serve', function(){
	browserSync.init({
		server: './dist/'
	});
});


// Html move task (should minify for final build, currently just clones to ./dist/)
// ---
// watches directory for changes of desired files

gulp.task('html', function() {
  return gulp.src( src_index )
    // .pipe(htmlMin({
    // 	collapseWhitespace: true
    // }))
    .pipe(gulp.dest( dist_index ))
    .pipe(browserSync.stream());
});


// Styles task
// ---
// Compiles Sass(.scss), generates sourcemaps, minifies outputted css files before sending 
// them to desired destination folder 

gulp.task('styles', function(){

	return gulp.src( src_scss )
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest( dist_css ))
		.pipe(browserSync.stream());

});


// Scripts task
// ---
// Minifies js files and sends them to desired destination folder 

gulp.task('scripts', function(){

	return gulp.src( src_js )
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(gulp.dest( dist_js ))
		.pipe(browserSync.stream());

});


// Watch task
// ---
// watches directory for changes, and applies the Styles and Scripts tasks stated above

gulp.task('watch', function(){

	gulp.watch( src_scss, ['styles']);
	gulp.watch( src_js, ['scripts']);
	gulp.watch( src_index, ['html']).on('change', browserSync.reload);

});


// Run task (default)
// ---
// run default gulp task with desired tasks

gulp.task('default', ['serve', 'watch']);

