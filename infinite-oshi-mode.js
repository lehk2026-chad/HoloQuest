/**
 * HOLOQUEST - Infinite Oshi Mark Mode Engine
 * Randomly selects talents with valid oshi marks, manages progressive hints,
 * and maintains active/best streaks.
 */

class InfiniteOshiSession {
  constructor(talentDatabase) {
    this.database = talentDatabase.filter(t => t.oshiMark && t.oshiMark.trim() !== "");
    this.target = null;
    this.guesses = [];
    this.isGameOver = false;
    this.isWon = false;
    this.maxGuesses = 5;

    // Streak persistence
    this.currentStreak = parseInt(localStorage.getItem("holoquest_inf_oshi_streak") || "0", 10);
    this.bestStreak = parseInt(localStorage.getItem("holoquest_inf_oshi_best") || "0", 10);

    this.selectNewTarget();
  }

  selectNewTarget() {
    if (!this.database || this.database.length === 0) return;

    let newTarget;
    do {
      const randomIndex = Math.floor(Math.random() * this.database.length);
      newTarget = this.database[randomIndex];
    } while (this.target && newTarget.name === this.target.name && this.database.length > 1);

    this.target = newTarget;
    this.guesses = [];
    this.isGameOver = false;
    this.isWon = false;

    // Define progressive hint milestones based on target attributes
    this.hintMilestones = [
      { attempt: 1, type: "Branch", value: this.target.branch },
      { attempt: 2, type: "Generation", value: this.target.generation },
      { attempt: 3, type: "Species", value: this.target.species },
      { attempt: 4, type: "Debut Year", value: this.target.debutYear }
    ];
  }

  makeGuess(talentInput) {
    if (this.isGameOver) return null;

    const guessName = typeof talentInput === "string" ? talentInput : talentInput.name;
    const matchedTalent = this.database.find(t => t.name.toLowerCase() === guessName.toLowerCase());

    if (!matchedTalent) return null;

    if (this.guesses.some(g => g.talent.name === matchedTalent.name)) {
      return { error: "already_guessed" };
    }

    const isCorrect = matchedTalent.name.toLowerCase() === this.target.name.toLowerCase();

    const guessEntry = {
      talent: matchedTalent,
      isCorrect: isCorrect,
      attemptNumber: this.guesses.length + 1
    };

    this.guesses.push(guessEntry);

    if (isCorrect) {
      this.isGameOver = true;
      this.isWon = true;
      this.currentStreak += 1;

      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
        localStorage.setItem("holoquest_inf_oshi_best", this.bestStreak.toString());
      }
      localStorage.setItem("holoquest_inf_oshi_streak", this.currentStreak.toString());
    } else if (this.guesses.length >= this.maxGuesses) {
      this.isGameOver = true;
      this.isWon = false;
      this.currentStreak = 0;
      localStorage.setItem("holoquest_inf_oshi_streak", "0");
    }

    return guessEntry;
  }

  getUnlockedHints() {
    const attemptCount = this.guesses.length;
    return this.hintMilestones.filter(hint => attemptCount >= hint.attempt);
  }
}