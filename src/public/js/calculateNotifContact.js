function decreaseNumberNotifContact(className, number) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue -= number;

  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
}

function increaseNumberNotifContact(className, number) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue += number;

  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
}
