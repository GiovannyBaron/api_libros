const { resolve } = require('path')

module.exports = {
    mode: "development",
    entry: __dirname + '/main.js',
    output: {
        path: resolve('../') + '/back',
        publicPath: resolve('../') + '/back',
        filename: 'static/app.js',
    },
    resolve: { extensions: ['.js', '.css'] },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // TODO: Revizar la siguiente regla
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    }
}