// ==========================================
//  compat.js — Cross-browser helpers
// ==========================================

function safeStorageGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (e) {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

function smoothScrollToElement(el, block) {
  if (!el) return;

  const supportsSmoothScroll =
    'scrollBehavior' in document.documentElement.style;

  if (supportsSmoothScroll) {
    el.scrollIntoView({ behavior: 'smooth', block: block || 'start' });
    return;
  }

  el.scrollIntoView(true);
}

function observeWhenVisible(elements, onVisible, options) {
  const items = Array.prototype.slice.call(elements || []);
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(onVisible);
    return null;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        onVisible(entry.target, observer);
      }
    });
  }, options || {});

  items.forEach(function(el) { observer.observe(el); });
  return observer;
}

function dispatchLangChange(lang) {
  if (typeof CustomEvent === 'function') {
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    return;
  }

  try {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('langchange', true, true, { lang: lang });
    document.dispatchEvent(event);
  } catch (e) {
    // No-op fallback for very old browsers.
  }
}
