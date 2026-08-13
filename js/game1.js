// ==========================================
//  game1.js — "Naucz Aikiego!" (Train Aiki)
//  Concept: Machine Learning from examples
// ==========================================

const GAME1_SAMPLES = [
  ['🐱', 'cat'], ['🐈', 'cat'], ['😸', 'cat'],
  ['🐶', 'dog'], ['🐕', 'dog'], ['🦮', 'dog'],
  ['🐩', 'dog'], ['🙀', 'cat'],
];

const GUESS_ITEMS = [
  ['🐱', 'cat'], ['🐶', 'dog'], ['🐈‍⬛', 'cat'],
  ['🐕‍🦺', 'dog'], ['😺', 'cat'], ['🐕', 'dog'],
  ['🙀', 'cat'], ['🦴', 'dog'], ['🐾', 'cat'],
];

const G1_TRAINING_ROUNDS = 6;

let g1State = {};

function game1Init(container) {
  g1State = {
    phase: 'training',
    trainingQueue: shuffle([...GAME1_SAMPLES]).slice(0, G1_TRAINING_ROUNDS),
    trainingIndex: 0,
    trainingData: [],
    catCount: 0,
    dogCount: 0,
    guessRound: 0,
    guessTotal: 5,
    correctGuesses: 0,
    currentGuessItem: null,
    answered: false,
  };
  renderGame1(container);
}

function renderGame1(container) {
  const training = g1State.phase === 'training';
  const guessing = g1State.phase === 'guessing';
  const done = g1State.phase === 'done';
  const currentSample = training ? g1State.trainingQueue[g1State.trainingIndex] : null;

  container.innerHTML = `
    <div class="g1-layout fade-in">
      <div class="g1-panel">
        ${training ? `
          <h4>${t('g1_instruction')}</h4>
          <div class="g1-current-image" id="g1-current-image" aria-live="polite">
            ${currentSample ? currentSample[0] : ''}
          </div>
          <p class="g1-choice-hint">${t('g1_choose_label')}</p>
          <div class="g1-btn-row" id="g1-label-buttons">
            <button type="button" class="btn btn-accent g1-label-btn" data-label="cat">
              ${t('g1_its_cat')}
            </button>
            <button type="button" class="btn btn-secondary g1-label-btn g1-label-dog" data-label="dog">
              ${t('g1_its_dog')}
            </button>
          </div>
          <div class="g1-progress">
            ${t('g1_round')} <strong>${g1State.trainingIndex + 1}</strong> ${t('g1_of')} ${G1_TRAINING_ROUNDS}
          </div>
          <div class="g1-bar-wrap">
            <div class="g1-bar" style="width:${(g1State.trainingIndex / G1_TRAINING_ROUNDS) * 100}%"></div>
          </div>
        ` : guessing ? `
          <h4>${t('g1_now_guess')}</h4>
          <div class="g1-guess-area bounce-in">
            <div class="g1-guess-img" id="g1-guess-img">${g1State.currentGuessItem[0]}</div>
            <div class="g1-guess-label" id="g1-guess-label">?</div>
            <div class="g1-guess-result" id="g1-guess-result"></div>
          </div>
          <div class="g1-btn-row" style="margin-top:1rem">
            <button type="button" class="btn btn-accent" id="g1-reveal-btn">
              ${t('g1_reveal_guess')}
            </button>
          </div>
          <div class="g1-progress" style="margin-top:1rem">
            ${t('g1_round')} <strong>${g1State.guessRound}</strong> ${t('g1_of')} ${g1State.guessTotal}
          </div>
        ` : `
          <div class="quiz-result bounce-in">
            <div style="font-size:4rem">🤖</div>
            <h3>${t('g1_result_title')}</h3>
            <div class="score-display">${g1State.correctGuesses}<span>/${g1State.guessTotal}</span></div>
            <p style="color:var(--text-muted);margin:0.5rem 0">${t('g1_score')}</p>
            <p style="font-weight:700;color:var(--yellow);margin:1rem 0" id="g1-pass-msg"></p>
            <div class="result-actions">
              <button type="button" class="btn btn-secondary" id="g1-play-again-btn">
                🔄 ${t('g1_play_again')}
              </button>
              <button type="button" class="btn btn-primary" id="g1-next-btn" style="display:none">
                ${t('g1_next_game')}
              </button>
            </div>
          </div>
        `}
      </div>

      <div class="g1-panel g1-brain-panel">
        <div class="g1-aiki-face">🤖</div>
        <div style="font-weight:800;font-size:1rem;color:var(--purple-lt)">${t('g1_aiki_learned')}</div>
        <div class="g1-brain-bar">
          <div class="g1-brain-bar-label">🐱 ${t('g1_its_cat')} (${g1State.catCount})</div>
          <div class="g1-brain-fill-wrap">
            <div class="g1-brain-fill cats" style="width:${Math.min(g1State.catCount / G1_TRAINING_ROUNDS * 100, 100)}%"></div>
          </div>
        </div>
        <div class="g1-brain-bar">
          <div class="g1-brain-bar-label">🐕 ${t('g1_its_dog')} (${g1State.dogCount})</div>
          <div class="g1-brain-fill-wrap">
            <div class="g1-brain-fill dogs" style="width:${Math.min(g1State.dogCount / G1_TRAINING_ROUNDS * 100, 100)}%"></div>
          </div>
        </div>
        <div class="g1-brain-hint">
          ${g1State.trainingData.length < 3
            ? t('g1_hint_start')
            : g1State.trainingData.length < G1_TRAINING_ROUNDS
              ? t('g1_hint_learning')
              : t('g1_hint_ready')}
        </div>
      </div>
    </div>
  `;

  bindGame1Events(container);

  if (done) {
    const passed = recordResult('game1', g1State.correctGuesses, g1State.guessTotal);
    const msg = document.getElementById('g1-pass-msg');
    const nxt = document.getElementById('g1-next-btn');
    if (msg) msg.textContent = passed ? t('g1_pass_msg') : t('g1_fail_msg');
    if (nxt && passed) nxt.style.display = 'inline-flex';
  }
}

