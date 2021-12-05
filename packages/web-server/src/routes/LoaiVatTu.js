const express = require('express');
const router = express.Router();
const {  create,  deleteOne, getAll } = require('../controllers/LoaiVatTu');

// /* GET find by id list */
// router.get('/:id', findOne);

// /* GET find list */
// router.get('/', find);



// /* PUT */
// router.put('/:id', update);

/* DELETE */
router.post('/delete', deleteOne);

router.post('/create', create);

router.get('/get', getAll);


module.exports = router;