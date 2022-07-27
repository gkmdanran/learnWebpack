const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: {
                        arguments: false,
                        dead_code: true
                    },
                    mangle: true,
                    toplevel: true,
                    keep_classnames: true,
                    keep_fnames: true
                }
            }),
            new CssMinimizerPlugin({
                parallel: true
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MinCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: "css/[name].[contenthash:8].css"
        })
    ]
}