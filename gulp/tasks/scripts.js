const uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    scriptsPATH = {
        "input": "./dev/static/js/",
        "output": "./build/static/js/"
    },
    babel = require('gulp-babel');

module.exports = function () {
    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/swiper/swiper-bundle.min.js',
            ])
            .pipe(concat('libs.min.js'))
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/swiper/swiper-bundle.min.js',
            ])
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('js:build', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
    });

    $.gulp.task('js:build-min', () => {
        $.gulp.src([scriptsPATH.input + 'jquery-3.3.1.min.js'])
            .pipe($.gulp.dest(scriptsPATH.output));

        return $.gulp.src([
            scriptsPATH.input + 'main.js',
            scriptsPATH.input + 'map.js',
        ])
            .pipe(babel({
                presets: ['@babel/env', 'minify']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
    });
};
