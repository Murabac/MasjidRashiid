/* Shared screen settings for rashiid.m2btek.com. Other copies only follow that site. */
var MasjidSync = (function () {
  var SITE = "rashiid.m2btek.com";
  var REMOTE = "https://rashiid.m2btek.com/api/settings";
  var updatedAt = "";
  var pending = null;
  var pushTimer = null;

  function mode() {
    if (location.hostname === SITE) return "live";
    if (location.protocol === "file:") return "follow";
    return "off";
  }

  function endpoint() {
    return mode() === "live" ? "/api/settings" : REMOTE;
  }

  function pull() {
    if (mode() === "off") return Promise.resolve(null);
    return fetch(endpoint(), { cache: "no-store" }).then(function (response) {
      if (!response.ok) return null;
      return response.json();
    }).catch(function () {
      return null;
    });
  }

  function push(partial) {
    if (mode() !== "live" || !partial) return;
    pending = pending || {};
    if (partial.settings) pending.settings = partial.settings;
    if (partial.athkaar) pending.athkaar = partial.athkaar;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(flush, 500);
  }

  function flush() {
    var body = pending;
    pending = null;
    if (!body) return;
    fetch("/api/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.ok ? response.json() : null;
    }).then(function (data) {
      if (data && data.updatedAt) updatedAt = data.updatedAt;
    }).catch(function () {});
  }

  function start(handlers) {
    if (mode() === "off") return;
    function tick() {
      pull().then(function (data) {
        if (!data) return;
        if (!data.updatedAt) {
          if (mode() === "live") push(handlers.snapshot());
          return;
        }
        if (data.updatedAt === updatedAt) return;
        if (handlers.busy()) return;
        updatedAt = data.updatedAt;
        handlers.apply(data);
      });
    }
    tick();
    setInterval(tick, 15000);
  }

  return { mode: mode, push: push, start: start };
})();
