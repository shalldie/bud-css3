var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');   //提示
var plumber = require('gulp-plumber');  //错误输出

var paths = {
    lessFrom: './css/**/*.less',
    lessTo: './css'
};

gulp.task('less', function () {
    return gulp.src(paths.lessFrom)
        .pipe(plumber({ errorHandler: notify.onError('Error:<%=error.message%>') }))
        .pipe(less({ compress: false }))
        .pipe(gulp.dest(paths.lessTo));
});

gulp.task('watch', function () {
    gulp.watch(paths.lessFrom, ['less']);
});