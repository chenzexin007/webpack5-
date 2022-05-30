const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugins = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const env = process.env.NODE_ENV === 'dev' ? 'development' : 'production'
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const config = {
  mode: env,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { 
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 css 文件
        use: [
          // 'style-loader',  // 核心时通过js 生成style dom; style.innerHTML = ${styleCss}; head.appenChild(style)
          MiniCssExtractPlugins.loader,  // 会打包出css文件，并通过link插入到head
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugins({
      filename: '[name].[hash:8].css'
    }),
    new CleanWebpackPlugin()  // 每次打包前都会先清空旧的文件
  ]
}

module.exports = function (env, argv) {
  console.log('argv.mode:', argv.mode)
  return config
}