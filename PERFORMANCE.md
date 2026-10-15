# Performance update

The performance update preserves the page design, checkout destinations, Pixel
configuration and tracking code. The separate offer video block and its caption
were removed at the owner's request. Its video now replaces the former main video.

- Barlow, Barlow Condensed and Knewave are served locally in WOFF2 format with the
  original weights and Unicode subsets. OFL licenses are in `dist/assets/fonts`.
- The heading and body fonts used at the top of the page are embedded directly in
  the HTML, avoiding a font-swap delay. Other font filenames contain content hashes
  and can be cached for one year without serving outdated replacements.
- Styles are embedded in the HTML to remove the stylesheet → Google Fonts
  request chain. Source stylesheets remain editable in `dist`.
- The landing page contains one LiteVideo element and one loader. The video
  `def29fd9-1d05-4d64-b580-6693fb06d58d` is now in the opening video position.
  The old main video and separate offer embed are absent; there is no deferred
  second-video loader. The surrounding layout and checkout links are preserved.

After CSS edits, regenerate embedded styles:

```sh
node scripts/inline-styles.mjs
node --test tests/tracking.test.mjs
```

Baseline PageSpeed mobile: 64, FCP 3.9 s, LCP 6.5 s, TBT 170 ms, CLS 0.
Baseline desktop: 97, FCP/LCP 0.7 s. These are lab results, not field metrics.
