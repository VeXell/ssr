module.exports = function override(config) {

    //do stuff with the webpack config...
    config.module.rules = config.module.rules.map(item => {
        if (item.oneOf) {
            item.oneOf = item.oneOf.map(rule => {
                if (
                    rule.test &&
                    [
                        String(/\.css$/),
                        String(/\.module\.css$/),
                        String(/\.(scss|sass)$/),
                        String(/\.module\.(scss|sass)$/)
                    ].indexOf(String(rule.test)) !== -1
                ) {
                    const isModuleRule = String(rule.test).indexOf('.module') !== -1;
                    const isSass = String(rule.test).indexOf('sass') !== -1;

                    const rules = [];

                    rules.push('isomorphic-style-loader');
                    rules.push({
                        loader: 'css-loader',
                        options: {
                            importLoaders: isSass ? 2 : 1,
                            modules: isModuleRule,
                        }
                    });

                    rules.push({
                        loader: 'postcss-loader',
                    });

                    if (isSass) {
                        rules.push({
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true,
                            }
                        });
                        rules.push({
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        });
                    }

                    rule.use = rules;
                }

                return rule;
            });
        }

        return item;
    });

    return config;
};
