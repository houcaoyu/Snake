var gulp = require('gulp'),
concat = require('gulp-concat'),
livereload = require('gulp-livereload');


//合并 js
gulp.task('concatjs',function() {
    return gulp.src('src/*.js') //需要操作的文件
        .pipe(concat('index.js')) //合并所有js到main.js
        .pipe(gulp.dest('build')) //输出到文件夹
});
gulp.task('copy',function() {
    return gulp.src('node_modules/livereload-js/dist/livereload.js') //需要操作的文件
        .pipe(gulp.dest('build')) //输出到文件夹
});
gulp.task('watch', function() {
  livereload.listen();
  var watcher=gulp.watch('src/*.js', ['concatjs']);
  watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  livereload.changed(event.path)
});
});
