/**
 * HOLOQUEST - Classic Mode UI Renderer
 * Renders guess rows, attribute tiles, reveal animations, and victory banner.
 */

class ClassicUIRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.headersRendered = false;
  }

  initGrid() {
    this.container.innerHTML = `
      <div class="guess-grid-headers">
        <div class="header-tile">Talent</div>
        <div class="header-tile">Branch</div>
        <div class="header-tile">Generation</div>
        <div class="header-tile">Species</div>
        <div class="header-tile">Gender</div>
        <div class="header-tile">Status</div>
        <div class="header-tile">Debut Year</div>
      </div>
      <div id="guessRowsList" class="guess-rows-list"></div>
    `;
    this.headersRendered = true;
  }

  renderGuesses(guesses) {
    if (!this.headersRendered) {
      this.initGrid();
    }

    const rowsList = document.getElementById("guessRowsList");
    if (!rowsList) return;

    rowsList.innerHTML = "";

    guesses.forEach((guessData, index) => {
      const isLatest = index === 0;
      const rowEl = this.createGuessRow(guessData, isLatest);
      rowsList.appendChild(rowEl);
    });
  }

  createGuessRow(guessData, isNew = false) {
    const row = document.createElement("div");
    row.className = `guess-row ${isNew ? "new-entry" : ""}`;

    const attrs = guessData.attributes;

    const columns = [
      { label: attrs.name.value, status: attrs.name.status, icon: guessData.talent.oshiMark || "🌟" },
      { label: attrs.branch.value, status: attrs.branch.status },
      { label: attrs.generation.value, status: attrs.generation.status },
      { label: attrs.species.value, status: attrs.species.status },
      { label: attrs.gender.value, status: attrs.gender.status },
      { label: attrs.status.value, status: attrs.status.status },
      { 
        label: `${attrs.debutYear.value} ${attrs.debutYear.arrow}`, 
        status: attrs.debutYear.status 
      }
    ];

    columns.forEach((col, colIndex) => {
      const tile = document.createElement("div");
      tile.className = `attribute-tile ${col.status}`;

      if (isNew) {
        tile.style.animationDelay = `${colIndex * 120}ms`;
      }

      if (col.icon) {
        tile.innerHTML = `<span class="tile-oshi">${col.icon}</span><span class="tile-text">${col.label}</span>`;
      } else {
        tile.innerHTML = `<span class="tile-text">${col.label}</span>`;
      }

      row.appendChild(tile);
    });

    return row;
  }

  renderVictoryBanner(targetTalent, guessCount) {
    const victoryDiv = document.createElement("div");
    victoryDiv.className = "victory-banner animate-pop";
    victoryDiv.innerHTML = `
      <div class="victory-content">
        <span class="victory-oshi">${targetTalent.oshiMark || "🎉"}</span>
        <h3>CONGRATULATIONS!</h3>
        <p>You guessed <strong>${targetTalent.name}</strong> in <strong>${guessCount}</strong> ${guessCount === 1 ? "try" : "tries"}!</p>
        <div class="victory-stats-summary">
          <span>${targetTalent.branch}</span> • <span>${targetTalent.generation}</span> • <span>${targetTalent.debutYear}</span>
        </div>
      </div>
    `;

    this.container.prepend(victoryDiv);
  }
}