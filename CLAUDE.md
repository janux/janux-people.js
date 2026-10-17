# janux-people.js

## Overview

Implements the Party pattern — an abstract entity that factors common behavior
between Person and Organization. Provides models for contact information
(phone, email, postal address).

## Tech Stack

- **Language**: TypeScript 3.1.8 → ES5/CommonJS
- **Build**: `tsc` via npm scripts (Gulp removed)
- **Test**: Mocha 2.3.4 + Chai 3.4.1
- **Node**: `>=10` (engines field; it constrains consumers, and the ES5
  output runs on Node 10+, so it pins no npm/pnpm version)

## Exports

`Person`, `Organization`, `PhoneNumber`, `PostalAddress`, `EmailAddress`,
`PartyAbstract`, `declareTypeName`

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
- Not yet tagged for a published version. `latest` points at `1.0.1`; the
  `1.0.1-rc` / `-rc2` builds (published after 1.0.1, and once mis-tagged
  as `latest`) are being replaced by `1.0.2` via `1.0.2-rc1` (JAM-125).
  Follow `/VERSIONING.md` (workspace root) for any publish.

### `typeName` must be declared, not derived

`typeName` (and the `typeName` in `toJSON()`) is what consumers use to
rehydrate a contact as a `Person` or an `Organization`, so it is part of
the wire format. Deriving it from the constructor's name is not safe:
minifiers and scope-hoisting bundlers rename constructors. So `PersonImpl`
and `OrganizationImpl` declare their names with `declareTypeName()`
(`src/tools.ts`), which `className()` returns ahead of `constructor.name`.
A subclass that declares nothing reports its own constructor name, which
is only safe in unminified code: a subclass whose `typeName` matters
should call `declareTypeName(Sub, 'Sub')` too.

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
