// ==========================================
// safe-ai.js — mindful AI missions + fact-checking lab
// ==========================================
(function() {
  var STORAGE_KEY = 'aiki_safe_ai_missions';
  var DETECTIVE_KEY = 'aiki_factcheck_detective';
  var missionData = [
    { icon: '🔎', title: 'safe_m1_title', question: 'safe_m1_q', options: ['safe_m1_a1', 'safe_m1_a2', 'safe_m1_a3'], good: 'safe_m1_good', tryAgain: 'safe_m1_try', check: 'safe_m1_check' },
    { icon: '🛡️', title: 'safe_m2_title', question: 'safe_m2_q', options: ['safe_m2_a1', 'safe_m2_a2', 'safe_m2_a3', 'safe_m2_a4'], good: 'safe_m2_good', tryAgain: 'safe_m2_try', check: 'safe_m2_check' },
    { icon: '✍️', title: 'safe_m3_title', question: 'safe_m3_q', options: ['safe_m3_a1', 'safe_m3_a2', 'safe_m3_a3'], good: 'safe_m3_good', tryAgain: 'safe_m3_try', check: 'safe_m3_check' },
    { icon: '📷', title: 'safe_m4_title', question: 'safe_m4_q', options: ['safe_m4_a1', 'safe_m4_a2', 'safe_m4_a3'], good: 'safe_m4_good', tryAgain: 'safe_m4_try', check: 'safe_m4_check' },
    { icon: '⌨️', title: 'safe_m5_title', question: 'safe_m5_q', options: ['safe_m5_a1', 'safe_m5_a2', 'safe_m5_a3'], good: 'safe_m5_good', tryAgain: 'safe_m5_try', check: 'safe_m5_check' }
  ];

  function getCompleted() {
    try { var saved = JSON.parse(safeStorageGet(STORAGE_KEY, '[]')); return Array.isArray(saved) ? saved.filter(function(v) { return typeof v === 'number' && v >= 0 && v < 5; }) : []; } catch (e) { return []; }
  }
  function saveCompleted(items) { safeStorageSet(STORAGE_KEY, JSON.stringify(items)); }
  function detectiveDone() { return safeStorageGet(DETECTIVE_KEY, 'false') === 'true'; }
  function updateProgress() {
    var completed = getCompleted(); var count = document.getElementById('safe-ai-count'); var bar = document.getElementById('safe-ai-progress-bar'); var track = bar && bar.parentElement;
    if (count) count.textContent = completed.length + ' / 5';
    if (bar) bar.style.width = (completed.length * 20) + '%';
    if (track) track.setAttribute('aria-valuenow', completed.length);
    var celebration = document.getElementById('safe-ai-celebration');
    if (celebration) { celebration.classList.toggle('hidden', completed.length !== 5); if (completed.length === 5) celebration.innerHTML = '<h3>' + t('safe_m_complete_title') + '</h3><p>' + t('safe_m_complete_text') + '</p>'; }
  }
  function sourceStep(prefix, submitClass) {
    return '<div class="source-step"><p><strong>' + t(prefix + '_title') + '</strong> ' + t(prefix + '_text') + '</p><div class="source-choices">' +
      '<button type="button" class="source-choice" data-source="0">🏛️ ' + t('source_institution') + '</button><button type="button" class="source-choice" data-source="1">📚 ' + t('source_book') + '</button><button type="button" class="source-choice" data-source="2">💬 ' + t('source_comment') + '</button><button type="button" class="source-choice" data-source="3">🔗 ' + t('source_unknown') + '</button></div><button type="button" class="btn btn-secondary source-submit ' + submitClass + '">' + t('source_submit') + '</button><p class="source-feedback" aria-live="polite"></p></div>';
  }
  function renderMissions() {
    var container = document.getElementById('safe-ai-missions'); if (!container) return;
    var completed = getCompleted();
    container.innerHTML = missionData.map(function(m, i) {
      var done = completed.indexOf(i) !== -1; var opts = m.options.map(function(opt, j) { return '<button type="button" class="mission-option" data-safe-mission="' + i + '" data-safe-option="' + j + '">' + t(opt) + '</button>'; }).join('');
      return '<article class="safe-mission' + (done ? ' completed' : '') + '" data-number="0' + (i + 1) + '" id="safe-mission-' + (i + 1) + '"><header class="mission-head"><span class="mission-icon" aria-hidden="true">' + m.icon + '</span><h3>' + t(m.title) + '</h3><span class="mission-badge">' + t('safe_m_done') + '</span></header><p class="mission-question">' + t(m.question) + '</p><aside class="mission-check">' + t('safe_check_label') + ' <strong>' + t(m.check) + '</strong></aside><div class="mission-options">' + opts + '</div><p class="mission-feedback" aria-live="polite"></p></article>';
    }).join(''); updateProgress();
  }
  function completeMission(index, card) { var completed = getCompleted(); if (completed.indexOf(index) === -1) { completed.push(index); saveCompleted(completed); } card.classList.add('completed'); updateProgress(); }
  function checkSources(step, callback) {
    var selected = Array.prototype.slice.call(step.querySelectorAll('.source-choice.selected')).map(function(el) { return Number(el.getAttribute('data-source')); }).sort();
    var feedback = step.querySelector('.source-feedback');
    if (selected.length !== 2) { feedback.textContent = '💡 ' + t('source_pick_two'); return; }
    if (selected[0] === 0 && selected[1] === 1) { feedback.textContent = '✅ ' + t('source_good'); callback(); } else { feedback.textContent = '💡 ' + t('source_try'); }
  }
  function handleMissionChoice(button) {
    var index = Number(button.getAttribute('data-safe-mission')); var choice = Number(button.getAttribute('data-safe-option')); var card = button.closest('.safe-mission'); if (!card || !missionData[index]) return;
    var feedback = card.querySelector('.mission-feedback'); card.querySelectorAll('.mission-option').forEach(function(o) { o.classList.remove('good', 'try-again'); });
    if (choice !== 0) { button.classList.add('try-again'); feedback.textContent = '💡 ' + t(missionData[index].tryAgain); feedback.className = 'mission-feedback wrong'; return; }
    button.classList.add('good'); feedback.textContent = '✅ ' + t(missionData[index].good); feedback.className = 'mission-feedback correct';
    if (index === 0 && !getCompleted().includes(index)) { if (!card.querySelector('.source-step')) { feedback.insertAdjacentHTML('afterend', sourceStep('safe_m1_sources', 'mission-source-submit')); } }
    else { completeMission(index, card); }
  }
  function renderDetective() {
    var game = document.getElementById('detective-game'); var badge = document.getElementById('detective-badge'); if (!game) return;
    if (badge) badge.textContent = detectiveDone() ? '🏅 ' + t('detective_badge') : '';
    game.innerHTML = '<p class="detective-question">' + t('detective_question') + '</p><div class="claim-choices"><button type="button" class="claim-choice" data-claim="0">' + t('detective_claim_false') + '</button><button type="button" class="claim-choice" data-claim="1">' + t('detective_claim_opinion') + '</button><button type="button" class="claim-choice" data-claim="2">' + t('detective_claim_fact') + '</button></div><p class="detective-feedback" aria-live="polite"></p>';
  }
  function initSafeAI() {
    var container = document.getElementById('safe-ai-missions'); if (!container) return; renderMissions(); renderDetective();
    container.addEventListener('click', function(e) {
      var option = e.target.closest('.mission-option'); if (option) { handleMissionChoice(option); return; }
      var source = e.target.closest('.source-choice'); if (source) { source.classList.toggle('selected'); return; }
      var submit = e.target.closest('.mission-source-submit'); if (submit) { var card = submit.closest('.safe-mission'); checkSources(submit.closest('.source-step'), function() { completeMission(0, card); }); }
    });
    document.getElementById('detective-game').addEventListener('click', function(e) {
      var claim = e.target.closest('.claim-choice'); var game = document.getElementById('detective-game'); if (!claim || !game) return;
      var feedback = game.querySelector('.detective-feedback'); game.querySelectorAll('.claim-choice').forEach(function(b) { b.classList.remove('selected', 'try-again'); });
      if (claim.getAttribute('data-claim') !== '2') { claim.classList.add('try-again'); feedback.textContent = '💡 ' + t('detective_try_claim'); return; }
      claim.classList.add('selected'); feedback.textContent = '✅ ' + t('detective_good_claim');
      if (!game.querySelector('.source-step')) feedback.insertAdjacentHTML('afterend', sourceStep('detective_sources', 'detective-source-submit'));
    });
    document.getElementById('detective-game').addEventListener('click', function(e) {
      var source = e.target.closest('.source-choice'); if (source) { source.classList.toggle('selected'); return; }
      var submit = e.target.closest('.detective-source-submit'); if (submit) checkSources(submit.closest('.source-step'), function() { safeStorageSet(DETECTIVE_KEY, 'true'); var badge = document.getElementById('detective-badge'); if (badge) badge.textContent = '🏅 ' + t('detective_badge'); });
    });
    document.getElementById('safe-ai-start').addEventListener('click', function() { var first = document.getElementById('safe-mission-1'); if (first) { smoothScrollToElement(first, 'center'); setTimeout(function() { first.querySelector('.mission-option').focus(); }, 450); } });
    document.getElementById('safe-ai-reset').addEventListener('click', function() { if (window.confirm(t('safe_ai_reset_confirm'))) { safeStorageRemove(STORAGE_KEY); safeStorageRemove(DETECTIVE_KEY); renderMissions(); renderDetective(); } });
    document.addEventListener('langchange', function() { renderMissions(); renderDetective(); });
  }
  document.addEventListener('DOMContentLoaded', initSafeAI);
})();
