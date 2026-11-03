/**
 * HOLOQUEST - Oshi Mark Mode Engine
 * Handles daily oshi mark selection, guess checking, and progressive hint unlocks.
 */

// Daily Target Selection Seed
function getDailyOshiSeed() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDailyOshiTarget(talentList) {
  // Filter talents that actually have an Oshi Mark defined
  const validTalents = talentList.filter(t => t.oshiMark && t.oshiMark.trim() !== "");
  if (validTalents.length === 0) return null;

  const seed = getDailyOshiSeed();
  const index = seed % validTalents.length;
  return validTalents[index];
}

class OshiGameSession {
  constructor(talentDatabase) {
    this.database = talentDatabase;
    this.target = getDailyOshiTarget(talentDatabase);
    this.guesses = [];
    this.maxGuesses = 5;
    this.isGameOver = false;
    this.isWon = false;
    this.todayStr = new Date().toISOString().split("T")[0];

    // Hint progression definitions based on target attributes
    this.hintMilestones = [
      { attempt: 1, type: "Branch", value: this.target ? this.target.branch : "" },
      { attempt: 2, type: "Generation", value: this.target ? this.target.generation : "" },
      { attempt: 3, type: "Species", value: this.target ? this.target.species : "" },
      { attempt: 4, type: "Debut Year", value: this.target ? this.target.debutYear : "" }
    ];

    this.loadState();
  }

  makeGuess(talent) {
    if (this.isGameOver) return null;

    const guessName = typeof talent === "string" ? talent : talent.name;
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
      this.updateStreak();
    } else if (this.guesses.length >= this.maxGuesses) {
      this.isGameOver = true;
      this.isWon = false;
    }

    this.saveState();
    return guessEntry;
  }

  getUnlockedHints() {
    const attemptCount = this.guesses.length;
    return this.hintMilestones.filter(hint => attemptCount >= hint.attempt);
  }

  saveState() {
    const saveData = {
      date: this.todayStr,
      guesses: this.guesses,
      isGameOver: this.isGameOver,
      isWon: this.isWon
    };
    localStorage.setItem("holoquest_oshi_state", JSON.stringify(saveData));
  }

  loadState() {
    const raw = localStorage.getItem("holoquest_oshi_state");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      if (data.date === this.todayStr) {
        this.guesses = data.guesses || [];
        this.isGameOver = data.isGameOver || false;
        this.isWon = data.isWon || false;
      } else {
        localStorage.removeItem("holoquest_oshi_state");
      }
    } catch (e) {
      console.error("Error loading Oshi Mode state:", e);
    }
  }

  updateStreak() {
    let streak = parseInt(localStorage.getItem("holoquest_oshi_streak") || "0", 10);
    const lastWinDate = localStorage.getItem("holoquest_oshi_last_win");

    if (lastWinDate !== this.todayStr) {
      streak += 1;
      localStorage.setItem("holoquest_oshi_streak", streak.toString());
      localStorage.setItem("holoquest_oshi_last_win", this.todayStr);
    }
  }

  getStreak() {
    return parseInt(localStorage.getItem("holoquest_oshi_streak") || "0", 10);
  }
}