var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

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
            { test: /\.css$/, use: extractSass.extract("css-loader?sourceMap&importLoaders=1") },
            { test: /\.scss$/, use: extractSass.extract("css-loader?sourceMap&importLoaders=1!sass-loader?sourceMap&importLoaders=1") },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
	plugins: [
        uglifyJs,
        extractSass
    ],
    devServer: {
        contentBase: './build',
        inline: true,
        open: true
    }
}

module.exports = webpackConfig;