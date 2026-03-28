# ChitChat

Static bilingual one-page site built with plain HTML, CSS, and JavaScript.

## Project structure

- `index.html`: main page markup, default Spanish fallback content, and default SEO metadata
- `css/styles.css`: all site styles
- `js/main.js`: bilingual translations, language toggle, modal behavior, active nav state, form preview message, and runtime SEO updates
- `assets/illustrations/`: site illustrations and favicon source images

## Preview locally

You can open `index.html` directly in a browser.

For a closer deployment-style preview, run a local server from the project folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Where to edit copy

Main bilingual copy lives in `js/main.js` inside:

- `translations.es`
- `translations.en`

That includes:

- navigation
- hero
- services cards and shared modal
- about section
- reviews section
- contact section
- footer
- runtime SEO metadata

Default Spanish fallback text is also present in `index.html` so the page is readable before JavaScript runs. If you change important Spanish text in `js/main.js`, keep the matching fallback text in `index.html` in sync.

## Where to update contact details

The remaining real-world placeholders are in two places:

1. `index.html`
   - contact form block
   - contact details list
2. `js/main.js`
   - `translations.es.contact.details`
   - `translations.en.contact.details`

The following values still need real final details before launch:

- phone number
- email address
- registration number

The form is currently a preview only. The message shown after submit is controlled by:

- `translations.es.ui.formPreviewMessage`
- `translations.en.ui.formPreviewMessage`

If you connect the form to a real backend later, update the form `action`/submission logic and replace that preview message.

## Where to update SEO metadata

Default Spanish metadata is in the `<head>` of `index.html`, including:

- page title
- meta description
- Open Graph tags
- Twitter card tags
- favicon links

Bilingual runtime metadata is in `js/main.js` inside:

- `translations.es.meta`
- `translations.en.meta`

If you update titles, descriptions, or social copy, keep `index.html` and the matching `meta` translation entries aligned.

## Deployment notes

- Spanish is the default language.
- The English version is controlled by the existing in-page language toggle.
- Canonical URL and `og:url` are only set at runtime when the page is served over HTTP(S).
- No separate privacy/legal pages are included in this repo yet.
