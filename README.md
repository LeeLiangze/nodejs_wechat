# cmos使用文档

## 开发前准备
1.nginx配置   
````
a.解压nginx.zip;
b.打开nginx/nginx.exe启动nginx服务
````
2.修改系统hosts文件
````
windows系统下: C:\Windows\System32\drivers\etc；
mac系统下: /etc/hosts
修改如下内容
127.0.0.1       localhost  =>  127.0.0.1       www.zhaohaipeng.com
::1             localhost  =>  ::1             www.zhaohaipeng.com
````
3.初始化项目命令行

````
依次执行如下命令
npm set registry http://192.168.100.10:20899
npm install 

//启动nodeJs服务
npm run server
````
4.在网站上输入 https://www.testcmos.com 正常运行说明部署成功

## 目录结构
````
├─config # 存放配置文件
│   ├─config.default.js # 默认配置项
│   ├─config.local.js # 本地调试配置项
│   ├─config.prod.js # 服务端部署配置项
│   └─plugin.js # 插件管理
├─app # nodeJs开发文件
    ├─model # model层，负责定义mysql数据库中数据类型，从属关系 
    ├─service  # 针对对应数据表的操作，包括全部显示，增删改查五种方法
    ├─middleware # 中间件，处理安全和日志层，业务开发时不需要更改。（可选） 
    ├─extend # 扩展层，暂时只存放了jwt，业务开发不需要更改。（可选）
    ├─controller # 针对具有主从关系数据表的处理，包括全部显示，增删改查。 
    ├─router.js # 项目使用Rest API返回对应的数据接口 
    ├─public # 存储打包后的静态资源
    └─view # 存放打包后的静态页面
├─pages # 页面相关文件包括（html,css,img）
├─src #存放页面ts文件以及组件文件
	├─coms 组件根目录
    ├─页面入口ts文件，与html页面文件名称保持一致
````

## nodeJs开发说明
### 使用方法
本项目提供了post从model->service->controller->router.js的整个流程的例子，供参考。

### 连接数据库
- 打开navicat数据库可视化工具；
- 新建数据库，选择mysql；    
数据库IP：		192.168.20.253  
数据库端口号：	8066    
数据库名：		vtask  
数据库用户名：	vtask   
数据库用户密码：  A0Tqkvlq5ZrA
  
##启动命令
CMOS_SERVER_ENV=prod nohup node index.js > stdout.log 2> stderr.log &