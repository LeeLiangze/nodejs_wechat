const path = require('path');

module.exports = appInfo => {

    const config = {};

    // keys配置
    config.keys = appInfo.name + "_201712081845";

    // 静态页面配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks'
        },
        // root: path.join(appInfo.baseDir, 'app/public')
    };

    // 静态资源配置
    config.static = {
        prefix: '',
        dir: path.join(appInfo.baseDir, 'app/public'),
        // support lazy load
        dynamic: true,
        preload: false,
        buffer: false,
        maxFiles: 1000,
        maxAge: 0
    };

    // mount middleware
    config.middleware = [
        'robot', 'errorHandler', 'apiWrapper'
    ];

    // 错误配置
    config.errorHandler = {
        match: '/vtask',
    };

    // middleware config
    config.robot = {
        ua: [
            /curl/i,
        ],
    };

    // 安全配置
    config.security = {
        ignore: '/appdist/',
        csrf: {
            enable: false,
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        }
    };

    // cors配置
    config.cors = {
        allowMethods: 'GET,HEAD,POST,PATCH'
    };

    // 上传服务配置
    config.multipart = {
        fileExtensions: ['.ipa', '.apk', '.jpg', '.png'],
        fileSize: '200mb',
    };

    // 郑州测试环境
    config.sequelize = {
        dialect: 'mysql',
        database: 'vtask',
        host: '47.104.66.124',
        port: '3306',
        username: 'root',
        password: '123456',
        timezone: '+08:00',
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    };

    // jwt中间件
    config.jwt = {
        secret: 'CMOSServer',
        enable: true,
        match: '/success',
    };

    // session
    exports.session = {
        maxAge: 4 * 3600 * 1000, // ms
        key: 'CMOS_SESS',
        httpOnly: true,
        encrypt: true,
    };
    return config;
};