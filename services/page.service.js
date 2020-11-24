const models = require('../models');
const BaseService = require('../common/base.service');
const BaseError = require('../common/error');
const stringHelper = require('../common/string.helper');
const messages = require('../common/messages');
const winston = require('winston');
const historyService = require('./history.service');

class PageService extends BaseService {
  async findAll(params) {
    try {
      const query = this.getPagination(params);

      if (!stringHelper.isUndefinedOrNullOrEmpty(params.q)) {
        query.where = {
          [models.Sequelize.Op.or]: [
            {
              title: {
                [models.Sequelize.Op.like]: `%${params.q}%`
              }
            },
            {
              content: {
              [models.Sequelize.Op.like]: `%${params.q}%`
              }
            }
          ]
        };
      }

      return await models.page.findAndCountAll(query);
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async findBySlug(slug) {
    try {
      return await models.page.findOne({
        where: { slug: slug }
      });
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async findAllHistoryBySlug(slug) {
    try {
      return await models.page.findOne({
        where: { slug: slug },
        include: {
          model: models.history
        }
      });
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async findHistoryById(slug, id) {
    try {
      return await models.page.findOne({
        where: { slug: slug },
        include: {
          model: models.history,
          where: {
            id: id
          }
        }
      });
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async create(model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      const description = model.description;

      await models.page.build(model).validate();
      model = await models.page.create(model, { transaction });

      await historyService.create({
        description,
        content: model.content,
        id_page: model.id
      }, transaction);

      await transaction.commit();

      return model;
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      await transaction.rollback();
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async update(id, model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await models.page.update(model, { where: { id: id } }, { transaction });

      await historyService.create({
        description: model.description,
        content: model.content,
        id_page: id
      }, transaction);

      await transaction.commit();

      return model;
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      await transaction.rollback();
      throw new BaseError("Error", this.getErrors(e));
    }
  }

  async delete(id) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await models.page.destroy({ where: { id: id }, transaction });

      await transaction.commit();
    } catch (e) {
      winston.log('error', 'Error: ', new Error(e));
      await transaction.rollback();
      throw new BaseError("Error", this.getErrors(e));
    }
  }
}

module.exports = new PageService();
