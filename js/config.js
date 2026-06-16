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
    // Symbol shown between the two names ("&", "♥", "and" ...)
    separator: "&",
  },

  /* ---- Invitation copy (Uzbek) ---- */
  text: {
    invitation:
      "Sizni to‘yimizning eng baxtli kunini biz bilan birga nishonlashga taklif qilamiz",
    heroSubtitle: "Bizning to‘y kunimiz",
    countdownTitle: "Bayramgacha qoldi",
    detailsTitle: "To‘y tafsilotlari",
    locationTitle: "Manzil",
    locationButton: "Marshrutni ochish",

    qrTitle: "Taklifnomani ulashing",
    qrSubtitle: "Ushbu QR kodni skanerlab taklifnomani oching",
    thankYou: "Sizning tashrifingiz biz uchun eng qadrli sovg‘adir",
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
    venueNote: "To‘yxona",
  },

  /* ---- Countdown labels (Uzbek) ---- */
  countdownLabels: {
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
  },

  /* ---- Location ----
     Paste your Google Maps share link here when ready. ---- */
  location: {
    // Yandex Maps — Fotima Sultan to'yxonasi
    mapsUrl:
      "https://yandex.uz/maps/org/fotima_sultan/228306744515/?ll=66.967199%2C39.664909&z=16",
  },

  /* ---- Background media ----
     Use ONE of the two. If videoSrc is set it takes priority.
     Drop your file into the /assets folder and reference it here.

     >>> Put your uploaded file in /assets and name it "hero".
         - For a photo:  assets/hero.jpg
         - For a video:  assets/hero.mp4  (also set imageSrc as poster)

     If the local file is missing, the site automatically falls back to
     `fallbackImage` so the page never looks broken. ---- */
  media: {
    // Set to "assets/hero.mp4" if you use a video. Leave "" for a photo.
    videoSrc: "",
    // Your hero photo. Just drop a file named hero.jpg into /assets and
    // it loads automatically — no code changes needed.
    imageSrc: "assets/hero.jpg",
    // OPTIONAL external fallback image URL. Leave "" to use the built-in
    // elegant CSS luxury placeholder when hero.jpg is missing.
    fallbackImage: "",
  },

  /* ---- Background music ----
     Replace with your own romantic instrumental track in /assets. ---- */
  music: {
    src: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3?filename=once-in-paris-168895.mp3",
    // Start playing as soon as the guest interacts with the page.
    autoplayOnInteraction: true,
  },

  /* ---- QR code ----
     Leave url empty "" to auto-detect the current page URL. ---- */
  qr: {
    url: "",
  },

  /* ---- Luxury effects toggles ---- */
  effects: {
    particles: true,
    particleCount: 40,
    parallax: true,
  },
};
