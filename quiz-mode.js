/**
 * HOLOQUEST - Quiz Mode Engine
 * Manages daily question selection, score tracking, and persistence.
 */

function getDailyQuizSeed() {
  const today = new Date().toISOString().split("T")[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDailyQuizQuestions(allQuestions, count = 5) {
  if (!allQuestions || allQuestions.length === 0) return [];
  const seed = getDailyQuizSeed();
  
  // Shuffle pool using pseudo-random seed
  const pool = [...allQuestions];
  const selected = [];
  
  let currentSeed = seed;
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const index = Math.floor((currentSeed / 233280) * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }
  
  return selected;
}

class QuizGameSession {
  constructor(questionDatabase) {
    this.questions = getDailyQuizQuestions(questionDatabase, 5);
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.isGameOver = false;
    this.todayStr = new Date().toISOString().split("T")[0];

    this.loadState();
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  submitAnswer(optionIndex) {
    if (this.isGameOver || this.currentIndex >= this.questions.length) return null;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      this.score += 100;
    }

    const answerEntry = {
      questionId: currentQ.id,
      selectedOption: optionIndex,
      isCorrect: isCorrect
    };

    this.userAnswers.push(answerEntry);
    this.currentIndex += 1;

    if (this.currentIndex >= this.questions.length) {
      this.isGameOver = true;
      this.saveStreak();
    }

    this.saveState();
    return { isCorrect, correctIndex: currentQ.correctIndex, explanation: currentQ.explanation };
  }

  saveState() {
    const saveData = {
      date: this.todayStr,
      currentIndex: this.currentIndex,
      score: this.score,
      userAnswers: this.userAnswers,
      isGameOver: this.isGameOver
    };
    localStorage.setItem("holoquest_quiz_state", JSON.stringify(saveData));
  }

  loadState() {
    const raw = localStorage.getItem("holoquest_quiz_state");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      if (data.date === this.todayStr) {
        this.currentIndex = data.currentIndex || 0;
        this.score = data.score || 0;
        this.userAnswers = data.userAnswers || [];
        this.isGameOver = data.isGameOver || false;
      } else {
        localStorage.removeItem("holoquest_quiz_state");
      }
    } catch (e) {
      console.error("Error loading quiz state:", e);
    }
  }

  saveStreak() {
    let streak = parseInt(localStorage.getItem("holoquest_quiz_streak") || "0", 10);
    const lastWinDate = localStorage.getItem("holoquest_quiz_last_date");

    if (lastWinDate !== this.todayStr) {
      streak += 1;
      localStorage.setItem("holoquest_quiz_streak", streak.toString());
      localStorage.setItem("holoquest_quiz_last_date", this.todayStr);
    }
  }

  getStreak() {
    return parseInt(localStorage.getItem("holoquest_quiz_streak") || "0", 10);
  }
}