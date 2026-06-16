PLACE YOUR MEDIA FILES HERE
===========================

>>> HERO BACKGROUND (most important)
    Name your uploaded file exactly:
      - Photo:  assets/hero.jpg
      - Video:  assets/hero.mp4   (then set media.videoSrc in js/config.js)

    The site already points to assets/hero.jpg. As soon as that file
    exists here, it appears automatically. Until then a fallback photo
    is shown so the page never looks broken.

Drop your other files into this folder, then point to them in
js/config.js (the WEDDING_CONFIG object).

Suggested files:
  - hero.jpg / hero.mp4   -> background photo or video
  - music.mp3             -> romantic instrumental track
  - gallery-1.jpg ...     -> photos for the gallery

Example (in js/config.js):

  media: {
    videoSrc: "assets/hero.mp4",   // leave "" to use an image instead
    imageSrc: "assets/hero.jpg",
  },

  music: {
    src: "assets/music.mp3",
    autoplayOnInteraction: true,
  },

  gallery: [
    "assets/gallery-1.jpg",
    "assets/gallery-2.jpg",
  ],
