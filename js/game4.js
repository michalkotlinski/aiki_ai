// ==========================================
//  game4.js — "Laboratorium Scratch" (Scratch AI Lab)
//  Concept: Visual programming like Scratch + ML blocks
// ==========================================

const G4_BLOCK_DEFS = {
  'when-cat':  { color: 'event',  emoji: '🐱' },
  'when-dog':  { color: 'event',  emoji: '🐶' },
  'say-cat':   { color: 'looks',  emoji: '💬' },
  'say-dog':   { color: 'looks',  emoji: '💬' },
  'train':     { color: 'ml',     emoji: '📸' },
  'recognize': { color: 'ml',     emoji: '🔍' },
  'say-label': { color: 'looks',  emoji: '💬' },
};

function g4SayFor(type) {
  if (type === 'cat') return currentLang === 'pl' ? 'Miau!' : 'Meow!';
  return currentLang === 'pl' ? 'Hau hau!' : 'Woof woof!';
}

const G4_LEVELS = [
  {
    palette: ['when-cat', 'say-cat', 'when-dog', 'say-dog'],
    required: ['when-cat', 'say-cat'],
    tests: [{ image: '🐱', type: 'cat' }],
    hint: 'g4_hint1',
  },
  {
    palette: ['when-cat', 'say-cat', 'when-dog', 'say-dog'],
    required: ['when-cat', 'say-cat', 'when-dog', 'say-dog'],
    tests: [
      { image: '🐱', type: 'cat' },
      { image: '🐶', type: 'dog' },
    ],
    hint: 'g4_hint2',
  },
  {
    palette: ['train', 'when-cat', 'recognize', 'say-label', 'when-dog', 'say-dog'],
    required: ['train', 'recognize', 'say-label'],
    tests: [
      { image: '🐱', type: 'cat' },
      { image: '🐶', type: 'dog' },
    ],
    hint: 'g4_hint3',
    needsTrain: true,
  },
];

let g4State = {};

function game4Init(container) {
  g4State = {
    level: 0,
    script: [],
    score: 0,
    phase: 'play',
    runMsg: '',
    runOk: null,
    testing: false,
  };
  renderGame4(container);
}

function g4BlockLabel(id) {
  return t('g4_block_' + id.replace(/-/g, '_'));
}

function renderGame4(container) {
  if (g4State.phase === 'done') {
    renderGame4Result(container);
    return;
  }

  const level = G4_LEVELS[g4State.level];
  const testImage = level.tests[0].image;

  container.innerHTML = `
    <div class="g4-layout fade-in">
      <div class="g4-header">
        <span class="g4-level-badge">${t('g4_level')} ${g4State.level + 1} / ${G4_LEVELS.length}</span>
        <p class="g4-instruction">${t(level.hint)}</p>
      </div>

      <div class="g4-workspace">
        <!-- Scratch stage -->
        <div class="g4-stage">
          <div class="g4-stage-bar">
            <button type="button" class="g4-flag" id="g4-run-btn" title="${t('g4_run')}" ${g4State.testing ? 'disabled' : ''}>
              🚩 ${t('g4_run')}
            </button>
            <span class="g4-stage-title">Scratch — ${t('g4_stage')}</span>
          </div>
          <div class="g4-stage-inner">
            <div class="g4-sprite">🐱</div>
            <div class="g4-test-image" id="g4-test-image">${testImage}</div>
            <div class="g4-speech ${g4State.runOk === true ? 'ok' : g4State.runOk === false ? 'bad' : ''}" id="g4-speech">
              ${g4State.runMsg || '...'}
            </div>
          </div>
        </div>

        <!-- Block palette + script -->
        <div class="g4-editor">
          <div class="g4-palette">
            <div class="g4-palette-title">${t('g4_blocks')}</div>
            <div class="g4-palette-list">
              ${level.palette.map(function(id) {
                return `<button type="button" class="scratch-block block-${G4_BLOCK_DEFS[id].color}" data-block-id="${id}">
                  ${g4BlockLabel(id)}
                </button>`;
              }).join('')}
            </div>
          </div>

          <div class="g4-script-area">
            <div class="g4-script-title">${t('g4_script')}</div>
            <div class="g4-script" id="g4-script">
              ${g4State.script.length === 0
                ? `<span class="g4-script-empty">${t('g4_script_empty')}</span>`
                : g4State.script.map(function(id, i) {
                    return `<button type="button" class="scratch-block block-${G4_BLOCK_DEFS[id].color} in-script" data-script-idx="${i}">
                      ${g4BlockLabel(id)} <span class="g4-remove">✕</span>
                    </button>`;
                  }).join('')}
            </div>
            <button type="button" class="btn btn-secondary g4-clear-btn" id="g4-clear-btn">${t('g4_clear')}</button>
          </div>
        </div>
      </div>

      <div class="g4-scratch-tip">
        💡 ${t('g4_scratch_tip')}
        <a href="https://scratch.mit.edu" target="_blank" rel="noopener">scratch.mit.edu</a>
        ·
        <a href="https://machinelearningforkids.co.uk/scratch/" target="_blank" rel="noopener">ML for Kids</a>
      </div>
    </div>
  `;

  bindGame4Events(container);
}

