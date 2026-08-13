// ==========================================
//  Tutorial: k-NN Interactive Demo
// ==========================================

(function() {
  'use strict';

  // State
  let points = [];           // Training points: {x, y, color}
  let currentColor = 'red';  // Current drawing color
  let k = 3;                 // Number of neighbors
  let canvas = null;
  let ctx = null;

  // DOM elements
  let redBtn = null;
  let blueBtn = null;
  let clearBtn = null;
  let kSlider = null;
  let kDisplay = null;
  let countRedEl = null;
  let countBlueEl = null;
  let kValueEl = null;
  let copyBtn = null;
  let copyMsg = null;

  // Color constants
  const COLORS = {
    red: '#EC4899',
    blue: '#06B6D4',
    redLight: 'rgba(236, 72, 153, 0.1)',
    blueLight: 'rgba(6, 182, 212, 0.1)',
    gridSize: 20
  };

  // Initialize when DOM is ready
  function init() {
    canvas = document.getElementById('tut-canvas');
    if (!canvas) {
      // Retry if not ready yet
      setTimeout(init, 100);
      return;
    }

    ctx = canvas.getContext('2d');

    // Get DOM elements
    redBtn = document.getElementById('tut-color-red');
    blueBtn = document.getElementById('tut-color-blue');
    clearBtn = document.getElementById('tut-clear');
    kSlider = document.getElementById('tut-k-slider');
    kDisplay = document.getElementById('tut-k-display');
    countRedEl = document.getElementById('tut-count-red');
    countBlueEl = document.getElementById('tut-count-blue');
    kValueEl = document.getElementById('tut-k-value');
    copyBtn = document.getElementById('tut-copy-code');
    copyMsg = document.getElementById('tut-copy-msg');

    // Event listeners
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    redBtn.addEventListener('click', () => setColor('red'));
    blueBtn.addEventListener('click', () => setColor('blue'));
    clearBtn.addEventListener('click', clearPoints);
    kSlider.addEventListener('input', handleKChange);
    copyBtn.addEventListener('click', copyCode);

    // Initial draw
    updateUI();
    draw();
  }

  // Handle canvas click (mouse)
  function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check bounds
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

    addPoint(x, y);
  }

  // Handle touch (mobile)
  function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

    addPoint(x, y);
  }

  // Add a training point
  function addPoint(x, y) {
    points.push({ x, y, color: currentColor });
    updateUI();
    draw();
  }

  // Set current drawing color
  function setColor(color) {
    currentColor = color;
    redBtn.classList.toggle('active', color === 'red');
    blueBtn.classList.toggle('active', color === 'blue');
  }

  // Clear all points
  function clearPoints() {
    points = [];
    updateUI();
    draw();
  }

  // Handle k slider change
  function handleKChange(e) {
    k = parseInt(e.target.value, 10);
    kDisplay.textContent = k;
    kValueEl.textContent = t('tut_stat_k').replace('3', k);
    draw();
  }

  // Euclidean distance
  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  // k-NN prediction
  function predict(x, y) {
    if (points.length === 0) return 'red';

    // 1. Calculate distances to ALL training points
    const distances = points.map(p => ({ color: p.color, d: distance(p, { x, y }) }));

    // 2. Sort by distance (closest first)
    distances.sort((a, b) => a.d - b.d);

    // 3. Take k nearest neighbors
    const neighbors = distances.slice(0, Math.min(k, distances.length));

    // 4. Majority voting
    const redVotes = neighbors.filter(n => n.color === 'red').length;
    return redVotes > neighbors.length / 2 ? 'red' : 'blue';
  }

  // Draw everything
  function draw() {
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // Draw decision boundary grid
    const gridSize = COLORS.gridSize;
    for (let x = 0; x < w; x += gridSize) {
      for (let y = 0; y < h; y += gridSize) {
        const pred = predict(x, y);
        ctx.fillStyle = pred === 'red' ? COLORS.redLight : COLORS.blueLight;
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    // Draw training points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = p.color === 'red' ? COLORS.red : COLORS.blue;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // White center dot for visibility
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
  }

  // Update UI elements
  function updateUI() {
    const redCount = points.filter(p => p.color === 'red').length;
    const blueCount = points.filter(p => p.color === 'blue').length;

    if (countRedEl) countRedEl.textContent = t('tut_stat_red').replace('0', redCount);
    if (countBlueEl) countBlueEl.textContent = t('tut_stat_blue').replace('0', blueCount);
    if (kValueEl) kValueEl.textContent = t('tut_stat_k').replace('3', k);

    // Update button active states
    if (redBtn) redBtn.classList.toggle('active', currentColor === 'red');
    if (blueBtn) blueBtn.classList.toggle('active', currentColor === 'blue');
  }

  // Copy code to clipboard
  function copyCode() {
    const code = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Mój pierwszy AI</title>
  <style>
    canvas { border: 2px solid #7C3AED; border-radius: 12px; background: #1A1035; }
    body { font-family: sans-serif; text-align: center; padding: 2rem; background: #0F0A1E; color: #F1F0FF; }
    button { padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 8px; background: #7C3AED; color: white; cursor: pointer; font-weight: bold; }
    button:hover { background: #A855F7; }
  </style>
</head>
<body>
  <h1>🤖 k-NN Demo</h1>
  <canvas id="c" width="500" height="350"></canvas>
  <br><button onclick="clearPoints()">Wyczyść</button>
  <button onclick="setColor('red')">🔴 Czerwony</button>
  <button onclick="setColor('blue')">🔵 Niebieski</button>
  <script>
// Dane treningowe: [{x, y, color}, ...]
const points = [];
let currentColor = 'red';
const k = 3;

// Odległość euklidesowa (twierdzenie Pitagorasa!)
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Główna funkcja AI: przewiduje kolor punktu
function predict(x, y) {
  // 1. Oblicz odległości do WSZYSTKICH punktów treningowych
  const distances = points.map(p => ({ color: p.color, d: dist(p, {x, y}) }));

  // 2. Posortuj od najbliższego
  distances.sort((a, b) => a.d - b.d);

  // 3. Weź k najbliższych sąsiadów
  const neighbors = distances.slice(0, k);

  // 4. Głosowanie większościowe
  const redVotes = neighbors.filter(n => n.color === 'red').length;
  return redVotes > k/2 ? 'red' : 'blue';
}

// Rysowanie: punkty treningowe + siatka przewidywań
function draw() {
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);

  // Siatka: pokaż co AI "myśli" o każdym punkcie
  for (let x = 0; x < c.width; x += 20)
    for (let y = 0; y < c.height; y += 20) {
      const pred = predict(x, y);
      ctx.fillStyle = pred === 'red' ? 'rgba(236,72,153,0.1)' : 'rgba(6,182,212,0.1)';
      ctx.fillRect(x, y, 20, 20);
    }

  // Punkty treningowe
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI*2);
    ctx.fillStyle = p.color === 'red' ? '#EC4899' : '#06B6D4';
    ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
  });
}

// Kliknięcie = dodaj punkt treningowy
c.onclick = e => {
  const rect = c.getBoundingClientRect();
  points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, color: currentColor });
  draw();
};

// Zmiana koloru
function setColor(c) { currentColor = c; }
function clearPoints() { points.length = 0; draw(); }

draw(); // Pierwsze rysowanie
  <\/script>
</body>
</html>`;

    navigator.clipboard.writeText(code).then(() => {
      copyMsg.style.display = 'block';
      copyBtn.textContent = t('tut_copy_btn').replace('📋 ', '✅ ');
      setTimeout(() => {
        copyMsg.style.display = 'none';
        copyBtn.textContent = t('tut_copy_btn');
      }, 3000);
    }).catch(err => {
      console.error('Copy failed:', err);
      copyMsg.textContent = t('tut_copy_success').replace('Skopiowano!', 'Błąd kopiowania — spróbuj ręcznie');
      copyMsg.style.display = 'block';
      copyMsg.style.color = 'var(--pink)';
    });
  }

  // Translation helper (uses global t function from i18n.js)
  function t(key) {
    if (typeof window.t === 'function') {
      return window.t(key);
    }
    // Fallback Polish
    const fallback = {
      tut_stat_red: 'Czerwone: 0',
      tut_stat_blue: 'Niebieskie: 0',
      tut_stat_k: 'k = 3',
      tut_copy_btn: '📋 Skopiuj kod do schowka',
      tut_copy_success: 'Skopiowano! Wklej do pliku .html i otwórz w przeglądarce.'
    };
    return fallback[key] || key;
  }

  // Listen for language changes
  document.addEventListener('langchange', (e) => {
    updateUI();
    if (kDisplay) kDisplay.textContent = k;
  });

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for testing
  window.TutorialDemo = {
    init,
    addPoint,
    predict,
    clearPoints,
    setColor,
    getPoints: () => points,
    getK: () => k
  };
})();