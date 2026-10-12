/* Masjid Rashiid hall screen. Times are for Hargeisa, East Africa Time, on any computer. */
(function () {
  var TZ = "Africa/Mogadishu";
  var TZ_HOURS = 3;
  var STORAGE_KEY = "masjid-rashiid-settings";
  var METHODS = { MWL: 1, Egypt: 1, Makkah: 1, Karachi: 1, ISNA: 1 };
  var PRAYERS = [
    { key: "fajr", en: "Fajr", ar: "الفجر" },
    { key: "dhuhr", en: "Dhuhr", ar: "الظهر", fridayEn: "Jumu'ah", fridayAr: "الجمعة" },
    { key: "asr", en: "Asr", ar: "العصر" },
    { key: "maghrib", en: "Maghrib", ar: "المغرب" },
    { key: "isha", en: "Isha", ar: "العشاء" }
  ];

  var NOTICE_ICONS = {
    phone: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="8" width="22" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M21 40 h8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M42 24 c4 3 4 13 0 16 M48 18 c8 6 8 22 0 28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M40 42 L56 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    talk: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="4"/><path d="M20 24 h16 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-6 l-6 6 v-6 h-4 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M16 48 L48 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    walk: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="34" cy="20" r="3.5" fill="currentColor"/><path d="M34 25 l-6 8 h8 l4 12 M28 33 l-6 12 M36 29 l8 4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 48 L48 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    run: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="38" cy="18" r="3.5" fill="currentColor"/><path d="M36 22 l-10 6 6 4 -2 10 M32 32 l10 2 M28 42 l-8 8 M34 42 l8 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 48 L48 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    rubbish: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 26 h16 l-1.5 16 h-13 z M22 26 h20 M28 23 h8" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M16 48 L48 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    food: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 18 v16 M21 18 v8 M27 18 v8 M24 34 v12 M36 18 h6 v8 a6 6 0 0 1 -6 6 v14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 48 L48 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
  };
  var NOTICE_ICON_NAMES = {
    phone: "Phone",
    talk: "Talking",
    walk: "Walking",
    run: "Running",
    rubbish: "Rubbish",
    food: "Food"
  };

  function defaultNotices() {
    return [
      { icon: "phone", so: "Aamusiya telefoonnadiinna", ar: "أَسْكِتُوا هَوَاتِفَكُمْ", en: "Silence your phones" },
      { icon: "talk", so: "Ha ku hadlina masjidka", ar: "لَا تَتَحَدَّثُوا فِي الْمَسْجِدِ", en: "Do not talk in the masjid" },
      { icon: "walk", so: "Ha ka hor marina qofka tukada", ar: "لَا تَمُرُّوا أَمَامَ الْمُصَلِّي", en: "Do not walk in front of someone praying" },
      { icon: "run", so: "Ha ku orodina masjidka", ar: "لَا تَرْكُضُوا فِي الْمَسْجِدِ", en: "Do not run in the masjid" },
      { icon: "rubbish", so: "Ha ku tuurina qashinka", ar: "لَا تُلْقُوا الْأَوْسَاخَ", en: "Do not throw rubbish" },
      { icon: "food", so: "Ha cunina hana cabina musallada", ar: "لَا تَأْكُلُوا وَلَا تَشْرَبُوا فِي الْمُصَلَّى", en: "Do not eat or drink in the prayer hall" }
    ];
  }

  function cleanNotice(item) {
    if (!item || typeof item !== "object") return null;
    var icon = NOTICE_ICONS[item.icon] ? item.icon : "phone";
    var so = String(item.so || "").trim();
    var ar = String(item.ar || "").trim();
    var en = String(item.en || "").trim();
    if (!so && !ar && !en) return null;
    return { icon: icon, so: so, ar: ar, en: en };
  }

  var pt = new PrayTimes("MWL");
  var settings = loadSettings();
  var virtualOrigin = null;
  var virtualStart = Date.now();
  var timesSig = "";
  var slideSig = "";
  var noticeSig = "";
  var noticeEditorReady = false;

  var el = {
    nameEn: document.getElementById("name-en"),
    nameAr: document.getElementById("name-ar"),
    dates: document.getElementById("dates"),
    clock: document.getElementById("clock"),
    nextLabel: document.getElementById("next-label"),
    nextValue: document.getElementById("next-value"),
    rows: document.getElementById("rows"),
    frame: document.getElementById("frame"),
    modeAr: document.getElementById("mode-ar"),
    fitBox: document.getElementById("athkaar-fit"),
    athkaarText: document.getElementById("athkaar-text"),
    athkaarNote: document.getElementById("athkaar-note"),
    slideCount: document.getElementById("slide-count"),
    iq: document.getElementById("iq"),
    iqEn: document.getElementById("iq-en"),
    iqAr: document.getElementById("iq-ar"),
    iqCount: document.getElementById("iq-count"),
    full: document.getElementById("full"),
    fullAr: document.getElementById("full-ar"),
    fullEn: document.getElementById("full-en"),
    notice: document.getElementById("notice"),
    noticeIcon: document.getElementById("notice-icon"),
    noticeSo: document.getElementById("notice-so"),
    noticeAr: document.getElementById("notice-ar"),
    noticeEn: document.getElementById("notice-en"),
    preview: document.getElementById("preview"),
    settings: document.getElementById("settings"),
    stage: document.getElementById("stage")
  };

  function defaultSettings() {
    return {
      nameEn: "Masjid Rashiid",
      nameAr: "مسجد رشيد",
      method: "MWL",
      asr: "Standard",
      lat: 9.5624,
      lng: 44.077,
      iqamah: { fajr: 20, dhuhr: 15, asr: 15, maghrib: 10, isha: 15, jumuah: 30 },
      salahMinutes: 10,
      jumuahMinutes: 40,
      afterMinutes: 60,
      afterSlide: 25,
      generalSlide: 30,
      noticesOn: true,
      noticeFor: 5,
      noticeEvery: 60,
      notices: defaultNotices()
    };
  }

  function clamp(value, fallback, min, max) {
    var n = Number(value);
    if (!isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }

  function settingsFrom(raw) {
    var base = defaultSettings();
    if (!raw || typeof raw !== "object") return base;
    try {
      base.nameEn = String(raw.nameEn || base.nameEn);
      base.nameAr = String(raw.nameAr || base.nameAr);
      if (METHODS[raw.method]) base.method = raw.method;
      if (raw.asr === "Hanafi" || raw.asr === "Standard") base.asr = raw.asr;
      base.lat = clamp(raw.lat, base.lat, -90, 90);
      base.lng = clamp(raw.lng, base.lng, -180, 180);
      var iq = raw.iqamah || {};
      Object.keys(base.iqamah).forEach(function (key) {
        base.iqamah[key] = clamp(iq[key], base.iqamah[key], 0, 180);
      });
      base.salahMinutes = clamp(raw.salahMinutes, base.salahMinutes, 1, 180);
      base.jumuahMinutes = clamp(raw.jumuahMinutes, base.jumuahMinutes, 1, 180);
      base.afterMinutes = clamp(raw.afterMinutes, base.afterMinutes, 1, 180);
      base.afterSlide = clamp(raw.afterSlide, base.afterSlide, 5, 120);
      base.generalSlide = clamp(raw.generalSlide, base.generalSlide, 5, 120);
      base.noticesOn = raw.noticesOn !== false;
      base.noticeFor = clamp(raw.noticeFor, base.noticeFor, 3, 30);
      base.noticeEvery = clamp(raw.noticeEvery, base.noticeEvery, 15, 600);
      if (base.noticeFor >= base.noticeEvery) base.noticeEvery = Math.min(600, base.noticeFor + 1);
      if (Array.isArray(raw.notices)) {
        var loaded = raw.notices.map(cleanNotice).filter(Boolean);
        var missingSomali = loaded.length && loaded.every(function (item) { return !item.so; });
        base.notices = missingSomali ? defaultNotices() : loaded;
      }
    } catch (err) {
      return defaultSettings();
    }
    return base;
  }

  function loadSettings() {
    try {
      return settingsFrom(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
    } catch (err) {
      return defaultSettings();
    }
  }

  function saveSettings(next, localOnly) {
    settings = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    timesSig = "";
    slideSig = "";
    noticeSig = "";
    applyNames();
    tick();
    if (!localOnly && window.MasjidSync) MasjidSync.push({ settings: next });
  }

  function partsInHargeisa(date) {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      hourCycle: "h23"
    });
    var bag = {};
    fmt.formatToParts(date).forEach(function (part) {
      if (part.type !== "literal") bag[part.type] = part.value;
    });
    var hour = Number(bag.hour);
    if (hour === 24) hour = 0;
    return {
      year: Number(bag.year),
      month: Number(bag.month),
      day: Number(bag.day),
      hour: hour,
      minute: Number(bag.minute),
      second: Number(bag.second),
      weekday: bag.weekday
    };
  }

  function wallToDate(y, m, d, hh, mm, ss) {
    return new Date(Date.UTC(y, m - 1, d, hh - TZ_HOURS, mm, ss || 0));
  }

  function shiftDay(y, m, d, days) {
    var noon = wallToDate(y, m, d, 12, 0, 0);
    return partsInHargeisa(new Date(noon.getTime() + days * 86400000));
  }

  function now() {
    if (!virtualOrigin) return new Date();
    return new Date(virtualOrigin.getTime() + (Date.now() - virtualStart));
  }

  function parseTestClock(value) {
    var match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value || "");
    if (!match) return null;
    return wallToDate(+match[1], +match[2], +match[3], +match[4], +match[5], +(match[6] || 0));
  }

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function formatClock(date) {
    var p = partsInHargeisa(date);
    var h = p.hour;
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return { hms: h + ":" + pad(p.minute) + ":" + pad(p.second), ap: ap };
  }

  function formatWall(date) {
    var p = partsInHargeisa(date);
    var h = p.hour;
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + pad(p.minute) + " " + ap;
  }

  function formatSpan(ms) {
    if (ms < 0) ms = 0;
    var total = Math.floor(ms / 1000);
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    if (h) return h + ":" + pad(m) + ":" + pad(s);
    return pad(m) + ":" + pad(s);
  }

  function formatHM(date) {
    var p = partsInHargeisa(date);
    var h = p.hour % 12 || 12;
    return h + ":" + pad(p.minute);
  }

  function labelFor(key, friday) {
    for (var i = 0; i < PRAYERS.length; i++) {
      if (PRAYERS[i].key === key) {
        var item = PRAYERS[i];
        if (friday && item.fridayEn) return { en: item.fridayEn, ar: item.fridayAr };
        return { en: item.en, ar: item.ar };
      }
    }
    return { en: key, ar: "" };
  }

  function daySchedule(y, m, d) {
    var friday = partsInHargeisa(wallToDate(y, m, d, 12, 0, 0)).weekday === "Fri";
    pt.setMethod(settings.method);
    pt.adjust({ asr: settings.asr });
    var times = pt.getTimes([y, m, d], [settings.lat, settings.lng], TZ_HOURS, 0);
    var salah = PRAYERS.map(function (item) {
      var stamp = times[item.key];
      if (!stamp || stamp === "-----") return null;
      var bits = stamp.split(":");
      var adhan = wallToDate(y, m, d, Number(bits[0]), Number(bits[1]), 0);
      var iqamahMin = friday && item.key === "dhuhr" ? settings.iqamah.jumuah : settings.iqamah[item.key];
      var lengthMin = friday && item.key === "dhuhr" ? settings.jumuahMinutes : settings.salahMinutes;
      var iqamah = new Date(adhan.getTime() + iqamahMin * 60000);
      var end = new Date(iqamah.getTime() + lengthMin * 60000);
      var names = labelFor(item.key, friday);
      return {
        key: item.key,
        en: names.en,
        ar: names.ar,
        adhan: adhan,
        iqamah: iqamah,
        end: end,
        afterUntil: new Date(end.getTime() + settings.afterMinutes * 60000)
      };
    }).filter(Boolean);

    var sunrise = null;
    if (times.sunrise && times.sunrise !== "-----") {
      var sun = times.sunrise.split(":");
      sunrise = wallToDate(y, m, d, Number(sun[0]), Number(sun[1]), 0);
    }
    return { friday: friday, salah: salah, sunrise: sunrise };
  }

  function collect(moment) {
    var today = partsInHargeisa(moment);
    var spans = [-1, 0, 1].map(function (delta) {
      var p = shiftDay(today.year, today.month, today.day, delta);
      return daySchedule(p.year, p.month, p.day);
    });
    var prayers = spans[0].salah.concat(spans[1].salah, spans[2].salah);
    var previous = null;
    var next = null;
    prayers.forEach(function (prayer) {
      if (prayer.adhan.getTime() <= moment.getTime()) previous = prayer;
      if (!next && prayer.adhan.getTime() > moment.getTime()) next = prayer;
    });
    return {
      today: spans[1],
      previous: previous,
      next: next
    };
  }

  function phaseOf(schedule, moment) {
    var previous = schedule.previous;
    if (!previous) return { kind: "general", prayer: null, period: "general" };
    if (moment.getTime() < previous.end.getTime()) {
      return { kind: "salah", prayer: previous, period: "general" };
    }
    if (moment.getTime() < previous.afterUntil.getTime()) {
      return { kind: "after", prayer: previous, period: "general" };
    }
    var period = "general";
    if (previous.key === "fajr") period = "morning";
    if (previous.key === "asr") period = "evening";
    return { kind: "general", prayer: previous, period: period };
  }

  function applyNames() {
    el.nameEn.textContent = settings.nameEn;
    el.nameAr.textContent = settings.nameAr;
    document.title = settings.nameEn;
  }

  function renderClock(moment) {
    var clock = formatClock(moment);
    el.clock.replaceChildren(document.createTextNode(clock.hms + " "));
    var mark = document.createElement("small");
    mark.textContent = clock.ap;
    el.clock.appendChild(mark);

    var gregorian = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(moment);
    var hijri = "";
    try {
      hijri = new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
        timeZone: TZ,
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(moment);
    } catch (err) {
      hijri = "";
    }
    el.dates.replaceChildren();
    if (hijri) {
      var bold = document.createElement("b");
      bold.textContent = /AH/.test(hijri) ? hijri : hijri + " AH";
      el.dates.appendChild(bold);
      el.dates.appendChild(document.createElement("br"));
    }
    el.dates.appendChild(document.createTextNode(gregorian));
  }

  function renderNext(schedule, moment) {
    var focus = schedule.next;
    if (!focus) return;
    el.nextLabel.replaceChildren(document.createTextNode("Next prayer — " + focus.en + "  "));
    var ar = document.createElement("span");
    ar.className = "ar";
    ar.lang = "ar";
    ar.textContent = focus.ar;
    el.nextLabel.appendChild(ar);
    el.nextValue.textContent = formatSpan(focus.adhan - moment);
  }

  function renderTimes(schedule, phase, moment) {
    var nowMs = moment.getTime();
    var todayNext = schedule.next && schedule.today.salah.some(function (prayer) {
      return prayer.adhan.getTime() === schedule.next.adhan.getTime();
    });
    var highlight = "";
    if (phase.kind === "salah" && phase.prayer && schedule.today.salah.some(function (prayer) {
      return prayer.adhan.getTime() === phase.prayer.adhan.getTime();
    })) {
      highlight = phase.prayer.key;
    } else if (todayNext) {
      highlight = schedule.next.key;
    }
    var sunPast = schedule.today.sunrise && schedule.today.sunrise.getTime() <= nowMs;
    var past = schedule.today.salah.filter(function (prayer) {
      return prayer.key !== highlight && prayer.end.getTime() <= nowMs;
    }).map(function (prayer) { return prayer.key; }).join(",");
    var rows = schedule.today.salah.map(function (prayer) {
      return prayer.key + formatHM(prayer.adhan) + formatHM(prayer.iqamah);
    }).join("|");
    var sun = schedule.today.sunrise ? formatHM(schedule.today.sunrise) : "";
    var sig = rows + "|" + sun + "|" + highlight + "|" + past + "|" + (sunPast ? "1" : "0") + "|" + (schedule.today.friday ? "f" : "d");
    if (sig === timesSig) return;
    timesSig = sig;
    el.rows.replaceChildren();

    var head = document.createElement("div");
    head.className = "row head";
    head.innerHTML = '<div class="n"><span></span></div><div class="t">Adhan</div><div class="t">Iqamah</div>';
    el.rows.appendChild(head);

    function addRow(nameEn, nameAr, adhan, iqamah, opts) {
      var row = document.createElement("div");
      row.className = "row" + (opts.sun ? " sun" : "") + (opts.hl ? " hl" : "") + (opts.past ? " past" : "");
      var name = document.createElement("div");
      name.className = "n";
      var en = document.createElement("span");
      en.textContent = nameEn;
      var ar = document.createElement("span");
      ar.className = "ar";
      ar.lang = "ar";
      ar.textContent = nameAr;
      name.append(en, ar);
      var adhanCell = document.createElement("div");
      adhanCell.className = "t";
      adhanCell.textContent = adhan;
      var iqamahCell = document.createElement("div");
      iqamahCell.className = "t";
      iqamahCell.textContent = iqamah;
      row.append(name, adhanCell, iqamahCell);
      el.rows.appendChild(row);
    }

    schedule.today.salah.forEach(function (prayer) {
      if (prayer.key === "dhuhr" && schedule.today.sunrise) {
        addRow("Sunrise", "الشروق", formatHM(schedule.today.sunrise), "", { sun: true, past: sunPast, hl: false });
      }
      addRow(prayer.en, prayer.ar, formatHM(prayer.adhan), formatHM(prayer.iqamah), {
        hl: prayer.key === highlight,
        past: past.split(",").indexOf(prayer.key) !== -1
      });
    });
  }

  function fitAthkaar() {
    var text = el.athkaarText;
    var box = el.fitBox;
    if (el.frame.hidden || !text.textContent) return;
    var noteSpace = el.athkaarNote.textContent ? el.athkaarNote.offsetHeight + 12 : 0;
    var available = box.clientHeight - noteSpace;
    if (available < 60) available = box.clientHeight;
    var lo = 48;
    var hi = 280;
    var best = 48;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      text.style.fontSize = mid + "px";
      if (text.scrollHeight <= available + 1 && text.scrollWidth <= text.clientWidth + 4) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    text.style.fontSize = best + "px";
  }

  function renderStage(schedule, phase, moment) {
    var prayer = phase.prayer;
    var waitingIqamah = phase.kind === "salah" && prayer && moment.getTime() < prayer.iqamah.getTime();
    var inSalah = phase.kind === "salah" && prayer && !waitingIqamah;

    el.iq.hidden = !waitingIqamah;
    el.full.hidden = !inSalah;
    el.frame.hidden = waitingIqamah || inSalah;

    if (waitingIqamah) {
      el.iqEn.textContent = prayer.en;
      el.iqAr.textContent = prayer.ar;
      el.iqCount.textContent = formatSpan(prayer.iqamah - moment);
      return;
    }

    if (inSalah) {
      var fullId = "salah:" + prayer.key + ":" + prayer.adhan.getTime();
      if (slideSig !== fullId) {
        slideSig = fullId;
        el.fullAr.textContent = prayer.ar;
        el.fullEn.textContent = prayer.en;
      }
      return;
    }

    var slides = [];
    var index = 0;
    var modeAr = "";
    if (phase.kind === "after" && prayer) {
      slides = ATHKAAR.afterSlides(prayer.key);
      var elapsed = moment - prayer.end;
      index = Math.floor(elapsed / (settings.afterSlide * 1000));
      if (index < 0) index = 0;
      index = index % slides.length;
      modeAr = "بعد " + prayer.ar;
    } else {
      slides = ATHKAAR.generalSlides(phase.period);
      var start = prayer ? prayer.afterUntil.getTime() : moment.getTime();
      var generalElapsed = moment.getTime() - start;
      index = Math.floor(generalElapsed / (settings.generalSlide * 1000));
      if (index < 0) index = 0;
      index = index % slides.length;
      if (phase.period === "morning") modeAr = "أذكار الصباح";
      else if (phase.period === "evening") modeAr = "أذكار المساء";
      else modeAr = "أذكار";
    }

    var slide = slides[index];
    var id = phase.kind + ":" + phase.period + ":" + (prayer ? prayer.key : "") + ":" + index + ":" + slide.lines[0];
    el.modeAr.textContent = modeAr;
    el.slideCount.textContent = (index + 1) + "  /  " + slides.length;
    if (id === slideSig) return;
    slideSig = id;
    el.athkaarText.replaceChildren();
    slide.lines.forEach(function (line) {
      var p = document.createElement("p");
      p.textContent = line;
      el.athkaarText.appendChild(p);
    });
    el.athkaarNote.textContent = slide.note || "";
    fitAthkaar();
  }

  function renderNotice(moment, phase) {
    var messages = settings.notices.filter(function (item) {
      return item.so || item.ar || item.en;
    });
    var p = partsInHargeisa(moment);
    var total = p.hour * 3600 + p.minute * 60 + p.second;
    var into = total % settings.noticeEvery;
    var show = settings.noticesOn && messages.length && phase.kind !== "salah" && into < settings.noticeFor;
    el.notice.hidden = !show;
    if (!show) {
      noticeSig = "";
      return;
    }
    var index = Math.floor(total / settings.noticeEvery) % messages.length;
    var item = messages[index];
    var id = index + ":" + item.icon + ":" + item.so + ":" + item.ar + ":" + item.en;
    if (id === noticeSig) return;
    noticeSig = id;
    el.noticeIcon.innerHTML = NOTICE_ICONS[item.icon] || NOTICE_ICONS.phone;
    el.noticeSo.textContent = item.so;
    el.noticeAr.textContent = item.ar;
    el.noticeEn.textContent = item.en;
  }

  function tick() {
    var moment = now();
    var schedule = collect(moment);
    var phase = phaseOf(schedule, moment);
    renderClock(moment);
    renderNext(schedule, moment);
    renderTimes(schedule, phase, moment);
    renderStage(schedule, phase, moment);
    renderNotice(moment, phase);
  }

  function fitStage() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    el.stage.style.transform = "scale(" + scale + ")";
    el.stage.style.left = ((window.innerWidth - 1920 * scale) / 2) + "px";
    el.stage.style.top = ((window.innerHeight - 1080 * scale) / 2) + "px";
    fitAthkaar();
  }

  function fieldMap() {
    return {
      "set-name-en": settings.nameEn,
      "set-name-ar": settings.nameAr,
      "set-method": settings.method,
      "set-asr": settings.asr,
      "set-lat": settings.lat,
      "set-lng": settings.lng,
      "set-iq-fajr": settings.iqamah.fajr,
      "set-iq-dhuhr": settings.iqamah.dhuhr,
      "set-iq-asr": settings.iqamah.asr,
      "set-iq-maghrib": settings.iqamah.maghrib,
      "set-iq-isha": settings.iqamah.isha,
      "set-iq-jumuah": settings.iqamah.jumuah,
      "set-salah": settings.salahMinutes,
      "set-jumuah": settings.jumuahMinutes,
      "set-after": settings.afterMinutes,
      "set-after-slide": settings.afterSlide,
      "set-general-slide": settings.generalSlide,
      "set-notice-for": settings.noticeFor,
      "set-notice-every": settings.noticeEvery
    };
  }

  function fillForm() {
    var map = fieldMap();
    Object.keys(map).forEach(function (id) {
      document.getElementById(id).value = map[id];
    });
    document.getElementById("set-notice-on").checked = settings.noticesOn !== false;
    renderNoticeEditor();
  }

  function readForm() {
    var next = defaultSettings();
    next.nameEn = document.getElementById("set-name-en").value.trim() || next.nameEn;
    next.nameAr = document.getElementById("set-name-ar").value.trim() || next.nameAr;
    var method = document.getElementById("set-method").value;
    var asr = document.getElementById("set-asr").value;
    if (METHODS[method]) next.method = method;
    if (asr === "Hanafi" || asr === "Standard") next.asr = asr;
    next.lat = clamp(document.getElementById("set-lat").value, next.lat, -90, 90);
    next.lng = clamp(document.getElementById("set-lng").value, next.lng, -180, 180);
    next.iqamah.fajr = clamp(document.getElementById("set-iq-fajr").value, next.iqamah.fajr, 0, 180);
    next.iqamah.dhuhr = clamp(document.getElementById("set-iq-dhuhr").value, next.iqamah.dhuhr, 0, 180);
    next.iqamah.asr = clamp(document.getElementById("set-iq-asr").value, next.iqamah.asr, 0, 180);
    next.iqamah.maghrib = clamp(document.getElementById("set-iq-maghrib").value, next.iqamah.maghrib, 0, 180);
    next.iqamah.isha = clamp(document.getElementById("set-iq-isha").value, next.iqamah.isha, 0, 180);
    next.iqamah.jumuah = clamp(document.getElementById("set-iq-jumuah").value, next.iqamah.jumuah, 0, 180);
    next.salahMinutes = clamp(document.getElementById("set-salah").value, next.salahMinutes, 1, 180);
    next.jumuahMinutes = clamp(document.getElementById("set-jumuah").value, next.jumuahMinutes, 1, 180);
    next.afterMinutes = clamp(document.getElementById("set-after").value, next.afterMinutes, 1, 180);
    next.afterSlide = clamp(document.getElementById("set-after-slide").value, next.afterSlide, 5, 120);
    next.generalSlide = clamp(document.getElementById("set-general-slide").value, next.generalSlide, 5, 120);
    next.noticesOn = document.getElementById("set-notice-on").checked;
    next.noticeFor = clamp(document.getElementById("set-notice-for").value, next.noticeFor, 3, 30);
    next.noticeEvery = clamp(document.getElementById("set-notice-every").value, next.noticeEvery, 15, 600);
    if (next.noticeFor >= next.noticeEvery) next.noticeEvery = Math.min(600, next.noticeFor + 1);
    if (!noticeEditorReady) {
      next.notices = settings.notices.map(function (item) {
        return { icon: item.icon, so: item.so, ar: item.ar, en: item.en };
      });
    } else {
      next.notices = [];
      document.querySelectorAll("#notice-list .notice-row").forEach(function (row) {
        var icon = row.querySelector(".notice-icon").value;
        next.notices.push({
          icon: NOTICE_ICONS[icon] ? icon : "phone",
          so: row.querySelector(".notice-so").value.trim(),
          ar: row.querySelector(".notice-ar").value.trim(),
          en: row.querySelector(".notice-en").value.trim()
        });
      });
    }
    return next;
  }

  function renderNoticeEditor() {
    var box = document.getElementById("notice-list");
    box.replaceChildren();
    settings.notices.forEach(function (item, index) {
      var row = document.createElement("div");
      row.className = "notice-row";
      var select = document.createElement("select");
      select.className = "notice-icon";
      Object.keys(NOTICE_ICON_NAMES).forEach(function (key) {
        var option = document.createElement("option");
        option.value = key;
        option.textContent = NOTICE_ICON_NAMES[key];
        select.appendChild(option);
      });
      select.value = NOTICE_ICONS[item.icon] ? item.icon : "phone";
      var so = document.createElement("input");
      so.className = "notice-so";
      so.lang = "so";
      so.value = item.so || "";
      so.placeholder = "Aamusiya telefoonnadiinna";
      so.setAttribute("autocomplete", "off");
      var ar = document.createElement("input");
      ar.className = "notice-ar";
      ar.lang = "ar";
      ar.dir = "rtl";
      ar.value = item.ar;
      ar.placeholder = "لَا تَفْعَلُوا";
      ar.setAttribute("autocomplete", "off");
      var en = document.createElement("input");
      en.className = "notice-en";
      en.value = item.en;
      en.placeholder = "Do not…";
      en.setAttribute("autocomplete", "off");
      var remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", function () {
        var next = readForm();
        next.notices.splice(index, 1);
        saveSettings(next);
        renderNoticeEditor();
      });
      row.appendChild(select);
      row.appendChild(so);
      row.appendChild(ar);
      row.appendChild(en);
      row.appendChild(remove);
      box.appendChild(row);
    });
    noticeEditorReady = true;
  }

  function openSettings() {
    closeAthkaar();
    fillForm();
    el.settings.hidden = false;
  }

  function closeSettings() {
    el.settings.hidden = true;
  }

  var athkaarList = "after";

  function athkaarPanel() {
    return document.getElementById("athkaar-editor");
  }

  function closeAthkaar() {
    athkaarPanel().hidden = true;
  }

  function previewLines(slide) {
    var text = document.createElement("div");
    var body = document.createElement("p");
    body.textContent = slide.lines.join("\n");
    text.appendChild(body);
    if (slide.note) {
      var note = document.createElement("p");
      note.className = "note";
      note.textContent = slide.note;
      text.appendChild(note);
    }
    return text;
  }

  function renderAthkaarEditor() {
    document.querySelectorAll("#athkaar-switch button").forEach(function (button) {
      button.classList.toggle("is-on", button.getAttribute("data-list") === athkaarList);
    });
    var builtin = document.getElementById("athkaar-builtin");
    var custom = document.getElementById("athkaar-custom");
    builtin.replaceChildren();
    custom.replaceChildren();
    ATHKAAR.builtin(athkaarList).forEach(function (slide) {
      var item = document.createElement("div");
      item.className = "athkaar-item";
      item.appendChild(previewLines(slide));
      builtin.appendChild(item);
    });
    var added = ATHKAAR.loadExtra()[athkaarList];
    if (!added.length) {
      var empty = document.createElement("p");
      empty.className = "athkaar-empty";
      empty.textContent = "None added yet.";
      custom.appendChild(empty);
      return;
    }
    added.forEach(function (slide, index) {
      var item = document.createElement("div");
      item.className = "athkaar-item";
      item.appendChild(previewLines(slide));
      var remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", function () {
        var extra = ATHKAAR.loadExtra();
        extra[athkaarList].splice(index, 1);
        ATHKAAR.saveExtra(extra);
        slideSig = "";
        renderAthkaarEditor();
      });
      item.appendChild(remove);
      custom.appendChild(item);
    });
  }

  function openAthkaar() {
    closeSettings();
    renderAthkaarEditor();
    athkaarPanel().hidden = false;
    document.getElementById("athkaar-new").focus();
  }

  function addAthkaar() {
    var lines = document.getElementById("athkaar-new").value.split(/\n/).map(function (line) {
      return line.trim();
    }).filter(Boolean);
    if (!lines.length) return;
    var note = document.getElementById("athkaar-new-note").value.trim();
    var extra = ATHKAAR.loadExtra();
    var slide = { lines: lines };
    if (note) slide.note = note;
    extra[athkaarList].push(slide);
    ATHKAAR.saveExtra(extra);
    document.getElementById("athkaar-new").value = "";
    document.getElementById("athkaar-new-note").value = "";
    slideSig = "";
    renderAthkaarEditor();
  }

  document.addEventListener("keydown", function (event) {
    var tag = event.target && event.target.tagName;
    var typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    if (event.key === "Escape") {
      closeSettings();
      closeAthkaar();
      return;
    }
    if (event.metaKey || event.ctrlKey || event.altKey || typing) return;
    if (event.key === "s" || event.key === "S") {
      event.preventDefault();
      if (el.settings.hidden) openSettings();
      else closeSettings();
    }
    if (event.key === "a" || event.key === "A") {
      event.preventDefault();
      if (athkaarPanel().hidden) openAthkaar();
      else closeAthkaar();
    }
  });

  el.settings.addEventListener("input", function () {
    saveSettings(readForm());
  });
  el.settings.addEventListener("change", function () {
    saveSettings(readForm());
  });
  document.getElementById("notice-add").addEventListener("click", function () {
    var next = readForm();
    next.notices.push({ icon: "phone", so: "", ar: "", en: "" });
    saveSettings(next);
    renderNoticeEditor();
    var fields = document.querySelectorAll("#notice-list .notice-so");
    if (fields.length) fields[fields.length - 1].focus();
  });
  document.getElementById("set-close").addEventListener("click", closeSettings);
  document.getElementById("set-reset").addEventListener("click", function () {
    saveSettings(defaultSettings());
    fillForm();
  });
  document.getElementById("athkaar-switch").addEventListener("click", function (event) {
    var list = event.target.getAttribute("data-list");
    if (!list) return;
    athkaarList = list;
    renderAthkaarEditor();
  });
  document.getElementById("athkaar-add").addEventListener("click", addAthkaar);
  document.getElementById("athkaar-close").addEventListener("click", closeAthkaar);
  athkaarPanel().addEventListener("submit", function (event) {
    event.preventDefault();
    addAthkaar();
  });

  var testValue = new URLSearchParams(location.search).get("at");
  virtualOrigin = parseTestClock(testValue);
  if (virtualOrigin) el.preview.hidden = false;

  applyNames();
  fitStage();
  window.addEventListener("resize", fitStage);
  tick();
  setInterval(tick, 250);
  try {
    if (navigator.wakeLock) navigator.wakeLock.request("screen").catch(function () {});
  } catch (err) {}

  function inFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function syncFillHint() {
    var hint = document.getElementById("fill-hint");
    if (hint) hint.hidden = inFullscreen();
  }

  function enterFullscreen() {
    if (inFullscreen()) return;
    var root = document.documentElement;
    var request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (!request) return;
    function plain() {
      try {
        var again = request.call(root);
        if (again && again.then) again.then(syncFillHint, function () {});
      } catch (err) {}
    }
    try {
      var pending = request.call(root, { navigationUI: "hide" });
      if (pending && pending.then) pending.then(syncFillHint, plain);
    } catch (err) {
      plain();
    }
  }

  function onFullscreenGesture(event) {
    if (event && (event.key === "Escape" || event.key === "Esc")) return;
    enterFullscreen();
  }

  enterFullscreen();
  syncFillHint();
  ["keydown", "pointerup", "touchend", "click"].forEach(function (type) {
    document.addEventListener(type, onFullscreenGesture);
  });
  document.addEventListener("fullscreenchange", syncFillHint);
  document.addEventListener("webkitfullscreenchange", syncFillHint);

  if (window.MasjidSync && MasjidSync.mode() !== "off") {
    var sharedLead = "Press S to open this panel, A to add athkaar, and Escape to close. ";
    var reminderLead = " Reminders cover the screen for a few seconds each minute, and they pause during iqamah and salah.";
    if (MasjidSync.mode() === "live") {
      document.querySelector("#settings .lead").textContent = sharedLead + "Changes here are used by every screen that opens this website." + reminderLead;
      document.querySelector("#athkaar-editor .lead").textContent = "Press A to open this panel and Escape to close. Type one athkaar in Arabic. Use a new line for each line of the same athkaar. It is added to the list you select and saved for every screen that opens this website.";
      document.getElementById("athkaar-added-title").textContent = "Added for every screen";
    } else {
      document.querySelector("#settings .lead").textContent = sharedLead + "This screen follows the settings saved on rashiid.m2btek.com whenever it is online." + reminderLead;
    }
    MasjidSync.start({
      snapshot: function () {
        return { settings: settings, athkaar: ATHKAAR.loadExtra() };
      },
      busy: function () {
        return !el.settings.hidden || !athkaarPanel().hidden;
      },
      apply: function (data) {
        if (data.settings) saveSettings(settingsFrom(data.settings), true);
        if (data.athkaar) {
          ATHKAAR.replaceExtra(data.athkaar, true);
          slideSig = "";
        }
      }
    });
  }
})();
