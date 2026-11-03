/**
 * HOLOQUEST - Shared Autocomplete Component
 * Renders talent portraits with multi-step fallbacks (_01.png, _01.PNG, _pr-img.png, _pr-img.PNG).
 */

class HoloAutocomplete {
  constructor(inputElement, dropdownElement, talentDatabase, onSelectCallback) {
    this.input = inputElement;
    this.dropdown = dropdownElement;
    this.talents = talentDatabase;
    this.onSelect = onSelectCallback;
    this.guessedTalents = [];
    this.highlightedIndex = -1;

    this.init();
  }

  init() {
    this.input.addEventListener("input", () => this.handleInput());
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));

    document.addEventListener("click", (e) => {
      if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.hideDropdown();
      }
    });

    this.input.addEventListener("focus", () => {
      if (this.input.value.trim().length > 0) {
        this.handleInput();
      }
    });
  }

  setGuessedTalents(guesses) {
    this.guessedTalents = guesses.map(g => {
      return typeof g === "string" ? g.toLowerCase() : g.name ? g.name.toLowerCase() : g.talent.name.toLowerCase();
    });
  }

  handleInput() {
    const query = this.input.value.trim().toLowerCase();
    this.highlightedIndex = -1;

    if (query.length === 0) {
      this.hideDropdown();
      return;
    }

    const matches = this.talents.filter(t => {
      const isAlreadyGuessed = this.guessedTalents.includes(t.name.toLowerCase());
      const nameMatches = t.name.toLowerCase().includes(query);
      return nameMatches && !isAlreadyGuessed;
    });

    this.renderDropdown(matches);
  }

  renderDropdown(matches) {
    if (matches.length === 0) {
      this.hideDropdown();
      return;
    }

    this.dropdown.innerHTML = "";

    matches.forEach((talent, index) => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";
      item.setAttribute("data-index", index);

      const formattedSlug = talent.name.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');

      const img = document.createElement("img");
      img.className = "talent-avatar";
      img.alt = talent.name;
      img.src = talent.imageUrl || `./images/${formattedSlug}_pr-img_01.png`;

      const placeholder = document.createElement("div");
      placeholder.className = "talent-avatar-placeholder";
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

      const infoDiv = document.createElement("div");
      infoDiv.className = "talent-info";
      infoDiv.innerHTML = `
        <span class="talent-name">${talent.name}</span>
        <span class="talent-meta">${talent.branch} • ${talent.generation}</span>
      `;

      item.appendChild(img);
      item.appendChild(placeholder);
      item.appendChild(infoDiv);

      item.addEventListener("click", () => {
        this.selectTalent(talent);
      });

      this.dropdown.appendChild(item);
    });

    this.dropdown.classList.add("show");
  }

  handleKeyDown(e) {
    const items = this.dropdown.querySelectorAll(".autocomplete-item");
    if (!this.dropdown.classList.contains("show") || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.highlightedIndex = (this.highlightedIndex + 1) % items.length;
      this.updateHighlight(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.highlightedIndex = (this.highlightedIndex - 1 + items.length) % items.length;
      this.updateHighlight(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.highlightedIndex >= 0 && items[this.highlightedIndex]) {
        items[this.highlightedIndex].click();
      }
    } else if (e.key === "Escape") {
      this.hideDropdown();
    }
  }

  updateHighlight(items) {
    items.forEach((item, idx) => {
      if (idx === this.highlightedIndex) {
        item.classList.add("highlighted");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("highlighted");
      }
    });
  }

  selectTalent(talent) {
    this.input.value = "";
    this.hideDropdown();
    if (this.onSelect) {
      this.onSelect(talent);
    }
  }

  hideDropdown() {
    this.dropdown.classList.remove("show");
    this.dropdown.innerHTML = "";
    this.highlightedIndex = -1;
  }
}

window.HoloAutocomplete = HoloAutocomplete;