const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
module.exports = {
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	output: {
		publicPath: '/word_widget/',
	},
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	port: 9000,
	// },
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new CopyWebpackPlugin([
			{
				from: './src/assets',
				to: './assets',
			},
		]),
	],
};
