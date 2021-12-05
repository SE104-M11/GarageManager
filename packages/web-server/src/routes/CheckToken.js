const express = require('express');
const router = express.Router();
const { checkToken}=require('../middlewares/AuthMiddleware')

router.post('/', checkToken );

module.exports = router;