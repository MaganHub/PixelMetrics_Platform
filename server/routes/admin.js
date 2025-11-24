const express = require('express');
const router = express.Router();
const { getStats, getUsers, getRecentActivity, getAnalyticsData, deleteUser } = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/authMiddleware');

router.use(requireAdmin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/activity', getRecentActivity);
router.get('/analytics', getAnalyticsData);
router.delete('/users/:id', deleteUser);

module.exports = router;
