# Khmer wedding e-invitation (NHA & SAKONA) - plain HTML / CSS / JavaScript
No Python, no npm, no build step. Open the folder in VS Code and use Live Server on index.html.

index.html         structure + link-preview tags       css/style.css  all styles
js/data.js         photo / QR / music lists            js/main.js     all animation + content (WED, PROG near the top)
assets/img         photos (WebP), printed-card book art, QR, sketch map, og.jpg      assets/music.mp3   music

Before publishing: (1) index.html: replace https://YOUR-DOMAIN.com in og:image  (2) js/main.js: real map pin in WED.map, EXAMPLE:false
(3) js/main.js: check PROG programme dates   Deploy: Netlify Drop / GitHub Pages / Vercel (static).
