// Part of linkcheck.
import { findLinks } from './links.js';

// Returns how many inline links findLinks finds in the Markdown.
export function countLinks(markdown) {
  return findLinks(markdown).length;
}
