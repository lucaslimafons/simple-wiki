const { Router } = require('express');
const page = require('./page.route');

// Define router
const router = Router();

// controllers
router.use('/page' , page);

module.exports = router;
