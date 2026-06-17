/* =====================================================================
   WEDDING CONFIGURATION
   ---------------------------------------------------------------------
   Edit EVERYTHING about the invitation from this single object.
   No need to touch the HTML, CSS or main.js for normal changes.
   ===================================================================== */

window.WEDDING_CONFIG = {

  /* ---- Couple ---- */
  couple: {
    groom: "Firdavs",
    bride: "Ruxshona",
    // Symbol shown between the two names ("&", "&#10084;", "and" ...)
    separator: "&",
  },

  /* ---- Invitation copy (Uzbek) ----
     NOTE: These values duplicate translations.uz entries below.
     The translations object is authoritative for i18n; these legacy
     fields are kept for backward compatibility with populate(). ---- */
  text: {
    invitation:
      "Sizni to'yimizning eng baxtli kunini biz bilan birga nishonlashga taklif qilamiz",
    heroSubtitle: "Bizning to'y kunimiz",
    countdownTitle: "Bayramgacha qoldi",
    detailsTitle: "To'y tafsilotlari",
    locationTitle: "Manzil",
    locationButton: "Marshrutni ochish",
    thankYou: "Sizning tashrifingiz biz uchun eng qadrli sovg'adir",
    finalNames: "Firdavs & Ruxshona",
  },

  /* ---- Date & Time ----
     IMPORTANT: month is 0-indexed in JS (0 = January, 5 = June).
     Set the correct YEAR for the live countdown to work. ---- */
  event: {
    year: 2026,
    month: 5,        // June (0 = Jan ... 5 = Jun)
    day: 23,
    hour: 19,        // 19:00
    minute: 0,
    // Display strings
    dateLabel: "23 Iyun",
    timeLabel: "19:00",
    venue: "Fotima Sulton",
    venueNote: "To'yxona",
    city: "Samarkand",
  },

  /* ---- Countdown labels (Uzbek) ---- */
  countdownLabels: {
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
  },

  /* ---- Location ----
     Paste your Yandex/Google Maps share link here. ---- */
  location: {
    mapsUrl:
      "https://yandex.uz/maps/org/fotima_sultan/228306744515/?ll=66.967199%2C39.664909&z=16",
  },

  /* ---- Background media ----
     Use ONE of the two. If videoSrc is set it takes priority.
     Drop your file into the /assets folder and reference it here. ---- */
  media: {
    videoSrc: "",
    imageSrc: "assets/hero.jpg",
    fallbackImage: "",
  },

  /* ---- Background music ----
     Soft Italian-style instrumental (piano + light strings, no vocals).
     Very quiet volume with smooth fade-in on first interaction. ---- */
  music: {
    src: "https://cdn.pixabay.com/download/audio/2023/10/30/audio_ffd3ef4bff.mp3?filename=slowmo-piano-171562.mp3",
    autoplayOnInteraction: true,
  },

  /* ---- Effects toggles ---- */
  effects: {
    parallax: true,
  },

  /* ---- Translations ----
     UZ is the default language. RU provides Russian equivalents.
     All keys must match across both language objects. ---- */
  translations: {
    uz: {
      heroSubtitle: "Bizning to'y kunimiz",
      invitation: "Sizni to'yimizning eng baxtli kunini biz bilan birga nishonlashga taklif qilamiz",
      countdownTitle: "Bayramgacha qoldi",
      countdownDone: "Bugun bizning kunimiz!",
      detailsTitle: "To'y tafsilotlari",
      locationTitle: "Manzil",
      locationButton: "Marshrutni ochish",
      thankYou: "Sizning tashrifingiz biz uchun eng qadrli sovg'adir",
      finalNames: "Firdavs & Ruxshona",
      days: "Kun",
      hours: "Soat",
      minutes: "Daqiqa",
      seconds: "Soniya",
      dateLabel: "23 Iyun",
      timeLabel: "19:00",
      venue: "Fotima Sulton",
      venueNote: "To'yxona",
      detailLabelDate: "Sana",
      detailLabelTime: "Vaqt",
      detailLabelLocation: "Manzil",
      scrollText: "Aylantiring",
      musicAriaLabel: "Musiqa boshqaruvi",
      city: "Samarqand",
    },
    ru: {
      heroSubtitle: "Наш день свадьбы",
      invitation: "Мы приглашаем вас разделить с нами самый счастливый день нашей свадьбы",
      countdownTitle: "До торжества осталось",
      countdownDone: "Сегодня наш день!",
      detailsTitle: "Детали свадьбы",
      locationTitle: "Место проведения",
      locationButton: "Открыть маршрут",
      thankYou: "Ваше присутствие - самый ценный подарок для нас",
      finalNames: "Firdavs & Ruxshona",
      days: "Дней",
      hours: "Часов",
      minutes: "Минут",
      seconds: "Секунд",
      dateLabel: "23 Июня",
      timeLabel: "19:00",
      venue: "Fotima Sulton",
      venueNote: "Банкетный зал",
      detailLabelDate: "Дата",
      detailLabelTime: "Время",
      detailLabelLocation: "Место",
      scrollText: "Листайте",
      musicAriaLabel: "Управление музыкой",
      city: "Самарканд",
    },
  },
};
