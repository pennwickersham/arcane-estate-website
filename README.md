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

## Launch checklist

1. **Buy the domain** (e.g. at Porkbun, like the other sites).
2. **Store buttons** — in `index.html`, replace the two `<span class="store-btn soon">` elements
   with real links (the comment above them has the markup and the Play URL,
   `com.arcaneestate.game`).
3. **Canonical and social tags** — uncomment / fill in the `LAUNCH` block in the `<head>` of
   `index.html`, and add `"url"` to the JSON-LD.
4. **Publish** — make the repository public, then Settings → Pages → Deploy from branch `main`,
   folder `/ (root)`.
5. **Custom domain** — add a `CNAME` file containing the domain (e.g. `www.example.com`), set it in
   Settings → Pages, point DNS at GitHub Pages (`A` records 185.199.108–111.153 for the apex, a
   `CNAME` to `pennwickersham.github.io` for `www`), then tick **Enforce HTTPS**.
6. **Search Console** — verify the domain by DNS TXT and submit the home page.
7. **Publisher site** — add the new domain as a button on the Arcane Estate entry at
   brewsterwickershampublications.com.

The app and both store listings currently link to the privacy policy at
`https://brewsterwickershampublications.com/arcane-estate/privacy.html`. Keep that page in step
with `privacy.html` here, or point the app (`monetization/Legal.kt`) and listings at the new domain.
