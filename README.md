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

# Full Stack (FE+BE) Developer Test

The test will consist of a common task starting from a standard create-next-app template with Next 15. Applicants can do an extra task depending on whether they are applying for Frontend or Full Stack positions. 

# Introduction

This task should take around 3 hours to complete. Please do not spend more than 4 hours. Keep in mind that it is not realistic that you finish all tasks with production-level quality in the time suggested. Besides output, we want to see your understanding of the tasks, your strengths, approach and philosophy. There will always be time in the interview to discuss what you didn’t have time to finish.

Usage of AI coding assistants is encouraged, but be mindful that we will ask questions to test your understanding of the task in the interview.

When you are done, please create a PR in the repository including a description of your changes.

If you need to be added with a different account, or run into any trouble, contact [dario.sanchez@why.de](mailto:dario.sanchez@why.de) asap.

### Setup Notes

- We recommend using pnpm. If you use a different package manager, delete the `pnpm-lock.yaml` file first.
    - Quick intro: `pnpm i` to install dependencies, `pnpm dev` to run dev mode (with live changes), `pnpm build` to build and `pnpm start` to serve the built version locally.

## Base Task

Display a grid of music search results (artists, albums, songs) with the name and an image if available (feel free to also display other information returned in the API response) for each result.

Here is a Figma file with a very basic mockup: https://www.figma.com/design/QaAUTjri39HPaSUTEoMfWQ/Cat-Grid?node-id=282-53

Also keep in mind that UI is not the focus of the base task, feel free to use component libraries to speed up development. We like [shadcn](https://ui.shadcn.com/). Other than that, please use [TailwindCSS](https://tailwindcss.com/) (it’s already set up).

**Requirements**:

- The information must be fetched from the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)
    - Example request: `https://itunes.apple.com/search?media=music&entity=musicArtist,album,song&term={your+search+term}`
- There is a search bar that can be used to search with plaintext. The search should run without interaction from the user.
- A row below the search bar lets the user add extra filters like music genre, specific entity (artist, album, song) or language. There should also be a checkbox to allow explicit content that defaults to false.
- The grid should be responsive and adapt to at least desktop and mobile screen sizes.
- Hint: Fetch should be done via nextjs server actions

## Frontend Focus Task

For the Frontend Developer position, the extra focus on the understanding of page navigation, animations and data fetching.

**Focus Task**: 

- Implement sorting at least by Alphabetical ascending/descending. The user should be able to change this through a button.
- **Use Motion** ([https://motion.dev/](https://motion.dev/)) to add a touch of interactivity or animation. Where and how is up to you. Be creative and show us what you got :)
- When clicking on a card, a detail view is opened showing more information, i.e. clicking on an album opens an album page with a list of all songs, etc. - again be creative, come up with something that makes sense to you
    - Example request: `https://itunes.apple.com/lookup?id={albumId}&entity=song`
- Nice to have: Instead of a new page, open in an overlay using Nextjs route interception. [https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)

## Backend Focus Task

For the Full Stack Developer position, this extra task tests your understanding of APIs and AI.

**Focus Task**: Implement an `/api/similar/{artistId}` endpoint that, based on the artist id, generates 3 artist suggestions using AI / LLMs (we like using the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction)).

- OpenAI API Key: [https://share.1password.com/s#RNlNRd59peNbdRXjmKtMe5-rbkk4DB6lh9UuKZRw8CA](https://share.1password.com/s#RNlNRd59peNbdRXjmKtMe5-rbkk4DB6lh9UuKZRw8CA) (link expires Sep 13)

This task is not just about structuring the AI output and combining it with the API but also about your conceptional thinking behind the prompt - so give that some thought. 

Trigger this endpoint from the frontend & display the results; add additional interesting facts or deep-dives to your liking or explain to us where you would go next.
