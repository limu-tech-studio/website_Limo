# Limo — Technology Studio Website

A lightweight, high-performance, single-page website for **Limo**, a seven-person technology studio based in Italy and working globally.

## Features & Highlights

- **Visual Identity**: Warm ivory backgrounds (`#FAF8F5`), deep charcoal typography, elegant lemon-yellow accents, and subtle muted leaf-green highlights.
- **Multilingual (4 Languages)**: English (default), Persian (`فارسی`), Italian (`Italiano`), and Turkish (`Türkçe`).
- **Complete RTL Support**: Native Right-To-Left direction switching (`dir="rtl"`) for Persian with customized Vazirmatn typography and mirrored layouts.
- **Client-side State**: Remembers chosen language across sessions using `localStorage` without page reloads.
- **Interactive Hero Animation**: Lightweight vector SVG graphic illustrating traditional business matrix connecting into a global digital ecosystem.
- **7 Equal Team Cards**: Polished mobile-ready cards with verified roles, concise bios, and direct LinkedIn profile links.
- **No Build Step**: 100% static HTML5, CSS3, and modern JavaScript. Ready for free hosting on GitHub Pages.

---

## Pre-Publication Checklist (Required Items)

Before publishing the website to your live domain or GitHub Pages, confirm the following editable parameters:

1. **Contact Email Address**:
   - Currently set to placeholder: `hello@limo.studio`.
   - Update `contactEmail` in `assets/js/config.js` and the `mailto:` link in `index.html`.
2. **Team Photographs**:
   - High-elegance SVG avatar placeholders with team initials (`MR`, `AA`, `RK`, `PF`, `RJ`, `TE`) are included.
   - To use real headshots, place JPEGs/PNGs into `assets/images/team/` and update `avatarPath` in `assets/js/config.js` or `index.html`.

---

## How to Customize

### 1. Changing Contact Email
Open `assets/js/config.js` and modify:
```js
const LIMO_CONFIG = {
  contactEmail: "your-actual-email@limostudio.it",
  ...
};
```
Also update line 254 in `index.html`:
```html
<a href="mailto:your-actual-email@limostudio.it" class="btn btn-primary" ...>
```

### 2. Changing Team Photos & Bios
- **Photos**: Save square cropped headshots (e.g. `mojtaba.jpg`) to `assets/images/team/`. Then update `index.html` line 164 (`src="./assets/images/team/mojtaba.jpg"`).
- **Bios & Roles**: Update strings in `assets/js/translations.js` under `en`, `fa`, `it`, and `tr` sections (e.g. `team1Role`, `team1Bio`).

### 3. Adding or Updating Translations
All interface text is housed cleanly inside `assets/js/translations.js`. You can update existing text or add new keys effortlessly.

---

## Deploying to GitHub Pages (Step-by-Step)

### Option A: Via GitHub Web Interface
1. Create a new public repository on GitHub (e.g., `limo-website` or `username.github.io`).
2. Upload all files from this project directory to the repository root. Ensure `index.html` is at the root level of the repository.
3. In your repository on GitHub, navigate to **Settings** > **Pages**.
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. GitHub will build and host your website at `https://<username>.github.io/<repository-name>/`. Relative paths ensure all assets, stylesheets, icons, and fonts load correctly on subpaths.

### Option B: Via Git Command Line
```bash
git init
git add .
git commit -m "Initial commit for Limo website"
git branch -M main
git remote add origin https://github.com/your-username/repository-name.git
git push -u origin main
```
Then follow steps 3-5 in Settings > Pages above.

---

## Project File Structure

```
website_Limo/
├── index.html                  # Main single-page document
├── favicon.svg                 # SVG Favicon
├── favicon.ico                 # Fallback ICO Favicon
├── README.md                   # Documentation & publishing instructions
├── assets/
│   ├── css/
│   │   └── style.css           # Design system, layout grid, typography & RTL rules
│   ├── js/
│   │   ├── app.js              # Application logic, menu drawer, i18n switcher
│   │   ├── config.js           # Editable studio configuration & email
│   │   └── translations.js     # EN, FA, IT, TR translation dictionary
│   └── images/
│       ├── logo.svg            # Full horizontal studio logo
│       ├── logo-icon.svg       # Geometric lemon + 'L' mark
│       └── team/               # Team avatar placeholders & photos
│           ├── mojtaba.svg
│           ├── amin.svg
│           ├── ramtin.svg
│           ├── parisa.svg
│           ├── roya.svg
│           ├── taha.svg
│           └── maryam.svg
```

---

## License & Attribution

Designed and engineered for **Limo Studio** (Italy & Global). All rights reserved.
