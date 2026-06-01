# Front Torosyan

A small React application (Vite + TypeScript) that renders a post feed from a remote API and implements a responsive header with a mobile menu and post search.

## Implemented Features

- Responsive `Header`:
- top bar with logo and action buttons
- desktop navigation with a dropdown
- mobile side menu (overlay)
- search modal
- menu hide/show behavior on scroll
- `PostsSection`:
- loading posts from an external endpoint
- `loading` / `error` / `empty` states
- filtering posts by title and body text
- post cards with modal details
- Strict TypeScript typing and modular component/hook structure.

## Stack

- React `^19.2.6`
- React DOM `^19.2.6`
- TypeScript `~6.0.2`
- Vite `^8.0.12`
- ESLint `^10` + `typescript-eslint` + `react-hooks` rules

## Quick Start

### Requirements

- Node.js 20+ (latest LTS recommended)
- npm 10+

### Install and Run

```bash
npm install
npm run dev
```

By default, the app runs at `http://localhost:5173`.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check (`tsc -b`) + production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Project Structure

```text
src/
  App.tsx
  main.tsx
  components/
    header/
      components/
        DesktopMenu.tsx
        HeaderTopBar.tsx
        MobileMenu.tsx
        SearchModal.tsx
      Header.tsx
      Header.module.css
      constants.ts
    posts/
      components/
        PostCard.tsx
        PostModal.tsx
        PostsGrid.tsx
      hooks/
        usePosts.ts
      constants.ts
      types.ts
      utils.ts
      PostsSection.tsx
      PostsSection.module.css
```

## Data Flow

1. `App.tsx` stores the `searchQuery` state.
2. `Header` updates `searchQuery` through `onSearchChange`.
3. `PostsSection` loads all posts via `usePosts`.
4. `filterPosts` filters by `title + text`.
5. Clicking a post card opens `PostModal` with the selected post.

## Data Source

Posts are loaded from:

`https://cloud.codesupply.co/endpoint/react/data.json`

The endpoint constant is stored in `src/components/posts/constants.ts`.

## Technical Notes (Current State)

- No routing yet (single-screen app).
- No tests yet (unit/integration/e2e).
- UI strings are not internationalized.
- Posts endpoint is hardcoded (no `.env` config).
- `Post` type uses `autor` field name (as provided by API).
- The post modal close button text has encoding issues and should be fixed.

