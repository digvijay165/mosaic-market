# Mosaic Market

**Live store:** [Open Mosaic Market](https://mosaic-market-alpha.vercel.app/)

A responsive React marketplace storefront inspired by large online shopping sites, with its own name, visual identity, and a 44-product sample catalog across five departments.

## Run locally

You’ll need Node.js 20.19+ or 22.12+.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. You can also use `npm install` and `npm run dev` if you prefer npm.

## What works

- Search products by name, category, or description. Press `Ctrl+K` or `⌘K` to focus search.
- Browse categories, sort by price or rating, and view product details.
- Save favorites and add items to a bag. Both persist in local storage.
- Change quantities, remove products, see the subtotal, and get a free-delivery threshold reminder.
- Complete the front-end demo checkout and submit the newsletter form.
- Layout adapts for mobile, tablet, and desktop screens.

## Project structure

```text
index.html
src/
  App.jsx       React components and storefront behavior
  main.jsx      React entry point
  styles.css    Responsive visual styles
```

## Demo limits

The catalog and prices are sample data in `src/App.jsx`. Cart and saved-item data stay in the current browser. Checkout, account access, newsletter signup, delivery, and payment are front-end demonstrations; no orders or subscriptions are sent to a server. Product photos load from Unsplash, so an internet connection is needed to see them.

## Build for deployment

```bash
pnpm build
pnpm preview
```

The production site is generated in `dist/` and can be deployed to any static host.
