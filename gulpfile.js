"use strict";

const gulp = require("gulp");
const exec = require("gulp-exec");
const cp = require("child_process");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// gulp.task("css", () => {
// 	return gulp.src( '_assets/css/**/*.css' )
// 		.pipe( autoprefixer() )
// 		.pipe( gulp.dest( './docs/css/' ) )
// 		.pipe(browserSync.stream({ match: '**/*.css' }));
// });

gulp.task("scss", () => {
	return gulp.src('_assets/scss/**/*.scss')
		.pipe(sass(/*{outputStyle: "compressed"}*/).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./docs/css/'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("js", () => {
	return gulp.src('_assets/scripts/**/*.js')
		.pipe(gulp.dest('./docs/scripts/'))
		.pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task("build-jekyll", () => {
	return gult.src(["./*.html", "./_layouts/**/*.html", "./posts/**/*.markdown"])
		.pipe(exec("jekyll build"))
		.pipe(exec.reporter());
});

gulp.task("jekyll", () => {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], {stdio: "inherit", shell: true});
});

sass.compiler = require('node-sass');

gulp.task('sass2', function () {
	return gulp.src('_assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('_assets/css'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("watch", () => {
	browserSync.init({
		server: {
            baseDir: "./docs/"
		}
	});

	gulp.watch("_assets/scss/**/*.scss", gulp.series("scss"));
	gulp.watch("_assets/scripts/**/*.js", gulp.series("js"));
	
	gulp.watch([
		"./*.html",
		"./_includes/*.html",
		"./_layouts/*.html",
		"./_posts/**/*.*"
	]).on("change", gulp.series("jekyll", "scss", "js"));

	gulp.watch('docs/**/*.html').on('change', browserSync.reload);
	gulp.watch('docs/**/*.js').on('change', browserSync.reload);
});

gulp.task("default", gulp.series("scss", "js", "watch"));