import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countLinks } from '../src/stats.js';

test('counts the links findLinks finds', () => {
  const md = 'See [setup](setup.md) and [docs](https://example.com).\n[notes](<my notes.md>)\n';
  assert.equal(countLinks(md), 3);
});

test('skips images and links inside code', () => {
  const md = '![logo](logo.png)\n`[not](a.md)`\n```\n[also not](b.md)\n```\n[yes](c.md)\n';
  assert.equal(countLinks(md), 1);
});

test('is zero when there are no links', () => {
  assert.equal(countLinks('# Just a title\n'), 0);
});
