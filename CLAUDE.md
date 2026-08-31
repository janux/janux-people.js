# janux-people.js

## Overview

Implements the Party pattern — an abstract entity that factors common behavior
between Person and Organization. Provides models for contact information
(phone, email, postal address).

## Tech Stack

- **Language**: TypeScript 3.1.8 → ES5/CommonJS
- **Build**: `tsc` via npm scripts (Gulp removed)
- **Test**: Mocha 2.3.4 + Chai 3.4.1
- **Node**: `~12.x` (engines field)

## Exports

`Person`, `Organization`, `PhoneNumber`, `PostalAddress`, `EmailAddress`,
`PartyAbstract`

Note these are **aliases**: the root `index.js` re-exports `PersonImpl` as
`Person`, `OrganizationImpl` as `Organization`, and so on. Consumers import
the alias names, not the `Impl` names.

## Key Dependencies

- lodash (any version)
- lokijs 1.4.1 (in-memory DB for tests/generators)
- bluebird 3.5.0

## Build & Test

```bash
nvm use 12
npm install
npm run build    # compiles TypeScript to dist/
npm run watch    # recompile on change
npm test         # build, then mocha
```

## Notes

- Standalone library — no internal janux dependencies.
- Has a user/org generator in `generator/` for seeding demo data.
- Output in `dist/`, type definitions in `index.d.ts`.
- Git branch: `dev`, remote: github.com/janux/janux-people.js
- Not yet tagged for a published version (the currently-published `1.0.1-rc2`
  predates this convention — see `janux/CLAUDE.md`'s Publishing section for
  the version-collision blocking a republish). Once republished, tag the
  published commit `vX.Y.Z` — see `janux/CLAUDE.md`, "Tag every published
  commit".

### Compiler version matters to downstream consumers

TypeScript 3.1.8's declaration emit flattens `get typeName(): string` into
`readonly typeName: string` in the `.d.ts`. janux-persist is built with
TS 4.9.5, which then rejects any subclass overriding `typeName` as an
accessor with error TS2611. Upgrading this project's compiler would resolve
that at the source; see `janux-persist.js/CLAUDE.md`.

### The `modernize-to-ts5` branch is deliberately unmerged

`origin/modernize-to-ts5` (17 commits) moves this project to TypeScript 5.4,
ESLint, vitest and strict mode, and removes basarat/collections, lodash and
the gulp artifacts. It is good work but cannot be adopted as-is:

- It targets **ES2020** and uses `??`/`?.` in seven source files, so the
  emitted JavaScript needs **Node 14+**. That breaks glarus (Node 12) and
  easytitle24 (Node 10).
- Its `src/index.ts` drops the alias exports — `PersonImpl` is no longer
  exported as `Person`. Roughly 40 files across easytitle24 and glarus
  import the alias names.

Both are fixable (target ES2019; re-add the aliases), but that work is
deferred until the Node 12 baseline is established across all projects.
