const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const commonConfig = require('./webpack.common')

const prodConfig = {
    mode:'production',
    output:{
        filename:'[name].[contenthash].js',//all build files will use this as a template
        publicPath:'/auth/latest/'
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'auth',
            filename:'remoteEntry.js',
            exposes:{
                './AuthApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig,prodConfig)