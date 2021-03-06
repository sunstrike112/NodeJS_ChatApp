let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo;
let userUpdatePassword = {};

function callLogout() {
  let timerInterval;
  Swal.fire({
    position: "top-end",
    type: "success",
    title: "Tự động đăng xuất sau 5s",
    html: "Thời gian: <strong></strong>",
    timer: 5000,
    onBeforeOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft() / 1000);
      }, 1000);
    },
    onclose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    $.get("/logout", function () {
      location.reload();
    });
  });
}

function updateUserInfo() {
  $("#input-change-avatar").bind("change", function () {
    let fileData = $(this).prop("files")[0];
    let match = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; // Size 1 MB

    if ($.inArray(fileData.type, match) === -1) {
      alertify.notify("Kiểu file không đúng định dạng .png, .jpg, .jpeg", "error", 4);
      $(this).val(null);
      return false;
    }

    if (fileData.size > limit) {
      alertify.notify("Kích cỡ ảnh tối đa cho phép là 1 MB", "error", 4);
      $(this).val(null);
      return false;
    }

    if (typeof FileReader != "undefined") {
      let imagePreview = $("#image-edit-profile");
      imagePreview.empty();

      let fileReader = new FileReader();
      fileReader.onload = function (element) {
        $("<img>", {
          src: element.target.result,
          class: "avatar img-circle",
          id: "user-modal-avatar",
          alt: "avatar",
        }).appendTo(imagePreview);
      };

      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar", fileData);
      userAvatar = formData;
    } else {
      alertify.notify("Trình duyệt của bạn không hỗ trọ FileReader", "error", 4);
    }
  });

  $("#input-change-username").bind("change", function () {
    let username = $(this).val();
    let regexUsername = new RegExp(
      /^[s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    );
    if (!regexUsername.test(username) || username.length < 3 || username.length > 17) {
      alertify.notify("Độ dài tên người dùng từ 3-17 ký tự và không chứa ký tự đặc biệt", "error", 4);
      $(this).val(originUserInfo.username);
      delete userInfo.username;
      return false;
    }
    userInfo.username = username;
  });

  $("#input-change-gender-male").bind("click", function () {
    let gender = $(this).val();
    if (gender !== "male") {
      alertify.notify("Giá trị giới tính không phù hợp", "error", 4);
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $("#input-change-gender-female").bind("click", function () {
    let gender = $(this).val();
    if (gender !== "female") {
      alertify.notify("Giá trị giới tính không phù hợp", "error", 4);
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $("#input-change-address").bind("change", function () {
    let address = $(this).val();
    if (address.length < 3 || address.length > 30) {
      alertify.notify("Độ dài địa chỉ từ 3-30 ký tự", "error", 4);
      $(this).val(originUserInfo.address);
      delete userInfo.address;
      return false;
    }

    userInfo.address = address;
  });

  $("#input-change-phone").bind("change", function () {
    let phone = $(this).val();
    let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);
    if (!regexPhone.test(phone)) {
      alertify.notify("Số điện thoại bắt đầu từ 0 và dài tối đa 11 ký tự", "error", 4);
      $(this).val(originUserInfo.phone);
      delete userInfo.phone;
      return false;
    }

    userInfo.phone = phone;
  });

  $("#input-change-current-password").bind("change", function () {
    let currentPassword = $(this).val();
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if (!regexPassword.test(currentPassword)) {
      alertify.notify("Mật khẩu chứa ít nhất 8 ký tự (gồm chữ hoa, thường, số và ký tự đặc biệt)", "error", 4);
      $(this).val(null);
      delete userUpdatePassword.currentPassword;
      return false;
    }

    userUpdatePassword.currentPassword = currentPassword;
  });

  $("#input-change-new-password").bind("change", function () {
    let newPassword = $(this).val();
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if (!regexPassword.test(newPassword)) {
      alertify.notify("Mật khẩu mới chứa ít nhất 8 ký tự (gồm chữ hoa, thường, số và ký tự đặc biệt)", "error", 4);
      $(this).val(null);
      delete userUpdatePassword.newPassword;
      return false;
    }

    userUpdatePassword.newPassword = newPassword;
  });

  $("#input-change-confirm-new-password").bind("change", function () {
    let confirmNewPassword = $(this).val();
    if (!userUpdatePassword.newPassword) {
      alertify.notify("Bạn chưa nhập mật khẩu mới, vui lòng nhập mật khẩu mới", "error", 4);
      $(this).val(null);
      delete userUpdatePassword.confirmNewPassword;
      return false;
    }

    if (confirmNewPassword !== userUpdatePassword.newPassword) {
      alertify.notify("Mật khẩu không khớp", "error", 4);
      $(this).val(null);
      delete userUpdatePassword.confirmNewPassword;
      return false;
    }

    userUpdatePassword.confirmNewPassword = confirmNewPassword;
  });
}

function callUpdateUserAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "put",
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function (result) {
      // Display success
      $(".user-modal-alert-success").find("span").text(result.message);
      $(".user-modal-alert-success").css("display", "block");

      // Update avatar at navbar
      $("#navbar-avatar").attr("src", result.imageSrc);

      // Update origin avatar src
      originAvatarSrc = result.imageSrc;

      // Reset all
      $("#input-btn-cancel-update-user").click();
    },
    error: function (error) {
      // Display errors
      $(".user-modal-alert-error").find("span").text(error.responseText);
      $(".user-modal-alert-error").css("display", "block");

      // Reset all
      $("#input-btn-cancel-update-user").click();
    },
  });
}

function callUpdateUserInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "put",
    data: userInfo,
    success: function (result) {
      // Display success
      $(".user-modal-alert-success").find("span").text(result.message);
      $(".user-modal-alert-success").css("display", "block");

      // Reset all
      $("#input-btn-cancel-update-user").click();
    },
    error: function (error) {
      // Display errors
      $(".user-modal-alert-error").find("span").text(error.responseText);
      $(".user-modal-alert-error").css("display", "block");

      // Reset all
      $("#input-btn-cancel-update-user").click();
    },
  });
}

