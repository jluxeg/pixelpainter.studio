var gulp = require('gulp');
var sass = require('gulp-sass')(require('dart-sass'));
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var resolveDependencies = require('gulp-resolve-dependencies');
var eslint = require('gulp-eslint');


gulp.task('styles', function(cb){
	return gulp.src('./src/scss/styles.scss')
	.pipe(concat('bundle.scss'))
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefix('last 2 version'))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.reload({
		stream: true
	}));
	cb();
});

gulp.task('scripts', function(cb){
	return gulp.src('./src/js/scripts.js')
	.pipe(eslint())
	.pipe(eslint.formatEach())
	.pipe(eslint.failAfterError())
	.pipe(resolveDependencies({
		pattern: /\* @requires [\s-]*(.*\.js)/g
	}))
	.pipe(concat('bundle.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.reload({
		stream: true
	}));
	cb();
});

gulp.task('html', function(cb){
	return gulp.src('./dist/index.html')
	.pipe(browserSync.reload({
		stream: true
	}));
	cb();
});

gulp.task('browserSync', function(cb){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
	cb();
});

gulp.task('watch', function(){
	gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
	gulp.watch('./dist/index.html', gulp.series('html'));
});

gulp.task('build', gulp.series('styles', 'scripts'));

gulp.task('default', gulp.series('browserSync', 'watch'));