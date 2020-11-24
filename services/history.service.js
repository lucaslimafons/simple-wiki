const models = require('../models');
const BaseService = require('../common/base.service');
const BaseError = require('../common/error');
const stringHelper = require('../common/string.helper');
const messages = require('../common/messages');
const winston = require('winston');

class HistoryService extends BaseService {
  async findAll(params) {
    try {
      const query = this.getPagination(params);

      return await models.acronym.findAndCountAll(query);
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async findByAbbrev(abbrev) {
    try {
      return await models.acronym.findAll({
        attributes: ['id', 'abbreviation', 'text'],
        where: { abbreviation: abbrev }
      });
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async create(model, transaction) {
    try {
      await models.history.build(model).validate();
      model = await models.history.create(model, { transaction });

      return model;
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }
}

module.exports = new HistoryService();
