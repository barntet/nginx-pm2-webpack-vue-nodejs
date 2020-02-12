const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:[
                                require('autoprefixer')({broswers:['last 5 versions']})
                            ]
                        }
                    }
                    
                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[
                                require('autoprefixer')({broswers:['last 5 versions']})
                            ]
                        }
                    },
                    {
                        loader:'less-loader'
                    }
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024, //文件较小时自动转换base64
                            name:'[name].[ext]'  //文件名字+文件后缀
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin(),
        new VueLoaderPlugin()
    ]

}

if(isDev){
    config.devServer = {
        port:8080,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true,
        proxy:{
            '/api':{
                target:'http://localhost:80',
                pathRewrite:{  //重写
                    '^/api/coding':''
                }
            }
        }
    }
    config.plugins.push(             
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;