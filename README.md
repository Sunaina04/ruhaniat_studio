# Ruhaniat Studio — Website

*Tradition in Every Thread. Style in Every Stitch.*

The website for Ruhaniat Studio, a Punjabi ethnic wear design and custom-stitching studio. It is built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4. Every page is generated as static HTML. Customer enquiries go through WhatsApp.

## Getting started

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build                # static site in ./out
```

Don't run `npm run build` while `npm run dev` is running. Both use the `.next` folder, and the dev server will start throwing "Cannot find module" errors. If that happens, stop it and run `rm -rf .next && npm run dev`.

## Going live

- **Vercel (main site):** https://ruhaniatstudio.vercel.app. Vercel builds and deploys every push to `main` automatically. The site address is detected from Vercel; set `NEXT_PUBLIC_SITE_URL` in Vercel if you add a custom domain.
- **GitHub Pages (copy):** `.github/workflows/deploy.yml` also publishes the site under `/ruhaniat_studio`. Its canonical URLs point to the Vercel site, so search engines treat Vercel as the main one.

The site is exported as static files (`output: "export"` in `next.config.ts`). Your WhatsApp number and email are set in `src/config/site.ts`.

## Everyday editing

| What you want to change | Where |
| --- | --- |
| WhatsApp number, email, Instagram | `src/config/site.ts` |
| Default WhatsApp greeting, tagline | `src/config/site.ts` |
| Collections (names, descriptions, order) | `src/data/categories.ts` |
| Designs (add, remove, rename, reference numbers) | `src/data/designs.ts` |
| Modern Bibiyaan De Designs heritage details | `src/data/heritage.ts` |
| Customer reviews (real ones only, with permission) | `src/data/reviews.ts` |
| Journal articles (add, edit, publish new) | `src/data/journal.ts` |
| Instagram link (shows the "Follow Our Style Journey" button) | `instagram` in `src/config/site.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

### Adding your own photographs

Until a design has a photo, the site draws a sample illustration of it. To use a real photograph:

1. Put the image in `public/images/designs/`, for example `rs-001.jpg`. Use a 3:4 portrait shape, about 1200×1600px.
2. In `src/data/designs.ts`, set `image: "/images/designs/rs-001.jpg"` on that design.

Collection cover images work the same way: put them in `public/images/categories/` and set `image` in `src/data/categories.ts`.

### Writing a Journal article

Copy an article in `src/data/journal.ts` and give it a new `slug`, which becomes its URL (`/journal/your-slug`). Pick a `category` and a `cover` illustration (a `silhouette` and `tone`), then write the body as blocks: `p` (paragraph), `h2` (heading), `list`, `tip` or `design` (shows one of your designs by its reference). The site works out the reading time, adds the article to the Journal page, links related designs and includes it in the sitemap.

### Images

All design and Journal images are sketch illustrations drawn in code, so nothing depends on outside photos. To use your own photograph for a design, put it in `public/images/designs/` and set `image` on that design in `designs.ts`. It fades in as it loads, and the "Ruhaniat Design Concept" label disappears.

### Adding a design

Copy an entry in `src/data/designs.ts`, give it a new unique `ref` (for example `RS-037`) and choose its `category`. Its page at `/designs/rs-037`, its card on the collection page and its WhatsApp message are all created automatically.

## WhatsApp & enquiries

- **Design buttons** open WhatsApp with a message like: *"Hello Ruhaniat Studio, I liked design RS-001 (Mulmul Morning Suit) and would like to know more about custom stitching."*
- **The floating button** and the general buttons use the default greeting from `site.ts`.
- **The enquiry form** (`/contact`) checks the name and phone number, then opens WhatsApp with every field filled in. A WhatsApp link cannot carry photos, so the customer is asked to attach their reference images in the chat.
- **Optional:** set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` to a form service such as Formspree. The form will then also send its fields and the uploaded images to that address.
- **Design-page links:** "Use Enquiry Form" opens `/contact?design=RS-001` with the design already filled in.

## Pages

- `/`: home page
- `/collections`: all collections
- `/collections/[slug]`: one page per collection (9 in total)
- `/collections/modern-bibiyaan-de-designs`: also has the heritage inspiration section
- `/designs/[ref]`: one page per design
- `/custom-stitching`, `/about`, `/contact`
- `/sitemap.xml`, `/robots.txt`: generated automatically

## Content rules followed

The site contains no invented reviews (the reviews section stays a "share your review" message until real ones are added), orders, prices or physical-boutique claims. Bridal wear is one collection among nine. There is no shop or payment system.
