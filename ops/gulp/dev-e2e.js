const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const browserSync = require('browser-sync').create();
const siteRoot = 'docs/_site';
const cucumber = require('gulp-cucumber');

gulp.task('cucumber', () => {
  return gulp.src('features/*').pipe(cucumber({
    'steps': '*features/steps/*.js',
    'support': '*features/support/*.js',
    'format': 'summary'
  }));
});

gulp.task('startBrowserSync', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    open: false,
    server: {
      baseDir: siteRoot
    }
  });

});

gulp.task('closeBrowserSync', () => {
  // stop server, cleanup events etc
  browserSync.cleanup();

  // Exit the process
  process.exit();
})

const task = (cb) => {
  gulpSequence('dev-jekyll', ['startBrowserSync', 'dev-watch'], 'docs-build', 'docs-site', 'cucumber', 'closeBrowserSync', cb);
}

gulp.task('dev-e2e', task);
module.exports = task;