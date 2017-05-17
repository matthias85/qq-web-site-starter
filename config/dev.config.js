const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * Clean Paths with CleanWebpackPlugin
 */

const cleanPaths = [
  'build'
]

const cleanOptions = {
    root: path.resolve(__dirname , '..'),
    verbose: true,
    dry: false
}

/*
 * Bundle CSS from Sass
 */

const cssOptions = {
    filename: 'app.css',
    disable: false,
    allChunks: true
}

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: path.resolve(__dirname, '../build'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/assets/images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(cleanPaths, cleanOptions),
        new ExtractTextPlugin(cssOptions),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};
