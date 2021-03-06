const gulp = require('gulp');
const paths = {
	src: './dist',
	dest: './docs/css'
}

const task = (cb) => {
    gulp.src([`${paths.src}/*.woff`])
		.pipe(gulp.dest(paths.dest));
	cb();
}

gulp.task('docs-icons', task);
module.exports = task;
