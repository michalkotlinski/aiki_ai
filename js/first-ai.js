// ==========================================
//  first-ai.js — Kid-friendly first AI program
//  Concept: teach Aiki with examples + majority vote
// ==========================================

(function() {
  'use strict';

  const TRAIN_POOL = [
    ['🐱', 'cat'], ['🐈', 'cat'], ['😸', 'cat'], ['😺', 'cat'], ['🙀', 'cat'],
    ['🐶', 'dog'], ['🐕', 'dog'], ['🦮', 'dog'], ['🐩', 'dog'], ['🐕‍🦺', 'dog'],
  ];

  const GUESS_POOL = [
    ['🐈‍⬛', 'cat'], ['😻', 'cat'], ['🐾', 'cat'],
    ['🦴', 'dog'], ['🐶', 'dog'], ['🐕', 'dog'],
  ];

  const MIN_EXAMPLES = 3;
  const MAX_NOTEBOOK = 8;

  let memory = [];
  let trainQueue = [];
  let trainIndex = 0;
  let catCount = 0;
  let dogCount = 0;

  let els = {};

  function t(key, fallback) {
    if (typeof window.t === 'function') return window.t(key);
    return fallback || key;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function resetTrainQueue() {
    trainQueue = shuffle(TRAIN_POOL);
    trainIndex = 0;
  }

  function currentTrainItem() {
    return trainQueue[trainIndex % trainQueue.length];
  }

  function nextTrainItem() {
    trainIndex = (trainIndex + 1) % trainQueue.length;
    showCurrentImage();
  }

  function showCurrentImage() {
    const item = currentTrainItem();
    if (els.currentImage) els.currentImage.textContent = item[0];
  }

  function teach(label) {
    const item = currentTrainItem();
    memory.push({ emoji: item[0], label: label });
    if (label === 'cat') catCount++;
    else dogCount++;

    updateUI();
    nextTrainItem();

    if (memory.length === 1) {
      setSpeech('fai_speech_first');
    } else if (memory.length < MIN_EXAMPLES) {
      setSpeech('fai_speech_learning', { n: MIN_EXAMPLES - memory.length });
    } else {
      setSpeech('fai_speech_ready');
    }
  }

  function predict() {
    if (memory.length === 0) return null;
    if (catCount === dogCount) return 'tie';
    return catCount > dogCount ? 'cat' : 'dog';
  }

  function pickGuessItem() {
    return GUESS_POOL[Math.floor(Math.random() * GUESS_POOL.length)];
  }

  function runGuess() {
    if (memory.length < MIN_EXAMPLES) return;

    const guessItem = pickGuessItem();
    const prediction = predict();
    const actual = guessItem[1];

    if (els.guessArea) els.guessArea.classList.remove('hidden');
    if (els.guessImg) els.guessImg.textContent = guessItem[0];
    if (els.guessResult) els.guessResult.textContent = '';

    setSpeech('fai_speech_thinking');

    setTimeout(function() {
      let resultKey;
      let resultClass;

      if (prediction === 'tie') {
        resultKey = 'fai_guess_tie';
        resultClass = 'fai-result-unsure';
        setSpeech('fai_speech_tie');
      } else if (prediction === actual) {
        resultKey = prediction === 'cat' ? 'fai_guess_cat_correct' : 'fai_guess_dog_correct';
        resultClass = 'fai-result-correct';
        setSpeech('fai_speech_correct');
      } else {
        resultKey = prediction === 'cat' ? 'fai_guess_cat_wrong' : 'fai_guess_dog_wrong';
        resultClass = 'fai-result-wrong';
        setSpeech('fai_speech_wrong');
      }

      if (els.guessResult) {
        els.guessResult.textContent = t(resultKey, els.guessResult.textContent);
        els.guessResult.className = 'fai-guess-result ' + resultClass;
      }
    }, 900);
  }

  function resetMemory() {
    memory = [];
    catCount = 0;
    dogCount = 0;
    resetTrainQueue();
    if (els.guessArea) els.guessArea.classList.add('hidden');
    if (els.guessResult) {
      els.guessResult.textContent = '';
      els.guessResult.className = 'fai-guess-result';
    }
    setSpeech('fai_speech_start');
    updateUI();
    showCurrentImage();
  }

  function setSpeech(key, vars) {
    if (!els.speech) return;
    let text = t(key, els.speech.textContent);
    if (vars && vars.n !== undefined) {
      text = text.replace('{n}', vars.n);
    }
    els.speech.textContent = text;
  }

  function renderNotebook() {
    if (!els.notebookList) return;

    if (memory.length === 0) {
      els.notebookList.innerHTML = '<li class="fai-notebook-empty">' +
        t('fai_notebook_empty', 'Jeszcze pusto — dodaj pierwszy przykład!') + '</li>';
      return;
    }

    const recent = memory.slice(-MAX_NOTEBOOK).reverse();
    els.notebookList.innerHTML = recent.map(function(entry) {
      const tag = entry.label === 'cat'
        ? t('fai_tag_cat', '🐱 kot')
        : t('fai_tag_dog', '🐕 pies');
      return '<li><span class="fai-note-emoji">' + entry.emoji + '</span> → ' + tag + '</li>';
    }).join('');
  }

  function updateBars() {
    const total = catCount + dogCount || 1;
    if (els.catBar) els.catBar.style.width = Math.round((catCount / total) * 100) + '%';
    if (els.dogBar) els.dogBar.style.width = Math.round((dogCount / total) * 100) + '%';
    if (els.catCount) els.catCount.textContent = catCount;
    if (els.dogCount) els.dogCount.textContent = dogCount;
  }

  function updateUI() {
    updateBars();
    renderNotebook();
    if (els.guessBtn) {
      els.guessBtn.disabled = memory.length < MIN_EXAMPLES;
    }
  }

  function bindEvents() {
    if (els.btnCat) {
      els.btnCat.addEventListener('click', function() { teach('cat'); });
    }
    if (els.btnDog) {
      els.btnDog.addEventListener('click', function() { teach('dog'); });
    }
    if (els.skipBtn) {
      els.skipBtn.addEventListener('click', nextTrainItem);
    }
    if (els.guessBtn) {
      els.guessBtn.addEventListener('click', runGuess);
    }
    if (els.guessAgain) {
      els.guessAgain.addEventListener('click', runGuess);
    }
    if (els.resetBtn) {
      els.resetBtn.addEventListener('click', resetMemory);
    }

    document.addEventListener('langchange', function() {
      updateUI();
      renderNotebook();
    });
  }

  function init() {
    els = {
      currentImage: document.getElementById('fai-current-image'),
      speech: document.getElementById('fai-speech'),
      catCount: document.getElementById('fai-cat-count'),
      dogCount: document.getElementById('fai-dog-count'),
      catBar: document.getElementById('fai-cat-bar'),
      dogBar: document.getElementById('fai-dog-bar'),
      notebookList: document.getElementById('fai-notebook-list'),
      guessArea: document.getElementById('fai-guess-area'),
      guessImg: document.getElementById('fai-guess-img'),
      guessResult: document.getElementById('fai-guess-result'),
      btnCat: document.getElementById('fai-btn-cat'),
      btnDog: document.getElementById('fai-btn-dog'),
      skipBtn: document.getElementById('fai-skip-btn'),
      guessBtn: document.getElementById('fai-guess-btn'),
      guessAgain: document.getElementById('fai-guess-again'),
      resetBtn: document.getElementById('fai-reset-btn'),
    };

    if (!els.currentImage) {
      setTimeout(init, 100);
      return;
    }

    resetTrainQueue();
    bindEvents();
    updateUI();
    showCurrentImage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FirstAIDemo = {
    teach: teach,
    predict: predict,
    reset: resetMemory,
    getMemory: function() { return memory.slice(); },
  };
})();
