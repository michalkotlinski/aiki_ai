// ==========================================
//  progress.js — localStorage + unlock system
// ==========================================

const PROGRESS_KEY = 'aiki_progress';
const PASS_THRESHOLD = 0.70; // 70%

const DEFAULT_PROGRESS = {
  game1: { completed: false, bestScore: 0, attempts: 0 },
  game2: { completed: false, bestScore: 0, attempts: 0 },
  game3: { completed: false, bestScore: 0, attempts: 0 },
  game4: { completed: false, bestScore: 0, attempts: 0 },
  quiz1: { completed: false, bestScore: 0, attempts: 0 },
  quiz2: { completed: false, bestScore: 0, attempts: 0 },
  quiz3: { completed: false, bestScore: 0, attempts: 0 },
};

// ---- Load / Save ----
function loadProgress() {
  try {
    const raw = safeStorageGet(PROGRESS_KEY, null);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_PROGRESS)), JSON.parse(raw));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
  }
}

function saveProgress(progress) {
  safeStorageSet(PROGRESS_KEY, JSON.stringify(progress));
}

// ---- Is unlocked? ----
function isUnlocked(key) {
  const p = loadProgress();
  switch (key) {
    case 'game1': return true;
    case 'game2': return p.game1.completed;
    case 'game3': return p.game2.completed;
    case 'game4': return p.game3.completed;
    case 'quiz1': return true;
    case 'quiz2': return p.quiz1.completed;
    case 'quiz3': return p.quiz2.completed;
    default:      return false;
  }
}

// ---- Record result ----
function recordResult(key, score, total) {
  const p = loadProgress();
  const ratio = total > 0 ? score / total : 0;
  p[key].attempts++;
  p[key].bestScore = Math.max(p[key].bestScore, ratio);
  if (ratio >= PASS_THRESHOLD) p[key].completed = true;
  saveProgress(p);
  updateAllLocks();
  if (ratio >= PASS_THRESHOLD) triggerUnlockEffect(key);
  return ratio >= PASS_THRESHOLD;
}

// ---- Update lock UI ----
function updateAllLocks() {
  ['game1','game2','game3','game4','quiz1','quiz2','quiz3'].forEach(key => {
    const card = document.querySelector(`[data-game="${key}"]`);
    if (!card) return;
    if (isUnlocked(key)) {
      card.classList.remove('locked');
      const overlay = card.querySelector('.lock-overlay');
      if (overlay) overlay.style.display = 'none';
    } else {
      card.classList.add('locked');
      const overlay = card.querySelector('.lock-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  });

  // Badge best scores
  ['game1','game2','game3','game4','quiz1','quiz2','quiz3'].forEach(key => {
    const badge = document.querySelector(`[data-score-badge="${key}"]`);
    if (!badge) return;
    const p = loadProgress();
    const pct = Math.round(p[key].bestScore * 100);
    badge.textContent = p[key].attempts > 0 ? `🏆 ${pct}%` : '';
  });
}

// ---- Confetti unlock animation ----
function triggerUnlockEffect(key) {
  const labelMap = {
    game2: 'game2_title', game3: 'game3_title', game4: 'game4_title',
    quiz2: 'quiz_level2', quiz3: 'quiz_level3',
  };
  const labelKey = labelMap[key];
  if (!labelKey) return;

  const label = t(labelKey);
  const overlay = document.getElementById('unlock-overlay');
  const msg = document.getElementById('unlock-msg');
  if (!overlay || !msg) return;

  msg.textContent = label;
  overlay.classList.add('visible');
  spawnConfetti();
}

// ---- Simple confetti ----
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#7C3AED','#06B6D4','#FBBF24','#EC4899','#10B981','#F97316'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.6}s;
      animation-duration: ${0.8 + Math.random() * 0.8}s;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(el);
  }
  setTimeout(() => { container.innerHTML = ''; }, 2500);
}

// ---- Reset (dev helper) ----
function resetProgress() {
  safeStorageRemove(PROGRESS_KEY);
  updateAllLocks();
}
