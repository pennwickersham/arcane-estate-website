# Arcane Estate: Rune Puzzles — website

The marketing site for **Arcane Estate: Rune Puzzles**, the daily rune-weaving logic puzzle from
[Brewster Wickersham Publications](https://www.brewsterwickershampublications.com/). Plain static
HTML and CSS, made for GitHub Pages. No build step.

| File | What it is |
| --- | --- |
| `index.html` | The home page |
| `support.html` | Support and common questions |
| `privacy.html` | Privacy policy (AdMob + RevenueCat, Android and iOS) |
| `site.css` | Shared styles |
| `icon.png`, `apple-touch-icon.png`, `favicon.png` | Made from the iOS App Store icon |

Preview locally with `python -m http.server` in this folder and open http://localhost:8000.

## Status

Live at https://www.arcaneestategame.com/ (GitHub Pages, custom domain, DNS at Porkbun). Canonical, Open Graph and
JSON-LD tags are set. Both store buttons are live: Google Play (`com.arcaneestate.game`) and the
App Store (`id6817651417`, https://apps.apple.com/us/app/arcane-estate-rune-puzzles/id6817651417).

## Still to do

1. **Search Console** — verify the domain by DNS TXT and submit the home page.
2. **Publisher site** — make sure brewsterwickershampublications.com links here.

The app and both store listings currently link to the privacy policy at
`https://brewsterwickershampublications.com/arcane-estate/privacy.html`. Keep that page in step
with `privacy.html` here, or point the app (`monetization/Legal.kt`) and listings at the new domain.
