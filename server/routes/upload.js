const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

// Configure Multer
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('screenshot'), uploadController.uploadImage);

module.exports = router;
