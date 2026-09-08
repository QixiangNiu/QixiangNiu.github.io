(function () {
  "use strict";

  var badge = document.querySelector(".visitor-count-badge");
  if (!badge) return;

  var sessionKey = "qixiangniu-visit-counted";
  var source = badge.getAttribute("data-read-src");

  try {
    if (!window.sessionStorage.getItem(sessionKey)) {
      window.sessionStorage.setItem(sessionKey, "1");
      source = badge.getAttribute("data-count-src");
    }
  } catch (error) {
    // If browser storage is unavailable, read the count without incrementing it.
  }

  if (source) badge.src = source;
})();