function callUpdateUserPassword() {
  $.ajax({
    url: "/user/update-password",
    type: "put",
    data: userUpdatePassword,
    success: function (result) {
      // Display success
      $(".user-modal-password-alert-success").find("span").text(result.message);
      $(".user-modal-password-alert-success").css("display", "block");

      // Update origin user info
      originUserInfo = Object.assign(originUserInfo, userInfo);

      // Update username at navbar
      $("#navbar-username").text(originUserInfo.username);

      // Reset all
      $("#input-btn-cancel-update-user-password").click();

      // Logout after update password
      callLogout();
    },
    error: function (error) {
      // Display errors
      $(".user-modal-password-alert-error").find("span").text(error.responseText);
      $(".user-modal-password-alert-error").css("display", "block");

      // Reset all
      $("#input-btn-cancel-update-user").click();
    },
  });
}

$(document).ready(function () {
  originAvatarSrc = $("#user-modal-avatar").attr("src");
  originUserInfo = {
    username: $("#input-change-username").val(),
    gender: $("#input-change-gender-male").is(":checked")
      ? $("#input-change-gender-male").val()
      : $("#input-change-gender-female").val(),
    address: $("#input-change-address").val(),
    phone: $("#input-change-phone").val(),
  };

  // Update user info after call change value to update
  updateUserInfo();

  // Handle save user info
  $("#input-btn-update-user").bind("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn phải thay đổi thông trước khi cập nhập dữ liệu", "error", 4);
      return false;
    }
    if (userAvatar) {
      callUpdateUserAvatar();
    }

    if (!$.isEmptyObject(userInfo)) {
      callUpdateUserInfo();
    }
  });

  // Handle cancel user info
  $("#input-btn-cancel-update-user").bind("click", function () {
    userInfo = null;
    userInfo = {};
    $("#input-change-avatar").val(null);
    $("#user-modal-avatar").attr("src", originAvatarSrc);

    $("#input-change-username").val(originUserInfo.username);
    originUserInfo.gender === "male"
      ? $("#input-change-gender-male").click()
      : $("#input-change-gender-female").click();
    $("#input-change-address").val(originUserInfo.address);
    $("#input-change-phone").val(originUserInfo.phone);
  });

  // Handle save user password
  $("#input-btn-update-user-password").bind("click", function () {
    if (
      !userUpdatePassword.currentPassword ||
      !userUpdatePassword.newPassword ||
      !userUpdatePassword.confirmNewPassword
    ) {
      alertify.notify("Bạn phải điền đủ thông tin", "error", 4);
      return false;
    }
    Swal.fire({
      title: "Bạn có chắc muốn thay đổi mật khẩu",
      text: "Bạn không thể hoàn tác lại quá trình này",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ECC71",
      cancelButtonColor: "#ff7675",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.value) {
        $("#input-btn-cancel-update-user-password").click();
        return false;
      }
      callUpdateUserPassword();
    });
  });

  // Handle cancel user password
  $("#input-btn-cancel-update-user-password").bind("click", function () {
    userUpdatePassword = {};
    $("#input-change-current-password").val(null);
    $("#input-change-new-password").val(null);
    $("#input-change-confirm-new-password").val(null);
  });
});
