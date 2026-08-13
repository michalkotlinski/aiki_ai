// ==========================================
//  i18n — System tłumaczeń PL / EN
// ==========================================

if (typeof safeStorageGet !== 'function') {
  function safeStorageGet(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }
  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }
  function dispatchLangChange(lang) {
    if (typeof CustomEvent === 'function') {
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }
  }
}

let currentLang = safeStorageGet('aiki_lang', 'pl');

const TRANSLATIONS = {
  pl: {
    // Nav
    nav_info: 'Informacje',
    nav_prog: 'Programowanie',
    nav_tutorial: 'Tutorial',
    nav_games: 'Gry',
    nav_quiz: 'Quiz',

    // Hero
    hero_title: 'Poznaj Sztuczną Inteligencję!',
    hero_subtitle: 'AI to program, który uczy się sam — tak jak Ty uczysz się jeździć na rowerze!',
    hero_btn_info: '📚 Dowiedz się więcej',
    hero_btn_games: '🎮 Zagraj!',
    hero_btn_quiz: '❓ Rozwiąż quiz',
    hero_aiki_bubble: 'Cześć! Jestem Aiki. Pokażę Ci jak działam!',

    // Cards section
    cards_title: 'Czym jest AI?',
    cards_subtitle: 'Kliknij kartę, żeby dowiedzieć się więcej!',

    card1_front: 'Co to jest AI?',
    card1_back: 'Sztuczna inteligencja (AI) to program komputerowy, który potrafi się uczyć i rozwiązywać problemy — podobnie jak człowiek, ale używając danych i matematyki!',

    card2_front: 'Jak AI się uczy?',
    card2_back: 'AI uczy się przez przykłady! Pokazujemy jej tysiące zdjęć kotów, aż sama nauczy się rozpoznawać koty. Im więcej przykładów, tym mądrzejsza AI!',

    card3_front: 'Rozpoznawanie obrazów',
    card3_back: 'AI potrafi "zobaczyć" zdjęcie i powiedzieć co na nim jest — pies, kot, jabłko. Robi to analizując kolory i kształty pikseli na zdjęciu.',

    card4_front: 'Chatboty',
    card4_back: 'Chatbot to AI, która rozmawia z ludźmi przez tekst lub głos. Asystent Siri czy Google to właśnie chatboty — rozumieją Twoje pytania i odpowiadają!',

    card5_front: 'AI w grach',
    card5_back: 'W grach komputerowych AI steruje postaciami, które grają przeciwko Tobie! Ta AI uczy się Twoich ruchów i stara się wygrać. W szachach AI bije nawet mistrzów świata!',

    card6_front: 'Czy AI jest mądra?',
    card6_back: 'AI jest bardzo dobra w jednym zadaniu, ale nie rozumie świata jak człowiek. Może liczyć milion razy szybciej, ale nie wie jak smakuje lody. To różni ją od człowieka!',

    card7_front: 'Jak programować AI?',
    card7_back: 'Programowanie AI to: zebranie przykładów (zdjęcia, teksty), trenowanie modelu i używanie go w programie. Nie musisz pisać skomplikowanego kodu — w Scratchu łączysz kolorowe bloczki!',

    card8_front: 'Scratch + AI',
    card8_back: 'W Scratchu możesz dodać rozszerzenie „Machine Learning for Kids”. Uczysz komputer rozpoznawać obrazy i reagować — np. gdy widzi kota, mówi „Miau!”. To prawdziwe AI w grze lub animacji!',

    prog_title: 'Programowanie sztucznej inteligencji',
    prog_subtitle: 'AI też da się „programować” — ucząc ją na przykładach i dając proste instrukcje!',
    prog_steps_title: '4 kroki do własnego AI w Scratchu',
    prog_step1: 'Zbierz przykłady — np. 10 zdjęć kota i 10 psa (emoji też działają!)',
    prog_step2: 'Wytrenuj model — Scratch „uczy się” rozpoznawać wzory',
    prog_step3: 'Dodaj bloczki: gdy rozpoznasz obraz → powiedz lub zrób coś',
    prog_step4: 'Przetestuj! Pokaż nowe zdjęcie i zobacz, co AI odpowie',
    prog_example_title: 'Przykład programu w Scratchu',
    prog_example_desc: 'Tak może wyglądać prosty projekt rozpoznawania zwierząt:',
    prog_demo_block1: 'gdy kliknięto 🚩',
    prog_demo_block2: 'wytrenuj model ze zdjęć 🐱 i 🐶',
    prog_demo_block3: 'rozpoznaj obraz z kamery',
    prog_demo_block4: 'gdy rozpoznano 🐱',
    prog_demo_block5: 'powiedz „Miau! To kot!” przez 2 sek.',
    prog_demo_block6: 'gdy rozpoznano 🐶',
    prog_demo_block7: 'powiedz „Hau! To pies!” przez 2 sek.',
    prog_scratch_note: 'Wypróbuj to sam w grze „Laboratorium Scratch” poniżej albo na stronie ML for Kids!',
    prog_btn_game: '🎮 Zagraj w Laboratorium Scratch',

    // Tutorial section
    tutorial_title: 'Twój pierwszy program AI w HTML i JavaScript',
    tutorial_subtitle: 'Zbuduj prosty klasyfikator k-NN, który uczy się rozpoznawać punkty na płaszczyźnie!',

    tut_card1_front: 'Czym jest k-NN?',
    tut_card1_back: 'k-NN (k-Nearest Neighbors) to prosty algorytm: nowy punkt sprawdza, którzy są jego k najbliższych sąsiadów i głosuje tak jak oni!',

    tut_card2_front: 'Jak to działa?',
    tut_card2_back: 'Mierzymy odległość (Pitagoras!) od nowego punktu do wszystkich znanych. Wybieramy k najbliższych i sprawdzamy, do jakiej grupy większość należy.',

    tut_card3_front: 'Kod w 30 liniach!',
    tut_card3_back: 'Cały algorytm k-NN mieści się w kilkudziesięciu liniach JavaScript. Zobaczysz to na żywo poniżej — możesz skopiować kod i badać go sam!',

    tut_demo_title: '🎮 Interaktywna demo: Rysuj punkty i ucz AI!',
    tut_demo_desc: 'Klikaj na planszę, by dodać punkty dwóch kolorów. AI uczy się na Twoich przykładach i od razu przewiduje kolor nowych punktów!',

    tut_color_red: 'Czerwony',
    tut_color_blue: 'Niebieski',
    tut_clear: '🗑️ Wyczyść',
    tut_legend_red: 'Czerwona klasa',
    tut_legend_blue: 'Niebieska klasa',
    tut_legend_pred: 'Przewidywanie AI',
    tut_stat_red: 'Czerwone: 0',
    tut_stat_blue: 'Niebieskie: 0',
    tut_stat_k: 'k = 3',
    tut_k_label: 'Liczba sąsiadów (k):',

    tut_code_title: '💡 Jak to działa w kodzie?',
    tut_code_desc: 'Oto kompletny, działający kod algorytmu k-NN. Skopiuj go do pliku <code>index.html</code> i otwórz w przeglądarce!',

    tut_copy_btn: '📋 Skopiuj kod do schowka',
    tut_copy_success: 'Skopiowano! Wklej do pliku .html i otwórz w przeglądarce.',

    tut_concepts_title: '🔑 Kluczowe pojęcia, które się tu uczysz',
    tut_concept1: '<strong>Dane treningowe</strong> = punkty, które Ty "nauczasz" AI (klikasz je sam!)',
    tut_concept2: '<strong>Cecha (feature)</strong> = tutaj po prostu współrzędne X i Y punktu',
    tut_concept3: '<strong>Odległość euklidesowa</strong> = pierwiastek z (Δx² + Δy²) — twierdzenie Pitagorasa!',
    tut_concept4: '<strong>Parametr k</strong> = ile sąsiadów bierze pod uwagę (małe k = niestabilne, duże = rozmyte)',
    tut_concept5: '<strong>Głosowanie większościowe</strong> = klasa, która ma więcej głosów wśród sąsiadów, wygrywa',
    tut_concept6: '<strong>Granica decyzyjna</strong> = linia (tutaj: kolorowe tło), gdzie AI zmienia zdanie',

    tut_experiments_title: '🧪 Eksperymenty do wypróbowania',
    tut_exp1: 'Ustal k=1 i zobacz, jak granica staje się "zackata" (overfitting)',
    tut_exp2: 'Ustal k=15 i zobacz, jak granica się wygładza (underfitting)',
    tut_exp3: 'Dodaj tylko punkty czerwone w jednym rogu — co AI przewiduje w środku?',
    tut_exp4: 'Stwórz "wyspę" niebieskich punktów w morzu czerwonych — czy AI to rozpozna?',
    tut_exp5: 'Dodaj po 20 punktów każdego koloru, potem usuń kilka — jak zmienia się granica?',

    tut_next_steps: 'Chcesz więcej? Spróbuj dodać trzecią klasę (zieloną), albo zmień odległość na <strong>Manhattan</strong> (|Δx| + |Δy|)!',
    tut_more_link: '🔗 Znajdź więcej tutoriali na GitHubie',

    nav_prog: 'Programowanie',
    games_title: 'Gry z AI',
    games_subtitle: 'Ucz się przez zabawę! Ukończ grę, żeby odblokować następną.',

    game1_title: 'Naucz Aikiego!',
    game1_desc: 'Pokaż Aikiemu przykłady i naucz go rozpoznawać koty i psy.',
    game1_btn: 'Zagraj!',
    game1_concept: '🧠 Uczysz się o: Machine Learning',

    game2_title: 'Sortownia Danych',
    game2_desc: 'Przeciągaj dane do właściwych koszyków — pomóż AI je posortować!',
    game2_btn: 'Zagraj!',
    game2_concept: '🧠 Uczysz się o: Klasyfikacja danych',
    game2_locked: '🔒 Ukończ "Naucz Aikiego!" żeby odblokować',

    game3_title: 'Labirynt Aikiego',
    game3_desc: 'Zaprogramuj drogę Aikiego przez labirynt używając prostych poleceń.',
    game3_btn: 'Zagraj!',
    game3_concept: '🧠 Uczysz się o: Algorytmy i decyzje',
    game3_locked: '🔒 Ukończ "Sortownię Danych" żeby odblokować',

    game4_title: 'Laboratorium Scratch',
    game4_desc: 'Układaj bloczki jak w Scratchu i zaprogramuj AI rozpoznawania zwierząt!',
    game4_btn: 'Zagraj!',
    game4_concept: '🧠 Uczysz się o: Programowanie wizualne + AI',
    game4_locked: '🔒 Ukończ „Labirynt Aikiego” żeby odblokować',

    // Games section
    g1_instruction: 'Co widzisz na obrazku?',
    g1_choose_label: 'Wybierz: kot czy pies?',
    g1_its_cat: '🐱 To kot!',
    g1_its_dog: '🐕 To pies!',
    g1_hint_start: '⬅️ Wybierz kot lub pies dla każdego obrazka!',
    g1_hint_learning: '🧠 Uczę się... pokaż mi więcej!',
    g1_hint_ready: '✅ Gotowy do zgadywania!',
    g1_reveal_guess: '🔮 Niech Aiki zgaduje!',
    g1_next_round: '➡️ Następne',
    g1_finish: '🏁 Zakończ',
    g1_training: 'Trenowanie Aikiego...',
    g1_round: 'Runda',
    g1_of: 'z',
    g1_now_guess: 'Teraz Aiki zgaduje! Co to jest?',
    g1_correct: '✅ Brawo! Dobrze zgadłem!',
    g1_wrong: '😅 Ups! Pomyliłem się... jeszcze się uczę!',
    g1_result_title: 'Wyniki trenowania!',
    g1_aiki_learned: 'Aiki nauczył się rozpoznawać obrazy!',
    g1_score: 'Wynik',
    g1_play_again: 'Trenuj ponownie',
    g1_next_game: 'Następna gra! →',
    g1_pass_msg: '🎉 Świetna robota! Gra 2 odblokowana!',
    g1_fail_msg: '💪 Spróbuj jeszcze raz! Potrzebujesz 70%, żeby przejść dalej.',

    // Game 2
    g2_instruction: 'Przeciągaj karteczki do właściwego koszyka!',
    g2_hint: 'Przeciągnij element do koszyka albo kliknij element, potem koszyk.',
    g2_numbers: '🔢 Liczby',
    g2_words: '📝 Słowa',
    g2_images: '🖼️ Obrazy',
    g2_score: 'Wynik',
    g2_correct: 'Dobrze posortowane!',
    g2_wrong: 'To nie ten koszyk!',
    g2_result_title: 'Sortowanie zakończone!',
    g2_play_again: 'Sortuj ponownie',
    g2_next_game: 'Następna gra! →',
    g2_pass_msg: '🎉 Jesteś mistrzem sortowania! Gra 3 odblokowana!',
    g2_fail_msg: '💪 Prawie! Spróbuj jeszcze raz. Potrzebujesz 70%.',

    // Game 3
    g3_instruction: 'Zaprogramuj ścieżkę Aikiego! Dodaj polecenia, potem kliknij START.',
    g3_up: '⬆️ Góra',
    g3_down: '⬇️ Dół',
    g3_left: '⬅️ Lewo',
    g3_right: '➡️ Prawo',
    g3_start: '▶️ Start!',
    g3_clear: '🗑️ Wyczyść',
    g3_steps: 'Kroki:',
    g3_win: '🎉 Aiki dotarł do celu!',
    g3_fail_wall: '💥 Aiki uderzył w ścianę! Spróbuj innej ścieżki.',
    g3_result_title: 'Labirynt pokonany!',
    g3_play_again: 'Zagraj ponownie',
    g3_pass_msg: '🎉 Jesteś programistą! Quiz i Laboratorium Scratch odblokowane!',
    g3_fail_msg: '💪 Prawie! Spróbuj jeszcze raz.',

    // Game 4 — Scratch Lab
    g4_level: 'Poziom',
    g4_instruction: 'Złóż program z bloczków Scratch!',
    g4_hint1: 'Poziom 1: Dodaj bloczki „gdy widzę 🐱” i „powiedz Miau!”, potem kliknij 🚩',
    g4_hint2: 'Poziom 2: Dodaj reguły dla kota I psa — oba zestawy bloczków!',
    g4_hint3: 'Poziom 3: Użyj bloczków AI: wytrenuj → rozpoznaj → powiedz odpowiedź',
    g4_stage: 'Scena',
    g4_blocks: 'Bloczki',
    g4_script: 'Twój program',
    g4_script_empty: 'Kliknij bloczki po lewej, żeby dodać je tutaj…',
    g4_run: 'Start',
    g4_clear: 'Wyczyść program',
    g4_missing_blocks: '❌ Brakuje bloczków! Sprawdź wskazówkę.',
    g4_training: '📸 Trenuję model ze zdjęć…',
    g4_running: '▶️ Uruchamiam program…',
    g4_level_pass: '✅ Działa! Następny poziom!',
    g4_result_title: 'Laboratorium ukończone!',
    g4_score: 'Ukończone poziomy',
    g4_play_again: 'Programuj ponownie',
    g4_pass_msg: '🎉 Jesteś młodym programistą AI! Możesz tworzyć w Scratchu!',
    g4_fail_msg: '💪 Spróbuj jeszcze raz ułożyć bloczki.',
    g4_try_scratch: 'Prawdziwe projekty AI zrobisz w Scratchu z rozszerzeniem ML for Kids!',
    g4_open_ml4kids: 'Otwórz ML for Kids',
    g4_scratch_tip: 'To symulacja Scratcha. Prawdziwe projekty:',
    g4_block_when_cat: 'gdy widzę 🐱',
    g4_block_when_dog: 'gdy widzę 🐶',
    g4_block_say_cat: 'powiedz „Miau!”',
    g4_block_say_dog: 'powiedz „Hau hau!”',
    g4_block_train: 'wytrenuj model ze zdjęć',
    g4_block_recognize: 'rozpoznaj obraz',
    g4_block_say_label: 'powiedz odpowiedź',

    // Quiz
    quiz_title: 'Quiz wiedzy o AI',
    quiz_subtitle: 'Sprawdź co wiesz! Trzy poziomy trudności.',

    quiz_level1: 'Poziom 1: Podstawy',
    quiz_level2: 'Poziom 2: Uczenie maszynowe',
    quiz_level3: 'Poziom 3: Ekspert AI',
    quiz_level2_locked: '🔒 Ukończ Poziom 1 z wynikiem ≥70%',
    quiz_level3_locked: '🔒 Ukończ Poziom 2 z wynikiem ≥70%',

    quiz_question: 'Pytanie',
    quiz_check: 'Sprawdź odpowiedź',
    quiz_next: 'Następne pytanie →',
    quiz_finish: 'Zakończ quiz',
    quiz_correct: '✅ Brawo! To prawidłowa odpowiedź!',
    quiz_wrong: '❌ Nieprawidłowo.',
    quiz_explanation: 'Wyjaśnienie:',

    quiz_result_title: 'Wyniki quizu!',
    quiz_score: 'Twój wynik:',
    quiz_out_of: 'z',
    quiz_play_again: 'Spróbuj ponownie',
    quiz_next_level: 'Następny poziom →',

    // Aiki quiz messages
    quiz_stars3: '🌟🌟🌟 Doskonale! Jesteś ekspertem AI!',
    quiz_stars2: '⭐⭐ Bardzo dobrze! Prawie wszystko wiesz!',
    quiz_stars1: '⭐ Nieźle! Trochę jeszcze do nauki.',
    quiz_stars0: '💪 Ćwicz dalej! AI też się uczy przez błędy.',

    // Footer
    footer_title: 'Chcesz dowiedzieć się więcej?',
    footer_links_title: 'Przydatne strony:',
    footer_fact1_label: 'Linii kodu w ChatGPT:',
    footer_fact2_label: 'Zdjęć użytych do trenowania AI:',
    footer_fact3_label: 'Języków rozumie AI:',
    footer_bye: 'Do zobaczenia! Pamiętaj — Ty też możesz tworzyć AI! 🚀',
    footer_credit: 'Stworzone dla uczniów w wieku 10–12 lat',

    // Unlock notification
    unlock_title: '🎉 Odblokowano!',
    unlock_close: 'Super!',
  },

  en: {
    // Nav
    nav_info: 'Learn',
    nav_prog: 'Coding',
    nav_tutorial: 'Tutorial',
    nav_games: 'Games',
    nav_quiz: 'Quiz',

    // Hero
    hero_title: 'Discover Artificial Intelligence!',
    hero_subtitle: 'AI is a program that learns on its own — just like you learn to ride a bike!',
    hero_btn_info: '📚 Learn more',
    hero_btn_games: '🎮 Play!',
    hero_btn_quiz: '❓ Take the quiz',
    hero_aiki_bubble: 'Hi! I\'m Aiki. Let me show you how I work!',

    // Cards section
    cards_title: 'What is AI?',
    cards_subtitle: 'Click a card to learn more!',

    card1_front: 'What is AI?',
    card1_back: 'Artificial Intelligence (AI) is a computer program that can learn and solve problems — just like a human, but using data and mathematics!',

    card2_front: 'How does AI learn?',
    card2_back: 'AI learns from examples! We show it thousands of cat photos until it learns to recognize cats on its own. More examples = smarter AI!',

    card3_front: 'Image Recognition',
    card3_back: 'AI can "see" a photo and say what\'s in it — a dog, cat, or apple. It does this by analyzing the colors and shapes of pixels in the image.',

    card4_front: 'Chatbots',
    card4_back: 'A chatbot is an AI that talks to people through text or voice. Siri and Google Assistant are chatbots — they understand your questions and respond!',

    card5_front: 'AI in Games',
    card5_back: 'In computer games, AI controls the characters that play against you! This AI learns your moves and tries to win. In chess, AI can beat world champions!',

    card6_front: 'Is AI smart?',
    card6_back: 'AI is very good at one specific task, but it doesn\'t understand the world like a human. It can calculate a million times faster, but doesn\'t know what ice cream tastes like!',

    card7_front: 'How do you program AI?',
    card7_back: 'Programming AI means: collecting examples (photos, text), training a model, and using it in your program. You don\'t need complicated code — in Scratch you connect colorful blocks!',

    card8_front: 'Scratch + AI',
    card8_back: 'In Scratch you can add the "Machine Learning for Kids" extension. You teach the computer to recognize images and react — e.g. when it sees a cat, it says "Meow!". That\'s real AI in a game or animation!',

    prog_title: 'Programming Artificial Intelligence',
    prog_subtitle: 'You can "program" AI too — by teaching it with examples and giving simple instructions!',
    prog_steps_title: '4 steps to your own AI in Scratch',
    prog_step1: 'Collect examples — e.g. 10 cat photos and 10 dog photos (emojis work too!)',
    prog_step2: 'Train the model — Scratch "learns" to recognize patterns',
    prog_step3: 'Add blocks: when you recognize an image → say or do something',
    prog_step4: 'Test it! Show a new photo and see what the AI answers',
    prog_example_title: 'Example Scratch program',
    prog_example_desc: 'A simple animal recognition project could look like this:',
    prog_demo_block1: 'when 🚩 clicked',
    prog_demo_block2: 'train model with photos of 🐱 and 🐶',
    prog_demo_block3: 'recognize image from camera',
    prog_demo_block4: 'when 🐱 recognized',
    prog_demo_block5: 'say "Meow! It\'s a cat!" for 2 secs',
    prog_demo_block6: 'when 🐶 recognized',
    prog_demo_block7: 'say "Woof! It\'s a dog!" for 2 secs',
    prog_scratch_note: 'Try it yourself in the "Scratch Lab" game below or on the ML for Kids website!',
    prog_btn_game: '🎮 Play Scratch Lab',

    // Tutorial section
    tutorial_title: 'Your First AI Program in HTML and JavaScript',
    tutorial_subtitle: 'Build a simple k-NN classifier that learns to recognize points on a plane!',

    tut_card1_front: 'What is k-NN?',
    tut_card1_back: 'k-NN (k-Nearest Neighbors) is a simple algorithm: a new point checks who its k nearest neighbors are and votes like they do!',

    tut_card2_front: 'How does it work?',
    tut_card2_back: 'We measure distance (Pythagoras!) from the new point to all known points. Pick the k closest and see which group the majority belongs to.',

    tut_card3_front: 'Code in 30 lines!',
    tut_card3_back: 'The entire k-NN algorithm fits in a few dozen lines of JavaScript. See it live below — copy the code and experiment yourself!',

    tut_demo_title: '🎮 Interactive Demo: Draw Points and Teach AI!',
    tut_demo_desc: 'Click on the canvas to add points of two colors. AI learns from your examples and instantly predicts the color of new points!',

    tut_color_red: 'Red',
    tut_color_blue: 'Blue',
    tut_clear: '🗑️ Clear',
    tut_legend_red: 'Red class',
    tut_legend_blue: 'Blue class',
    tut_legend_pred: 'AI prediction',
    tut_stat_red: 'Red: 0',
    tut_stat_blue: 'Blue: 0',
    tut_stat_k: 'k = 3',
    tut_k_label: 'Number of neighbors (k):',

    tut_code_title: '💡 How it works in code?',
    tut_code_desc: 'Here\'s the complete, working k-NN algorithm code. Copy it to an <code>index.html</code> file and open in your browser!',

    tut_copy_btn: '📋 Copy code to clipboard',
    tut_copy_success: 'Copied! Paste into an .html file and open in browser.',

    tut_concepts_title: '🔑 Key Concepts You\'re Learning',
    tut_concept1: '<strong>Training data</strong> = points you "teach" the AI (you click them yourself!)',
    tut_concept2: '<strong>Feature</strong> = here simply the X and Y coordinates of a point',
    tut_concept3: '<strong>Euclidean distance</strong> = square root of (Δx² + Δy²) — Pythagorean theorem!',
    tut_concept4: '<strong>Parameter k</strong> = how many neighbors to consider (small k = unstable, large = blurry)',
    tut_concept5: '<strong>Majority voting</strong> = the class with more votes among neighbors wins',
    tut_concept6: '<strong>Decision boundary</strong> = line (here: colored background) where AI changes its mind',

    tut_experiments_title: '🧪 Experiments to Try',
    tut_exp1: 'Set k=1 and watch the boundary become "jagged" (overfitting)',
    tut_exp2: 'Set k=15 and watch the boundary smooth out (underfitting)',
    tut_exp3: 'Add only red points in one corner — what does AI predict in the middle?',
    tut_exp4: 'Create an "island" of blue points in a sea of red — can AI detect it?',
    tut_exp5: 'Add 20 points of each color, then remove a few — how does the boundary change?',

    tut_next_steps: 'Want more? Try adding a third class (green), or change distance to <strong>Manhattan</strong> (|Δx| + |Δy|)!',
    tut_more_link: '🔗 Find more tutorials on GitHub',

    nav_prog: 'Coding',

    // Games section
    games_title: 'Games with AI',
    games_subtitle: 'Learn by playing! Complete each game to unlock the next one.',

    game1_title: 'Train Aiki!',
    game1_desc: 'Show Aiki examples and teach him to recognize cats and dogs.',
    game1_btn: 'Play!',
    game1_concept: '🧠 You\'re learning: Machine Learning',

    game2_title: 'Data Sorter',
    game2_desc: 'Drag items into the right baskets — help AI sort the data!',
    game2_btn: 'Play!',
    game2_concept: '🧠 You\'re learning: Data Classification',
    game2_locked: '🔒 Complete "Train Aiki!" to unlock',

    game3_title: 'Aiki\'s Maze',
    game3_desc: 'Program Aiki\'s path through the maze using simple commands.',
    game3_btn: 'Play!',
    game3_concept: '🧠 You\'re learning: Algorithms & Decisions',
    game3_locked: '🔒 Complete "Data Sorter" to unlock',

    game4_title: 'Scratch Lab',
    game4_desc: 'Build blocks like in Scratch and program AI to recognize animals!',
    game4_btn: 'Play!',
    game4_concept: '🧠 You\'re learning: Visual programming + AI',
    game4_locked: '🔒 Complete "Aiki\'s Maze" to unlock',

    // Game 1
    g1_instruction: 'What do you see in the picture?',
    g1_choose_label: 'Choose: cat or dog?',
    g1_its_cat: '🐱 It\'s a cat!',
    g1_its_dog: '🐕 It\'s a dog!',
    g1_hint_start: '⬅️ Pick cat or dog for each picture!',
    g1_hint_learning: '🧠 Learning... show me more!',
    g1_hint_ready: '✅ Ready to guess!',
    g1_reveal_guess: '🔮 Let Aiki guess!',
    g1_next_round: '➡️ Next',
    g1_finish: '🏁 Finish',
    g1_training: 'Training Aiki...',
    g1_round: 'Round',
    g1_of: 'of',
    g1_now_guess: 'Now Aiki guesses! What is this?',
    g1_correct: '✅ Great! I guessed correctly!',
    g1_wrong: '😅 Oops! I made a mistake... still learning!',
    g1_result_title: 'Training Results!',
    g1_aiki_learned: 'Aiki learned to recognize images!',
    g1_score: 'Score',
    g1_play_again: 'Train again',
    g1_next_game: 'Next game! →',
    g1_pass_msg: '🎉 Great job! Game 2 unlocked!',
    g1_fail_msg: '💪 Try again! You need 70% to continue.',

    // Game 2
    g2_instruction: 'Drag the cards into the correct basket!',
    g2_hint: 'Drag an item into a basket, or tap the item and then the basket.',
    g2_numbers: '🔢 Numbers',
    g2_words: '📝 Words',
    g2_images: '🖼️ Images',
    g2_score: 'Score',
    g2_correct: 'Sorted correctly!',
    g2_wrong: 'Wrong basket!',
    g2_result_title: 'Sorting complete!',
    g2_play_again: 'Sort again',
    g2_next_game: 'Next game! →',
    g2_pass_msg: '🎉 You\'re a sorting master! Game 3 unlocked!',
    g2_fail_msg: '💪 So close! Try again. You need 70%.',

    // Game 3
    g3_instruction: 'Program Aiki\'s path! Add commands, then press START.',
    g3_up: '⬆️ Up',
    g3_down: '⬇️ Down',
    g3_left: '⬅️ Left',
    g3_right: '➡️ Right',
    g3_start: '▶️ Start!',
    g3_clear: '🗑️ Clear',
    g3_steps: 'Steps:',
    g3_win: '🎉 Aiki reached the goal!',
    g3_fail_wall: '💥 Aiki hit a wall! Try a different path.',
    g3_result_title: 'Maze completed!',
    g3_play_again: 'Play again',
    g3_pass_msg: '🎉 You\'re a programmer! Quiz and Scratch Lab unlocked!',
    g3_fail_msg: '💪 Almost! Try again.',

    // Game 4 — Scratch Lab
    g4_level: 'Level',
    g4_instruction: 'Build a program from Scratch blocks!',
    g4_hint1: 'Level 1: Add "when I see 🐱" and "say Meow!" blocks, then click 🚩',
    g4_hint2: 'Level 2: Add rules for BOTH cat AND dog — two sets of blocks!',
    g4_hint3: 'Level 3: Use AI blocks: train → recognize → say the answer',
    g4_stage: 'Stage',
    g4_blocks: 'Blocks',
    g4_script: 'Your script',
    g4_script_empty: 'Click blocks on the left to add them here…',
    g4_run: 'Start',
    g4_clear: 'Clear script',
    g4_missing_blocks: '❌ Missing blocks! Check the hint.',
    g4_training: '📸 Training model with photos…',
    g4_running: '▶️ Running program…',
    g4_level_pass: '✅ It works! Next level!',
    g4_result_title: 'Lab completed!',
    g4_score: 'Levels completed',
    g4_play_again: 'Program again',
    g4_pass_msg: '🎉 You\'re a young AI programmer! You can create in Scratch!',
    g4_fail_msg: '💪 Try arranging the blocks again.',
    g4_try_scratch: 'Build real AI projects in Scratch with the ML for Kids extension!',
    g4_open_ml4kids: 'Open ML for Kids',
    g4_scratch_tip: 'This simulates Scratch. Real projects:',
    g4_block_when_cat: 'when I see 🐱',
    g4_block_when_dog: 'when I see 🐶',
    g4_block_say_cat: 'say "Meow!"',
    g4_block_say_dog: 'say "Woof woof!"',
    g4_block_train: 'train model with photos',
    g4_block_recognize: 'recognize image',
    g4_block_say_label: 'say the answer',

    // Quiz
    quiz_title: 'AI Knowledge Quiz',
    quiz_subtitle: 'Test what you know! Three difficulty levels.',

    quiz_level1: 'Level 1: Basics',
    quiz_level2: 'Level 2: Machine Learning',
    quiz_level3: 'Level 3: AI Expert',
    quiz_level2_locked: '🔒 Complete Level 1 with ≥70%',
    quiz_level3_locked: '🔒 Complete Level 2 with ≥70%',

    quiz_question: 'Question',
    quiz_check: 'Check answer',
    quiz_next: 'Next question →',
    quiz_finish: 'Finish quiz',
    quiz_correct: '✅ Correct! Well done!',
    quiz_wrong: '❌ That\'s not right.',
    quiz_explanation: 'Explanation:',

    quiz_result_title: 'Quiz Results!',
    quiz_score: 'Your score:',
    quiz_out_of: 'out of',
    quiz_play_again: 'Try again',
    quiz_next_level: 'Next level →',

    quiz_stars3: '🌟🌟🌟 Excellent! You\'re an AI expert!',
    quiz_stars2: '⭐⭐ Very good! You know almost everything!',
    quiz_stars1: '⭐ Not bad! A bit more to learn.',
    quiz_stars0: '💪 Keep practicing! AI also learns from mistakes.',

    // Footer
    footer_title: 'Want to learn more?',
    footer_links_title: 'Useful websites:',
    footer_fact1_label: 'Lines of code in ChatGPT:',
    footer_fact2_label: 'Images used to train AI:',
    footer_fact3_label: 'Languages AI understands:',
    footer_bye: 'See you! Remember — you can create AI too! 🚀',
    footer_credit: 'Created for students aged 10–12',

    // Unlock notification
    unlock_title: '🎉 Unlocked!',
    unlock_close: 'Awesome!',
  }
};

// ==========================================
//  i18n engine
// ==========================================

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['pl'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  safeStorageSet('aiki_lang', lang);
  applyTranslations();
  updateLangBtn();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  // fire event so game modules can re-render
  dispatchLangChange(currentLang);
}

function updateLangBtn() {
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'pl' ? '🇬🇧 EN' : '🇵🇱 PL';
}

function toggleLang() {
  setLang(currentLang === 'pl' ? 'en' : 'pl');
}

// Init on DOM ready (called from main.js)
function initI18n() {
  updateLangBtn();
  applyTranslations();
}
