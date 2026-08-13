// ==========================================
//  game2.js — "Sortownia Danych" (Data Sorter)
//  Concept: Data Classification
// ==========================================

const G2_ITEMS_PL = [
  ['42', 'numbers'], ['7', 'numbers'], ['3.14', 'numbers'],
  ['100', 'numbers'], ['−5', 'numbers'],
  ['KOT', 'words'], ['DOM', 'words'], ['SZKOŁA', 'words'],
  ['RZEKA', 'words'], ['AI', 'words'],
  ['🌞', 'images'], ['🎂', 'images'], ['🚀', 'images'],
  ['🌈', 'images'], ['🎵', 'images'],
];

const G2_ITEMS_EN = [
  ['42', 'numbers'], ['7', 'numbers'], ['3.14', 'numbers'],
  ['100', 'numbers'], ['−5', 'numbers'],
  ['CAT', 'words'], ['HOUSE', 'words'], ['SCHOOL', 'words'],
  ['RIVER', 'words'], ['AI', 'words'],
  ['🌞', 'images'], ['🎂', 'images'], ['🚀', 'images'],
  ['🌈', 'images'], ['🎵', 'images'],
];

const G2_DRAG_THRESHOLD = 6;

let g2State = {};

function game2Init(container) {
  g2State = {
    score: 0,
    total: 0,
    items: [],
    sorted: { numbers: [], words: [], images: [] },
    selectedIdx: null,
    activeItem: null,
    dragClone: null,
    dragMoved: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragStartX: 0,
    dragStartY: 0,
    suppressClick: false,
  };
  const pool = currentLang === 'pl' ? [...G2_ITEMS_PL] : [...G2_ITEMS_EN];
  g2State.items = shuffle(pool).slice(0, 10);
  renderGame2(container);
}

function renderGame2(container) {
  if (g2State.items.length === 0) {
    renderGame2Result(container);
    return;
  }

  container.innerHTML = `
    <div class="g2-layout fade-in">
      <div class="g2-score-bar">
        <span>${t('g2_score')}:</span>
        <span class="g2-score-val" id="g2-score">${g2State.score}/${g2State.total}</span>
        <span class="g2-feedback-flash" id="g2-flash" style="opacity:0"></span>
      </div>

      <p class="g2-hint">${t('g2_hint')}</p>

      <div class="g2-stream" id="g2-stream">
        <span class="g2-stream-label">${currentLang === 'pl' ? 'Dane do posortowania' : 'Data to sort'}</span>
        ${g2State.items.map(function(item, i) {
          return `
            <div class="g2-item drag-item type-${item[1]}${g2State.selectedIdx === i ? ' selected' : ''}"
                 id="g2-item-${i}"
                 data-type="${item[1]}"
                 data-idx="${i}"
                 role="button"
                 tabindex="0"
                 aria-pressed="${g2State.selectedIdx === i ? 'true' : 'false'}">
              ${item[0]}
            </div>`;
        }).join('')}
      </div>

      <div class="g2-baskets">
        <div class="drop-zone" data-basket="numbers">
          <div class="basket-label">${t('g2_numbers')}</div>
          <div class="basket-items">
            ${g2State.sorted.numbers.map(function(it) {
              return `<div class="g2-item type-numbers">${it}</div>`;
            }).join('')}
          </div>
        </div>
        <div class="drop-zone" data-basket="words">
          <div class="basket-label">${t('g2_words')}</div>
          <div class="basket-items">
            ${g2State.sorted.words.map(function(it) {
              return `<div class="g2-item type-words">${it}</div>`;
            }).join('')}
          </div>
        </div>
        <div class="drop-zone" data-basket="images">
          <div class="basket-label">${t('g2_images')}</div>
          <div class="basket-items">
            ${g2State.sorted.images.map(function(it) {
              return `<div class="g2-item type-images">${it}</div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  bindGame2Events(container);
}

