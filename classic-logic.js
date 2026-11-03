/**
 * HOLOQUEST - Classic Mode Game Engine
 * Renders talent portrait thumbnails inside guess cards instead of Oshi Marks.
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

    this.init();
  }

  init() {
    // Select target talent
    this.targetTalent = this.selectTargetTalent ? this.selectTargetTalent() : this.talents[Math.floor(Math.random() * this.talents.length)];

    // Initialize Autocomplete safely
    if (window.HoloAutocomplete) {
      this.autocomplete = initClassicAutocomplete(this);
    }
  }

  handleGuess(talent) {
    if (this.isGameOver) return;

    // Record guess
    this.guesses.push(talent);
    if (this.autocomplete) {
      this.autocomplete.setGuessedTalents(this.guesses);
    }

    // Render row
    const row = this.createGuessRow(talent, this.targetTalent);
    this.guessesContainer.prepend(row);

    // Check Win Condition
    if (talent.name === this.targetTalent.name) {
      this.isGameOver = true;
      this.triggerVictory();
    }
  }

  createGuessRow(guess, target) {
    const row = document.createElement("div");
    row.className = "guess-row";

    // 1. Talent Card with Portrait Thumbnail
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

    // 2. Attribute Comparison Cards
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

  triggerVictory() {
    if (this.inputElement) this.inputElement.disabled = true;
    if (this.victoryModal) {
      this.victoryModal.classList.add("show");
    }
  }
}

// Instantiate engine when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (typeof talents !== "undefined") {
    window.classicEngine = new ClassicGameEngine(talents);
  }
});