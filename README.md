# Worlde

A five-letter word guessing game built with React and Vite and deployed as a
static site on GitHub Pages.

## Local development

Use Node.js 22, then install the locked dependencies and start the development
server:

```sh
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Verification

Run all local quality gates and produce the static site in `dist/`:

```sh
npm run check
npm audit
```

## GitHub Pages deployment

Pushes to `master` trigger `.github/workflows/deploy-pages.yml`. The workflow
checks the app, builds the static export, and deploys it through GitHub Pages.
It can also be started manually from the repository's Actions tab.

Project Pages paths are calculated from `GITHUB_REPOSITORY`, while user or
organization Pages repositories ending in `.github.io` are served from `/`.

## Word list

The build reads five-letter entries from `public/words2.md`. To use a different
list, replace that file and keep one word per line.
