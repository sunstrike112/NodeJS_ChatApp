function callFindUser(element) {
  if (element.which == 13 || element.type == "click") {
    let keyword = $("#input-find-users-contact").val();
    let regexKeyword = new RegExp(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    );

    if (!keyword.length) {
      alertify.notify("Vui lòng nhập nội dung tìm kiếm", "error", 7);
      return false;
    }

    if (!regexKeyword.test(keyword)) {
      alertify.notify("Từ khóa tìm kiếm không đúng định dạng", "error", 7);
      return false;
    }

    $.get(`/contact/find-users/${keyword}`, function (data) {
      $("#find-user ul").html(data);
    });
  }
}

$(document).ready(function () {
  $("#input-find-users-contact").bind("keypress", callFindUser);
  $("#btn-find-users-contact").bind("click", callFindUser);
});
