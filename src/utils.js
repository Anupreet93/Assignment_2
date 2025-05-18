// utils.js

import imagesLoaded from 'imagesloaded';

/**
 * Preloads images specified by the CSS selector.
 * @param {string} [selector='img'] - CSS selector for target images or elements with background images.
 * @returns {Promise} - Resolves when image loading has checked (regardless of failures).
 */
export const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      resolve();
      return;
    }
    // Always resolve once imagesLoaded completes, ignoring failures
    imagesLoaded(elements, { background: true }, () => {
      resolve();
    });
  });
};
