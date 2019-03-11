var path = require('path')
var webpack = require('webpack')
var entrys = require('../entry.config.js')
module.exports = {
	entry: entrys,
	output: {
		filename: '[name].js',
		path: path.resolve('./', 'dist/resources/js')
	},
	resolve: {
		extensions: ['.vue', '.js']
	},
	externals: {
		"vue": "Vue"
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		})
	],
	module: {
		rules: [{
			test: /\.less$/,
			use: ["style-loader", "css-loader", "less-loader"]
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}, {
			test: /\.vue$/,
			use: [{
				loader: "vue-loader"
			}]
		}, {
			test: /\.js$/,
			loader: "babel-loader",
			options: {
				presets: ["es2015", "stage-2"]
			},
			exclude: /node_modules/
		}, {
			test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: "url-loader",
			options: {
				limit: 10000,
				name: path.join('../img', '[name].[ext]')
			}
		}, {
			test: /vux.src.*?js$/,
			use: [{
				loader: "babel-loader"
			}]
		}]
	}
}