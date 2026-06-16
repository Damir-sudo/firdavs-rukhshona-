# Firdavs &amp; Ruxshona — Luxury Wedding Invitation

An ultra-premium, mobile-first wedding invitation website built with plain
**HTML, CSS and JavaScript** — no build step, no dependencies to install.

---

## ⭐ Add your hero background image (most important)

The hero (top) section background is loaded automatically from:

```
assets/hero.jpg
```

To use your own photo, **just place a file named `hero.jpg` inside the
`assets/` folder.** That's it — no code changes required. Reload the page and
your image appears instantly.

- If `assets/hero.jpg` **exists** → it is used as the cinematic hero background.
- If `assets/hero.jpg` is **missing** → an elegant built-in **CSS luxury
  placeholder** (gold / champagne gradient) is shown automatically, so the
  site never looks broken.

> Tip: use a high-resolution landscape photo (around 1920×1280 or larger)
> for the sharpest result on big screens.

### Want a video background instead?
Place `assets/hero.mp4` in the folder and set this in `js/config.js`:

```js
media: {
  videoSrc: "assets/hero.mp4",
  imageSrc: "assets/hero.jpg", // used as the poster / fallback
}
```

---

## Run it locally

Open `index.html` directly in a browser, or (recommended, so music and the
QR code resolve correctly) serve it locally:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Edit everything in one place

All wedding data lives in **`js/config.js`** (the `WEDDING_CONFIG` object):

| What                   | Where in config                       |
|------------------------|---------------------------------------|
| Names                  | `couple.groom` / `couple.bride`       |
| Invitation text        | `text.*`                              |
| Date &amp; time            | `event.*` (set the correct `year`!)   |
| Map link               | `location.mapsUrl`                    |
| Hero photo / video     | `media.imageSrc` / `media.videoSrc`   |
| Background music       | `music.src`                           |
| QR target URL          | `qr.url` (auto-detects page if empty) |
| Luxury effects         | `effects.*`                           |
| Translations           | `translations.uz` / `translations.ru` |

> Note: in `event.month`, months are 0-indexed (June = 5).

Put your own photos, video and music inside the **`assets/`** folder and
reference them from the config (e.g. `"assets/hero.jpg"`).

---

## Deploy the website

This is a 100% static site, so it can be hosted anywhere. Pick one:

### GitHub Pages (free)
1. Create a new GitHub repository and push these files to it.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

### Netlify (free, drag &amp; drop)
1. Go to <https://app.netlify.com/drop>.
2. Drag the whole project folder (or the ZIP) onto the page.
3. Netlify gives you a live URL instantly.

### Vercel (free)
1. Install the CLI: `npm i -g vercel`
2. Run `vercel` in the project folder and follow the prompts.

### Any classic web host (cPanel / shared hosting)
Upload the entire folder to your `public_html` (or `www`) directory via FTP.
The entry point is `index.html`.

> After deploying, the QR code automatically encodes your live page URL
> (because `qr.url` is left empty in the config), so guests can scan it to
> open the invitation.

---

## Features

- Cinematic hero with animated names &amp; entrance + auto image/video/placeholder
- Live countdown to 23 June, 19:00
- Glassmorphism wedding details card
- One-tap "Marshrutni ochish" map button (Yandex Maps — Fotima Sultan)
- UZ/RU language switcher with localStorage persistence
- Floating background-music control with smooth fade in/out
- Auto-generated QR code in a premium framed card
- Floating golden particles, parallax, scroll-reveal animations
- Fully responsive (phone / tablet / desktop) + reduced-motion support

---

## File structure

```
.
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── config.js     # <- edit your wedding details here
│   └── main.js
└── assets/
    ├── README.txt    # where to drop hero image/video, music & photos
    └── hero.jpg      # <- ADD THIS: your hero background photo
```
