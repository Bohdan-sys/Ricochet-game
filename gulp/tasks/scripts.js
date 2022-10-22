import webpackStream from "webpack-stream";
import path from "path";

export const scripts = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.plumber())
        .pipe(webpackStream({
            entry: `${app.path.src.js}`,
            output: {
                path: path.resolve(path.dirname(`${app.path.build.js}`), `${app.path.build}`),
                filename: 'script.min.js'
            },
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        exclude: '/node_modules/',
                        use: 'ts-loader'
                    },
                    {
                        test: /\.(png|jpe?g|gif)$/i,
                        loader: 'file-loader',
                        options: {
                            name: '../img/[name].[ext]'
                        },
                    },
                ],
            },
            resolve: {
                extensions: ['.ts', '.js'],
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream())
};
