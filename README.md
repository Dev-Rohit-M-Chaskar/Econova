# Econova Power Solutions Pvt. Ltd. — Corporate Website

Static website for **Econova Power Solutions Pvt. Ltd.**, a solar EPC / renewable energy company based in Ahilyanagar, Maharashtra, India.

Built with **HTML5, CSS3 and Vanilla JavaScript only** — no frameworks, no build tools, no dependencies. Open any `.html` file directly in a browser, or serve the folder with any static server.

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage — hero, statistics, about intro, services, process, why Econova, projects, Maharashtra presence, CTA |
| `about.html` | Who we are, approach, mission, vision, commitment |
| `services.html` | Detailed sections for all six services |
| `projects.html` | Filterable project portfolio with detail modal |
| `industries.html` | Nine industry-focused sections |
| `why-econova.html` | Trust-focused reasons to work with Econova |
| `contact.html` | Enquiry form with frontend validation |

Supporting files: `css/style.css`, `js/script.js`, `images/`.

---

## Before publishing — required replacements

All placeholders are marked with `[PLACEHOLDER ...]`, `[ADD VERIFIED ...]`, `[PHONE]`, `[EMAIL]`, `[CLIENT NAME]`, etc., plus HTML comments like `<!-- PLACEHOLDER: ... -->`. Search for `[` and `PLACEHOLDER` to find every one of them. **Do not publish without replacing them.**

| What | Where |
| --- | --- |
| Official logo | Drop your logo at `images/logo.png`. Until it exists, a temporary text wordmark shows automatically. |
| Hero / about / section photography | Current `.jpg` files in `images/` are licensed stock photos (Pexels — free for commercial use, no attribution required). Replace them with Econova's own project photography before launch, keeping the same filenames (`hero.jpg`, `about.jpg`, `why-1.jpg`, `why-2.jpg`). |
| Statistics (`XX+` values) | `index.html`, "Statistics strip" section |
| Projects | `js/script.js`, the `PROJECTS` array (top of the projects module — fully commented). Fields: title, location, capacity, type, tags, scope, image, client, completion, description, scope points. |
| Project images | `images/projects/p1.jpg` … `p6.jpg` (stock photos — swap for real project photos, keep filenames) |
| Maharashtra location chips | `index.html`, "Maharashtra presence" section (currently editable placeholders — verify coverage) |
| Phone / email | All pages in the footer, and `contact.html` info cards |
| Mission / vision / history | `about.html` (marked `[ADD VERIFIED ...]`) |
| Canonical URL / OG image URLs | `<head>` of every page (see `<!-- TODO: ... -->` comments) |

---

## Brand system

- Primary blue: `#1F3E7A`
- Dark navy: `#0F1720`
- Accent orange: `#F58220`
- Light background: `#F2F4F7`
- White: `#FFFFFF`

Typography: **Manrope** (headings) + **Inter** (body), loaded from Google Fonts.

All colors and design tokens are defined as CSS variables at the top of `css/style.css`.

---

## JavaScript features (`js/script.js`)

- Sticky header shadow + mobile hamburger navigation (ARIA-aware)
- Subtle scroll-reveal animations via `IntersectionObserver` (respects `prefers-reduced-motion`)
- Projects page: filter buttons (All / Rooftop / Ground Mounted / Commercial / Industrial / Institutional), portfolio rendering, detail modal with keyboard (Esc) and backdrop closing
- Contact form: frontend validation (required fields, email/phone formats), inline errors, and a demo success state — **no data is sent anywhere**; wire it to a backend or a form service (e.g. Formspree) before going live

---

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

---

© 2026 Econova Power Solutions Pvt. Ltd. All rights reserved.
