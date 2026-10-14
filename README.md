# Plan My Wedding Africa — Couples Wedding Websites

One master website hosts many couples. Each couple gets a folder under `couples/` containing `config.js`, `theme.css`, and `images/`.

## Current couple
Dhanishtha & Gaurav: `?client=dhanishtha-gaurav`

## Add a new couple
1. Duplicate `couples/dhanishtha-gaurav/` and rename the folder to the new slug, e.g. `saniyah-bilal`.
2. Replace the images.
3. Edit that couple's `config.js`.
4. Edit `theme.css` to match their Save the Date.
5. Set optional sections such as `bridalParty` and `registry` to `enabled: false` when not needed.
6. Add the Google Forms URL under `rsvp.googleFormUrl`.
7. Share `?client=the-couple-slug`.

## GitHub Pages
Upload the CONTENTS of this folder to the repository root. Do not upload the outer folder as another nested directory. Then enable Pages from `main` / root.
