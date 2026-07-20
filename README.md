# Nightace Studio

Portfolio website for **Nightace Studio** — a web design and full-stack development studio based in Yangon, Myanmar. Japanese-minimal aesthetic with an interactive Three.js dot-field hero.

Built with [TanStack Start](https://tanstack.com/start) (SSR + file-based routing) and connected to [Lovable](https://lovable.dev).

## Tech Stack

| Layer          | Tools                                            |
| -------------- | ------------------------------------------------ |
| Framework      | React 19, TanStack Start + TanStack Router       |
| Build          | Vite 8, TypeScript 5                             |
| Styling        | Tailwind CSS 4, Radix UI (shadcn-style components) |
| Animation / 3D | Three.js, GSAP, Framer Motion                    |
| Package manager | Bun                                             |

## Prerequisites

- **[Bun](https://bun.sh)** v1.2 or later — used as package manager and script runner (`bun.lock` is the lockfile)
- **Git**

> Prefer npm? Node.js 20+ with `npm install` / `npm run dev` also works, but it ignores `bun.lock` and creates its own `package-lock.json`.

## Installation

```bash
# 1. Clone the repository
git clone <repo-url> nightace-studio
cd nightace-studio

# 2. Install dependencies
bun install

# 3. Start the dev server
bun dev
```

The app runs at **http://localhost:3006**.

- The port is fixed to `3006` in the `dev` script (`package.json`) with `--strictPort`, so the server fails fast instead of silently switching ports if 3006 is already taken.
- No environment variables are required.

> **Note:** `bunfig.toml` enforces a 24-hour supply-chain guard — package versions published less than a day ago are skipped during `bun install`.

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `bun dev`           | Start the dev server on port 3006            |
| `bun run build`     | Production build (Nitro, Cloudflare target)  |
| `bun run build:dev` | Build in development mode                    |
| `bun run preview`   | Preview the production build locally         |
| `bun run lint`      | Run ESLint                                   |
| `bun run format`    | Format the codebase with Prettier            |

## Project Structure

```
src/
├── routes/            # File-based routes (__root.tsx, index.tsx)
├── components/        # UI components (Radix/shadcn-style + site sections)
├── hooks/             # React hooks
├── lib/               # Utilities
├── assets/            # Images and static assets
├── router.tsx         # Router setup
├── routeTree.gen.ts   # Generated route tree (do not edit)
├── server.ts          # SSR server entry
├── start.ts           # TanStack Start entry
└── styles.css         # Global styles (Tailwind)
public/                # Static files served as-is
```

## Lovable

This repository is connected to a Lovable project — commits pushed to the connected branch sync back into the Lovable editor. **Do not rewrite published git history** (no force-push, rebase, amend, or squash of pushed commits), and keep the branch in a working state.
