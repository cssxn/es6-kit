var gulp = require("gulp");
var connect = require("gulp-connect");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

var src = {
    app:"src/app.js",
    controllers:"src/controllers/**/*.js",
    services:"src/services/**/*.js",
    models:"src/models/**/*.js"
}

gulp.task("connect",function(){
    connect.server({
        base:"http://localhost",
        port:"9000",
        root:"dist",
        livereload:true
    });
})

gulp.task("es6", function () {
    browserify("./src/app.js")
    .transform(babelify,{presets: ["es2015"]})
    .bundle()
    .pipe(source("all.js"))
    .pipe(gulp.dest("dist/scripts"))
    .pipe(connect.reload());
});

gulp.task("build:html",function(){
    gulp.src("src/index.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("watch",["es6"],function(){
    gulp.watch(["src/**/*.js"],["es6"]);
    gulp.watch(["src/**/*.html"],["build:html"]);
});


gulp.task("default",["build:html","watch","connect"],function(){
});
