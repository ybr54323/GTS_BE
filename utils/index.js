// eslint-disable-next-line strict
module.exports = {
  generateCode(count) { // 生成随机验证码
    let code = '',
      index = 0;
    while (index++ < count) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  },
};
