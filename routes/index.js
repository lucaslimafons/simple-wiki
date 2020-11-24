const { Router } = require('express');
const api = require('./api');

const router = Router();

// API Main route
router.use('/api' , api);


module.exports = router;
