// ==========================================
//  quiz.js — Quiz wiedzy o AI / AI Knowledge Quiz
//  3 levels × ~4 questions each = 12 total
// ==========================================

const QUIZ_DATA = {
  pl: {
    level1: [
      {
        q: 'Co to jest sztuczna inteligencja (AI)?',
        options: ['Program, który potrafi się uczyć i rozwiązywać problemy', 'Robot z nogami, który chodzi', 'Szybki smartfon', 'Zwykły kalkulator'],
        correct: 0,
        explanation: 'AI to program komputerowy, który potrafi uczyć się z danych i rozwiązywać problemy — podobnie jak człowiek, ale w inny sposób!'
      },
      {
        q: 'Które z poniższych to przykład AI w codziennym życiu?',
        options: ['Asystent głosowy (Siri, Google)', 'Zwykła latarka', 'Długopis', 'Kawałek papieru'],
        correct: 0,
        explanation: 'Asystenci głosowi jak Siri czy Google używają AI, żeby rozumieć nasze pytania i odpowiadać na nie!'
      },
      {
        q: 'Jak AI "uczy się" rozpoznawać koty na zdjęciach?',
        options: ['Ogląda tysiące zdjęć kotów i się uczy', 'Ktoś ją programuje dla każdego zdjęcia osobno', 'Sama wymyśla jak wygląda kot', 'Pyta swojego twórcę'],
        correct: 0,
        explanation: 'AI uczy się przez przykłady! Im więcej zdjęć kotów zobaczy, tym lepiej je rozpoznaje. To nazywamy uczeniem maszynowym.'
      },
      {
        q: 'Co to jest chatbot?',
        options: ['Program AI, który rozmawia z ludźmi przez tekst lub głos', 'Robot do czyszczenia podłóg', 'Gra wideo', 'Program do rysowania'],
        correct: 0,
        explanation: 'Chatbot to AI, która odpowiada na nasze pytania przez rozmowę. Możesz je spotkać na stronach internetowych!'
      },
    ],
    level2: [
      {
        q: 'Co to jest "uczenie maszynowe" (machine learning)?',
        options: ['Sposób, w jaki AI uczy się z danych bez ręcznego programowania każdej reguły', 'Nauka obsługi maszyn przez ludzi', 'Program do naprawy komputerów', 'Nowy rodzaj robota'],
        correct: 0,
        explanation: 'Uczenie maszynowe to metoda, gdzie AI sama znajduje wzorce w danych. Nie trzeba jej tłumaczyć każdej reguły — ona się uczy sama!'
      },
      {
        q: 'Do czego AI potrzebuje danych?',
        options: ['Żeby się uczyć i robić coraz lepsze decyzje', 'Żeby wyświetlać reklamy', 'Żeby robić zdjęcia', 'Żeby grać muzykę'],
        correct: 0,
        explanation: 'Dane to "pożywienie" AI! Im więcej dobrej jakości danych dostanie, tym lepiej może się uczyć i działać.'
      },
      {
        q: 'Co to znaczy "trenować" AI?',
        options: ['Pokazywać AI wiele przykładów, żeby się nauczyła zadania', 'Ćwiczyć z AI w siłowni', 'Naprawiać AI gdy się zepsuje', 'Instalować AI na komputerze'],
        correct: 0,
        explanation: 'Trenowanie AI to jak nauka — pokazujemy jej tysiące przykładów (np. zdjęcia psów i kotów), a ona uczy się je rozróżniać!'
      },
      {
        q: 'Co to jest "klasyfikacja" danych?',
        options: ['Sortowanie danych do odpowiednich kategorii (np. spam / nie spam)', 'Kasowanie niepotrzebnych plików', 'Szybkie przeglądanie internetu', 'Tworzenie nowych danych'],
        correct: 0,
        explanation: 'Klasyfikacja to przypisywanie danych do kategorii. Na przykład AI może sprawdzić czy email to spam czy normalna wiadomość!'
      },
    ],
    level3: [
      {
        q: 'Co to jest algorytm?',
        options: ['Krok po kroku instrukcja rozwiązania problemu', 'Supermocny procesor komputerowy', 'Nowy język programowania', 'Rodzaj robota AI'],
        correct: 0,
        explanation: 'Algorytm to przepis na rozwiązanie problemu — lista kroków do wykonania po kolei. AI korzysta z algorytmów, żeby podejmować decyzje!'
      },
      {
        q: 'Jakie jest ograniczenie AI — czego nie potrafi?',
        options: ['Rozumieć świata tak jak człowiek i mieć prawdziwych uczuć', 'Liczyć szybko', 'Rozpoznawać głosów', 'Grać w szachy'],
        correct: 0,
        explanation: 'AI może być bardzo dobra w jednym zadaniu, ale nie rozumie świata jak człowiek. Nie czuje emocji, nie wie jak smakuje lód!'
      },
      {
        q: 'Co to jest "bias" (stronniczość) w AI?',
        options: ['Gdy AI uczy się na niesprawiedliwych danych i robi błędne decyzje', 'Gdy AI jest zbyt szybka', 'Rodzaj baterii w robotach', 'Specjalny język programowania AI'],
        correct: 0,
        explanation: 'Jeśli AI uczy się na danych, które nie są sprawiedliwe lub kompletne, może podejmować stronnicze decyzje. Dlatego ważne jest, żeby dane były różnorodne!'
      },
      {
        q: 'Dlaczego etyka jest ważna w AI?',
        options: ['Bo AI może wpływać na ludzi i musi być używana odpowiedzialnie', 'Bo AI jest zbyt droga', 'Bo AI zużywa za dużo prądu', 'Bo AI jest nudna bez etyki'],
        correct: 0,
        explanation: 'AI podejmuje decyzje wpływające na życie ludzi. Dlatego ważne jest, żeby była sprawiedliwa, bezpieczna i używana dla dobra wszystkich!'
      },
    ],
  },

  en: {
    level1: [
      {
        q: 'What is Artificial Intelligence (AI)?',
        options: ['A program that can learn and solve problems', 'A robot with legs that walks around', 'A fast smartphone', 'A regular calculator'],
        correct: 0,
        explanation: 'AI is a computer program that can learn from data and solve problems — similar to humans, but in a different way!'
      },
      {
        q: 'Which of these is an example of AI in everyday life?',
        options: ['A voice assistant (Siri, Google)', 'A regular flashlight', 'A ballpoint pen', 'A piece of paper'],
        correct: 0,
        explanation: 'Voice assistants like Siri or Google use AI to understand our questions and respond to them!'
      },
      {
        q: 'How does AI "learn" to recognize cats in photos?',
        options: ['It looks at thousands of cat photos and learns from them', 'Someone programs it for each photo individually', 'It invents what a cat looks like', 'It asks its creator'],
        correct: 0,
        explanation: 'AI learns from examples! The more cat photos it sees, the better it gets at recognizing them. This is called machine learning.'
      },
      {
        q: 'What is a chatbot?',
        options: ['An AI program that talks to people through text or voice', 'A robot that cleans floors', 'A video game', 'A drawing program'],
        correct: 0,
        explanation: 'A chatbot is an AI that answers our questions through conversation. You can find them on many websites!'
      },
    ],
    level2: [
      {
        q: 'What is "machine learning"?',
        options: ['A way for AI to learn from data without being programmed with every rule', 'Humans learning to operate machinery', 'A program for fixing computers', 'A new type of robot'],
        correct: 0,
        explanation: 'Machine learning is a method where AI finds patterns in data on its own. You don\'t need to explain every rule — it learns by itself!'
      },
      {
        q: 'Why does AI need data?',
        options: ['To learn from and make better decisions over time', 'To display advertisements', 'To take photos', 'To play music'],
        correct: 0,
        explanation: 'Data is AI\'s "food"! The more high-quality data it receives, the better it can learn and perform.'
      },
      {
        q: 'What does it mean to "train" an AI?',
        options: ['Showing AI many examples so it learns a task', 'Exercising with AI at the gym', 'Repairing AI when it breaks', 'Installing AI on a computer'],
        correct: 0,
        explanation: 'Training AI is like teaching — we show it thousands of examples (e.g., photos of dogs and cats), and it learns to tell them apart!'
      },
      {
        q: 'What is "classification" of data?',
        options: ['Sorting data into appropriate categories (e.g., spam / not spam)', 'Deleting unnecessary files', 'Browsing the internet quickly', 'Creating new data'],
        correct: 0,
        explanation: 'Classification means assigning data to categories. For example, AI can check whether an email is spam or a real message!'
      },
    ],
    level3: [
      {
        q: 'What is an algorithm?',
        options: ['A step-by-step instruction for solving a problem', 'A super-powerful computer processor', 'A new programming language', 'A type of AI robot'],
        correct: 0,
        explanation: 'An algorithm is a recipe for solving a problem — a list of steps to follow in order. AI uses algorithms to make decisions!'
      },
      {
        q: 'What is a limitation of AI — what can\'t it do?',
        options: ['Understand the world like a human and have real feelings', 'Calculate quickly', 'Recognize voices', 'Play chess'],
        correct: 0,
        explanation: 'AI can be very good at one task, but it doesn\'t understand the world like a human. It has no emotions and doesn\'t know how ice cream tastes!'
      },
      {
        q: 'What is "bias" in AI?',
        options: ['When AI learns from unfair data and makes incorrect decisions', 'When AI is too fast', 'A type of robot battery', 'A special AI programming language'],
        correct: 0,
        explanation: 'If AI learns from data that isn\'t fair or complete, it may make biased decisions. That\'s why it\'s important to have diverse, representative data!'
      },
      {
        q: 'Why is ethics important in AI?',
        options: ['Because AI affects people\'s lives and must be used responsibly', 'Because AI is too expensive', 'Because AI uses too much electricity', 'Because AI is boring without ethics'],
        correct: 0,
        explanation: 'AI makes decisions that affect people\'s lives. So it\'s important that it\'s fair, safe, and used for the good of everyone!'
      },
    ],
  }
};

