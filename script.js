let xp = 0;

const typeFR = {
  normal: "Normal",
  fire: "Feu",
  water: "Eau",
  electric: "Électrik",
  grass: "Plante",
  ice: "Glace",
  fighting: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  ghost: "Spectre",
  dragon: "Dragon"
};

async function loadPokemon() {

  const container = document.getElementById("pokemon-list");

  container.innerHTML = `
    <p>⏳ Chargement des 151 Pokémon...</p>
  `;

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const data = await response.json();

  const details = await Promise.all(
    data.results.map(async pokemon => {

      const response = await fetch(pokemon.url);

      return await response.json();

    })
  );

  window.pokemon = details.map(p => ({

    id: p.id,

    name: p.name,

    types: p.types.map(
      t => typeFR[t.type.name] || t.type.name
    ),

    image:
      p.sprites.other["official-artwork"].front_default

  }));

  displayPokemon(window.pokemon);
}

function displayPokemon(list) {

  const container =
    document.getElementById("pokemon-list");

  container.innerHTML = "";

  list.forEach(p => {

    const number =
      String(p.id).padStart(3, "0");

    container.innerHTML += `

      <div class="pokemon">

        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        >

        <div class="number">
          N° ${number}
        </div>

        <h3>
          ${capitalize(p.name)}
        </h3>

        <p>
          ${p.types.join(" • ")}
        </p>

      </div>

    `;

  });
}

function capitalize(text) {

  return text.charAt(0).toUpperCase()
    + text.slice(1);

}

function searchPokemon() {

  const search =
    document
      .getElementById("search")
      .value
      .toLowerCase();

  const results =
    window.pokemon.filter(p =>

      p.name
        .toLowerCase()
        .includes(search)

      ||

      String(p.id).includes(search)

    );

  displayPokemon(results);

}

function showPage(page) {

  document
    .querySelectorAll(".page")
    .forEach(section => {

      section.classList.add("hidden");

    });

  document
    .getElementById(page)
    .classList.remove("hidden");

  if (page === "pokedex") {

    if (!window.pokemon) {

      loadPokemon();

    }

  }

}

function saveProfile() {

  const name =
    document
      .getElementById("username")
      .value
      .trim();

  if (!name) return;

  document
    .getElementById("profile-name")
    .textContent = name;

  localStorage.setItem(
    "pokeworld-name",
    name
  );

}

const savedName =
  localStorage.getItem("pokeworld-name");

if (savedName) {

  document
    .getElementById("profile-name")
    .textContent = savedName;

}

loadPokemon();
