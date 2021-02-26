const https = require('https');
const querystring = require('querystring');

class ZhenzismsClient {
  constructor(apiUrl, appId, appSecret) {
    this.apiUrl = apiUrl;
    this.appId = appId;
    this.appSecret = appSecret;
  }

  // 发送短信
  send(data) {
    const options = {
      hostname: this.apiUrl,
      method: 'POST',
      path: '/sms/v2/send.do',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    data.appId = this.appId;
    data.appSecret = this.appSecret;
    if (data.templateParams) {
      data.templateParams = JSON.stringify(data.templateParams);
    }
    return new Promise(function (resolve, reject) {
      const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', d => {
          const result = JSON.parse(d);
          resolve(result);
        });

      });
      const content = querystring.stringify(data);
      req.write(content);
      req.end();
    });
  }

  // 查看余额
  balance() {
    const options = {
      hostname: this.apiUrl,
      method: 'POST',
      path: '/account/balance.do',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = {
      appId: this.appId,
      appSecret: this.appSecret,
    };
    return new Promise(function (resolve, reject) {
      const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', d => {
          const result = JSON.parse(d);
          resolve(result);
        });

      });
      const content = querystring.stringify(data);
      req.write(content);
      req.end();
    });
  }

  // 查询单条短信
  findSmsByMessageId(messageId) {
    const options = {
      hostname: this.apiUrl,
      method: 'POST',
      path: '/smslog/findSmsByMessageId.do',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = {
      appId: this.appId,
      appSecret: this.appSecret,
      messageId,
    };
    return new Promise(function (resolve, reject) {
      const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', d => {
          const result = JSON.parse(d);
          resolve(result);
        });

      });
      const content = querystring.stringify(data);
      req.write(content);
      req.end();
    });
  }
}

ZhenzismsClient.codeMean = {
  100: '参数格式错误	检查请求参数是否为空, 或手机号码格式错误',
  101: '短信内容超过1000字	短信内容过长，请筛检或分多次发送',
  105: 'appId错误或应用不存在	请联系工作人员申请应用或检查appId是否输入错误',
  106: '应用被禁止	请联系工作人员查看原因',
  107: 'ip错误	如果设置了ip白名单，系统会检查请求服务器的ip地址，已确定是否为安全的来源访问',
  108: '短信余额不足	需要到用户中心进行充值',
  109: '今日发送超过限额	如果设置了日发送数量，则每个接收号码不得超过这个数量',
  110: '应用秘钥(AppSecret)错误	检查AppSecret是否输入错误，或是否已在用户中心进行了秘钥重置',
  111: '账号不存在	请联系工作人员申请账号',
  117: 'templateId错误，或者模板未审核	错误说明',
  1000: '系统位置错误',
};

module.exports = ZhenzismsClient;
