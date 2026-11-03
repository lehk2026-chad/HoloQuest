/**
 * HOLOQUEST - Normal Classic Mode Engine (Daily/Single Round)
 * Includes Streak Tracking, Daily Countdown Timer, and Portrait Asset Fallbacks.
 */

class ClassicGameEngine {
  constructor(talentDatabase) {
    this.talents = talentDatabase;
    this.targetTalent = null;
    this.guesses = [];
    this.isGameOver = false;

    // DOM Elements
    this.inputElement = document.getElementById("guess-input");
    this.dropdownElement = document.getElementById("autocomplete-dropdown");
    this.guessesContainer = document.getElementById("guesses-container");
    this.victoryModal = document.getElementById("victory-modal");
    this.streakCountEl = document.getElementById("streak-count") || document.getElementById("current-streak");
    this.maxStreakEl = document.getElementById("max-streak") || document.getElementById("best-streak");
    this.countdownEl = document.getElementById("countdown-timer") || document.getElementById("timer");

    this.init();
  }

  init() {
    this.targetTalent = this.selectDailyTarget();
    this.loadStats();
    this.startCountdown();

    // Check if already completed today
    const lastCompletedDate = localStorage.getItem("holoquest_last_date");
    const todayStr = new Date().toISOString().slice(0, 10);
    if (lastCompletedDate === todayStr) {
      // If already solved today, load state or show modal
      this.isGameOver = true;
      if (this.inputElement) this.inputElement.disabled = true;
    }

    if (window.HoloAutocomplete && this.inputElement && this.dropdownElement) {
      this.autocomplete = new HoloAutocomplete(
        this.inputElement,
        this.dropdownElement,
        this.talents,
        (selectedTalent) => this.handleGuess(selectedTalent)
      );
    }
  }

  selectDailyTarget() {
    const todayStr = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash << 5) - hash + todayStr.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % this.talents.length;
    return this.talents[index];
  }

  handleGuess(talent) {
    if (this.isGameOver) return;

    this.guesses.push(talent);
    if (this.autocomplete) {
      this.autocomplete.setGuessedTalents(this.guesses);
    }

    const row = this.createGuessRow(talent, this.targetTalent);
    if (this.guessesContainer) {
      this.guessesContainer.prepend(row);
    }

    if (talent.name.toLowerCase() === this.targetTalent.name.toLowerCase()) {
      this.isGameOver = true;
      this.recordVictory();
      this.triggerVictory();
    }
  }

  createGuessRow(guess, target) {
    const row = document.createElement("div");
    row.className = "guess-row";

    // Talent Card with Portrait Thumbnail
    const talentCard = document.createElement("div");
    talentCard.className = "attribute-card talent-card";

    const formattedSlug = guess.name
      .trim()
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('-');

    const img = document.createElement("img");
    img.className = "guess-talent-avatar";
    img.alt = guess.name;
    img.src = guess.imageUrl || `./images/${formattedSlug}_pr-img_01.png`;

    const placeholder = document.createElement("div");
    placeholder.className = "guess-talent-avatar-placeholder";
    placeholder.style.display = "none";
    placeholder.textContent = "VT";

    let attempt = 0;
    img.onerror = () => {
      attempt++;
      if (attempt === 1) {
        img.src = `./images/${formattedSlug}_pr-img_01.PNG`;
      } else if (attempt === 2) {
        img.src = `./images/${formattedSlug}_pr-img.png`;
      } else if (attempt === 3) {
        img.src = `./images/${formattedSlug}_pr-img.PNG`;
      } else {
        img.style.display = "none";
        placeholder.style.display = "flex";
      }
    };

    const nameSpan = document.createElement("span");
    nameSpan.className = "talent-card-name";
    nameSpan.textContent = guess.name;

    talentCard.appendChild(img);
    talentCard.appendChild(placeholder);
    talentCard.appendChild(nameSpan);
    row.appendChild(talentCard);

    // Attributes comparison
    const attributes = [
      { key: "branch", value: guess.branch, match: guess.branch === target.branch },
      { key: "generation", value: guess.generation, match: guess.generation === target.generation },
      { key: "species", value: guess.species, match: guess.species === target.species },
      { 
        key: "debutYear", 
        value: guess.debutYear, 
        match: guess.debutYear === target.debutYear,
        arrow: guess.debutYear < target.debutYear ? " ↑" : guess.debutYear > target.debutYear ? " ↓" : ""
      }
    ];

    attributes.forEach(attr => {
      const card = document.createElement("div");
      card.className = `attribute-card ${attr.match ? "correct" : "incorrect"}`;
      card.innerHTML = `<span class="attr-value">${attr.value}${attr.arrow || ""}</span>`;
      row.appendChild(card);
    });

    return row;
  }

  recordVictory() {
    const todayStr = new Date().toISOString().slice(0, 10);
    localStorage.setItem("holoquest_last_date", todayStr);

    let currentStreak = parseInt(localStorage.getItem("holoquest_streak") || "0", 10) + 1;
    let maxStreak = parseInt(localStorage.getItem("holoquest_max_streak") || "0", 10);

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }

    localStorage.setItem("holoquest_streak", currentStreak);
    localStorage.setItem("holoquest_max_streak", maxStreak);

    this.loadStats();
  }

  loadStats() {
    const currentStreak = localStorage.getItem("holoquest_streak") || "0";
    const maxStreak = localStorage.getItem("holoquest_max_streak") || "0";

    if (this.streakCountEl) this.streakCountEl.textContent = currentStreak;
    if (this.maxStreakEl) this.maxStreakEl.textContent = maxStreak;
  }

  startCountdown() {
    if (!this.countdownEl) return;

    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow - now;

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      this.countdownEl.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  triggerVictory() {
    if (this.inputElement) this.inputElement.disabled = true;
    if (this.victoryModal) {
      this.victoryModal.classList.add("show");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof talents !== "undefined") {
    window.classicEngine = new ClassicGameEngine(talents);
  }
});