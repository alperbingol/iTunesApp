This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Setup Notes

- We recommend using pnpm. If you use a different package manager, delete the `pnpm-lock.yaml` file first.
    - Quick intro: `pnpm i` to install dependencies, `pnpm dev` to run dev mode (with live changes), `pnpm build` to build and `pnpm start` to serve the built version locally.

## Base

Display a grid of music search results (artists, albums, songs) with the name and an image if available for each result.

Here is a Figma file with a very basic mockup: https://www.figma.com/design/QaAUTjri39HPaSUTEoMfWQ/Cat-Grid?node-id=282-53

component libraries to speed up development: [shadcn](https://ui.shadcn.com/) [TailwindCSS](https://tailwindcss.com/)

**Requirements**:

- The information must be fetched from the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)
    - Example request: `https://itunes.apple.com/search?media=music&entity=musicArtist,album,song&term={your+search+term}`
- There is a search bar that can be used to search with plaintext. The search should run without interaction from the user.
- A row below the search bar lets the user add extra filters like music genre, specific entity (artist, album, song) or language. There should also be a checkbox to allow explicit content that defaults to false.
- The grid should be responsive and adapt to at least desktop and mobile screen sizes.
- Hint: Fetch should be done via nextjs server actions.
