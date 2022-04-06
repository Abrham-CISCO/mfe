// @babel/preset-react : for converting jsx to js
// @babel/preset-env : for converting ES 2015, 17, 18, ... to ES5
// @babel/plugin-transform-runtime : adds async await and another features.
const {VueLoaderPlugin} = require('vuew-loader');

module.exports = {
    entry:'./src/index.js',
    output:{
        fileName: '[name].[contenthash].js'
    },
    resolve:{
        extensions:['.js', '.vue']
    },
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use:[
                    {
                        loader:'file-loader'
                    }
                ]
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.scss|\.css$/,
                use:['vue-style-loader','style-loader','css-loader','sass-loader']
            },
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins:[new VueLoaderPlugin()]
}