/**
 * HOLOQUEST - Infinite Trivia Quiz Engine
 * Continuously cycles questions from trivia.js, tracking session score and high score.
 */

class InfiniteQuizSession {
  constructor(questionDatabase) {
    this.pool = questionDatabase;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("holoquest_inf_quiz_high") || "0", 10);
    this.userAnswers = [];
    this.isRoundOver = false;

    this.startNewRound();
  }

  startNewRound() {
    // Pick 5 random questions from pool without duplicate in same round
    const shuffled = [...this.pool].sort(() => Math.random() - 0.5);
    this.questions = shuffled.slice(0, 5);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.isRoundOver = false;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  submitAnswer(optionIndex) {
    if (this.isRoundOver || this.currentIndex >= this.questions.length) return null;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      this.score += 100;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem("holoquest_inf_quiz_high", this.highScore.toString());
      }
    }

    const answerEntry = {
      questionId: currentQ.id,
      selectedOption: optionIndex,
      isCorrect: isCorrect
    };

    this.userAnswers.push(answerEntry);
    this.currentIndex += 1;

    if (this.currentIndex >= this.questions.length) {
      this.isRoundOver = true;
    }

    return { isCorrect, correctIndex: currentQ.correctIndex, explanation: currentQ.explanation };
  }
}