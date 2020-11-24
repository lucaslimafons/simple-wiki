const { Router } = require('express');
const pageController = require('../../controllers/page.controller');

const router = Router();

router.get('/', pageController.findAll);
router.get('/:slug', pageController.findBySlug);
router.get('/:slug/history', pageController.findAllHistoryBySlug);
router.get('/:slug/history/:id', pageController.findHistoryById);
router.post('/', pageController.create);
router.put('/:id', pageController.update);
router.delete('/:id', pageController.delete);

module.exports = router;
