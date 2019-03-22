var gulp = require('gulp'),
	prefix = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	rename = require('gulp-rename'),
    concat = require('gulp-concat'),
	gcmq = require('gulp-group-css-media-queries'),
	csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps');


// styles
function styles(done) {
    gulp.src('_build/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 4 versions'))
        .pipe(plumber())
        .pipe(gcmq())
        .pipe(csso())
        .pipe(plumber())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
    done();
}

// scripts
function scripts(done) {
    gulp.src([
			'_build/js/jquery*.js',
			'_build/js/!(main)*.js',
			'_build/js/main.js'
		])
        .pipe(sourcemaps.init())
		.pipe(plumber())
        .pipe(concat('main.min.js'))
		.pipe(uglify())
        .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.stream());
    done();
}

// svg
function svg(done) {
    gulp.src('_build/svg/*.svg')
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(rename({basename: 'sprite'}))
		.pipe(gulp.dest('img/'));
    done();
}

// images
function images(done) {
    gulp.src('_build/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('img/'));
	gulp.src('_build/uploads/*')
		.pipe(imagemin())
		.pipe(gulp.dest('uploads/'));
    done();
}

// browsersync
function browser_sync(done) {
    browserSync.init({
        server: "./",
        notify: false
    });
    done();
}

// html
function html(done) {
    gulp.src('./*.html')
		.pipe(browserSync.stream());
    done();
}

// watch
function watch() {
    gulp.watch('_build/scss/**/*.scss', styles);
    gulp.watch('_build/js/*.js', scripts);
    gulp.watch('_build/img/*', images);
    gulp.watch('_build/uploads/*', images);
    gulp.watch('_build/svg/*.svg', svg);
    gulp.watch('./*.html', html);
}

// default
gulp.task("default", gulp.parallel(browser_sync, styles, scripts, svg, images, watch));
