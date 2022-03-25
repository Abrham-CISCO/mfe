// @babel/preset-react : for converting jsx to js
// @babel/preset-env : for converting ES 2015, 17, 18, ... to ES5
// @babel/plugin-transform-runtime : adds async await and another features.
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-react','@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}