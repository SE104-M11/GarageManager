const express = require('express');
const router = express.Router();
const {  create, deleteOne, getAll } = require('../controllers/HieuXe');
const {isAdminAuth}=require('../middlewares/AuthMiddleware')

// /* GET find by id list */
// router.get('/:id', findOne);

// /* GET find list */
// router.get('/', find);



// /* PUT */
// router.put('/:id', update);

/* DELETE */
router.post('/delete', deleteOne);

router.post('/create', create);

router.post('/get', getAll);


module.exports = router;