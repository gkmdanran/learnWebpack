const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { merge } = require("webpack-merge");
const prodConfig = require("./prod.config");
const devConfig = require("./dev.config");


const package = require("../package.json");

const baseConfig = {
    context: path.resolve(__dirname, '../'),
    // entry: {
    //     math: { import: './src/js/math.js', dependOn: "shared" },
    //     type: { import: './src/js/type.ts', dependOn: "shared" },
    //     shared: ["dayjs"],//共享的所有包都抽到shared.bundle.js文件中
    // },
    entry: './main.js',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].bundle.js',
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        }
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
    ],
    optimization: {

        splitChunks: {
            // async异步导入
            // initial同步导入
            // all 异步/同步导入
            chunks: "all",
            minSize: 5,//拆分包的大小至少为minSize才会拆分
            maxSize: 10,//将大于maxSize的包，拆分为不小于minSize的包
            minChunks: 1,//至少被引入的次数，大于等于才会拆分
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "[id]_vendors.js",
                    priority: -10
                },
                default: {
                    minChunks: 1,
                    filename: "common_[id].js",
                    priority: -20
                }
            }
        },
    }
}
module.exports = function (env) {
    const isProduction = env.production;
    process.env.NODE_ENV = isProduction ? "production" : "development";

    const config = isProduction ? prodConfig : devConfig;
    const mergeConfig = merge(baseConfig, config);

    return mergeConfig;
}