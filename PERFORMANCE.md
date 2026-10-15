# Performance update

The performance update preserves the page design, checkout destinations, Pixel
configuration and tracking code. The second video and its caption were later
removed at the owner's request; the main video keeps its original embed/options.

- Barlow, Barlow Condensed and Knewave are served locally in WOFF2 format with the
  original weights and Unicode subsets. OFL licenses are in `dist/assets/fonts`.
- The heading and body fonts used at the top of the page are embedded directly in
  the HTML, avoiding a font-swap delay. Other font filenames contain content hashes
  and can be cached for one year without serving outdated replacements.
- Styles are embedded in the HTML to remove the stylesheet → Google Fonts
  request chain. Source stylesheets remain editable in `dist`.
- The landing page now contains only the main LiteVideo element and its loader.
  The second video was moved to checkout by the owner; its landing-page embed,
  caption, unused styles and deferred loader have been removed.

After CSS edits, regenerate embedded styles:

```sh
node scripts/inline-styles.mjs
node --test tests/tracking.test.mjs
```

Baseline PageSpeed mobile: 64, FCP 3.9 s, LCP 6.5 s, TBT 170 ms, CLS 0.
Baseline desktop: 97, FCP/LCP 0.7 s. These are lab results, not field metrics.
