const express = require('express');
const router = express.Router();
const { createOne, getPhieuTiepNhan, xoaXeSua } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);
router.get('/getPhieuTiepNhan', getPhieuTiepNhan);
router.post('/xoaXeSua', xoaXeSua);

module.exports = router;