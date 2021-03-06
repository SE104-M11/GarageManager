const { Accessory, Parameter } = require('../models');
const { find, findOne, update } =
  require('../configs/controller.template.config')(Accessory);
const AccessoryService = require('../configs/service.template.config')(
  Accessory
);

/* ````````````Declare your custom controller here `````````````````````*/

const searchName = async (req, res) => {
  let query = req.query;
  try {
    let accessories = await Accessory.find({});
    if (query.name)
      accessories = accessories.filter((accessory) => {
        return (
          nonAccentVietnamese(accessory.name.toLowerCase()).indexOf(
            nonAccentVietnamese(query.name.toLowerCase())
          ) !== -1
        );
      });

    return res.status(200).json(accessories);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when finding accessory`,
    });
  }
};

const create = async (req, res) => {
  let input = req.body;
  if (input.remaining) {
    delete input['remaining'];
  }

  if (!input.unitPrice || input.unitPrice < 0)
    return res.status(400).send({
      statusCode: 400,
      message: 'Unit price cannot be less than 0',
    });

  // create new accessory
  try {
    await AccessoryService.create(input);
    // update parameter
    let parameter = await Parameter.findOne({});
    parameter.numberOfAccessory += 1;
    await Parameter.update({}, parameter);

    res.status(201).json({
      statusCode: 201,
      message: 'Create new accessory successfully',
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when creating accessory`,
    });
  }
};

const deleteOne = async (req, res) => {
  let id = req.params.id;
  try {
    let document = await AccessoryService.deleteOne(id);

    // update parameter
    let parameter = await Parameter.findOne({});
    parameter.numberOfAccessory -= 1;
    await Parameter.update({}, parameter);

    return res.status(200).json(document);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message:
        err.message ||
        `Some errors occur while deleting ${Model} with ID ${id}`,
    });
  }
};

/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
  find,
  findOne,
  create,
  deleteOne,
  searchName,
  update,
};

// ======================================

function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huy???n s???c h???i ng?? n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ??, ??, ??, ??, ??
  return str;
}
