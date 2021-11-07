function markNotificationsAsRead(targetUsers) {
  $.ajax({
    url: "/notification/mark-all-as-read",
    type: "put",
    data: { targetUsers: targetUsers },
    success: function (result) {
      if (result) {
        targetUsers.forEach(function (uid) {
          $(".noti_content").find(`div[data-uid=${uid}]`).removeClass("notif-readed-false");
          $("ul.list-notifications").find(`li>div[data-uid=${uid}]`).removeClass("notif-readed-false");
        });
        decreaseNumberNotification("noti_counter", targetUsers.length);
      }
    },
  });
}

$(document).ready(function () {
  // Link at group notifications
  $("#popup-mark-notif-as-read").bind("click", function () {
    let targetUsers = [];
    $(".noti_content")
      .find("div.notif-readed-false")
      .each(function (index, notification) {
        targetUsers.push($(notification).data("uid"));
      });
    if (!targetUsers.length) {
      alertify.notify("Bạn không có thông báo mới để đọc", "error", 4);
      return false;
    }
    markNotificationsAsRead(targetUsers);
  });

  // Link at mdal notifications
  $("#modal-mark-notif-as-read").bind("click", function () {
    let targetUsers = [];
    $("ul.list-notifications")
      .find("li>div.notif-readed-false")
      .each(function (index, notification) {
        targetUsers.push($(notification).data("uid"));
      });
      if (!targetUsers.length) {
        alertify.notify("Bạn không có thông báo mới để đọc", "error", 4);
        return false;
      }
      markNotificationsAsRead(targetUsers);
  });
});
