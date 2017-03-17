var gulp      = require('gulp');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var plumber   = require('gulp-plumber');

var folderPaths = {
  scss: './public/sass',
  css: './css',
  partials: './partial',
  script: './js',
  images: './images',
  libs: './js',
  views: './views',
  download: './download'
};

var filePaths = {
  scss: ['./public/sass/style.scss']
}

var server = {
  host: '0.0.0.0',
  port: '9001'
}

gulp.task('webserver', function() {
  gulp.src( '' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      directoryListing: false,
      livereload: {
        enable: true, // need this set to true to enable livereload
        filter: function(fileName) {
          if (fileName.match(/sass$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        }
      }
    }));
});

gulp.task('copy', function() {
    gulp.src([
	folderPaths.css+"**/*/*.*",
	folderPaths.script+"**/*",
	folderPaths.views+"**/*",
	folderPaths.images+"**/*",
	folderPaths.partials+"**/*",
	folderPaths.libs+"**/*/*.*",
	folderPaths.download+"**/*/*.*",
	"./public/*.html"
	])
        .pipe(gulp.dest('./dist/'))
});

gulp.task('openbrowser', function() {
  opn( 'http://localhost:' + server.port);
});

gulp.task('build', ["copy", "deploy"]);

gulp.task('default', ['webserver', 'openbrowser']);
