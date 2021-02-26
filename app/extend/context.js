'use strict';
const { ValidateParamsError } = require('../error/index');
module.exports = {
  permitAndValidateParams(rules) {
    const params = this.params.permit(Object.keys(rules));
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      const keys = errors.map(error => error.field).join(',');
      throw new ValidateParamsError(`${keys} invalid`);
    }
    return params;
  },
};
