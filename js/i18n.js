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
    nav_first_ai: 'Pierwszy program',
    nav_tutorial: 'Tutorial',
    nav_games: 'Gry',
    nav_safe_ai: 'Bezpiecznie z AI',
    nav_factcheck: 'Sprawdź z AI',
    nav_quiz: 'Quiz',

    // Safe AI missions
    safe_ai_kicker: 'PANEL DOWODZENIA · POZIOM BEZPIECZEŃSTWA',
    safe_ai_title: 'Misje: Bezpiecznie z AI',
    safe_ai_subtitle: 'Aiki daje Ci supermoc: myślę, zanim kliknę. Zbierz pięć odznak dobrych nawyków.',
    safe_ai_start: '🧭 Zacznij od pierwszej misji', safe_ai_progress: 'Ukończone misje', safe_ai_reset: 'Zresetuj postęp',
    safe_ai_rules_kicker: 'KARTA ZASAD AIKIEGO', safe_ai_rules_title: 'Zanim użyjesz AI...',
    safe_ai_rule1: 'Zatrzymaj się', safe_ai_rule2: 'Chroń prywatność', safe_ai_rule3: 'Sprawdź fakty', safe_ai_rule4: 'Powiedz, jak użyłeś AI', safe_ai_rule5: 'Ty decydujesz',
    safe_m1_title: 'Detektyw faktów', safe_m1_q: 'AI mówi: „Największy ocean na Ziemi to Atlantyk”. Co robisz?',
    safe_m1_a1: 'Sprawdzam w dwóch wiarygodnych źródłach', safe_m1_a2: 'Wierzę, bo AI brzmi pewnie', safe_m1_a3: 'Wysyłam odpowiedź dalej',
    safe_m1_good: 'Dokładnie! AI może brzmieć pewnie, a mimo to się mylić. Teraz wybierz źródła, które to potwierdzą.', safe_m1_try: 'Dobra próba — najpierw sprawdzaj fakty w dwóch wiarygodnych źródłach.', safe_m1_check: 'Czy fakt ma dwa źródła?',
    safe_m2_title: 'Sekret czy nie?', safe_m2_q: 'Co możesz bezpiecznie wpisać do publicznego czatu AI?',
    safe_m2_a1: '„Lubię rysować smoki. Podaj mi pomysł na komiks.”', safe_m2_a2: 'Moje pełne imię, nazwisko i adres', safe_m2_a3: 'Hasło do szkolnego konta', safe_m2_a4: 'Zdjęcie kolegi bez jego zgody',
    safe_m2_good: 'Tak! Ogólne hobby i pytanie są OK. Nie wpisuj danych osobowych, haseł ani cudzych zdjęć. Przed wysłaniem odpowiedzi sprawdź też, czy nie zdradza danych.', safe_m2_try: 'To prywatna informacja. W czacie publicznym zachowaj ją dla siebie.', safe_m2_check: 'Czy nie podałem danych prywatnych?',
    safe_m3_title: 'Uczciwa pomoc', safe_m3_q: 'Która prośba do AI jest uczciwą pomocą w nauce?',
    safe_m3_a1: '„Pomóż mi ułożyć plan, a potem popraw mój własny tekst.”', safe_m3_a2: '„Napisz całą odpowiedź, którą oddam jako swoją.”', safe_m3_a3: '„Rozwiąż za mnie sprawdzian.”',
    safe_m3_good: 'Super! AI może pomóc ćwiczyć i poprawiać. Sprawdź zasady nauczyciela, zachowaj własny wkład i powiedz, jak użyłeś AI.', safe_m3_try: 'To nie jest uczciwa pomoc. AI ma wspierać Twoją naukę, a nie wykonywać pracę za Ciebie.', safe_m3_check: 'Czy to mój własny wkład?',
    safe_m4_title: 'Równe szanse dla danych', safe_m4_q: 'Album treningowy ma tylko jasne zdjęcia kota z jednego ujęcia. Czy Aiki dobrze rozpozna koty na różnych zdjęciach?',
    safe_m4_a1: 'Nie zawsze — potrzebuje różnorodnych zdjęć i testowania', safe_m4_a2: 'Tak, jedno ujęcie wystarczy dla wszystkich zdjęć', safe_m4_a3: 'Nie trzeba testować modelu',
    safe_m4_good: 'Właśnie tak! Jak w albumie: im więcej różnych przykładów, tym lepiej Aiki rozumie, czego szuka. Potem trzeba go jeszcze testować.', safe_m4_try: 'Pomyśl o albumie zdjęć: jedno ujęcie nie pokazuje wszystkiego. Potrzebne są różne przykłady i testy.', safe_m4_check: 'Czy wynik przetestowano na różnych przykładach?',
    safe_m5_title: 'Prompt i kontrola', safe_m5_q: 'Które polecenie pomoże AI odpowiedzieć najlepiej?',
    safe_m5_a1: '„Dla klasy 5: napisz plan plakatu o oszczędzaniu wody, w 4 punktach, z 2 źródłami.”', safe_m5_a2: '„Napisz coś o wodzie.”', safe_m5_a3: '„Zrób mi pracę.”',
    safe_m5_good: 'Świetny prompt ma cel, odbiorcę i formę. Prośba o źródła nie jest dowodem: otwórz każde źródło, sprawdź autora i datę, a potem przerób odpowiedź własnymi słowami.', safe_m5_try: 'Im bardziej konkretny cel, odbiorca i forma, tym łatwiej AI pomóc. Pamiętaj też o sprawdzeniu wyniku.', safe_m5_check: 'Czy otworzyłem źródła i sprawdziłem datę?',
    safe_m_done: '✓ ODZNAKA ZDOBYTA', safe_m_complete_title: '🎉 Wszystkie misje ukończone!', safe_m_complete_text: 'Masz supermoc Aikiego: zatrzymaj się, chroń prywatność, sprawdzaj fakty, mów o użyciu AI i samodzielnie decyduj.',
    safe_ai_reset_confirm: 'Zresetować postęp pięciu misji i odznakę Detektywa źródeł?',
    safe_check_label: 'Po odpowiedzi AI sprawdzam…',
    safe_m1_sources_title: 'Drugi krok: wybierz dwa wiarygodne źródła.', safe_m1_sources_text: 'Dopiero wtedy misja jest ukończona.',
    source_institution: 'strona muzeum / instytucji', source_book: 'książka lub encyklopedia', source_comment: 'losowy komentarz', source_unknown: 'pierwszy link bez autora', source_submit: 'Sprawdź wybór', source_pick_two: 'Wybierz dokładnie dwa źródła.', source_good: 'Dobra para! Są niezależne i dają się sprawdzić.', source_try: 'Spróbuj ponownie: szukaj autora, instytucji i źródła pierwotnego.',
    factcheck_kicker: 'CENTRUM WERYFIKACJI · NIE WIERZ W CIEMNO', factcheck_title: 'Fact-checking: sprawdzaj odpowiedzi AI', factcheck_intro: 'AI nie jest źródłem. Może zmyślać odpowiedzi, daty, cytaty i linki — nawet gdy brzmi bardzo pewnie.',
    factcheck_stop_title: 'STOP', factcheck_stop_text: 'Czy twierdzenie jest ważne albo zaskakujące?', factcheck_search_title: 'POSZUKAJ', factcheck_search_text: 'Znajdź źródło pierwotne lub zaufaną instytucję.', factcheck_compare_title: 'PORÓWNAJ', factcheck_compare_text: 'Sprawdź dwa niezależne źródła i ich datę.', factcheck_note_title: 'ZAPISZ', factcheck_note_text: 'Zaznacz źródła oraz to, w czym pomogła AI.',
    detective_kicker: 'ĆWICZENIE PRAKTYCZNE', detective_title: 'Panel detektywa', detective_question: 'AI podaje trzy zdania. Które jest informacją, którą warto sprawdzić jako fakt?', detective_claim_false: '„Słońce jest planetą.”', detective_claim_opinion: '„Fioletowy to najładniejszy kolor.”', detective_claim_fact: '„Wieża Eiffla ma 330 metrów wysokości.”', detective_try_claim: 'To może być opinia albo oczywista pomyłka. Wybierz zdanie, które da się sprawdzić w źródłach.', detective_good_claim: 'Tak! To sprawdzalna informacja. Teraz sprawdź ją w dwóch źródłach.', detective_sources_title: 'Wybierz dwa najlepsze źródła.', detective_sources_text: 'Nie wystarczy pierwszy wynik ani komentarz.', detective_badge: 'ODZNAKA: DETEKTYW ŹRÓDEŁ',

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
    prog_btn_raise: '🎓 Aktywność: MIT RAISE Playground',

    raise_badge: 'Aktywność · od 10 lat',
    raise_title: '🧪 Programuj prawdziwe AI — MIT RAISE Playground',
    raise_desc: 'To prawdziwy edytor Scratch z bloczkami AI od MIT! Nauczysz komputer rozpoznawać obrazy — np. koty i psy — i zaprogramujesz, co ma powiedzieć.',
    raise_steps_title: '📋 Twoje zadanie — krok po kroku',
    raise_step1: 'Otwórz edytor poniżej (albo kliknij „Pełne okno”, jeśli masz mały ekran).',
    raise_step2: 'Znajdź rozszerzenie <strong>Teachable Machine</strong> — bloczki do uczenia AI na zdjęciach (w tym projekcie jest już włączone).',
    raise_step3: 'Wytrenuj model: dodaj przykłady klasy A (np. 🐱 kot) i klasy B (np. 🐶 pies).',
    raise_step4: 'Dodaj reakcję: <em>gdy rozpoznano kot</em> → powiedz „Miau!”, <em>gdy rozpoznano pies</em> → powiedz „Hau!”.',
    raise_step5: 'Kliknij zieloną flagę 🚩 i przetestuj kamerą lub nowymi zdjęciami!',
    raise_tips_title: '💡 Wskazówki Aikiego',
    raise_tip1: 'Im więcej przykładów, tym lepiej AI rozpoznaje — tak jak w grze „Naucz Aikiego!”',
    raise_tip2: 'Możesz użyć kamery laptopa albo wgrać zdjęcia z dysku.',
    raise_tip3: 'Menu <strong>Tutorials</strong> w edytorze ma gotowe lekcje po angielsku.',
    raise_tip4: 'Projekt zapiszesz przez <strong>File → Save to your computer</strong>.',
    raise_attribution: 'Playground MIT RAISE — darmowe narzędzie edukacyjne (licencja CC-BY-NC).',
    raise_embed_fallback: 'Edytor nie ładuje się? Otwórz Playground w nowej karcie — działa na pełnym ekranie.',
    raise_btn_full: '🚀 Otwórz Playground w pełnym oknie',
    raise_btn_blank: '📄 Pusty projekt (main)',
    raise_btn_learn: '📚 Więcej o RAISE',

    // First AI program (kids)
    fai_badge: 'Poziom 1 · od 10 lat',
    fai_title: 'Twój pierwszy program AI — Naucz Aikiego!',
    fai_subtitle: 'Bez skomplikowanej matematyki! Pokażesz robotowi przykłady, a on nauczy się zgadywać — dokładnie tak działa uczenie maszynowe.',
    fai_card1_front: 'Pamiętnik przykładów',
    fai_card1_back: 'AI nie rodzi się mądra — Ty ją uczysz! Każde zdjęcie z etykietą „kot” lub „pies” trafia do pamiętnika. Im więcej przykładów, tym lepiej pamięta.',
    fai_card2_front: 'Głosowanie',
    fai_card2_back: 'Gdy Aiki widzi coś nowego, patrzy do pamiętnika: ile było kotów, a ile psów? Wygrywa ta grupa, której było więcej — to proste głosowanie!',
    fai_card3_front: 'To prawdziwe AI!',
    fai_card3_back: 'Tak w skrócie działają filtry na zdjęciach, rozpoznawanie mowy i wiele gier — program uczy się z przykładów, które mu pokazujesz.',
    fai_recipe_title: '📝 Program Aikiego — 4 proste kroki',
    fai_recipe_desc: 'To jest „program” w języku zrozumiałym dla człowieka. Później zobaczysz, jak wygląda to w kodzie!',
    fai_recipe1: 'Pokaż Aikiemu zdjęcie zwierzęcia 🐱🐶',
    fai_recipe2: 'Powiedz mu: „To kot!” albo „To pies!”',
    fai_recipe3: 'Powtórz z wieloma różnymi zdjęciami',
    fai_recipe4: 'Poproś o zgadywanie — Aiki sprawdzi, czego było więcej w pamiętniku!',
    fai_demo_title: '🎮 Wypróbuj sam — naucz Aikiego!',
    fai_demo_desc: 'Wybierz etykietę dla każdego zdjęcia. Gdy masz co najmniej 3 przykłady, poproś Aikiego o zgadywanie!',
    fai_phase_teach: 'Krok 1: Ucz Aikiego',
    fai_choose_label: 'Co to jest?',
    fai_its_cat: '🐱 To kot!',
    fai_its_dog: '🐕 To pies!',
    fai_skip: '⏭️ Inne zdjęcie',
    fai_guess_btn: '🔮 Niech Aiki zgaduje!',
    fai_reset: '🗑️ Wyczyść pamiętnik',
    fai_speech_start: 'Cześć! Pokaż mi zdjęcia — nauczę się rozpoznawać koty i psy!',
    fai_speech_first: 'Super! Pierwszy przykład w pamiętniku. Pokaż mi jeszcze kilka!',
    fai_speech_learning: 'Uczę się... jeszcze {n} przykład(y) i będę gotowy zgadywać!',
    fai_speech_ready: 'Gotowy! Kliknij „Niech Aiki zgaduje!” i zobacz, co wymyślę.',
    fai_speech_thinking: 'Hmm... sprawdzam pamiętnik... ile kotów, ile psów...',
    fai_speech_correct: 'Trafione! Większość w pamiętniku pomogła mi zgadnąć!',
    fai_speech_wrong: 'Ups! Pomyliłem się — potrzebuję więcej różnych przykładów.',
    fai_speech_tie: 'Remis w pamiętniku! Dodaj więcej przykładów jednej grupy.',
    fai_cats_learned: 'Koty w pamięci:',
    fai_dogs_learned: 'Psy w pamięci:',
    fai_notebook_title: '📒 Pamiętnik Aikiego',
    fai_notebook_empty: 'Jeszcze pusto — dodaj pierwszy przykład!',
    fai_tag_cat: '🐱 kot',
    fai_tag_dog: '🐕 pies',
    fai_guess_prompt: 'Aiki widzi nowe zdjęcie i myśli...',
    fai_guess_cat_correct: '✅ Aiki mówi: „To kot!” — trafione!',
    fai_guess_dog_correct: '✅ Aiki mówi: „To pies!” — trafione!',
    fai_guess_cat_wrong: '😅 Aiki mówi: „To kot!” — tym razem się pomylił.',
    fai_guess_dog_wrong: '😅 Aiki mówi: „To pies!” — tym razem się pomylił.',
    fai_guess_tie: '🤔 Aiki mówi: „Nie wiem — pokaż mi więcej!”',
    fai_guess_again: '🔄 Zgaduj jeszcze raz',
    fai_code_title: '💡 Jak to wygląda w kodzie?',
    fai_code_desc: 'To uproszczony pseudokod — bez Pitagorasa i bez trudnych słów. Cała „mądrość” Aikiego to lista przykładów!',
    fai_concepts_title: '🔑 Co właśnie zrobiłeś?',
    fai_concept1: '<strong>Dane treningowe</strong> = zdjęcia z etykietami, które sam dodałeś',
    fai_concept2: '<strong>Etykieta</strong> = odpowiedź „kot” lub „pies”, którą podajesz AI',
    fai_concept3: '<strong>Predykcja</strong> = zgadywanie na podstawie tego, czego AI się nauczyła',
    fai_concept4: '<strong>Im więcej przykładów, tym lepiej</strong> — dokładnie jak Ty uczysz się nowych słów!',
    fai_experiments_title: '🧪 Eksperymenty dla ciekawskich',
    fai_exp1: 'Naucz Aikiego tylko kotami — co powie o nowym zdjęciu psa?',
    fai_exp2: 'Dodaj 8 psów i 2 koty — kogo Aiki wybierze częściej?',
    fai_exp3: 'Wyczyść pamiętnik i zacznij od nowa z równą liczbą kotów i psów',
    fai_exp4: 'Porównaj z grą „Naucz Aikiego!” — to ten sam pomysł, tylko w wersji do zabawy!',
    fai_next_desc: 'Gotowy na coś trudniejszego? W następnym tutorialu zbudujesz prawdziwy algorytm k-NN w HTML i JavaScript!',
    fai_next_btn: '➡️ Tutorial zaawansowany (k-NN)',

    // Tutorial section (advanced)
    tut_badge: 'Poziom 2 · od 12 lat',
    tutorial_title: 'Tutorial zaawansowany — program AI w HTML i JavaScript',
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
    tut_legend_pred: 'Przewidywanie AI (najedź kursorem)',
    tut_stat_red: 'Czerwone: 0',
    tut_stat_blue: 'Niebieskie: 0',
    tut_stat_k: 'k = 3',
    tut_k_label: 'Liczba sąsiadów (k):',
    tut_canvas_hint: 'Dodaj punkty — kolorowe tło pokaże przewidywania AI',
    tut_pred_red: '🔴 czerwony',
    tut_pred_blue: '🔵 niebieski',
    tut_live_pred: 'AI przewiduje tutaj: {pred}',
    tut_live_pred_empty: 'Najedź kursorem na planszę (po dodaniu punktów), żeby zobaczyć przewidywanie AI.',
    tut_live_pred_hint: 'Najedź kursorem na planszę — zobaczysz żółty marker przewidywania!',
    tut_explain_title: '🧒 Co tu się dzieje?',
    tut_explain_intro: 'To jak gra w „zgadywanie na podstawie sąsiadów”. AI nie zna magicznych sztuczek — po prostu patrzy, jakie punkty są blisko!',
    tut_explain1: 'Wybierz kolor (czerwony lub niebieski) i kliknij planszę — to Twoje przykłady, z których AI się uczy.',
    tut_explain2: 'Kolorowe tło to mapa przewidywań — różowe i niebieskie strefy pokazują, co AI „myśli” o każdym miejscu na planszy.',
    tut_explain3: 'Najedź kursorem — żółty marker mówi: „gdyby tu wpadł nowy punkt, wybrałbym ten kolor!”',
    tut_explain4: 'AI szuka <strong>k</strong> najbliższych punktów (sąsiadów) i głosuje — jak na lekcji wykopów: większość wygrywa!',
    tut_explain5: 'Suwakiem <strong>k</strong> zmieniasz liczbę sąsiadów: małe k = granica bardziej poszarpana, duże k = bardziej gładka i spokojna.',

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
    nav_first_ai: 'First Program',
    nav_tutorial: 'Tutorial',
    nav_games: 'Games',
    nav_safe_ai: 'Safe AI',
    nav_factcheck: 'Check AI',
    nav_quiz: 'Quiz',

    // Safe AI missions
    safe_ai_kicker: 'COMMAND PANEL · SAFETY LEVEL',
    safe_ai_title: 'Missions: Safe AI',
    safe_ai_subtitle: 'Aiki gives you a superpower: I think before I click. Earn five badges for smart habits.',
    safe_ai_start: '🧭 Start the first mission', safe_ai_progress: 'Missions completed', safe_ai_reset: 'Reset progress',
    safe_ai_rules_kicker: 'AIKI\'S RULE CARD', safe_ai_rules_title: 'Before you use AI...',
    safe_ai_rule1: 'Pause', safe_ai_rule2: 'Protect privacy', safe_ai_rule3: 'Check facts', safe_ai_rule4: 'Say how you used AI', safe_ai_rule5: 'You decide',
    safe_m1_title: 'Fact detective', safe_m1_q: 'AI says: “The Atlantic is the largest ocean on Earth.” What do you do?',
    safe_m1_a1: 'Check two trustworthy sources', safe_m1_a2: 'Believe it because AI sounds confident', safe_m1_a3: 'Send the answer on',
    safe_m1_good: 'Exactly! AI can sound confident and still be wrong. Now choose sources that can confirm it.', safe_m1_try: 'Good try — first check facts in two trustworthy sources.', safe_m1_check: 'Does this fact have two sources?',
    safe_m2_title: 'Secret or not?', safe_m2_q: 'What can you safely type into a public AI chat?',
    safe_m2_a1: '“I like drawing dragons. Give me a comic idea.”', safe_m2_a2: 'My full name and home address', safe_m2_a3: 'My school account password', safe_m2_a4: 'A photo of my classmate without permission',
    safe_m2_good: 'Yes! A general hobby and question are OK. Do not type personal details, passwords, or someone else\'s photos. Before sending, check that the answer does not reveal private information either.', safe_m2_try: 'That is private information. Keep it to yourself in a public chat.', safe_m2_check: 'Did I avoid private information?',
    safe_m3_title: 'Fair help', safe_m3_q: 'Which request is fair help from AI for school?',
    safe_m3_a1: '“Help me make an outline, then improve my own writing.”', safe_m3_a2: '“Write the whole answer that I will hand in as mine.”', safe_m3_a3: '“Do my test for me.”',
    safe_m3_good: 'Great! AI can help you practise and improve. Check your teacher\'s rules, keep your own work, and say how you used AI.', safe_m3_try: 'That is not fair help. AI should support your learning, not do the work for you.', safe_m3_check: 'Is this my own contribution?',
    safe_m4_title: 'Fair chances for data', safe_m4_q: 'A training album has only bright photos of a cat from one angle. Will Aiki recognize cats well in many different photos?',
    safe_m4_a1: 'Not always — it needs varied photos and testing', safe_m4_a2: 'Yes, one angle works for every photo', safe_m4_a3: 'There is no need to test the model',
    safe_m4_good: 'That\'s right! Like an album: the more different examples Aiki sees, the better it understands what to look for. Then we test it too.', safe_m4_try: 'Think of a photo album: one angle does not show everything. It needs varied examples and tests.', safe_m4_check: 'Was the result tested on varied examples?',
    safe_m5_title: 'Prompt and check', safe_m5_q: 'Which prompt will help AI give the best answer?',
    safe_m5_a1: '“For grade 5: make a 4-point poster plan about saving water, with 2 sources.”', safe_m5_a2: '“Write something about water.”', safe_m5_a3: '“Do my assignment.”',
    safe_m5_good: 'A great prompt has a goal, audience, and format. Asking for sources is not proof: open every source, check its author and date, then put the answer into your own words.', safe_m5_try: 'A clear goal, audience, and format help AI. Remember to check the result too.', safe_m5_check: 'Did I open the sources and check the date?',
    safe_m_done: '✓ BADGE EARNED', safe_m_complete_title: '🎉 All missions complete!', safe_m_complete_text: 'You have Aiki\'s superpower: pause, protect privacy, check facts, say how you used AI, and decide for yourself.',
    safe_ai_reset_confirm: 'Reset all five missions and the Source Detective badge?',
    safe_check_label: 'After an AI answer, I check…',
    safe_m1_sources_title: 'Second step: choose two trustworthy sources.', safe_m1_sources_text: 'Only then is the mission complete.',
    source_institution: 'a museum / institution website', source_book: 'a book or encyclopedia', source_comment: 'a random comment', source_unknown: 'the first link with no author', source_submit: 'Check my choices', source_pick_two: 'Choose exactly two sources.', source_good: 'Great pair! They are independent and can be checked.', source_try: 'Try again: look for an author, an institution, and a primary source.',
    factcheck_kicker: 'VERIFICATION CENTRE · DO NOT TRUST BLINDLY', factcheck_title: 'Fact-checking: check AI answers', factcheck_intro: 'AI is not a source. It can invent answers, dates, quotes, and links — even when it sounds very confident.',
    factcheck_stop_title: 'STOP', factcheck_stop_text: 'Is the claim important or surprising?', factcheck_search_title: 'SEARCH', factcheck_search_text: 'Find a primary source or trusted institution.', factcheck_compare_title: 'COMPARE', factcheck_compare_text: 'Check two independent sources and their dates.', factcheck_note_title: 'NOTE', factcheck_note_text: 'Write down the sources and how AI helped.',
    detective_kicker: 'PRACTICAL EXERCISE', detective_title: 'Detective panel', detective_question: 'AI gives three statements. Which one is information worth checking as a fact?', detective_claim_false: '“The Sun is a planet.”', detective_claim_opinion: '“Purple is the prettiest colour.”', detective_claim_fact: '“The Eiffel Tower is 330 metres tall.”', detective_try_claim: 'That may be an opinion or an obvious mistake. Choose the statement that can be checked in sources.', detective_good_claim: 'Yes! This is checkable information. Now check it in two sources.', detective_sources_title: 'Choose the two best sources.', detective_sources_text: 'A first result or a comment is not enough.', detective_badge: 'BADGE: SOURCE DETECTIVE',

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
    prog_btn_raise: '🎓 Activity: MIT RAISE Playground',

    raise_badge: 'Activity · ages 10+',
    raise_title: '🧪 Program Real AI — MIT RAISE Playground',
    raise_desc: 'This is a real Scratch editor with AI blocks from MIT! You\'ll teach the computer to recognize images — like cats and dogs — and program what it should say.',
    raise_steps_title: '📋 Your task — step by step',
    raise_step1: 'Open the editor below (or click "Full window" if you have a small screen).',
    raise_step2: 'Find the <strong>Teachable Machine</strong> extension — blocks for teaching AI with photos (already enabled in this project).',
    raise_step3: 'Train the model: add examples for class A (e.g. 🐱 cat) and class B (e.g. 🐶 dog).',
    raise_step4: 'Add a reaction: <em>when cat recognized</em> → say "Meow!", <em>when dog recognized</em> → say "Woof!"',
    raise_step5: 'Click the green flag 🚩 and test with your camera or new photos!',
    raise_tips_title: '💡 Aiki\'s tips',
    raise_tip1: 'More examples = better recognition — just like in the "Teach Aiki!" game!',
    raise_tip2: 'You can use your laptop camera or upload photos from your computer.',
    raise_tip3: 'The <strong>Tutorials</strong> menu in the editor has ready-made lessons in English.',
    raise_tip4: 'Save your project via <strong>File → Save to your computer</strong>.',
    raise_attribution: 'MIT RAISE Playground — free educational tool (CC-BY-NC license).',
    raise_embed_fallback: 'Editor not loading? Open the Playground in a new tab — it works full screen.',
    raise_btn_full: '🚀 Open Playground in full window',
    raise_btn_blank: '📄 Blank project (main)',
    raise_btn_learn: '📚 Learn more about RAISE',

    // First AI program (kids)
    fai_badge: 'Level 1 · ages 10+',
    fai_title: 'Your First AI Program — Teach Aiki!',
    fai_subtitle: 'No complicated math! Show the robot examples and it learns to guess — that\'s how machine learning works.',
    fai_card1_front: 'Example notebook',
    fai_card1_back: 'AI isn\'t born smart — you teach it! Every photo labeled "cat" or "dog" goes into a notebook. More examples = better memory.',
    fai_card2_front: 'Voting',
    fai_card2_back: 'When Aiki sees something new, it checks the notebook: how many cats vs dogs? Whichever group has more wins — simple voting!',
    fai_card3_front: 'It\'s real AI!',
    fai_card3_back: 'Photo filters, speech recognition, and many games work this way — the program learns from examples you show it.',
    fai_recipe_title: '📝 Aiki\'s Program — 4 simple steps',
    fai_recipe_desc: 'This is a "program" in human language. Later you\'ll see what it looks like in code!',
    fai_recipe1: 'Show Aiki an animal photo 🐱🐶',
    fai_recipe2: 'Tell it: "It\'s a cat!" or "It\'s a dog!"',
    fai_recipe3: 'Repeat with many different photos',
    fai_recipe4: 'Ask for a guess — Aiki checks which group had more in the notebook!',
    fai_demo_title: '🎮 Try it yourself — teach Aiki!',
    fai_demo_desc: 'Pick a label for each photo. When you have at least 3 examples, ask Aiki to guess!',
    fai_phase_teach: 'Step 1: Teach Aiki',
    fai_choose_label: 'What is it?',
    fai_its_cat: '🐱 It\'s a cat!',
    fai_its_dog: '🐕 It\'s a dog!',
    fai_skip: '⏭️ Different photo',
    fai_guess_btn: '🔮 Let Aiki guess!',
    fai_reset: '🗑️ Clear notebook',
    fai_speech_start: 'Hi! Show me photos — I\'ll learn to recognize cats and dogs!',
    fai_speech_first: 'Great! First example in the notebook. Show me a few more!',
    fai_speech_learning: 'Learning... {n} more example(s) and I\'ll be ready to guess!',
    fai_speech_ready: 'Ready! Click "Let Aiki guess!" and see what I come up with.',
    fai_speech_thinking: 'Hmm... checking the notebook... how many cats, how many dogs...',
    fai_speech_correct: 'Got it! The majority in my notebook helped me guess!',
    fai_speech_wrong: 'Oops! I got it wrong — I need more varied examples.',
    fai_speech_tie: 'It\'s a tie in my notebook! Add more examples of one group.',
    fai_cats_learned: 'Cats in memory:',
    fai_dogs_learned: 'Dogs in memory:',
    fai_notebook_title: '📒 Aiki\'s notebook',
    fai_notebook_empty: 'Still empty — add your first example!',
    fai_tag_cat: '🐱 cat',
    fai_tag_dog: '🐕 dog',
    fai_guess_prompt: 'Aiki sees a new photo and thinks...',
    fai_guess_cat_correct: '✅ Aiki says: "It\'s a cat!" — correct!',
    fai_guess_dog_correct: '✅ Aiki says: "It\'s a dog!" — correct!',
    fai_guess_cat_wrong: '😅 Aiki says: "It\'s a cat!" — wrong this time.',
    fai_guess_dog_wrong: '😅 Aiki says: "It\'s a dog!" — wrong this time.',
    fai_guess_tie: '🤔 Aiki says: "I don\'t know — show me more!"',
    fai_guess_again: '🔄 Guess again',
    fai_code_title: '💡 What does it look like in code?',
    fai_code_desc: 'Simplified pseudocode — no Pythagoras, no hard words. All of Aiki\'s "wisdom" is just a list of examples!',
    fai_concepts_title: '🔑 What did you just do?',
    fai_concept1: '<strong>Training data</strong> = labeled photos you added yourself',
    fai_concept2: '<strong>Label</strong> = the answer "cat" or "dog" you give the AI',
    fai_concept3: '<strong>Prediction</strong> = guessing based on what the AI learned',
    fai_concept4: '<strong>More examples = better</strong> — just like learning new words!',
    fai_experiments_title: '🧪 Experiments for the curious',
    fai_exp1: 'Teach Aiki only cats — what will it say about a new dog photo?',
    fai_exp2: 'Add 8 dogs and 2 cats — who will Aiki pick more often?',
    fai_exp3: 'Clear the notebook and start fresh with equal cats and dogs',
    fai_exp4: 'Compare with the "Teach Aiki!" game — same idea, just in play mode!',
    fai_next_desc: 'Ready for something harder? In the next tutorial you\'ll build a real k-NN algorithm in HTML and JavaScript!',
    fai_next_btn: '➡️ Advanced tutorial (k-NN)',

    // Tutorial section (advanced)
    tut_badge: 'Level 2 · ages 12+',
    tutorial_title: 'Advanced Tutorial — AI Program in HTML and JavaScript',
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
    tut_legend_pred: 'AI prediction (hover cursor)',
    tut_stat_red: 'Red: 0',
    tut_stat_blue: 'Blue: 0',
    tut_stat_k: 'k = 3',
    tut_k_label: 'Number of neighbors (k):',
    tut_canvas_hint: 'Add points — the colored background shows AI predictions',
    tut_pred_red: '🔴 red',
    tut_pred_blue: '🔵 blue',
    tut_live_pred: 'AI predicts here: {pred}',
    tut_live_pred_empty: 'Hover over the canvas (after adding points) to see the AI prediction.',
    tut_live_pred_hint: 'Hover over the canvas — you will see the yellow prediction marker!',
    tut_explain_title: '🧒 What\'s going on here?',
    tut_explain_intro: 'It\'s like a game of "guess based on neighbors." AI doesn\'t use magic tricks — it just looks at which points are nearby!',
    tut_explain1: 'Pick a color (red or blue) and click the canvas — these are your examples that AI learns from.',
    tut_explain2: 'The colored background is a prediction map — pink and blue zones show what AI "thinks" about each spot on the canvas.',
    tut_explain3: 'Hover your cursor — the yellow marker says: "if a new point landed here, I\'d pick this color!"',
    tut_explain4: 'AI finds the <strong>k</strong> nearest points (neighbors) and votes — like in class: majority wins!',
    tut_explain5: 'The <strong>k</strong> slider changes how many neighbors AI asks: small k = jagged boundary, large k = smoother and calmer.',

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
