/* =====================================================================
   FIRDAVS & RUXSHONA — Premium Wedding Invitation Logic
   All editable data lives in js/config.js (WEDDING_CONFIG)
   ===================================================================== */
(function () {
  "use strict";

  const C = window.WEDDING_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el != null && value != null) {
      // Skip elements managed by the i18n system to avoid overwriting translations
      if (el.hasAttribute("data-i18n")) return;
      el.textContent = value;
    }
  };

  /* ------------------------------------------------------------------
     CURRENT LANGUAGE STATE
  ------------------------------------------------------------------ */
  let currentLang = "uz";
  let countdownExpired = false;

  /* ------------------------------------------------------------------
     1. POPULATE CONTENT FROM CONFIG
  ------------------------------------------------------------------ */
  function populate() {
    const { couple = {}, text = {}, event = {}, countdownLabels = {}, location = {} } = C;

    // Hero
    setText("groomName", couple.groom);
    setText("brideName", couple.bride);
    setText("separator", couple.separator || "&");
    setText("heroSubtitle", text.heroSubtitle);
    setText("heroInvite", text.invitation);
    setText("heroDate", event.dateLabel);
    setText("heroTime", event.timeLabel);

    // Document title / monogram
    if (couple.groom && couple.bride) {
      document.title = couple.groom + " & " + couple.bride + " — Taklifnoma";
      const mono = document.getElementById("preloaderMonogram");
      if (mono) mono.textContent = couple.groom[0] + " & " + couple.bride[0];
    }

    // Section titles
    setText("countdownTitle", text.countdownTitle);
    setText("detailsTitle", text.detailsTitle);
    setText("locationTitle", text.locationTitle);

    // Countdown labels
    setText("lbl-days", countdownLabels.days);
    setText("lbl-hours", countdownLabels.hours);
    setText("lbl-minutes", countdownLabels.minutes);
    setText("lbl-seconds", countdownLabels.seconds);

    // Details
    setText("detDate", event.dateLabel);
    setText("detTime", event.timeLabel);
    setText("detVenue", event.venue);
    setText("detVenueNote", event.venueNote);

    // Location
    setText("locVenue", event.venue);
    setText("mapsBtnText", text.locationButton);
    const mapsBtn = document.getElementById("mapsBtn");
    if (mapsBtn && location.mapsUrl) mapsBtn.href = location.mapsUrl;

    // Final
    setText("finalThanks", text.thankYou);
    setText("finalNames", text.finalNames || (couple.groom + " & " + couple.bride));
    setText("finalDate", event.dateLabel);
    setText("finalTime", event.timeLabel);
  }

  /* ------------------------------------------------------------------
     1b. LANGUAGE SWITCHER
  ------------------------------------------------------------------ */
  function setupLanguage() {
    var translations = C.translations || {};
    var saved = localStorage.getItem("wedding-lang");
    currentLang = (saved === "ru") ? "ru" : "uz";

    var buttons = document.querySelectorAll(".lang-switch__btn");

    // Apply the saved language on load
    applyLanguage(currentLang);
    updateActiveButton(currentLang);

    // Attach click handlers
    buttons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var lang = btn.getAttribute("data-lang");
        if (lang === currentLang) return;
        currentLang = lang;
        localStorage.setItem("wedding-lang", lang);
        applyLanguage(lang);
        updateActiveButton(lang);
      });
    });

    function updateActiveButton(lang) {
      buttons.forEach(function(b) {
        b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
      });
    }
  }

  function applyLanguage(lang) {
    var translations = C.translations || {};
    var t = translations[lang];
    if (!t) return;

    // Update all elements with data-i18n attribute
    var els = document.querySelectorAll("[data-i18n]");
    els.forEach(function(el) {
      var key = el.getAttribute("data-i18n");
      // If countdown has expired, show the done message instead of the title
      if (key === "countdownTitle" && countdownExpired) {
        el.textContent = t.countdownDone || t.countdownTitle;
        return;
      }
      if (t[key] != null) {
        el.textContent = t[key];
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = (lang === "ru") ? "ru" : "uz";
  }

  /* Expose getter for other functions */
  function getLang() {
    return currentLang;
  }

  /* ------------------------------------------------------------------
     2. HERO BACKGROUND MEDIA
  ------------------------------------------------------------------ */
  function setupHeroMedia() {
    const media = C.media || {};
    const host = document.getElementById("heroMedia");
    if (!host) return;

    const fallback = media.fallbackImage || "";

    // Show the built-in elegant CSS placeholder.
    const showPlaceholder = () => host.classList.add("hero__media--placeholder");

    const applyImage = (src) => {
      if (!src) { showPlaceholder(); return; }
      // Preload to verify the file actually exists before using it.
      const probe = new Image();
      probe.onload = () => {
        host.classList.remove("hero__media--placeholder");
        host.style.backgroundImage = 'url("' + src + '")';
      };
      probe.onerror = () => {
        // The chosen image is missing. Try the optional external fallback,
        // otherwise fall back to the built-in CSS placeholder.
        if (fallback && src !== fallback) {
          applyImage(fallback);
        } else {
          showPlaceholder();
        }
      };
      probe.src = src;
    };

    if (media.videoSrc) {
      const v = document.createElement("video");
      v.src = media.videoSrc;
      v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
      v.poster = media.imageSrc || "";
      // If the video can't load, fall back to image -> placeholder chain.
      v.onerror = () => {
        v.remove();
        applyImage(media.imageSrc || fallback);
      };
      host.appendChild(v);
    } else {
      applyImage(media.imageSrc || fallback);
    }
  }

  /* ------------------------------------------------------------------
     3. PRELOADER -> HERO ENTRANCE
  ------------------------------------------------------------------ */
  function setupPreloader() {
    const preloader = document.getElementById("preloader");
    const hero = document.getElementById("hero");
    const reveal = () => {
      if (preloader) preloader.classList.add("is-hidden");
      if (hero) hero.classList.add("is-ready");
    };
    window.addEventListener("load", () => setTimeout(reveal, 700));
    // Safety net in case 'load' is delayed by media
    setTimeout(reveal, 3500);
  }

  /* ------------------------------------------------------------------
     4. LIVE COUNTDOWN
  ------------------------------------------------------------------ */
  function setupCountdown() {
    const e = C.event || {};
    const target = new Date(
      e.year, e.month, e.day, e.hour || 0, e.minute || 0, 0
    ).getTime();

    const fields = {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      minutes: document.getElementById("cd-minutes"),
      seconds: document.getElementById("cd-seconds"),
    };
    const prev = { days: null, hours: null, minutes: null, seconds: null };

    const pad = (n) => String(n).padStart(2, "0");
    const update = (key, val) => {
      const el = fields[key];
      if (!el) return;
      const str = pad(val);
      if (prev[key] === str) return;
      prev[key] = str;
      el.textContent = str;
      el.classList.remove("tick");
      void el.offsetWidth; // reflow to restart animation
      el.classList.add("tick");
    };

    function render() {
      const diff = target - Date.now();
      if (diff <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach((k) => update(k, 0));
        countdownExpired = true;
        const title = document.getElementById("countdownTitle");
        var translations = C.translations || {};
        var t = translations[currentLang] || translations.uz || {};
        if (title) title.textContent = t.countdownDone || "Bugun bizning kunimiz!";
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      update("days", Math.floor(s / 86400));
      update("hours", Math.floor((s % 86400) / 3600));
      update("minutes", Math.floor((s % 3600) / 60));
      update("seconds", s % 60);
    }

    render();
    const timer = setInterval(render, 1000);
  }

  /* ------------------------------------------------------------------
     6. BACKGROUND MUSIC
  ------------------------------------------------------------------ */
  function setupMusic() {
    const cfg = C.music || {};
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");
    if (!audio || !btn || !cfg.src) return;

    audio.src = cfg.src;
    audio.volume = 0.0;
    let playing = false;
    const targetVolume = 0.17;

    const fadeTo = (target, done) => {
      const step = target > audio.volume ? 0.01 : -0.02;
      const id = setInterval(() => {
        let v = audio.volume + step;
        v = Math.max(0, Math.min(targetVolume, v));
        audio.volume = v;
        if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
          audio.volume = target;
          clearInterval(id);
          if (done) done();
        }
      }, 50);
    };

    const play = () => {
      audio.play().then(() => {
        playing = true;
        btn.classList.add("is-playing");
        fadeTo(targetVolume);
      }).catch(() => {/* autoplay blocked, wait for click */});
    };
    const pause = () => {
      fadeTo(0, () => audio.pause());
      playing = false;
      btn.classList.remove("is-playing");
    };

    btn.addEventListener("click", () => (playing ? pause() : play()));

    // Try to start on first user interaction (browser autoplay policy)
    if (cfg.autoplayOnInteraction) {
      const kick = () => {
        if (!playing) play();
        window.removeEventListener("pointerdown", kick);
        window.removeEventListener("scroll", kick);
        window.removeEventListener("keydown", kick);
      };
      window.addEventListener("pointerdown", kick, { once: false });
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("keydown", kick);
    }
  }

  /* ------------------------------------------------------------------
     8a. SCROLL REVEAL (IntersectionObserver)
  ------------------------------------------------------------------ */
  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    // Stagger items inside the same parent for elegance
    items.forEach((el) => {
      const siblings = Array.from(el.parentElement.querySelectorAll(":scope > [data-reveal]"));
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = (idx * 0.12) + "s";
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     9. FLOATING PETALS
  ------------------------------------------------------------------ */
  function setupPetals() {
    var container = document.getElementById("petalsContainer");
    if (!container) return;
    var petals = container.querySelectorAll(".petal");
    petals.forEach(function(petal) {
      var size = Math.random() * 12 + 8; // 8-20px
      var left = Math.random() * 100;
      var delay = Math.random() * 12;
      var duration = Math.random() * 8 + 10; // 10-18s
      var driftDuration = Math.random() * 6 + 6; // 6-12s
      var rotateDuration = Math.random() * 8 + 8; // 8-16s

      petal.style.width = size + "px";
      petal.style.height = size + "px";
      petal.style.left = left + "%";
      petal.style.top = "-" + (Math.random() * 20 + 10) + "px";
      petal.style.animationDelay = delay + "s, " + (delay * 0.7) + "s, " + (delay * 0.5) + "s";
      petal.style.animationDuration = duration + "s, " + driftDuration + "s, " + rotateDuration + "s";
    });
  }

  /* ------------------------------------------------------------------
     8b. SCROLL PROGRESS + PARALLAX
  ------------------------------------------------------------------ */
  function setupScrollFX() {
    const bar = document.getElementById("scrollProgress");
    const heroMedia = document.getElementById("heroMedia");
    const parallaxOn = !(C.effects && C.effects.parallax === false);
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
        if (parallaxOn && heroMedia && y < window.innerHeight) {
          heroMedia.style.transform = "scale(1) translateY(" + (y * 0.2) + "px)";
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */
  function init() {
    setupLanguage();
    populate();
    setupHeroMedia();
    setupPreloader();
    setupCountdown();
    setupMusic();
    setupPetals();
    setupReveal();
    setupScrollFX();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
