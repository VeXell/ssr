const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function override(config, webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    //do stuff with the webpack config...
    const newRules = config.module.rules.map(item => {
        if (item.oneOf) {
            item.oneOf = item.oneOf.map(rule => {
                if (rule.test && String(rule.test) === String(/\.css$/)) {
                    const rules = [];

                    if (isEnvDevelopment) {
                        rules.push('style-loader');
                    }

                    /*if (isEnvProduction) {
                        rules.push({
                            loader: MiniCssExtractPlugin.loader,
                            //options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
                        });
                    }*/

                    rules.push('isomorphic-style-loader');
                    rules.push({
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    });
                    rules.push('postcss-loader');
                    rule.use = rules;
                }

                return rule;
            });
        }

        return item;
    });

    config.module.rules = newRules;

    return config;
};