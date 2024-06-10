import gulp from 'gulp';
// import GulpCleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import path from 'path';
import chokidar from 'chokidar';
import sass from "gulp-sass";
import nodeSass from "sass";
import minifyCSS from "gulp-clean-css";
import rename from "gulp-rename";
import changed from "gulp-changed";
import realFavicon from "gulp-real-favicon";

const siteName = "Ello Book Search";
const siteColour = "13232A";
const FAVICON_DATA_FILE = 'faviconData.json';

const srcImageFolder = './src/assets/img/'; // Remove the leading slash
const destImageFolder = './public/';

const sassCompiler = sass(nodeSass);

const sass_src = "src/assets/sass/**/*.scss";
const sass_dest = "src/assets/dist/css";

export const compile_sass = async () => {
    return gulp
        .src(sass_src)
        .pipe(sassCompiler().on("error", sassCompiler.logError))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(changed(sass_dest))
        .pipe(gulp.dest(sass_dest));
};

export const compile_css = async () => {
    return gulp.src(sass_src)
        .pipe(sassCompiler().on("error", sassCompiler.logError))
        .pipe(gulp.dest(sass_dest));
};

export const processImages = () => {
    return gulp.src(path.join(srcImageFolder, '**', '*.{jpg,png,gif}'))
        .pipe(imagemin())
        .pipe(webp())
        .pipe(gulp.dest(destImageFolder));
};

export const watchFiles = () => {
    // Replace gulp.watch with gulp-chokidar
    chokidar.watch(sass_src).on('all', compile_sass);
    chokidar.watch(path.join(srcImageFolder, '**', '*.{jpg,png,gif}'), processImages);
};

// gulp.task('watch', watchImages);

export const generateFavicon = (done) => {
    realFavicon.generateFavicon({
        masterPicture: './favicon.png',
        dest: './public',
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                },
                appName: { siteName }
            },
            desktopBrowser: {
                design: 'background',
                backgroundColor: `#${siteColour}`,
                backgroundRadius: 0.2,
                imageScale: 0.8
            },
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: `#${siteColour}`,
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                },
                appName: { siteName }
            },
            androidChrome: {
                pictureAspect: 'backgroundAndMargin',
                margin: '13%',
                backgroundColor: `#${siteColour}`,
                themeColor: `#${siteColour}`,
                manifest: {
                    name: { siteName },
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 58.59375,
                themeColor: `#${siteColour}`
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: true,
            usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function () {
        done();
    });
}

gulp.task('fav', generateFavicon);

/* gulp.task('minify', () => {
    return gulp.src('./out/_next/static/css/98b38263fb927f8f.css')
        .pipe(GulpCleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./out/_next/static'))
}) */

// gulp.task('default', gulp.series(processImages, watchImages));

export const fav = generateFavicon;
export const watch = watchFiles;

export default gulp.series(compile_sass, processImages, watchFiles);
