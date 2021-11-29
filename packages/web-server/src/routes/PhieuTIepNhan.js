const express = require('express');
const router = express.Router();
const { createOne } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);

module.exports = router;