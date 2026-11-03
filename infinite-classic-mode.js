/**
 * HOLOQUEST - Infinite Classic Mode Engine
 * Randomizes a new target on start and after every victory, keeping the game going infinitely.
 */

class InfiniteClassicGameEngine {
  constructor(talentDatabase) {
    this.talents = talentDatabase;
    this.targetTalent = null;
    this.guesses = [];
    this.isGameOver = false;
    this.infiniteStreak = parseInt(localStorage.getItem("holoquest_infinite_streak") || "0", 10);

    // DOM Elements
    this.inputElement = document.getElementById("guess-input");
    this.dropdownElement = document.getElementById("autocomplete-dropdown");
    this.guessesContainer = document.getElementById("guesses-container");
    this.victoryModal = document.getElementById("victory-modal");
    this.streakCountEl = document.getElementById("infinite-streak-count") || document.getElementById("current-streak");
    this.maxStreakEl = document.getElementById("infinite-max-streak") || document.getElementById("best-streak");

    this.init();
  }

  init() {
    this.selectNewTarget();
    this.loadStats();

    // Initialize using your project's HoloAutocomplete class
    if (window.HoloAutocomplete && this.inputElement && this.dropdownElement) {
      this.autocomplete = new HoloAutocomplete(
        this.inputElement,
        this.dropdownElement,
        this.talents,
        (selectedTalent) => this.handleGuess(selectedTalent)
      );
    } else {
      console.error("HoloAutocomplete is not defined! Check script loading order.");
    }
  }

  selectNewTarget() {
    if (!this.talents || this.talents.length === 0) return;
    // Pick a completely random target for infinite mode
    const randomIndex = Math.floor(Math.random() * this.talents.length);
    this.targetTalent = this.talents[randomIndex];
    console.log("Infinite Mode Target (Debug):", this.targetTalent.name);
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

    // Talent Card with Portrait Thumbnail & Fallbacks
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
    this.infiniteStreak++;
    let maxStreak = parseInt(localStorage.getItem("holoquest_infinite_max_streak") || "0", 10);

    if (this.infiniteStreak > maxStreak) {
      maxStreak = this.infiniteStreak;
    }

    localStorage.setItem("holoquest_infinite_streak", this.infiniteStreak);
    localStorage.setItem("holoquest_infinite_max_streak", maxStreak);

    this.loadStats();
  }

  loadStats() {
    const maxStreak = localStorage.getItem("holoquest_infinite_max_streak") || "0";
    if (this.streakCountEl) this.streakCountEl.textContent = this.infiniteStreak;
    if (this.maxStreakEl) this.maxStreakEl.textContent = maxStreak;
  }

  triggerVictory() {
    if (this.inputElement) {
      this.inputElement.disabled = true;
      this.inputElement.value = "";
    }
    if (this.victoryModal) {
      this.victoryModal.classList.add("show");
    }
  }

  // Resets the board for the next infinite round when the user clicks "Next Round"
  nextRound() {
    this.guesses = [];
    this.isGameOver = false;
    this.selectNewTarget();

    if (this.guessesContainer) {
      this.guessesContainer.innerHTML = "";
    }

    if (this.victoryModal) {
      this.victoryModal.classList.remove("show");
    }

    if (this.inputElement) {
      this.inputElement.disabled = false;
      this.inputElement.value = "";
      this.inputElement.focus();
    }

    if (this.autocomplete) {
      this.autocomplete.setGuessedTalents(this.guesses);
      if (typeof this.autocomplete.clear === "function") {
        this.autocomplete.clear();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof talents !== "undefined") {
    window.infiniteClassicEngine = new InfiniteClassicGameEngine(talents);
  }
});