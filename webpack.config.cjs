// const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const path = require('path')
// const webpack = require("webpack");

const webpackConfiguration = {
    entry: {
        index: './src/entry/index.js',
        runner: './src/entry/runner.js',
        editor: './src/entry/editor.js',
    },
    output: {
        clean: true,
        library: {
            // do not specify a `name` here
            type: 'module',
        },
        path: path.resolve(__dirname, './public/build-keep'),
        filename: '[name].min.js',
    },
    experiments: {
        outputModule: true,
    },
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, './'),
            ['src']: path.resolve(__dirname, './src'),
            ['components']: path.resolve(__dirname, './components'),
        },
        extensions: ['.js', '.jsx', '.mjs'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader", "postcss-loader"],
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-url-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new WebpackManifestPlugin({
            map: (file) => {
                file.name = file.name.replace('.js', '')
                file.path = file.path.replace('auto/', './')
                console.log('file', file)
                return file
            },
        }),
    ],
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             extractComments: false,
    //         }),
    //     ],
    // },
    watchOptions: {
        ignored: /(node_modules|extensions|js-build)/,
    },
}

webpackConfiguration.module.rules.push({
    test: /\.(glb|gltf|hdr|exr|fbx)$/,
    // exclude: config.exclude,
    use: [
        {
            //${config.assetPrefix}
            loader: 'file-loader',
            options: {
                // limit: Infinity,//,config.inlineImageLimit,
            },
        },
    ],
})

// shader support
webpackConfiguration.module.rules.push({
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
})

module.exports = webpackConfiguration
