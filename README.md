# Khmer wedding e-invitation (NHA & SAKONA) - plain HTML / CSS / JavaScript
No Python, no npm, no build step. Open the folder in VS Code and use Live Server on index.html; opening index.html directly as a `file://` URL can prevent the browser from loading the music. Browsers also require a tap or click before they allow audio playback.

index.html         structure + link-preview tags       css/style.css  all styles
js/data.js         photo / QR / music lists            js/main.js     all animation + content (WED, PROG near the top)
assets/img         photos (WebP), printed-card book art, QR, sketch map, og.jpg      assets/music.mp3   music

Before publishing:

1. Deploy this folder on Vercel as a static site (no build command; use `.` as the output directory).
2. The Open Graph and Twitter preview image in `index.html` is `assets/img/Nha & Sakona_ Forever Together.png` (1728×910), and the page URL is `https://nha-sakona-wedding.vercel.app/`. Keep this image available for social link previews.
3. In `js/main.js`, set the real map pin in `WED.map` and set `EXAMPLE:false`.
4. In `js/main.js`, check the `PROG` programme dates.
