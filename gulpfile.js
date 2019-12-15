const gulp = require("gulp");
const watch = require("gulp-watch");
const prefixer = require("gulp-autoprefixer");
const uglify = require('gulp-uglify');
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html', 
        js: 'src/js/*.js',
        style: 'src/styles/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

const config = {
    server: {
        baseDir:"./dist"
    },
    //tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "LiveServer"
};

gulp.task('html:build', () => {
   return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('js:build', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
    return gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
         .pipe(gulp.dest(path.build.fonts))
});

// Watcher
gulp.task('watch', function(){
    watch('src/**/*.html', gulp.series('html:build'));

     watch('src/styles/**/*.scss', gulp.series('style:build'));

     watch('src/js/**/*.js', gulp.series('js:build'));

     watch('src/img/**/*.*', gulp.series('image:build'));

     watch('src/fonts/**/*.*', gulp.series('fonts:build'));
});
// server
gulp.task('webserver', function () {
    return browserSync(config);
});
// Clean
gulp.task('clean', function (cb) {
    return rimraf(path.clean, cb);
});
gulp.task('build', gulp.parallel('html:build', 'js:build', 'image:build', 'style:build', 'fonts:build'));

gulp.task('default', gulp.parallel('build', 'watch', 'webserver'));

