const {merge} = require('webpack-merge')
const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
    mode:'production', //lets webpack do minification and optimization. but it takes more time.
    output:{
        filename:'[name].[contenthash].js',//all build files will use this as a template
        publicPath:'/container/latest/'
    },
    plugins:[
        new ModuleFedrationPlugin({
            name:'container',
            remotes:{
                marketing:`marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth:`auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard:`dashboard@${domain}/dashboard/latest/remoteEntry.js`
            },
            shared:packageJson.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig)