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
- Tags: `v1.0.0` on `ac37881` (the registry's recorded `gitHead`),
  `v1.0.1` on `658ec30`, and `v1.0.2` on `baae7f0`. `v1.0.1` is only the
  nearest commit: that version was published from an uncommitted working
  copy, and the original 2021 commit no longer exists (history was rebased
  in 2022). `latest` is `1.0.2`. Follow `/VERSIONING.md` (workspace root)
  for any publish.

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
The branch is kept as a reference for janux 2.0, whose toolchain work
redoes it in `janux-mono` rather than importing it (JAM-127).

### Other branches

`origin/dev-07-eo-postal-address` (2017) is kept for reference only: it
holds country-specific postal-address subclasses (`PostalAddressMX`,
`PostalAddressBR` over a `BasePostalAddress`), the model for how a consumer
could subclass to represent a non-US address. It is not meant to be merged.

`develop-wp-uglify` (2019, tip `4fd722a`) was deleted on 2026-10-17. It was
an early attempt at a minification-safe `typeName` by hardcoding the class
names, which would make a subclass report its parent's name;
`declareTypeName()` supersedes it.
