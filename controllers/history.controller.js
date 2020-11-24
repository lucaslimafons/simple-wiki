const acronymService = require('../services/acronym.service');

module.exports =  {
  findAll: async function (req, res) {
    try {
      let data = await acronymService.findAll(req.query);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  findRandomly: async function (req, res) {
    try {
      let data = await acronymService.findRandomly(req.params.count);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  findByAbbrev: async function (req, res) {
    try {
      let data = await acronymService.findByAbbrev(req.params.acronym);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  create: async function (req, res) {
    try {
      let data = await acronymService.create(req.body);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  update: async function (req, res) {
    try {
      let data = await acronymService.update(req.params.id, req.body);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  delete: async function (req, res) {
    try {
      let data = await acronymService.delete(req.params.id);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  }
};
