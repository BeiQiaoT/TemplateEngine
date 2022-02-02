const path = require('path');

module.exports = {
  // 模式，开发
  mode: 'development',
  // 入口
  entry: './src/index.ts',
  // 指定打包文件所在目录
  output: {
    //指定打包文件的目录
    path: path.resolve(__dirname, 'dist'), //打包后文件的名字
    filename: 'TemplateEngine.js', environment: {  //告诉webpack不使用箭头函数
      arrowFunction: false, const: false //兼容ie10
    }
  },
  module: {//指定webpack打包时要使用的模块
    // 指定要loader加载的规则
    rules: [// 设置ts文件的处理
      {
        // test指定的时规则生效的文件
        test: /\.ts$/,//以ts结尾的文件
        // 要使用的loader
        use: [// 配置babel
          {
            //指定加载器
            loader: 'babel-loader', // 设置babel
            options: {
              //设置预定义的环境
              presets: [[//指定环境的插件
                '@babel/preset-env', // 配置信息
                {
                  // 要兼容的目标浏览器及版本
                  targets: {
                    'chrome': '58', 'ie': '11'
                  }, //指定corejs的版本
                  'corejs': '3', //使用corejs的方式 "usage"  表示按需加载
                  'useBuiltIns': 'usage'
                }
              ]]
            }
          }, // 'babel-loader',
          'ts-loader'], // 要排除的文件
        exclude: /node-modules/
      }

    ]
  }, // mode: "development", //设置mode
  // 配置一下webpack-dev-server
  devServer: {
    // 静态文件根目录
    contentBase: path.join(__dirname, 'www'),
    // 不压缩
    compress: false,
    // 端口号
    port: 8080,
    // 虚拟打包的路径，bundle.js文件没有真正的生成
    publicPath: '/virtual/'
  },
  // 用来设置引用模块，可以将这些文件识别为模块
  resolve: {
    extensions: ['.ts', '.js']
  }
};