// Shuffle options while keeping track of correct answer
function shuffleQuizOptions(question) {
  const opts = question.options.map((o, i) => ({ text: o, isCorrect: i === question.correct }));
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

let quizState = {};

function quizInit(level, container) {
  const data = QUIZ_DATA[currentLang][`level${level}`];
  const shuffledQs = shuffle([...data]).map(q => ({
    ...q,
    shuffledOptions: shuffleQuizOptions(q),
  }));

  quizState = {
    level,
    questions: shuffledQs,
    current: 0,
    score: 0,
    answered: false,
    selectedOption: null,
    phase: 'question',  // 'question' | 'result'
  };

  renderQuiz(container);
}

function getSelectedOption(question) {
  if (quizState.selectedOption === null || quizState.selectedOption === undefined) return null;
  return question.shuffledOptions[quizState.selectedOption] || null;
}

function renderQuiz(container) {
  if (quizState.phase === 'result') {
    renderQuizResult(container);
    return;
  }

  const q = quizState.questions[quizState.current];
  const total = quizState.questions.length;
  const pct = (quizState.current / total) * 100;

  const selectedOption = getSelectedOption(q);

  container.innerHTML = `
    <div class="fade-in">
      <!-- Progress -->
      <div class="quiz-progress-bar-wrap">
        <div class="quiz-progress-bar" style="width:${pct}%"></div>
      </div>
      <div class="quiz-question-label">
        ${t('quiz_question')} ${quizState.current + 1} ${t('quiz_out_of') || '/'} ${total}
        ${Array(quizState.level).fill('⭐').join('')}
      </div>

      <!-- Question -->
      <div class="quiz-question-text">${q.q}</div>

      <!-- Options -->
      <div class="quiz-options" id="quiz-options">
        ${q.shuffledOptions.map((opt, i) => `
          <button class="quiz-option" id="qopt-${i}" data-idx="${i}" data-correct="${opt.isCorrect}"
                  onclick="quizSelect(${i})" ${quizState.answered ? 'disabled' : ''}>
            <span style="display:inline-block;width:28px;height:28px;border-radius:50%;
              background:var(--surface2);text-align:center;line-height:28px;
              margin-right:0.75rem;font-size:0.85rem;font-weight:800;">
              ${['A','B','C','D'][i]}
            </span>
            ${opt.text}
          </button>`).join('')}
      </div>

      <!-- Feedback -->
      <div class="quiz-feedback ${quizState.answered ? (selectedOption && selectedOption.isCorrect ? 'correct' : 'wrong') : ''}"
           style="${quizState.answered ? '' : 'display:none'}" id="quiz-feedback">
        ${quizState.answered ?
          (selectedOption && selectedOption.isCorrect ?
            t('quiz_correct') : t('quiz_wrong')) : ''}
        <div class="explanation">
          ${quizState.answered ? `<strong>${t('quiz_explanation')}</strong> ${q.explanation}` : ''}
        </div>
      </div>

      <!-- Next button -->
      <div class="quiz-actions">
        ${quizState.answered ? `
          <button class="btn btn-primary bounce-in" onclick="quizNext()">
            ${quizState.current + 1 < total ? t('quiz_next') : t('quiz_finish')}
          </button>` : ''}
      </div>
    </div>
  `;
}

function quizSelect(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  quizState.selectedOption = idx;

  const q = quizState.questions[quizState.current];
  const isCorrect = q.shuffledOptions[idx].isCorrect;
  if (isCorrect) quizState.score++;

  // Highlight options
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (q.shuffledOptions[i].isCorrect) {
      btn.classList.add('correct');
    } else if (i === idx && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Show feedback
  const fb = document.getElementById('quiz-feedback');
  if (fb) {
    fb.style.display = 'block';
    fb.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong') + ' bounce-in';
    fb.innerHTML = `
      ${isCorrect ? t('quiz_correct') : t('quiz_wrong')}
      <div class="explanation"><strong>${t('quiz_explanation')}</strong> ${q.explanation}</div>
    `;
  }

  // Show next button
  const actions = document.querySelector('.quiz-actions');
  if (actions) {
    const total = quizState.questions.length;
    actions.innerHTML = `
      <button class="btn btn-primary bounce-in" onclick="quizNext()">
        ${quizState.current + 1 < total ? t('quiz_next') : t('quiz_finish')}
      </button>
    `;
  }
}

function quizNext() {
  quizState.current++;
  quizState.answered = false;
  quizState.selectedOption = null;

  if (quizState.current >= quizState.questions.length) {
    quizState.phase = 'result';
  }

  renderQuiz(document.getElementById('quiz-area'));
}

function renderQuizResult(container) {
  const { score, questions, level } = quizState;
  const total = questions.length;
  const ratio = score / total;
  const passed = ratio >= 0.7;

  const stars = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : ratio >= 0.4 ? 1 : 0;
  const starHtml = Array(stars).fill('<span class="star-animated" style="animation-delay:${i*0.15}s">⭐</span>').join('');
  const starsRow = [0,1,2].map(i =>
    `<span class="star-animated" style="animation-delay:${i*0.15}s">${i < stars ? '⭐' : '☆'}</span>`
  ).join('');

  const msg = t(`quiz_stars${stars}`);
  const keyNext = `quiz${level + 1}`;

  recordResult(`quiz${level}`, score, total);

  container.innerHTML = `
    <div class="quiz-result bounce-in">
      <div style="font-size:3.5rem">🤖</div>
      <h3>${t('quiz_result_title')}</h3>
      <div class="stars" id="stars-row">${starsRow}</div>
      <div class="score-display">${score}<span>/${total}</span></div>
      <div class="aiki-msg">${msg}</div>

      <div class="result-actions">
        <button class="btn btn-secondary" onclick="quizInit(${level}, document.getElementById('quiz-area'))">
          🔄 ${t('quiz_play_again')}
        </button>
        ${passed && level < 3 ? `
          <button class="btn btn-primary" onclick="startQuizLevel(${level + 1})">
            ${t('quiz_next_level')}
          </button>` : ''}
      </div>
    </div>
  `;

  // Animate stars one by one
  document.querySelectorAll('.star-animated').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
  });
}

function startQuizLevel(level) {
  if (!isUnlocked(`quiz${level}`)) return;
  // Update active button
  document.querySelectorAll('.quiz-level-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === level);
  });
  quizInit(level, document.getElementById('quiz-area'));
}
