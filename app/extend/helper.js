const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
exports.inarray = (arr, obj)=> {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
};
exports.getNowSysTime = () => {
    return new Date().getTime();
};
exports.checkMobile = (mobile) => {
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobile))) {
        return false;
    }
    return true;
};
exports.createRandomStr = (len, charSet) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};
