# Performance update

The page keeps its original content, layout, CSS declarations, video IDs/options,
checkout destinations, Pixel configuration and tracking code.

- Barlow, Barlow Condensed and Knewave are served locally in WOFF2 format with the
  original weights and Unicode subsets. OFL licenses are in `dist/assets/fonts`.
- The heading and body fonts are preloaded. Font filenames contain content hashes
  and can be cached for one year without serving outdated replacements.
- Styles are embedded in the HTML to remove the stylesheet → Google Fonts
  request chain. Source stylesheets remain editable in `dist`.
- Only the second LiteVideo element is deferred. `video.js` mounts the original
  embed 300 px before its container enters the viewport. The square container
  reserves its original dimensions; old browsers without IntersectionObserver
  load it immediately. The first video keeps its original embed and loader.

After CSS edits, regenerate embedded styles:

```sh
node scripts/inline-styles.mjs
node --test tests/tracking.test.mjs
```

Baseline PageSpeed mobile: 64, FCP 3.9 s, LCP 6.5 s, TBT 170 ms, CLS 0.
Baseline desktop: 97, FCP/LCP 0.7 s. These are lab results, not field metrics.