function bindGame1Events(container) {
  container.querySelectorAll('.g1-label-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      g1Label(btn.getAttribute('data-label'));
    });
  });

  var revealBtn = container.querySelector('#g1-reveal-btn');
  if (revealBtn) {
    revealBtn.addEventListener('click', g1RevealGuess);
  }

  var playAgainBtn = container.querySelector('#g1-play-again-btn');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', function() {
      game1Init(document.getElementById('game-area'));
    });
  }

  var nextBtn = container.querySelector('#g1-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      openGame(2);
    });
  }
}

function g1Label(type) {
  if (g1State.phase !== 'training') return;

  const sample = g1State.trainingQueue[g1State.trainingIndex];
  if (!sample) return;

  g1State.trainingData.push({ type: type, emoji: sample[0] });
  if (type === 'cat') g1State.catCount++;
  else g1State.dogCount++;

  g1State.trainingIndex++;

  if (g1State.trainingIndex >= G1_TRAINING_ROUNDS) {
    setTimeout(function() {
      g1State.phase = 'guessing';
      g1State.guessRound = 1;
      g1State.currentGuessItem = GUESS_ITEMS[Math.floor(Math.random() * GUESS_ITEMS.length)];
      renderGame1(document.getElementById('game-area'));
    }, 400);
    return;
  }

  renderGame1(document.getElementById('game-area'));
}

function g1RevealGuess() {
  if (g1State.answered) return;
  g1State.answered = true;

  const item = g1State.currentGuessItem;
  let aiGuess;
  if (Math.random() < 0.75) {
    aiGuess = item[1];
  } else {
    aiGuess = item[1] === 'cat' ? 'dog' : 'cat';
  }

  const isCorrect = aiGuess === item[1];
  if (isCorrect) g1State.correctGuesses++;

  const label = document.getElementById('g1-guess-label');
  const result = document.getElementById('g1-guess-result');
  const btn = document.getElementById('g1-reveal-btn');

  if (label) {
    label.textContent = aiGuess === 'cat'
      ? (currentLang === 'pl' ? '🐱 Kot' : '🐱 Cat')
      : (currentLang === 'pl' ? '🐕 Pies' : '🐕 Dog');
  }
  if (result) {
    result.textContent = isCorrect ? t('g1_correct') : t('g1_wrong');
    result.className = 'g1-guess-result ' + (isCorrect ? 'wiggle' : 'shake');
    result.style.color = isCorrect ? 'var(--green)' : 'var(--pink-lt)';
  }

  if (btn) {
    btn.textContent = g1State.guessRound < g1State.guessTotal
      ? t('g1_next_round')
      : t('g1_finish');
    btn.onclick = g1NextGuess;
  }
}

function g1NextGuess() {
  g1State.guessRound++;
  g1State.answered = false;

  if (g1State.guessRound > g1State.guessTotal) {
    g1State.phase = 'done';
    renderGame1(document.getElementById('game-area'));
    return;
  }

  const remaining = GUESS_ITEMS.filter(function(_, i) {
    return i !== g1State._lastGuessIdx;
  });
  const idx = Math.floor(Math.random() * remaining.length);
  g1State._lastGuessIdx = idx;
  g1State.currentGuessItem = remaining[idx];
  renderGame1(document.getElementById('game-area'));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
