var gulp = require("gulp"),
    gulpLoadPlugins = require('gulp-load-plugins'),
    Browsersync = require('browser-sync').create(),
    reload = Browsersync.reload;
var concat = require("gulp-concat");
const $ =  gulpLoadPlugins();
gulp.task("less", function() {
	return gulp.src([
		'./less/reset.less',
		'./less/font.less',
		'./less/flex.less',
		'./less/base.less',
		'./less/list.less',
		'./less/card.less',
		'./less/tabs.less',
		'./less/widgets.less'])
	       .pipe($.concat("phantomui.css"))
	       .pipe($.less())
	       .pipe($.autoprefixer())
	       .pipe(gulp.dest("./build"));
});
gulp.task("js", function() {
	return gulp.src([
		'./src/core/base/class.js',
		'./src/core/base/base.js',
		'./src/core/widget/widget.js',
		'./src/core/widgets/router/router.js',
		'./src/core/widgets/modal/pannel.js',
		'./src/core/widgets/modal/modal.js',
		'./src/core/widgets/offCanvas/offCanvas.js',
		'./src/core/widgets/pullRefresh/pullRefresh.js',
		'./src/core/widgets/swiper/swiper.js',
		'./src/core/widgets/tabs/tabs.js'])
		.pipe($.concat("phantomui.js"))
		.pipe($.jshint(".jshintrc"))
		.pipe($.jshint.reporter('default'))
		.pipe($.uglify())
		.pipe(gulp.dest("./build"));
});
gulp.task("clean", function() {
	//del(['./styles/**/*.css']);
});
gulp.task('release', ["less", "js"]);

gulp.task("build", ["less", "js"], function() {
	console.log("文件打包完毕");
});
gulp.task('server', ['less', 'js'], function() {
    Browsersync.init({
        server: {
            baseDir: "./src/widgets/router/test/"
        }
    });
    //gulp.watch("./lib/styles/less/*.less", ['less']);
    gulp.watch("*.html").on("change", reload);
});
