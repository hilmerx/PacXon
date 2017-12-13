let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()


gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false,
    open: false
  })
})

// watch function

gulp.task('watch', ['browserSync'], () => {

  watch('./app/css/**/*.css', () => { gulp.start('cssInject') })
  watch('./app/js/**/*.js', () => {
    console.log("hej")
    browserSync.reload()
  } )
  watch('./app/index.html', browserSync.reload )

})

// cssInject function
gulp.task('cssInject', () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})
