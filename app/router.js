'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app;
  const auth = app.middleware.auth();

  router.get('users', '/users', controller.user.create);

  router.get('/user/sms_code', controller.user.smsCode);
  router.post('/user/sms_code_login', controller.user.smsCodeLogin);
  router.post('/user/set_password', auth, controller.user.setPassword);

  router.get('/node/', auth, controller.node.listByUserId);
  router.post('/node', auth, controller.node.create);
  router.delete('/node', auth, controller.node.del);
  router.get('/node/detail', auth, controller.node.detail);

};
