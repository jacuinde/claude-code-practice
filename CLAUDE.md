# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

The practice repo for the course "Claude Code: Everything You Need to Know". It has two separate parts:

- **The app** (`src/`, `test/`, `samples/`): `linkcheck`, a small Markdown link checker that reports relative links whose target file is missing. Course exercises change this code.

Zero dependencies: everything uses Node.js built-ins only (Node >= 22, ES modules). Don't add npm packages.

## Commands

```bash
npm test                                   # app tests (node --test "test/**/*.test.js")
node --test test/links.test.js             # one test file
node --test --test-name-pattern="angle" test/links.test.js   # one test by name
npm run linkcheck -- samples               # run the app on a folder (exit 1 if broken links, 2 on bad config)
```

## App architecture

- `src/cli.js` is the entry point: it resolves the target folder, loads optional `linkcheck.json` from that folder via `config.js`, calls `brokenLinks`, prints `file:line: broken link to target`, and sets the exit code.
- `src/config.js` parses `linkcheck.json` (`files`: paths to scan, default `["."]`; `ignore`: target prefixes to skip). Missing fields fall back to `DEFAULTS`.
- `src/links.js` does the parsing. `findLinks` uses one regex to find inline links (`[t](x)`, `[t](<x>)`, `[t](x "title")`), skipping images, inline code, and fenced blocks. `isExternal` detects URL schemes.
- `src/check-links.js` walks the configured paths for `.md` files (skipping dotfiles and `node_modules`), drops `#fragment`s, URL-decodes targets, and resolves each one relative to the linking file.
- `test/links.test.js` asserts that `samples/` has exactly one broken link (`guide.md` line 5 to `missing.md`), so editing `samples/` can break that test.

## Course checks

- `checks/run.mjs` dispatches to `checks/lessons/<id>.mjs`, which are registered in `checks/lessons/index.mjs`. Each lesson exports `title` and `items`; each item's `check(repo)` returns `true` or a hint string. Items marked `local: true` read files under `.practice/`, which git ignores.
- Many checks read **committed** state (`git show HEAD:...`), so lesson work only counts after it is committed. For example, `b-capstone` needs a committed CLAUDE.md that mentions `npm test`.


## Conventions

- Every new source file starts with the line