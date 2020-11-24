const pageService = require('../services/page.service');

module.exports =  {
  findAll: async function (req, res) {
    try {
      let data = await pageService.findAll(req.query);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  findBySlug: async function (req, res) {
    try {
      let data = await pageService.findBySlug(req.params.slug);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  findAllHistoryBySlug: async function (req, res) {
    try {
      let data = await pageService.findAllHistoryBySlug(req.params.slug);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  findHistoryById: async function (req, res) {
    try {
      let data = await pageService.findHistoryById(req.params.slug, req.params.id);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  create: async function (req, res) {
    try {
      let data = await pageService.create(req.body);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  update: async function (req, res) {
    try {
      let data = await pageService.update(req.params.id, req.body);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  },

  delete: async function (req, res) {
    try {
      let data = await pageService.delete(req.params.id);

      return res.json({ data, errors: null});
    } catch (err) {
      return res.status(err.data.status).json({ data: null, errors: err.data.errors });
    }
  }
};