function bindGame4Events(container) {
  container.querySelectorAll('[data-block-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      g4AddBlock(btn.getAttribute('data-block-id'));
    });
  });

  container.querySelectorAll('[data-script-idx]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      g4RemoveBlock(parseInt(btn.getAttribute('data-script-idx'), 10));
    });
  });

  const runBtn = container.querySelector('#g4-run-btn');
  if (runBtn) runBtn.addEventListener('click', g4RunProgram);

  const clearBtn = container.querySelector('#g4-clear-btn');
  if (clearBtn) clearBtn.addEventListener('click', function() {
    g4State.script = [];
    g4State.runMsg = '';
    g4State.runOk = null;
    renderGame4(container);
  });
}

function g4AddBlock(id) {
  g4State.script.push(id);
  g4State.runMsg = '';
  g4State.runOk = null;
  renderGame4(document.getElementById('game-area'));
}

function g4RemoveBlock(idx) {
  g4State.script.splice(idx, 1);
  g4State.runMsg = '';
  g4State.runOk = null;
  renderGame4(document.getElementById('game-area'));
}

function g4HasBlocks(required) {
  const set = {};
  g4State.script.forEach(function(id) { set[id] = true; });
  return required.every(function(id) { return set[id]; });
}

function g4RunProgram() {
  const level = G4_LEVELS[g4State.level];
  const container = document.getElementById('game-area');
  g4State.testing = true;

  if (!g4HasBlocks(level.required)) {
    g4State.runMsg = t('g4_missing_blocks');
    g4State.runOk = false;
    g4State.testing = false;
    renderGame4(container);
    return;
  }

  g4State.runMsg = level.needsTrain ? t('g4_training') : t('g4_running');
  g4State.runOk = null;
  renderGame4(container);

  let testIdx = 0;

  function runNextTest() {
    if (testIdx >= level.tests.length) {
      g4State.score++;
      g4State.testing = false;

      if (g4State.level < G4_LEVELS.length - 1) {
        g4State.level++;
        g4State.script = [];
        g4State.runMsg = t('g4_level_pass');
        g4State.runOk = true;
        setTimeout(function() {
          g4State.runMsg = '';
          g4State.runOk = null;
          renderGame4(container);
        }, 1200);
      } else {
        g4State.phase = 'done';
        renderGame4(container);
      }
      return;
    }

    const test = level.tests[testIdx];
    const speech = container.querySelector('#g4-speech');
    const testEl = container.querySelector('#g4-test-image');

    if (testEl) testEl.textContent = test.image;
    if (speech) {
      speech.textContent = g4SayFor(test.type);
      speech.className = 'g4-speech ok';
    }

    testIdx++;
    setTimeout(runNextTest, level.needsTrain && testIdx === 1 ? 900 : 700);
  }

  setTimeout(runNextTest, level.needsTrain ? 800 : 400);
}

function renderGame4Result(container) {
  const passed = g4State.score >= G4_LEVELS.length;
  recordResult('game4', g4State.score, G4_LEVELS.length);

  container.innerHTML = `
    <div class="quiz-result bounce-in">
      <div style="font-size:4rem">🐱💻</div>
      <h3>${t('g4_result_title')}</h3>
      <div class="score-display">${g4State.score}<span>/${G4_LEVELS.length}</span></div>
      <p style="color:var(--text-muted);margin:0.5rem 0">${t('g4_score')}</p>
      <p style="font-weight:700;color:var(--yellow);margin:1rem 0">
        ${passed ? t('g4_pass_msg') : t('g4_fail_msg')}
      </p>
      <p style="font-size:0.9rem;color:var(--text-muted);max-width:480px;margin:0 auto 1rem">
        ${t('g4_try_scratch')}
      </p>
      <div class="result-actions">
        <button type="button" class="btn btn-secondary" id="g4-play-again-btn">
          🔄 ${t('g4_play_again')}
        </button>
        <a class="btn btn-primary" href="https://machinelearningforkids.co.uk/scratch/" target="_blank" rel="noopener">
          🚀 ${t('g4_open_ml4kids')}
        </a>
      </div>
    </div>
  `;

  container.querySelector('#g4-play-again-btn').addEventListener('click', function() {
    game4Init(container);
  });
}
