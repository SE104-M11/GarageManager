exports.successResponse = (message, obj) => {
  return {
    status: true,
    message: message,
    object: obj ? obj : null,
  };
};

exports.errorResponse = (message, obj) => {
  return {
    status: false,
    message: message,
    object: obj ? obj : null,
  };
};
