
"use strict";

const games = [
  {
    id: 1,
    name: "Elden Ring",
    genre: "RPG",
    rating: 9.5,
    players: "Single-player",
    artClass: "art-rpg",
    monogram: "ER",
    image:"images/EldenRing.jpg",
    description: "Explore a mysterious fantasy world, uncover its history, and face challenging enemies on a journey shaped by discovery."
  },
  {
    id: 2,
    name: "Minecraft",
    genre: "Adventure",
    rating: 9.2,
    players: "Single-player / Multiplayer",
    artClass: "art-adventure",
    monogram: "MC",
    image:"images/MineCraft.jpg",
    description: "Build, explore, and survive in a block-based world where creativity and experimentation are part of the adventure."
  },
  {
    id: 3,
    name: "Fortnite",
    genre: "Action",
    rating: 8.5,
    players: "Multiplayer",
    artClass: "art-action",
    monogram: "FN",
    image:"images/Fortnite.jpg",
    description: "Compete in fast-paced matches, experiment with different strategies, and team up with friends in a colorful action experience."
  },
  {
    id: 4,
    name: "Hades",
    genre: "RPG",
    rating: 9.3,
    players: "Single-player",
    artClass: "art-indie",
    monogram: "HD",
    image:"images/Hades.jpg",
    description: "Battle through the underworld in a fast-moving action role-playing adventure with memorable characters and replayable runs."
  },
  {
    id: 5,
    name: "The Legend of Zelda: Breath of the Wild",
    genre: "Adventure",
    rating: 9.7,
    players: "Single-player",
    artClass: "art-adventure",
    monogram: "ZL",
    image:"images/BreathOfTheWild.jpg",
    description: "Travel across a vast fantasy landscape, solve environmental puzzles, and choose your own approach to exploration."
  },
  {
    id: 6,
    name: "Rocket League",
    genre: "Action",
    rating: 8.7,
    players: "Multiplayer",
    artClass: "art-sport",
    monogram: "RL",
    image:"images/RocketLeague.jpg",
    description: "Combine football-style competition with rocket-powered cars in short matches that reward teamwork and precise control."
  },
  {
    id: 7,
    name: "Hollow Knight",
    genre: "Adventure",
    rating: 9.1,
    players: "Single-player",
    artClass: "art-sci-fi",
    monogram: "HK",
    image:"images/Hollow.jpg",
    description: "Discover a beautifully atmospheric underground kingdom filled with secrets, unusual characters, and demanding battles."
  },
  {
    id: 8,
    name: "Cyberpunk 2077",
    genre: "RPG",
    rating: 8.8,
    players: "Single-player",
    artClass: "art-sci-fi",
    monogram: "CP",
    image:"images/Cyberpunk.jpg",
    description: "Explore a futuristic city in a story-driven role-playing game where character choices and play styles shape the experience."
  },
  {
    id: 9,
    name: "Stardew Valley",
    genre: "Adventure",
    rating: 9.4,
    players: "Single-player / Multiplayer",
    artClass: "art-indie",
    monogram: "SV",
    image:"images/stardew.png",
    description: "Build a farm, get to know the local community, and create a relaxing routine in a charming life simulation."
  }
];

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  // DOM selection and modification shared by all pages.
  const footerYear = document.querySelector("#footerYear");
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Game Zone`;
  }

  if (page === "home") {
    renderFeaturedGames();
  }

  if (page === "games") {
    setupGameLibrary();
    setupJQueryAccordion();
  }

  if (page === "register") {
    setupRegistrationForm();
  }
});

function renderFeaturedGames() {
  const featuredContainer = document.querySelector("#featuredGames");
  if (!featuredContainer) return;

  const featuredGames = games.slice(0, 3);
  featuredContainer.innerHTML = featuredGames.map((game) => `
    <div class="col-md-6 col-lg-4">
      ${createGameCard(game, false)}
    </div>
  `).join("");
}

function createGameCard(game, showDetailsButton = true) {
  const button = showDetailsButton
    ? `<button class="btn btn-outline-light btn-sm" type="button" data-game-id="${game.id}" data-action="details" aria-label="View details for ${game.name}">Details ↗</button>`
    : `<a class="btn btn-outline-light btn-sm" href="games.html">Explore ↗</a>`;

  return `
    <article class="game-card">
   <div class="game-art">
    <img
        src="${game.image}"
        data-static="${game.image}"
         
        class="game-cover"
        alt="${game.name} cover"
    >

    <span class="game-badge">${game.genre.toUpperCase()}</span>
    <span class="game-rating" aria-label="Rating ${game.rating} out of 10">★ ${game.rating.toFixed(1)}</span>
