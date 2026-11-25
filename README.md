# Website SD Al Bayyinah

Bilingual (Indonesian / English) static website for SD Al Bayyinah, built with [Eleventy](https://www.11ty.dev/).
Plan and reference study: `docs/reference-study-ais.md`.

## Run it

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # output in _site/
```

## How it is organised

| Path | What it holds |
| --- | --- |
| `src/_data/site.json` | School facts: name, WhatsApp number, address, socials |
| `src/_data/nav.json` | Menu (both languages). Previous / next links are worked out from it |
| `src/_data/t.json` | Shared interface text (buttons, labels) in both languages |
| `src/_includes/components.njk` | Reusable blocks: banner, split, cards, FAQ, WhatsApp form |
| `src/**/*.njk` | One file per page. Text for both languages sits in the front matter under `copy.id` and `copy.en` |
| `src/assets/` | CSS, JS, images |

Every page is built twice: Indonesian at `/`, English at `/en/`.

## Filling in content

Search the project for `[ISI]` (Indonesian) and `[FILL]` (English). Each one marks text the school must supply.
Photos are placeholders (`.ph` blocks) until real images arrive.

## WhatsApp forms

Forms never send data to a server. On submit, `src/assets/js/main.js` checks required fields,
builds a message and opens `wa.me/<number>?text=...`. The parent presses Send in WhatsApp.
Set the real number in `src/_data/site.json` (`whatsapp`, digits only, starting with 62).
