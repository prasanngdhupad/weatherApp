const express = require('express');
const { getWeather, getHistory, saveHistory } = require('../controllers/weatherController');
const { authMiddleware, optionalAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/history', authMiddleware, getHistory);
router.post('/save-search', authMiddleware, saveHistory);
router.get('/:city', optionalAuth, getWeather);

module.exports = router;
