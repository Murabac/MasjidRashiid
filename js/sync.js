/* Shared screen settings for rashiid.m2btek.com. Other copies only follow that site. */
var MasjidSync = (function () {
  var SITE = "rashiid.m2btek.com";
  var ORIGIN = "https://rashiid.m2btek.com";
  var updatedAt = "";
  var seen = false;
  var writing = false;
  var pending = null;
  var pushTimer = null;

  function mode() {
    if (location.hostname === SITE) return "live";
    if (location.protocol === "file:") return "follow";
    return "off";
  }

  function endpoint() {
    return mode() === "live" ? "/api/settings" : ORIGIN + "/api/settings";
  }

  function imageUrl(rev) {
    var base = mode() === "live" ? "/api/announcement" : ORIGIN + "/api/announcement";
    return base + "?rev=" + encodeURIComponent(rev || "");
  }

  function quiet() {
    return { then: function () { return this; } };
  }

  function pull() {
    if (mode() === "off" || typeof fetch !== "function" || typeof Promise === "undefined") return quiet();
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
    pushTimer = setTimeout(flush, 300);
  }

  function flush() {
    var body = pending;
    pending = null;
    if (!body) return;
    writing = true;
    fetch("/api/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.ok ? response.json() : null;
    }).then(function (data) {
      if (data && data.updatedAt) {
        updatedAt = data.updatedAt;
        seen = true;
      }
    }).catch(function () {}).then(function () {
      writing = false;
    });
  }

  function uploadImage(blob) {
    if (mode() !== "live") return Promise.resolve({ ok: false, status: 0 });
    return fetch("/api/announcement", {
      method: "PUT",
      headers: { "content-type": blob.type || "image/jpeg" },
      body: blob
    }).then(function (response) {
      return { ok: response.ok, status: response.status };
    }).catch(function () {
      return { ok: false, status: 0 };
    });
  }

  function deleteImage() {
    if (mode() !== "live") return Promise.resolve(false);
    return fetch("/api/announcement", { method: "DELETE" }).then(function (response) {
      return response.ok;
    }).catch(function () {
      return false;
    });
  }

  function start(handlers) {
    if (mode() === "off") return;
    function tick() {
      pull().then(function (data) {
        if (!data) return;
        if (!data.updatedAt) {
          if (mode() === "live" && !writing) push(handlers.snapshot());
          return;
        }
        if (!seen) {
          seen = true;
          updatedAt = data.updatedAt;
          if (!handlers.busy()) handlers.apply(data);
          return;
        }
        if (data.updatedAt === updatedAt || writing || handlers.busy()) return;
        try { sessionStorage.setItem("masjid-want-fill", "1"); } catch (err) {}
        location.reload();
      });
    }
    tick();
    setInterval(tick, 2000);
  }

  return {
    mode: mode,
    push: push,
    start: start,
    imageUrl: imageUrl,
    uploadImage: uploadImage,
    deleteImage: deleteImage
  };
})();
