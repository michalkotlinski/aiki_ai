// ==========================================
//  game3.js — "Labirynt Aikiego" (Aiki's Maze)
//  Concept: Algorithms and decision sequences
// ==========================================

// Maze levels: 0=path, 1=wall, S=start, G=goal
// Represented as 7x7 grids
const MAZE_LEVELS = [
  {
    grid: [
      [1,1,1,1,1,1,1],
      [1,'S',0,0,1,1,1],
      [1,1,1,0,1,1,1],
      [1,1,1,0,0,0,1],
      [1,1,1,1,1,0,1],
      [1,1,1,1,1,'G',1],
      [1,1,1,1,1,1,1],
    ],
    solution: ['right','right','down','down','right','right','down','down'],
    minSteps: 8,
  },
  {
    grid: [
      [1,1,1,1,1,1,1],
      [1,'S',0,0,0,1,1],
      [1,1,1,1,0,1,1],
      [1,1,0,0,0,1,1],
      [1,1,0,1,1,1,1],
      [1,1,0,0,'G',1,1],
      [1,1,1,1,1,1,1],
    ],
    solution: ['right','right','right','down','down','left','left','down','down','right','right'],
    minSteps: 9,
  },
  {
    grid: [
      [1,1,1,1,1,1,1],
      [1,'S',1,1,1,1,1],
      [1,0,0,0,1,1,1],
      [1,1,1,0,0,0,1],
      [1,1,1,1,1,0,1],
      [1,0,0,0,0,'G',1],  // <- trap path left
      [1,1,1,1,1,1,1],
    ],
    solution: ['down','down','right','right','right','down','down'],
    minSteps: 7,
  },
];

let g3State = {};

function game3Init(container) {
  g3State = {
    level: 0,
    sequence: [],
    running: false,
    wins: 0,
    attempts: 0,
    totalAttempts: 0,
    phase: 'input',  // 'input' | 'running' | 'done'
  };
  renderGame3(container);
}

function renderGame3(container) {
  const level = MAZE_LEVELS[g3State.level];
  const done  = g3State.phase === 'done';
  const cols  = level.grid[0].length;

  // Find start position
  let startR = 0, startC = 0;
  level.grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === 'S') { startR = r; startC = c; }
  }));

  // Current Aiki position (if running, calculated from steps run so far, else = start)
  const aikPos = g3State.aikPos || { r: startR, c: startC };

  container.innerHTML = `
    <div class="g3-layout fade-in">
      <!-- Maze -->
      <div>
        <div class="maze-grid" style="grid-template-columns: repeat(${cols}, 1fr)" id="maze-grid">
          ${level.grid.map((row, r) => row.map((cell, c) => {
            const isAiki = aikPos.r === r && aikPos.c === c;
            let cls = 'maze-cell ';
            if (isAiki) cls += 'current';
            else if (cell === 1)   cls += 'wall';
            else if (cell === 'S') cls += 'start';
            else if (cell === 'G') cls += 'goal';
            else if (g3State.visited && g3State.visited[`${r},${c}`]) cls += 'visited';
            else cls += 'path';
            return `<div class="${cls}">${
              isAiki ? '🤖' :
              cell === 'G' ? '🏁' :
              cell === 'S' ? '⬤' :
              cell === 1 ? '' : ''
            }</div>`;
          }).join('')).join('')}
        </div>
        <div style="margin-top:0.75rem;font-size:0.8rem;color:var(--text-muted);text-align:center">
          ${currentLang === 'pl' ?
            `Poziom ${g3State.level + 1} z ${MAZE_LEVELS.length}` :
            `Level ${g3State.level + 1} of ${MAZE_LEVELS.length}`}
        </div>
      </div>

      <!-- Controls -->
      <div class="g3-controls">
        ${done ? `
          <div class="quiz-result bounce-in" style="padding:1rem">
            <div style="font-size:3rem">🤖🏁</div>
            <h3>${t('g3_result_title')}</h3>
            <div class="score-display">${g3State.wins}<span>/${MAZE_LEVELS.length}</span></div>
            <p style="font-weight:700;color:var(--yellow);margin:1rem 0" id="g3-pass-msg"></p>
            <div class="result-actions" style="flex-direction:column">
              <button class="btn btn-secondary" onclick="game3Init(document.getElementById('game-area'))">
                🔄 ${t('g3_play_again')}
              </button>
              <button class="btn btn-primary" id="g3-next-btn" style="display:none"
                      onclick="openQuiz(1)">
                ${t('g3_pass_msg').replace('🎉 ','').split('!')[0]}! →
              </button>
            </div>
          </div>
        ` : `
          <!-- D-Pad -->
          <div>
            <div class="g3-dpad">
              <button class="g3-dpad-btn" data-dir="up"    onclick="g3AddStep('up')"    ${g3State.running?'disabled':''}>⬆️</button>
              <button class="g3-dpad-btn" data-dir="left"  onclick="g3AddStep('left')"  ${g3State.running?'disabled':''}>⬅️</button>
              <button class="g3-dpad-btn" data-dir="right" onclick="g3AddStep('right')" ${g3State.running?'disabled':''}>➡️</button>
              <button class="g3-dpad-btn" data-dir="down"  onclick="g3AddStep('down')"  ${g3State.running?'disabled':''}>⬇️</button>
            </div>
          </div>

          <!-- Sequence -->
          <div>
            <div class="g3-steps-label">${t('g3_steps')} (${g3State.sequence.length})</div>
            <div class="g3-sequence" id="g3-sequence">
              ${g3State.sequence.map((s, i) => {
                const emoji = {up:'⬆️',down:'⬇️',left:'⬅️',right:'➡️'}[s];
                const cls = g3State.stepState && g3State.stepState[i] ? g3State.stepState[i] : '';
                return `<div class="g3-step-pill ${cls}">${emoji}</div>`;
              }).join('')}
              ${g3State.sequence.length === 0 ?
                `<span style="color:var(--text-muted);font-size:0.85rem">
                  ${currentLang === 'pl' ? 'Dodaj ruchy...' : 'Add moves...'}
                </span>` : ''}
            </div>
          </div>

          <!-- Message -->
          <div class="g3-msg ${g3State.msgType || ''}" id="g3-msg">
            ${g3State.msg || (currentLang === 'pl' ? t('g3_instruction') : t('g3_instruction'))}
          </div>

          <!-- Action buttons -->
          <div class="g3-action-row">
            <button class="btn btn-secondary" onclick="g3Clear()" ${g3State.running?'disabled':''}>
              ${t('g3_clear')}
            </button>
            <button class="btn btn-primary" onclick="g3Run()" ${g3State.running || g3State.sequence.length === 0 ? 'disabled':''}>
              ${t('g3_start')}
            </button>
          </div>
        `}
      </div>
    </div>
  `;

  // Add swipe support for the maze grid
  if (!done) {
    const grid = document.getElementById('maze-grid');
    if (grid) {
      let swipeStartX, swipeStartY;
      grid.addEventListener('touchstart', e => {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
      }, { passive: true });
      grid.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = e.changedTouches[0].clientY - swipeStartY;
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
        if (Math.abs(dx) > Math.abs(dy)) g3AddStep(dx > 0 ? 'right' : 'left');
        else g3AddStep(dy > 0 ? 'down' : 'up');
      }, { passive: true });
    }
  }

  if (done) {
    const passed = recordResult('game3', g3State.wins, MAZE_LEVELS.length);
    const msg = document.getElementById('g3-pass-msg');
    const nxt = document.getElementById('g3-next-btn');
    if (msg) msg.textContent = passed ? t('g3_pass_msg') : t('g3_fail_msg');
    if (nxt && passed) nxt.style.display = 'inline-flex';
  }
}