function bindGame2Events(container) {
  container.querySelectorAll('.drag-item').forEach(function(el) {
    el.addEventListener('mousedown', g2PointerDown);
    el.addEventListener('touchstart', g2PointerDown, { passive: false });
    el.addEventListener('click', g2SelectItem);
    el.addEventListener('keydown', g2ItemKeydown);
  });

  container.querySelectorAll('.drop-zone').forEach(function(zone) {
    zone.addEventListener('click', function() {
      g2DropSelected(zone.getAttribute('data-basket'));
    });
  });
}

function g2ItemKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    g2SelectItem(e);
  }
}

function g2SelectItem(e) {
  if (g2State.suppressClick) {
    g2State.suppressClick = false;
    return;
  }
  if (g2State.dragMoved) return;

  const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
  if (Number.isNaN(idx)) return;

  g2State.selectedIdx = idx;
  document.querySelectorAll('#g2-stream .drag-item').forEach(function(el) {
    const selected = parseInt(el.getAttribute('data-idx'), 10) === idx;
    el.classList.toggle('selected', selected);
    el.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
}

function g2DropSelected(basket) {
  if (g2State.selectedIdx === null || g2State.selectedIdx === undefined) return;
  g2Classify(g2State.selectedIdx, basket);
  g2State.selectedIdx = null;
}

function g2PointerDown(e) {
  if (e.type === 'mousedown' && e.button !== 0) return;

  const point = g2GetPoint(e);
  if (!point) return;

  g2State.activeItem = e.currentTarget;
  g2State.dragMoved = false;
  g2State.dragStartX = point.x;
  g2State.dragStartY = point.y;

  if (e.type === 'touchstart') {
    e.preventDefault();
  }

  document.addEventListener('mousemove', g2PointerMove);
  document.addEventListener('mouseup', g2PointerUp);
  document.addEventListener('touchmove', g2PointerMove, { passive: false });
  document.addEventListener('touchend', g2PointerUp);
  document.addEventListener('touchcancel', g2PointerUp);
}

function g2PointerMove(e) {
  if (!g2State.activeItem) return;

  const point = g2GetPoint(e);
  if (!point) return;

  const dx = point.x - g2State.dragStartX;
  const dy = point.y - g2State.dragStartY;

  if (!g2State.dragMoved) {
    if (Math.hypot(dx, dy) < G2_DRAG_THRESHOLD) return;
    g2State.dragMoved = true;
    g2StartDragClone(g2State.activeItem, point.x, point.y);
    g2State.activeItem.classList.add('dragging');
  }

  e.preventDefault();
  g2MoveDragClone(point.x, point.y);
  g2HighlightDropZone(point.x, point.y);
}

function g2PointerUp(e) {
  document.removeEventListener('mousemove', g2PointerMove);
  document.removeEventListener('mouseup', g2PointerUp);
  document.removeEventListener('touchmove', g2PointerMove);
  document.removeEventListener('touchend', g2PointerUp);
  document.removeEventListener('touchcancel', g2PointerUp);

  if (!g2State.activeItem) return;

  const point = g2GetPoint(e) || { x: g2State.dragStartX, y: g2State.dragStartY };
  const item = g2State.activeItem;
  item.classList.remove('dragging');

  if (g2State.dragMoved) {
    e.preventDefault();
    g2State.suppressClick = true;
    const zone = g2DropZoneAt(point.x, point.y);
    if (zone) {
      const idx = parseInt(item.getAttribute('data-idx'), 10);
      if (!Number.isNaN(idx)) {
        g2Classify(idx, zone.getAttribute('data-basket'));
      }
    }
  }

  g2ClearDragClone();
  g2ClearDropHighlights();
  g2State.activeItem = null;
  g2State.dragMoved = false;
}

function g2GetPoint(e) {
  if (e.touches && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (e.changedTouches && e.changedTouches[0]) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  if (typeof e.clientX === 'number') {
    return { x: e.clientX, y: e.clientY };
  }
  return null;
}

function g2StartDragClone(item, x, y) {
  const rect = item.getBoundingClientRect();
  const clone = item.cloneNode(true);
  clone.classList.add('g2-drag-clone');
  clone.removeAttribute('id');
  clone.style.cssText = [
    'position: fixed',
    'top: ' + rect.top + 'px',
    'left: ' + rect.left + 'px',
    'width: ' + rect.width + 'px',
    'height: ' + rect.height + 'px',
    'z-index: 10000',
    'opacity: 0.95',
    'pointer-events: none',
    'margin: 0',
    'transform: scale(1.08) rotate(2deg)',
    'box-shadow: 0 16px 32px rgba(0,0,0,0.45)',
  ].join('; ');
  document.body.appendChild(clone);
  g2State.dragClone = clone;
  g2State.dragOffsetX = x - rect.left;
  g2State.dragOffsetY = y - rect.top;
}

function g2MoveDragClone(x, y) {
  if (!g2State.dragClone) return;
  g2State.dragClone.style.left = (x - g2State.dragOffsetX) + 'px';
  g2State.dragClone.style.top = (y - g2State.dragOffsetY) + 'px';
}

function g2ClearDragClone() {
  if (g2State.dragClone) {
    g2State.dragClone.remove();
    g2State.dragClone = null;
  }
}

function g2HighlightDropZone(x, y) {
  g2ClearDropHighlights();
  const zone = g2DropZoneAt(x, y);
  if (zone) zone.classList.add('drag-over');
}

function g2ClearDropHighlights() {
  document.querySelectorAll('.drop-zone').forEach(function(zone) {
    zone.classList.remove('drag-over');
  });
}

function g2DropZoneAt(x, y) {
  if (g2State.dragClone) {
    g2State.dragClone.style.visibility = 'hidden';
  }
  const el = document.elementFromPoint(x, y);
  if (g2State.dragClone) {
    g2State.dragClone.style.visibility = 'visible';
  }
  return el && el.closest('.drop-zone');
}

function g2Classify(idx, basket) {
  const item = g2State.items[idx];
  if (!item) return;

  const correct = item[1] === basket;
  g2State.total++;
  if (correct) {
    g2State.score++;
    g2State.sorted[basket].push(item[0]);
  }

  const flash = document.getElementById('g2-flash');
  if (flash) {
    flash.textContent = correct ? t('g2_correct') : t('g2_wrong');
    flash.className = 'g2-feedback-flash ' + (correct ? 'correct' : 'wrong');
    flash.style.opacity = '1';
    setTimeout(function() { flash.style.opacity = '0'; }, 1000);
  }

  g2State.items.splice(idx, 1);
  g2State.selectedIdx = null;

  setTimeout(function() {
    renderGame2(document.getElementById('game-area'));
  }, 300);
}

function renderGame2Result(container) {
  const passed = g2State.score / g2State.total >= 0.7;
  container.innerHTML = `
    <div class="quiz-result bounce-in">
      <div style="font-size:4rem">🗂️</div>
      <h3>${t('g2_result_title')}</h3>
      <div class="score-display">${g2State.score}<span>/${g2State.total}</span></div>
      <p style="color:var(--text-muted);margin:0.5rem 0">${t('g2_score')}</p>
      <p style="font-weight:700;color:var(--yellow);margin:1rem 0">
        ${passed ? t('g2_pass_msg') : t('g2_fail_msg')}
      </p>
      <div class="result-actions">
        <button type="button" class="btn btn-secondary" id="g2-play-again-btn">
          🔄 ${t('g2_play_again')}
        </button>
        ${passed ? `<button type="button" class="btn btn-primary" id="g2-next-btn">${t('g2_next_game')}</button>` : ''}
      </div>
    </div>
  `;

  container.querySelector('#g2-play-again-btn').addEventListener('click', function() {
    game2Init(document.getElementById('game-area'));
  });

  const nextBtn = container.querySelector('#g2-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      openGame(3);
    });
  }

  recordResult('game2', g2State.score, g2State.total);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
