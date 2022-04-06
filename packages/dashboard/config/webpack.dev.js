const {merge} = require('webpack-merge')
//merge is used to merge 2 or more webpack configs.
const commonConfig = require('./webpack.common')
const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('../package.json')
const devConfig = {
    mode:'development',
    output:{
        publicPath:'http://localhost:8083/'
    },
    devServer:{
        port:8083,
        historyApiFallback:{
            index:'index.html'
        },
        header:{
            'Access-Control-Allow-Origin':'*'
        }
    },
    plugins:[
        new ModuleFedrationPlugin({
            name:'dashboard',
            filename:'remoteEntry.js',
            exposes:{
                './DashboardApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}

module.exports = merge(commonConfig,devConfig)
//beacuse devConfig is the right most it will overwrite if there are conflicts.