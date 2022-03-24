const {merge} = require('webpack-merge')
//merge is used to merge 2 or more webpack configs.
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
    mode:'development',
    devServer:{
        port:8080,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'container',
            remotes:{
                'marketing':'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared:packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig,devConfig)
//beacuse devConfig is the right most it will overwrite if there are conflicts.