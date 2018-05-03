var gulp = require('gulp'),
	prefix = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglifyjs'),
	sass = require('gulp-sass'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	rename = require('gulp-rename'),
	gcmq = require('gulp-group-css-media-queries'),
	csso = require('gulp-csso');


// Static Browser:
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: "./",
        notify: false
    });
});



// Styles Task
gulp.task('styles', function(){
	gulp.src('_build/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 4 versions'))
		.pipe(gcmq())
        .pipe(csso())
		.pipe(plumber())
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.stream());
});


// JS Task
gulp.task('scripts', function(){
	gulp.src([
			'!_build/js/modernizr*.js',
			'_build/js/jquery*.js',
			'_build/js/!(main)*.js',
			'_build/js/main.js'
		])
		.pipe(plumber())
		.pipe(uglify('main.min.js', {
			outSourceMap: true
		}))
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.stream());
});




// Image Task
gulp.task('image', function(){
	gulp.src('_build/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('img/'));
	gulp.src('_build/uploads/*')
		.pipe(imagemin())
		.pipe(gulp.dest('uploads/'));
});



// SVG Task
gulp.task('svg', function(){
	gulp.src('_build/svg/*.svg')
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(rename({basename: 'sprite'}))
		.pipe(gulp.dest('img/'));
});




// Watch Task
gulp.task('watch', function() {
	gulp.watch('_build/scss/**/*.scss', ['styles']).on('change', browserSync.reload);
	gulp.watch('_build/js/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch('_build/img/*', ['image']);
	gulp.watch('_build/uploads/*', ['image']);
	gulp.watch('_build/svg/*.svg', ['svg']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});




gulp.task('default', ['styles', 'scripts', 'image', 'svg', 'watch', 'serve']);
