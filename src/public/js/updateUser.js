let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;

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
    userInfo.username = $(this).val();
  });

  $("#input-change-gender-male").bind("click", function () {
    userInfo.gender = $(this).val();
  });

  $("#input-change-gender-female").bind("click", function () {
    userInfo.gender = $(this).val();
  });

  $("#input-change-address").bind("change", function () {
    userInfo.address = $(this).val();
  });

  $("#input-change-phone").bind("change", function () {
    userInfo.phone = $(this).val();
  });
}

$(document).ready(function () {
  updateUserInfo();

  originAvatarSrc = $("#user-modal-avatar").attr("src");

  $("#input-btn-update-user").bind("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn phải thay đổi thông trước khi cập nhập dữ liệu", "error", 4);
      return false;
    }
    $.ajax({
      url: "/user/update-avatar",
      type: "put",
      cache: false,
      contenType: false,
      processData: false,
      data: userAvatar,
      success: function (result) {},
      error: function (error) {},
    });

    // console.log(userAvatar);
    // console.log(userInfo);
  });

  $("#input-btn-cancel-update-user").bind("click", function () {
    userInfo = null;
    userInfo = {};
    $("#user-modal-avatar").attr("src", originAvatarSrc);
  });
});