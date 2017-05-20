const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('Serving app in environment: ' + process.env.NODE_ENV);

/*
 * Clean Paths with CleanWebpackPlugin and HtmlWebpackPlugin
 */

const cleanPaths = [
    'dist/*.*'
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
    filename: 'app.min.css',
    disable: false,
    allChunks: true
}

module.exports = function (options) {
    return {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: './',
            filename: 'app.min.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                    })
                }, {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader?name=/assets/images/[name].[ext]',
                    exclude: /fonts/
                }, {
                    test: /\.(ttf|svg|eot|woff|woff2)$/,
                    loader: 'file-loader?name=/fonts/[name].[ext]'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(cleanPaths, cleanOptions),
            new ExtractTextPlugin(cssOptions),
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({template: './src/index.html', xhtml: true})
        ]
    }
};
