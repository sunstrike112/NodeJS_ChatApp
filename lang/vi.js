export const transValidation = {
  email_incorrect: "Email phải có dạng abc@gmail.com",
  gender_incorrect: "Giới tính bị sai",
  password_incorrect:
    "Mật khẩu chứa ít nhất 8 ký tự (gồm chữ hoa, thường, số và ký tự đặc biệt)",
  password_confirmation_incorrect: "Mật khẩu không khớp",
}

export const transErrors = {
  account_in_use: "Email đã được sử dụng",
  account_removed: "Tài khoản này đã gỡ khỏi hệ thống, chi tiết xin liên hệ bộ phận CSKH",
  account_not_active: "Tài khoản chưa được kích hoạt, vui lòng kiểm tra email của bạn để kích hoạt tài khoản",
  token_undefined: "Token không tồn tại"
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt tài khoản`
  },
  account_actived: "Kích hoạt tài khoản thành công, bạn có thể đăng nhập vào ứng dụng"
}

export const transMail = {
  subject: "Awesome Chat by Bug Creator : Xác nhận kích hoạt tài khoản",
  template: (linkVerify) => {
    return `
      <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dựng Awesome Chat by Bug Creator</h2>
      <h3>Vui lòng click vào liên kết để kích hoạt tài khoản</h3>
      <h3><a href="${linkVerify}" targer="blank">${linkVerify}</a></h3>
      <h4>Nếu đây là sự nhầm lẫn hãy bỏ qua thông báo này</h4>
    `
  },
  send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ bộ phận CSKH"
}