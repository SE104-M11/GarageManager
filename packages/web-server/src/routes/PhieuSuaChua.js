const express = require('express');
const router = express.Router();
const { createOne, getAllCTSC, getVatTu, getTienCong } = require('../controllers/PhieuSuaChua');

router.post('/createOne', createOne);
router.get('/getAllCTSC', getAllCTSC);
router.get('/getVatTu', getVatTu);
router.get('/getTienCong', getTienCong);

module.exports = router;