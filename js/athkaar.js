/* After-salah and general remembrances. Arabic with an English line under each. */
var ATHKAAR = (function () {
  var afterCore = [
    {
      lines: ["أَسْتَغْفِرُ اللَّهَ"],
      english: "I seek Allah's forgiveness.",
      note: "ثلاث مرات"
    },
    {
      lines: ["اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ", "تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ"],
      english: "O Allah, You are Peace and from You comes peace. Blessed are You, Owner of majesty and honor."
    },
    {
      lines: ["سُبْحَانَ اللَّهِ  × ٣٣", "الْحَمْدُ لِلَّهِ  × ٣٣", "اللَّهُ أَكْبَرُ  × ٣٣"],
      english: "Glory is to Allah, 33 times. Praise is to Allah, 33 times. Allah is the Greatest, 33 times."
    },
    {
      lines: ["لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ"],
      english: "None has the right to be worshipped except Allah, alone, without partner. His is the dominion and His is the praise, and He is able to do all things."
    },
    {
      lines: ["اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ", "وَلَا مُعْطِيَ لِمَا مَنَعْتَ", "وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ"],
      english: "O Allah, none can withhold what You give, none can give what You withhold, and the might of the mighty does not avail against You."
    },
    {
      size: "long",
      lines: ["اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"],
      english: "Allah — there is no god except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and the earth. Who can intercede with Him except by His permission? He knows what is before them and what is after them, and they grasp nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and their preservation does not tire Him. He is the Most High, the Most Great."
    }
  ];

  var quls = [
    {
      title: "Al-Ikhlas",
      lines: ["قُلْ هُوَ اللَّهُ أَحَدٌ", "اللَّهُ الصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"],
      english: "Say: He is Allah, One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent."
    },
    {
      title: "Al-Falaq",
      lines: ["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "مِن شَرِّ مَا خَلَقَ", "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"],
      english: "Say: I seek refuge in the Lord of daybreak, from the evil of what He created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies."
    },
    {
      title: "An-Nas",
      lines: ["قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "مَلِكِ النَّاسِ", "إِلَٰهِ النَّاسِ", "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "مِنَ الْجِنَّةِ وَالنَّاسِ"],
      english: "Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers in the breasts of mankind, among jinn and mankind."
    }
  ];

  var generalCore = [
    {
      lines: ["سُبْحَانَ اللَّهِ وَبِحَمْدِهِ"],
      english: "Glory is to Allah and praise is to Him."
    },
    {
      lines: ["سُبْحَانَ اللَّهِ الْعَظِيمِ"],
      english: "Glory is to Allah, the Magnificent."
    },
    {
      lines: ["لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ"],
      english: "There is no power and no strength except with Allah."
    },
    {
      lines: ["أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ"],
      english: "I seek Allah's forgiveness and I repent to Him."
    },
    {
      lines: ["اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ"],
      english: "O Allah, send prayers and peace upon our Prophet Muhammad."
    },
    {
      lines: ["رَضِيتُ بِاللَّهِ رَبًّا", "وَبِالْإِسْلَامِ دِينًا", "وَبِمُحَمَّدٍ ﷺ نَبِيًّا"],
      english: "I am pleased with Allah as Lord, with Islam as religion, and with Muhammad, peace be upon him, as prophet."
    },
    {
      lines: ["لَا إِلَٰهَ إِلَّا اللَّهُ"],
      english: "None has the right to be worshipped except Allah.",
      note: "أفضل الذكر"
    },
    {
      lines: ["سُبْحَانَ اللَّهِ", "وَالْحَمْدُ لِلَّهِ", "وَلَا إِلَٰهَ إِلَّا اللَّهُ", "وَاللَّهُ أَكْبَرُ"],
      english: "Glory is to Allah, praise is to Allah, none has the right to be worshipped except Allah, and Allah is the Greatest."
    },
    {
      lines: ["لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ", "وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ"],
      english: "None has the right to be worshipped except Allah, alone, without partner. His is the dominion and His is the praise, and He is able to do all things."
    },
    {
      lines: ["رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", "وَفِي الْآخِرَةِ حَسَنَةً", "وَقِنَا عَذَابَ النَّارِ"],
      english: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."
    },
    {
      lines: ["لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ", "إِنِّي كُنْتُ مِنَ الظَّالِمِينَ"],
      english: "There is no god except You; glory be to You. Indeed, I have been of the wrongdoers."
    },
    {
      lines: ["اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", "فِي الدُّنْيَا وَالْآخِرَةِ"],
      english: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    }
  ];

  var morning = [
    {
      size: "long",
      lines: ["أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ", "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ"],
      english: "We have entered the morning and the dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah alone, without partner. His is the dominion and praise, and He is able to do all things."
    },
    {
      lines: ["اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا", "وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ"],
      english: "O Allah, by You we enter the morning and by You we enter the evening. By You we live and by You we die, and to You is the resurrection."
    }
  ];

  var evening = [
    {
      size: "long",
      lines: ["أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ", "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ"],
      english: "We have entered the evening and the dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped except Allah alone, without partner. His is the dominion and praise, and He is able to do all things."
    },
    {
      lines: ["اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا", "وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ"],
      english: "O Allah, by You we enter the evening and by You we enter the morning. By You we live and by You we die, and to You is the return."
    }
  ];

  var EXTRA_KEY = "masjid-rashiid-athkaar";
  var LISTS = ["after", "general", "morning", "evening"];

  function emptyExtra() {
    return { after: [], general: [], morning: [], evening: [] };
  }

  function cleanItem(item) {
    if (!item || !item.lines) return null;
    var lines = item.lines.map(function (line) { return String(line).trim(); }).filter(Boolean);
    if (!lines.length) return null;
    var slide = { lines: lines };
    if (item.note && String(item.note).trim()) slide.note = String(item.note).trim();
    return slide;
  }

  function loadExtra() {
    var extra = emptyExtra();
    try {
      var raw = JSON.parse(localStorage.getItem(EXTRA_KEY) || "null");
      if (!raw) return extra;
      LISTS.forEach(function (key) {
        if (Array.isArray(raw[key])) extra[key] = raw[key].map(cleanItem).filter(Boolean);
      });
    } catch (err) {
      return emptyExtra();
    }
    return extra;
  }

  function saveExtra(extra, localOnly) {
    localStorage.setItem(EXTRA_KEY, JSON.stringify(extra));
    if (!localOnly && window.MasjidSync) MasjidSync.push({ athkaar: extra });
  }

  function replaceExtra(raw, localOnly) {
    var extra = emptyExtra();
    if (raw && typeof raw === "object") {
      LISTS.forEach(function (key) {
        if (Array.isArray(raw[key])) extra[key] = raw[key].map(cleanItem).filter(Boolean);
      });
    }
    saveExtra(extra, localOnly);
    return extra;
  }

  function afterSlides(prayerKey) {
    var repeat = prayerKey === "fajr" || prayerKey === "maghrib" ? "ثلاث مرات" : "مرة واحدة";
    var tail = quls.map(function (surah) {
      return { lines: surah.lines, note: repeat };
    });
    return afterCore.concat(tail).concat(loadExtra().after);
  }

  function generalSlides(period) {
    var extra = loadExtra();
    var core = generalCore.concat(extra.general);
    if (period === "morning") return morning.concat(extra.morning).concat(core);
    if (period === "evening") return evening.concat(extra.evening).concat(core);
    return core;
  }

  function builtin(list) {
    if (list === "after") {
      return afterCore.concat(quls.map(function (surah) {
        return { lines: surah.lines, note: "مرة واحدة، وثلاث مرات بعد الفجر والمغرب" };
      }));
    }
    if (list === "morning") return morning;
    if (list === "evening") return evening;
    return generalCore;
  }

  return {
    afterSlides: afterSlides,
    generalSlides: generalSlides,
    loadExtra: loadExtra,
    saveExtra: saveExtra,
    replaceExtra: replaceExtra,
    builtin: builtin,
    lists: LISTS
  };
})();
