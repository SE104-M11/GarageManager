const pttService = require('../services/PhieuThuTien');

/* ````````````Declare your custom controller here `````````````````````*/
const create = async (req, res) => {
  let formInput = req.body;
  console.log(formInput);

  // If input is null, return 400 Error
  if (!formInput.bienSo) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Your bienSo is null/empty',
    });
  }

  if (!formInput.ngayTT) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Your ngayTT is null/empty',
    });
  }

  if (!formInput.soTienThu || formInput.soTienThu <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Number of money must be greater than zero',
    });
  }

  // If input is not null
  try {
    await pttService.create(formInput);
    return res.status(201).json({
      statusCode: 201,
      message: 'Receiving your form succesfully',
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || 'Some errors occur while receiving your form',
    });
  }
};

const find = async (req, res) => {
  try {
    let objList = await pttService.find();
    return res.status(200).json(objList);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message:
        err.message || `Some errors occur while finding receiving forms list`,
    });
  }
};

const findOne = async (req, res) => {
  try {
    let id = req.params.id;
    let objList = await pttService.findOne(id);
    return res.status(200).json(objList);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message:
        err.message || `Some errors occur while finding receiving forms list`,
    });
  }
};
/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
  find,
  findOne,
  create,
};
