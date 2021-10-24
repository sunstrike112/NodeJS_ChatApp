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
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt tài khoản`
  }
}