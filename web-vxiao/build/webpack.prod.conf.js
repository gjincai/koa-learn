const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const PagePlugin = require('./page-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const env = config.build.env
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:5].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:5].js')
  },
  plugins: [
    new PagePlugin(config.build.cdns),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true,
    //     drop_console: true
    //   },
    //   sourceMap: true
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:5].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'V校 - 智慧教育云',
      filename: config.build.index,
      template: 'index.html',
      inject: true, // js插入的位置
      theme: 'green',
      chunks: ['manifest', 'vendor', 'app'], // 每个html引用的js模块
      favicon: path.resolve(__dirname, `../static/favicon/favicon.ico`),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    title: '',
    filename: 'mobile.html',
    template: 'index.html',
    inject: true, // js插入的位置
    theme: 'green',
    chunks: ['manifest', 'vendor', 'mobile'], // 每个html引用的js模块
    favicon: path.resolve(__dirname, `../static/favicon/favicon.ico`),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  })
)
// 定制页面
utils.getPages().forEach(p => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: p.title,
      filename: config.build.index.replace('index.html', `${p.fileName}.html`),
      template: 'index.html',
      theme: p.theme || 'green',
      favicon: path.resolve(__dirname, `../static/favicon/${p.favicon}`),
      inject: true, // js插入的位置
      hash: true,
      chunks: ['manifest', 'vendor', p.fileName], // 每个html引用的js模块
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  )
})
module.exports = webpackConfig