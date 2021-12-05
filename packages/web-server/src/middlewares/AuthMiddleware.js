const jwtHelper = require('../helpers/jwt.helper');
const { successResponse, errorResponse } = require('../utils/objResponse');

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET? process.env.ACCESS_TOKEN_SECRET: 'QuocDepTrai';


//login để truy cập các tài nguyên yêu cầu quyền cao nhất
let isAdminAuth = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token = '';
  if (authorizationHeader) token = authorizationHeader.split(' ')[1];
  if (token) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      console.log(decoded);
      // Cho phép req đi tiếp sang controller.
      if (decoded.data.quyenHan === 1) {
        next();
      } else {
        return res
          .status(403)
          .json(errorResponse('Bạn không có quyền truy cập.'));
      }
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      console.log(error);
      return res
        .status(401)
        .json(
          errorResponse(
            'Giao dịch không thành công vui lòng kiểm tra lại access token.'
          )
        );
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).json(errorResponse('No token provided.'));
  }
};

let checkToken = async (req, res, next) => {
  console.log('token',accessTokenSecret)
  const authorizationHeader = req.headers['authorization'];
  let token = '';
  console.log('có');
  if (authorizationHeader) token = authorizationHeader.split(' ')[1];
  if (token) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      // console.log(decoded);
      return res.status(200).json(successResponse('Token còn hạn.'));
    } catch (error) {
      console.log('err', error);
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res
        .status(401)
        .json(
          errorResponse('Token của bạn đã hết hạn vui lòng đăng nhập lại.')
        );
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).json(errorResponse('No token provided.'));
  }
};

//login để truy cập các thông tin trường
let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const authorizationHeader = req.headers['authorization'];
  let token = '';
  if (authorizationHeader) token = authorizationHeader.split(' ')[1];
  if (token) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      // Cho phép req đi tiếp sang controller.
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res
        .status(401)
        .json(
          errorResponse(
            'Giao dịch không thành công vui lòng kiểm tra lại access token.'
          )
        );
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).json(errorResponse('No token provided.'));
  }
};

module.exports = {
  isAuth: isAuth,
  isAdminAuth: isAdminAuth,
  checkToken,
};
