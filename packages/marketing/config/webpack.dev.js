const {merge} = require('webpack-merge')
//merge is used to merge 2 or more webpack configs.
const commonConfig = require('./webpack.common')
const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('../package.json')
const devConfig = {
    mode:'development',
    devServer:{
        port:8081,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFedrationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
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