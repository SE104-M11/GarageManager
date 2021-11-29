const express = require('express');
const router = express.Router();
const { createOne } = require('../controllers/PhieuSuaChua');

router.post('/createOne', createOne);

module.exports = router;