function g3AddStep(dir) {
  if (g3State.running) return;
  g3State.sequence.push(dir);
  g3State.msg = '';
  g3State.msgType = '';
  renderGame3(document.getElementById('game-area'));
}

function g3Clear() {
  g3State.sequence = [];
  g3State.msg = '';
  g3State.msgType = '';
  g3State.stepState = {};
  g3State.aikPos = null;
  g3State.visited = {};
  renderGame3(document.getElementById('game-area'));
}

async function g3Run() {
  if (g3State.running || g3State.sequence.length === 0) return;
  g3State.running = true;
  g3State.totalAttempts++;

  const level = MAZE_LEVELS[g3State.level];
  let r = 0, c = 0;
  level.grid.forEach((row, ri) => row.forEach((cell, ci) => {
    if (cell === 'S') { r = ri; c = ci; }
  }));

  g3State.visited = {};
  g3State.stepState = {};
  g3State.aikPos = { r, c };

  const DIRS = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] };

  for (let i = 0; i < g3State.sequence.length; i++) {
    await sleep(350);
    const dir = g3State.sequence[i];
    const [dr, dc] = DIRS[dir];
    const nr = r + dr, nc = c + dc;

    const nextRow = level.grid[nr];
    const cell = nextRow ? nextRow[nc] : undefined;
    if (cell === 1 || cell === undefined) {
      // Hit a wall
      g3State.stepState[i] = 'error';
      g3State.msg = t('g3_fail_wall');
      g3State.msgType = 'fail';
      g3State.running = false;
      g3State.aikPos = { r, c };
      renderGame3(document.getElementById('game-area'));
      return;
    }

    g3State.visited[`${r},${c}`] = true;
    r = nr; c = nc;
    g3State.stepState[i] = 'done';
    g3State.aikPos = { r, c };
    renderGame3(document.getElementById('game-area'));

    if (cell === 'G') {
      // WIN!
      await sleep(300);
      g3State.wins++;
      g3State.attempts++;
      g3State.running = false;

      if (g3State.level < MAZE_LEVELS.length - 1) {
        g3State.level++;
        g3State.sequence = [];
        g3State.stepState = {};
        g3State.visited = {};
        g3State.aikPos = null;
        g3State.msg = t('g3_win');
        g3State.msgType = 'win';
        renderGame3(document.getElementById('game-area'));
      } else {
        g3State.phase = 'done';
        renderGame3(document.getElementById('game-area'));
      }
      return;
    }
  }

  // Sequence ran out — not at goal
  g3State.msg = currentLang === 'pl' ? '🤔 Aiki nie dotarł do celu! Dodaj więcej kroków.' : '🤔 Aiki didn\'t reach the goal! Add more steps.';
  g3State.msgType = 'fail';
  g3State.running = false;
  renderGame3(document.getElementById('game-area'));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
