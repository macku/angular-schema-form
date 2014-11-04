var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('minify', function() {
  gulp.src([
    './src/module.js',
    './src/sfPath.js',
    './src/services/*.js',
    './src/directives/*.js'
    ])
  .pipe(concat('schema-form.min.js'))
  .pipe(uglify({
	outSourceMap: 'schema-form.min.js.map'
  }))
  .pipe(gulp.dest('./dist/'));
});
