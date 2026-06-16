/* =====================================================================
   FIRDAVS & RUXSHONA — Luxury Invitation Logic
   All editable data lives in js/config.js (WEDDING_CONFIG)
   ===================================================================== */
(function () {
  "use strict";

  const C = window.WEDDING_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el != null && value != null) el.textContent = value;
  };

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
      document.title = `${couple.groom} & ${couple.bride} — Taklifnoma`;
      const mono = document.getElementById("preloaderMonogram");
      if (mono) mono.textContent = `${couple.groom[0]} & ${couple.bride[0]}`;
    }

    // Section titles
    setText("countdownTitle", text.countdownTitle);
    setText("detailsTitle", text.detailsTitle);
    setText("locationTitle", text.locationTitle);
    setText("qrTitle", text.qrTitle);
    setText("qrSubtitle", text.qrSubtitle);

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
    setText("finalNames", text.finalNames || `${couple.groom} & ${couple.bride}`);
    setText("finalDate", event.dateLabel);
    setText("finalTime", event.timeLabel);
  }

  /* ------------------------------------------------------------------
     2. HERO BACKGROUND MEDIA
  ------------------------------------------------------------------ */
  function setupHeroMedia() {
    const media = C.media || {};
    const host = document.getElementById("heroMedia");
    if (!host) return;

    const fallback = media.fallbackImage || "";

    // Show the built-in elegant CSS luxury placeholder.
    const showPlaceholder = () => host.classList.add("hero__media--placeholder");

    const applyImage = (src) => {
      if (!src) { showPlaceholder(); return; }
      // Preload to verify the file actually exists before using it.
      const probe = new Image();
      probe.onload = () => {
        host.classList.remove("hero__media--placeholder");
        host.style.backgroundImage = `url("${src}")`;
      };
      probe.onerror = () => {
        // The chosen image is missing. Try the optional external fallback,
        // otherwise fall back to the built-in CSS luxury placeholder.
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
      // If the video can't load, fall back to image → placeholder chain.
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
     3. PRELOADER  →  HERO ENTRANCE
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
        const title = document.getElementById("countdownTitle");
        if (title) title.textContent = "Bugun bizning kunimiz!";
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

    const fadeTo = (target, done) => {
      const step = target > audio.volume ? 0.04 : -0.04;
      const id = setInterval(() => {
        let v = audio.volume + step;
        v = Math.max(0, Math.min(0.55, v));
        audio.volume = v;
        if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
          clearInterval(id);
          if (done) done();
        }
      }, 40);
    };

    const play = () => {
      audio.play().then(() => {
        playing = true;
        btn.classList.add("is-playing");
        fadeTo(0.55);
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
     7. QR CODE
  ------------------------------------------------------------------ */
  function setupQR() {
    const host = document.getElementById("qrCode");
    if (!host || typeof QRCode === "undefined") return;
    const url = (C.qr && C.qr.url) ? C.qr.url : window.location.href;
    host.innerHTML = "";
    try {
      new QRCode(host, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#0d0b08",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    } catch (err) {
      host.textContent = "QR";
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
          heroMedia.style.transform = `scale(1) translateY(${y * 0.25}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     8c. FLOATING GOLDEN PARTICLES (canvas)
  ------------------------------------------------------------------ */
  function setupParticles() {
    const cfg = C.effects || {};
    const canvas = document.getElementById("particles");
    if (!canvas || cfg.particles === false) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    const count = cfg.particleCount || 40;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function make() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        sp: Math.random() * 0.4 + 0.12,
        drift: Math.random() * 0.6 - 0.3,
        a: Math.random() * 0.5 + 0.25,
        tw: Math.random() * 0.02 + 0.005,
        tp: Math.random() * Math.PI * 2,
      };
    }
    function init() {
      resize();
      particles = Array.from({ length: count }, make);
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y -= p.sp;
        p.x += p.drift;
        p.tp += p.tw;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tp));
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(231,200,120,${alpha})`);
        g.addColorStop(1, "rgba(231,200,120,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    init();
    draw();
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(init, 200);
    });
  }

  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */
  function init() {
    populate();
    setupHeroMedia();
    setupPreloader();
    setupCountdown();
    setupMusic();
    setupQR();
    setupReveal();
    setupScrollFX();
    setupParticles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
