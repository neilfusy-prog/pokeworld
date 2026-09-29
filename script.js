let pokemon = [];

const pokemonList = document.getElementById("pokemon-list");
const pokemonDetails = document.getElementById("pokemon-details");
const search = document.getElementById("search");
const backButton = document.getElementById("back-button");

async function loadPokemon() {

    try {

        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const data = await response.json();

        pokemon = data.results;

        displayPokemon(pokemon);

    } catch (error) {

        pokemonList.innerHTML =
            "<p>Impossible de charger les Pokémon.</p>";

        console.error(error);
    }
}


function displayPokemon(list) {

    pokemonList.innerHTML = "";

    list.forEach((poke, index) => {

        const card = document.createElement("div");

        card.classList.add("pokemon");

        const number = String(index + 1).padStart(3, "0");

        card.innerHTML = `
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png"
                alt="${poke.name}"
            >

            <div class="pokemon-number">#${number}</div>

            <h3>${poke.name}</h3>
        `;

        card.addEventListener("click", () => {
            showPokemonDetails(index + 1);
        });

        pokemonList.appendChild(card);
    });
}


async function showPokemonDetails(id) {

    try {

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const data = await response.json();

        document.getElementById("pokemon-name").textContent =
            data.name;

        document.getElementById("pokemon-id").textContent =
            `#${String(data.id).padStart(3, "0")}`;

        document.getElementById("pokemon-image").src =
            data.sprites.other["official-artwork"].front_default;

        document.getElementById("pokemon-image").alt =
            data.name;

        document.getElementById("pokemon-types").textContent =
            "Type : " +
            data.types
                .map(type => type.type.name)
                .join(" / ");

        document.getElementById("pokemon-height").textContent =
            `${data.height / 10} m`;

        document.getElementById("pokemon-weight").textContent =
            `${data.weight / 10} kg`;

        displayStats(data.stats);

        pokemonList.classList.add("hidden");
        pokemonDetails.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        alert("Impossible de charger les informations du Pokémon.");
    }
}


function displayStats(stats) {

    const statsContainer =
        document.getElementById("pokemon-stats");

    statsContainer.innerHTML = "";

    const statNames = {
        hp: "PV",
        attack: "Attaque",
        defense: "Défense",
        "special-attack": "Attaque Spé.",
        "special-defense": "Défense Spé.",
        speed: "Vitesse"
    };

    stats.forEach(stat => {

        const value = stat.base_stat;

        const percentage = Math.min(
            (value / 255) * 100,
            100
        );

        const statElement = document.createElement("div");

        statElement.classList.add("stat");

        statElement.innerHTML = `
            <div class="stat-name">
                <span>${statNames[stat.stat.name]}</span>
                <strong>${value}</strong>
            </div>

            <div class="stat-bar">
                <div
                    class="stat-fill"
                    style="width: ${percentage}%"
                ></div>
            </div>
        `;

        statsContainer.appendChild(statElement);
    });
}


search.addEventListener("input", () => {

    const searchText =
        search.value.toLowerCase().trim();

    const filteredPokemon =
        pokemon.filter(poke =>
            poke.name.includes(searchText)
        );

    displayPokemon(filteredPokemon);
});


backButton.addEventListener("click", () => {

    pokemonDetails.classList.add("hidden");

    pokemonList.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


loadPokemon();
