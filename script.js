const pokemon = [
  {
    name: "Bulbizarre",
    type: "Plante",
    emoji: "🌱"
  },
  {
    name: "Salamèche",
    type: "Feu",
    emoji: "🔥"
  },
  {
    name: "Carapuce",
    type: "Eau",
    emoji: "💧"
  },
  {
    name: "Pikachu",
    type: "Électrik",
    emoji: "⚡"
  },
  {
    name: "Rondoudou",
    type: "Normal",
    emoji: "🎀"
  },
  {
    name: "Miaouss",
    type: "Normal",
    emoji: "🐱"
  },
  {
    name: "Psykokwak",
    type: "Eau",
    emoji: "🦆"
  },
  {
    name: "Ectoplasma",
    type: "Spectre",
    emoji: "👻"
  },
  {
    name: "Évoli",
    type: "Normal",
    emoji: "🦊"
  },
  {
    name: "Mewtwo",
    type: "Psy",
    emoji: "🧬"
  }
];

let xp = 0;

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(page).classList.remove("hidden");

  if (page === "pokedex") {
    displayPokemon(pokemon);
  }
}

function displayPokemon(list) {
  const container = document.getElementById("pokemon-list");

  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="pokemon">
        <div class="emoji">${p.emoji}</div>
        <h3>${p.name}</h3>
        <p>Type : ${p.type}</p>
      </div>
    `;
  });
}

function searchPokemon() {
  const search =
    document.getElementById("search").value.toLowerCase();

  const results = pokemon.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  displayPokemon(results);
}

function saveProfile() {
  const name =
    document.getElementById("username").value;

  if (name.trim() === "") return;

  document.getElementById("profile-name").textContent = name;

  localStorage.setItem("pokeworld-name", name);
}

const savedName =
  localStorage.getItem("pokeworld-name");

if (savedName) {
  document.getElementById("profile-name").textContent =
    savedName;
}

displayPokemon(pokemon);
