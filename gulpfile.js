//打包文件
const {src,dest} = require("gulp");
const csso = require('gulp-csso');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

//样式文件入口路径
const stylesPath = [
    'styles/**/*.css'
];
//js文件入口路径
const javaScriptPath = 'js/test.js';

//样式文件输出的路径
const stylesDist = 'static/styles';
//js文件输出的路径
const javaScriptDist = 'static/js';

//压缩CSS
function compressCss(){
    return src(stylesPath)
            .pipe(csso())
            .pipe(dest(stylesDist));
}

//打包JS
function buildJs(){
    return browserify(javaScriptPath)
            .transform("babelify",{presets:['@babel/preset-env']})
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(dest(javaScriptDist));
}

exports.compressCss = compressCss;
exports.buildJs = buildJs;