</div>
      <div class="game-card-body">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <div class="game-card-foot">
          <span class="genre-text">${game.genre}</span>
          ${button}
        </div>
      </div>
    </article>
  `;
}

function setupGameLibrary() {
  const grid = document.querySelector("#gamesGrid");
  const searchInput = document.querySelector("#gameSearch");
  const countLabel = document.querySelector("#resultsCount");
  const emptyState = document.querySelector("#emptyState");
  const resetButton = document.querySelector("#resetFilters");
  const filterButtons = document.querySelectorAll("[data-genre]");
  const modalElement = document.querySelector("#gameDetailsModal");

  if (!grid || !searchInput || !countLabel || !emptyState) return;

  const detailsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
  let selectedGenre = "All";
  let searchTerm = "";

  function updateGames() {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    // Conditions + array filtering: apply both selected genre and search.
    const filteredGames = games.filter((game) => {
      const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;
      const matchesSearch = game.name.toLowerCase().includes(normalizedTerm);
      return matchesGenre && matchesSearch;
    });

    // Iteration: map each matching game into a Bootstrap grid card.
    grid.innerHTML = filteredGames.map((game) => `
      <div class="col-md-6 col-lg-4">${createGameCard(game)}</div>
    `).join("");

    countLabel.textContent = `${filteredGames.length} ${filteredGames.length === 1 ? "game" : "games"} found`;
    emptyState.classList.toggle("d-none", filteredGames.length !== 0);
    grid.classList.toggle("d-none", filteredGames.length === 0);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGenre = button.dataset.genre;
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      updateGames();
    });
  });

  searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    updateGames();
  });

  // Event delegation handles details buttons created dynamically by updateGames().
  grid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest('[data-action="details"]');
    if (!detailsButton) return;

    const gameId = Number(detailsButton.dataset.gameId);
    const selectedGame = games.find((game) => game.id === gameId);

    if (selectedGame) {
      showGameDetails(selectedGame);
      detailsModal.show();
    }
  });

  resetButton.addEventListener("click", () => {
    selectedGenre = "All";
    searchTerm = "";
    searchInput.value = "";
    filterButtons.forEach((button) => {
      const isAll = button.dataset.genre === "All";
      button.classList.toggle("active", isAll);
      button.setAttribute("aria-pressed", String(isAll));
    });
    updateGames();
    searchInput.focus();
  });

  updateGames();
}

function showGameDetails(game) {
  document.querySelector("#gameDetailsTitle").textContent = game.name;
  document.querySelector("#modalArt").innerHTML = `
      <img src="${game.image}" alt="${game.name} cover" class="modal-cover">
  `;
  document.querySelector("#modalArt").className = `modal-art ${game.artClass}`;
  document.querySelector("#modalDescription").textContent = game.description;
  document.querySelector("#modalPlayers").textContent = `Play mode: ${game.players}`;

  const metaContainer = document.querySelector("#modalMeta");
  metaContainer.innerHTML = `
    <span class="meta-chip">${game.genre}</span>
    <span class="meta-chip">★ ${game.rating.toFixed(1)} / 10</span>
  `;
}

function setupJQueryAccordion() {
  // Meaningful jQuery event: clicking a FAQ question toggles its answer.
  // Bootstrap also controls the accordion's normal open/close behavior.
  if (window.jQuery) {
    $(".accordion-button").on("click", function () {
      $(this).closest(".accordion-item").addClass("faq-touched");
      $(".accordion-item").not($(this).closest(".accordion-item")).removeClass("faq-touched");
    });
  }
}

function setupRegistrationForm() {
  const form = document.querySelector("#registrationForm");
  const alertBox = document.querySelector("#formAlert");
  const toastElement = document.querySelector("#successToast");
  const toastMessage = document.querySelector("#toastMessage");
  const resetButton = document.querySelector("#resetForm");

  if (!form || !alertBox || !toastElement) return;

  const successToast = bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 5000 });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerName = document.querySelector("#playerName").value.trim();
    const playerEmail = document.querySelector("#playerEmail").value.trim();
    const favoriteGame = document.querySelector("#favoriteGame").value;
    const eventChoice = document.querySelector("#eventChoice").value;
    const agreeTerms = document.querySelector("#agreeTerms").checked;

    // Basic client-side validation using conditions.
    const nameIsValid = playerName.length >= 2;
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(playerEmail);
    const selectionsAreValid = favoriteGame !== "" && eventChoice !== "";
    const formIsValid = nameIsValid && emailIsValid && selectionsAreValid && agreeTerms;

    document.querySelector("#playerName").classList.toggle("is-invalid", !nameIsValid);
    document.querySelector("#playerEmail").classList.toggle("is-invalid", !emailIsValid);
    document.querySelector("#favoriteGame").classList.toggle("is-invalid", favoriteGame === "");
    document.querySelector("#eventChoice").classList.toggle("is-invalid", eventChoice === "");
    document.querySelector("#agreeTerms").classList.toggle("is-invalid", !agreeTerms);

    if (!formIsValid) {
      alertBox.className = "alert alert-danger";
      alertBox.textContent = "Please check the highlighted fields and complete all required information.";
      alertBox.classList.remove("d-none");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const registration = {
      playerName: playerName,
      playerEmail: playerEmail,
      favoriteGame: favoriteGame,
      eventChoice: eventChoice,
      experienceLevel: document.querySelector("#experienceLevel").value
    };

    // Show confirmation without sending or storing personal data.
    alertBox.className = "alert alert-success";
    alertBox.textContent = `Thanks, ${registration.playerName}! Your demo request for "${registration.eventChoice}" has been recorded on this page.`;
    alertBox.classList.remove("d-none");
    toastMessage.textContent = `Thanks, ${registration.playerName}! Your demo request for ${registration.eventChoice} is confirmed on this page.`;
    successToast.show();
    form.reset();
    form.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
  });

  form.addEventListener("input", (event) => {
    if (event.target.classList.contains("is-invalid")) {
      event.target.classList.remove("is-invalid");
    }
  });

  resetButton.addEventListener("click", () => {
    alertBox.classList.add("d-none");
    form.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
  });
}
