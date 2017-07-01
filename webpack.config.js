const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      autoprefixer = require('autoprefixer');

const extractSass = new ExtractTextPlugin({
    filename: "main.min.css",
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true,
    sourceMap: true,
    mangle: {
        keep_fnames: true
    }
});

const webpackConfig = {
    entry: {
        app: ['./dev/main.ts', 'es6-promise-polyfill']
    }, 
    devtool: "source-map",
    output: {
        path: __dirname + "/build",
        filename: "[name].min.js"
    },
	resolve: {
		alias: {
			 typeQuery: path.resolve(__dirname, './node_modules/typeQuery/src/')
		},
        extensions: [".ts", ".js", ".json", ".css"]
	},
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
            { test: /\.css$/, use: extractSass.extract(
                [{loader: 'css-loader', options: {sourceMap: true, importLoaders: 1} },
                 {loader: 'postcss-loader', options: {sourceMap: true, plugins: (loader) => [autoprefixer()]} } ])
            },
            { test: /\.scss$/, use: extractSass.extract(
                [{loader: 'css-loader', options: {sourceMap: true, importLoaders: 1} },
                 {loader: 'postcss-loader', options: {sourceMap: true, plugins: (loader) => [autoprefixer()]} },
                 {loader: 'sass-loader', options: {sourceMap: true, importLoaders: 1} } ])
            }
        ]
    },
	plugins: [
        uglifyJs,
        extractSass,
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        contentBase: './build',
        inline: true,
        open: true
    },

}

module.exports = webpackConfig;