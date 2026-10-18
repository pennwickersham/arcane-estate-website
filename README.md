# Arcane Estate: Rune Puzzles — website

The marketing site for **Arcane Estate: Rune Puzzles**, the daily rune-weaving logic puzzle from
[Brewster Wickersham Publications](https://brewsterwickershampublications.com/). Plain static
HTML and CSS, made for GitHub Pages. No build step.

| File | What it is |
| --- | --- |
| `index.html` | The home page |
| `support.html` | Support and common questions |
| `privacy.html` | Privacy policy (AdMob + RevenueCat, Android and iOS) |
| `404.html` | Not-found page (GitHub Pages serves it for any missing path; `noindex`, root-relative links) |
| `robots.txt`, `sitemap.xml` | Crawl rules and the sitemap of the three indexable pages; bump `<lastmod>` when a page changes |
| `site.css` | Shared styles |
| `icon.png`, `apple-touch-icon.png`, `favicon.png` | Made from the iOS App Store icon |
| `og-image.jpg` | 1200×630 social share image (Open Graph / Twitter `summary_large_image`), drawn from the hero art |

Preview locally with `python -m http.server` in this folder and open http://localhost:8000.

## Status

Live at https://www.arcaneestategame.com/ (GitHub Pages, custom domain, DNS at Porkbun). Every indexable page has a
canonical, Open Graph and Twitter tags; the home page carries VideoGame + MobileApplication JSON-LD. Every footer has the
shared "From Brewster Wickersham Publications" block linking the publisher's other sites and the Amazon listings; keep
its links in step with the other four sites. Both store buttons are live: Google Play (`com.arcaneestate.game`) and the
App Store (`id6817651417`, https://apps.apple.com/us/app/arcane-estate-rune-puzzles/id6817651417).

## Still to do

1. **Search Console / Bing Webmaster Tools** — verify the domain by DNS TXT and submit
   `https://www.arcaneestategame.com/sitemap.xml`.
2. **Publisher site** — make sure brewsterwickershampublications.com links here.

The app and both store listings currently link to the privacy policy at
`https://brewsterwickershampublications.com/arcane-estate/privacy.html`. Keep that page in step
with `privacy.html` here, or point the app (`monetization/Legal.kt`) and listings at the new domain.
