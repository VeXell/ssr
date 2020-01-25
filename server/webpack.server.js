const path = require('path');
const nodeExternals = require('webpack-node-externals');

const outputPath = process.env.NODE_ENV === 'production' ?
    path.resolve('deploy/server') :
    path.resolve('dev-server');

module.exports = {
    entry: './server/app.js',
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: outputPath,
        filename: 'index.js'
    },
    plugins: [],
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
                oneOf: [
                    {
                        test: /\.module\.css$/,
                        use: [
                            'isomorphic-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: false,
                                }
                            },
                            'postcss-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'isomorphic-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: false
                                }
                            },
                            'postcss-loader'
                        ]
                    }
                ]
            }
        ]
    }
};
