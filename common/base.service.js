const messages = require('./messages');

class BaseService {
  getPagination(query) {
    let order = [];
    const offset = query.from == undefined ? 0 : query.from;
    const limit = query.limit == undefined ? 20 : Number(query.limit);

    if (query.order && query.order.length > 0) {
      if (query.order[0].indexOf('.') != -1) {
        order.push([sequelize.literal(query.order[0] + ' ' + query.order[1])]);
      } else {
        order.push(query.order);
      }
    }

    return {
      order: order,
      offset: (limit*offset),
      limit: limit
    };
  }

  getErrors(error) {
    if (error.data && error.data.status && error.data.errors && error.data.errors.length > 0) {
      return { status: error.data.status, errors: error.data.errors };
    }

    let errors = [];
    let status = "";
    if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
       if (error.errors.length > 0) {
          for (let item of error.errors) {
             errors.push({
                field: item.path,
                message: item.message
             })
          }
       }

       status = 422;
    } else if (error.name == "StatusCodeError") {
       if (error.error.errors.length > 0) {
          _.forEach(error.error.errors, (item) => {
             errors.push({
                field: item.path,
                message: item.description
             })
          });
       }

       status = 400;
    } else {
       errors.push({
          field: error.data && error.data.field ? error.data.field : null,
          message: error.message ? error.message : messages.error_try_again
       });
       status = error.data && error.data.status ? error.data.status : 500;
    }

    return { status: status, errors: errors };
  }
}

module.exports = BaseService;
