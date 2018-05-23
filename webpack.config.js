const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        index: './src/index.jsx'
    },
    output:{
        path:path.resolve(__dirname,'src'),
        filename:'[name].js'
    },
    devtool:'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.resolve(__dirname,'src'),
        compress:true,
        port:8011,
        host:'0.0.0.0',
        historyApiFallback: true,
        proxy:{
            '/api':'http://localhost:3000'
        }
    },
    resolve:{
        modules:[path.resolve(__dirname,'src'),'node_modules'],
        extensions:['.js','.jsx'],
        alias:{
            'reducers':path.resolve(__dirname,'src/redux/reducers'),
            'actions':path.resolve(__dirname,'src/redux/actions'),
            'constants':path.resolve(__dirname,'src/redux/constants'),
            'container':path.resolve(__dirname,'src/container'),
            'components':path.resolve(__dirname,'src/components')
        }
    },
    module:{
        rules:[
            {
                test:/\.js|jsx$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'This is my first demo!',
            filename:'index.html',
            template:'./src/template.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
}