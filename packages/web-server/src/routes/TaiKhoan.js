const express = require('express');
const router = express.Router();
const {login } = require('../controllers/Authentication');
const {register,update, forgetPassword, validateUser } = require('../controllers/TaiKhoan');
const {isAdminAuth,isAuth, checkToken}=require('../middlewares/AuthMiddleware')

/* GET find list */
router.post('/login', login);

router.post('/register',isAdminAuth, register);

router.post('/change-password',isAuth, update);

router.post('/forgot-password', forgetPassword );

router.post('/validate-user', validateUser );

router.post('/check-token', checkToken );

module.exports = router;