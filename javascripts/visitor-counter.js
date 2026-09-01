(function () {
  "use strict";

  var badge = document.querySelector(".visitor-count-badge");
  if (!badge) return;

  var sessionKey = "qixiangniu-visit-counted";
  var source = badge.getAttribute("data-count-src");

  try {
    if (window.sessionStorage.getItem(sessionKey)) {
      source = badge.getAttribute("data-read-src");
    } else {
      window.sessionStorage.setItem(sessionKey, "1");
    }
  } catch (error) {
    source = badge.getAttribute("data-read-src");
  }

  badge.src = source;
})();
