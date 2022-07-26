const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')

const package = require("../package.json");

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: './main.js',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'bundle.js',
    },
    devServer: {
        hot: true,
        host: "localhost",
        port: 7777,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    },

                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "img/[name].[hash:8].[ext]",
                            limit: 1
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     use: [
            //         { loader: 'ts-loader' }
            //     ]
            // },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: package.name,
            template: path.resolve(__dirname, '../index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: "static"
                }
            ]
        }),
        new DefinePlugin({
            BASE_URL: "'../'"
        })
    ]
}
