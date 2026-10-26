# Cyrus Forge Systems — website

The public site for [Cyrus Forge Systems, LLC](https://cyrusforgesystems.com), an AI automation consultancy in Fort Worth, Texas.

> **Automate one thing well. The rest will follow.**

![Home page](docs/home-preview.png)

## What's here

| Page | Path | Purpose |
|---|---|---|
| Home | `index.html` | Services, how we work, about, contact |
| Cyrus | `cyrus/index.html` | Our sports-analytics product line |
| NFL Predictor | `cyrus/nfl-predictor/index.html` | This week's picks and the running track record |

- **No frameworks, no build step.** Plain HTML, one stylesheet, one small script. The whole site is under 500 KB including the animated logo.
- **Data-driven picks page.** `data/latest.js` is the only file that changes each week. It is written by the [Cyrus NFL Predictor](https://github.com/YOUR-USERNAME/cyrus-nfl-predictor) pipeline and rendered by `assets/predictor.js`.
- **Animated brand.** The hawk in the header is a short silent video loop (`assets/hawk-loop.*`); the "Smith" mascot on the home page is an inline SVG with CSS animation. Both respect the visitor's reduce-motion setting where it applies.
- **Accessible by default.** Semantic HTML, skip link, keyboard-operable tabs, visible focus states.

## How it's deployed

Hosted on **Cloudflare Pages** (direct upload) with Cloudflare DNS and Email Routing for `contact@cyrusforgesystems.com`.

To deploy a change: zip the contents of this folder (not the folder itself) and upload it as a new Production deployment in the Cloudflare dashboard.

## Weekly update flow

1. The NFL Predictor pipeline runs Wednesday and Friday at 6:45 PM Central.
2. It downloads the current site package from Google Drive, replaces `data/latest.js` with the week's card and record, and produces a new zip.
3. The zip is uploaded to Cloudflare Pages.

Nothing else on the site changes between weeks, so the design and copy stay under version control here.

## Local preview

Open `index.html` in a browser. There is nothing to install.

## License

Code is MIT licensed (see `LICENSE`). The Cyrus Forge Systems name, hawk logo and mascot are trademarks of Cyrus Forge Systems, LLC and are not covered by the license.
