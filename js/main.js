// ==========================================
//  main.js — Navigation, init, footer counters
// ==========================================

// ---- Navigation ----
function revealElement(el) {
  if (!el) return;
  el.classList.add('visible');
  el.querySelectorAll('.reveal').forEach(function(child) {
    child.classList.add('visible');
  });
}

function scrollToSection(sectionId) {
  var el = document.getElementById(sectionId);
  revealElement(el);
  smoothScrollToElement(el, 'start');
}

function initUIHandlers() {
  document.addEventListener('click', function(e) {
    var scrollEl = e.target.closest('[data-scroll-target]');
    if (scrollEl) {
      e.preventDefault();
      scrollToSection(scrollEl.getAttribute('data-scroll-target'));
      return;
    }

    var gameBtn = e.target.closest('[data-open-game]');
    if (gameBtn) {
      e.preventDefault();
      openGame(parseInt(gameBtn.getAttribute('data-open-game'), 10));
      return;
    }

    var quizBtn = e.target.closest('[data-quiz-level]');
    if (quizBtn) {
      if (quizBtn.classList.contains('locked')) return;
      e.preventDefault();
      startQuizLevel(parseInt(quizBtn.getAttribute('data-quiz-level'), 10));
      return;
    }

    if (e.target.closest('#lang-toggle')) {
      e.preventDefault();
      toggleLang();
      return;
    }

    if (e.target.closest('[data-close-unlock]')) {
      e.preventDefault();
      closeUnlock();
    }
  });
}

// Active nav link on scroll
function initNavHighlight() {
  const sections = ['hero', 'info', 'programming', 'first-ai', 'tutorial', 'games', 'safe-ai', 'factcheck', 'quiz-section', 'footer-section'];
  const links = document.querySelectorAll('.nav-links a[data-section]');

  observeWhenVisible(
    sections.map(function(id) { return document.getElementById(id); }).filter(Boolean),
    function(target) {
      links.forEach(function(link) { link.classList.remove('active'); });
      const active = document.querySelector('.nav-links a[data-section="' + target.id + '"]');
      if (active) active.classList.add('active');
    },
    { threshold: 0.4 }
  );
}

// ---- Reveal on scroll ----
function initReveal() {
  observeWhenVisible(
    document.querySelectorAll('.reveal'),
    function(target, observer) {
      target.classList.add('visible');
      if (observer) observer.unobserve(target);
    },
    { threshold: 0.15 }
  );
}

// ---- Info Cards flip ----
function initCards() {
  document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
}

// ---- Games ----
let currentGame = null;

function openGame(num) {
  if (!isUnlocked(`game${num}`)) return;
  currentGame = num;

  // Scroll to game area
  smoothScrollToElement(document.getElementById('game-area'), 'center');

  // Update title
  const titles = {
    1: t('game1_title'),
    2: t('game2_title'),
    3: t('game3_title'),
    4: t('game4_title'),
  };
  const titleEl = document.getElementById('game-area-title');
  if (titleEl) titleEl.textContent = titles[num] || '';

  // Init game
  const container = document.getElementById('game-area');
  setTimeout(() => {
    switch (num) {
      case 1: game1Init(container); break;
      case 2: game2Init(container); break;
      case 3: game3Init(container); break;
      case 4: game4Init(container); break;
    }
  }, 100);
}

// ---- Quiz ----
function openQuiz(level) {
  scrollToSection('quiz-section');
  setTimeout(function() { startQuizLevel(level); }, 400);
}

// ---- Footer counters ----
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(startVal + eased * (target - startVal));
    el.textContent = val.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  observeWhenVisible(
    document.querySelectorAll('[data-count]'),
    function(el, observer) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      if (observer) observer.unobserve(el);
    },
    { threshold: 0.5 }
  );
}

// ---- Unlock overlay close ----
function closeUnlock() {
  const overlay = document.getElementById('unlock-overlay');
  if (overlay) overlay.classList.remove('visible');
}

// ---- Lang change handler ----
document.addEventListener('langchange', () => {
  // Re-render active game if any
  if (currentGame) {
    const container = document.getElementById('game-area');
    switch (currentGame) {
      case 1: game1Init(container); break;
      case 2: game2Init(container); break;
      case 3: game3Init(container); break;
      case 4: game4Init(container); break;
    }
  }
  // Update quiz level buttons text (done via data-i18n)
  updateAllLocks();
});

// ---- DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', function() {
  initUIHandlers();
  initI18n();
  initNavHighlight();
  initReveal();
  initCards();
  initCounters();
  updateAllLocks();

  setTimeout(function() { openGame(1); }, 300);
});

// Expose handlers for dynamically rendered game/quiz UI.
window.scrollToSection = scrollToSection;
window.openGame = openGame;
window.openQuiz = openQuiz;
window.closeUnlock = closeUnlock;
window.toggleLang = toggleLang;
window.startQuizLevel = startQuizLevel;
