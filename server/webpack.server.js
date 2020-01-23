const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
    entry: './server/app.js',
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.resolve('build-server'),
        filename: 'index.js'
    },
    plugins: [
        new ExtractCssChunks({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            publicPath: '/public/',
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    }
};