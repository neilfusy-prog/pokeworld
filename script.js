let pokemon = [];
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

const namesFR = [
"Bulbizarre","Herbizarre","Florizarre","Salamèche","Reptincel",
"Dracaufeu","Carapuce","Carabaffe","Tortank","Chenipan",
"Chrysacier","Papilusion","Aspicot","Coconfort","Dardargnan",
"Roucool","Roucoups","Roucarnage","Rattata","Rattatac",
"Piafabec","Rapasdepic","Abo","Arbok","Pikachu",
"Raichu","Sabelette","Sablaireau","Nidoran♀","Nidorina",
"Nidoqueen","Nidoran♂","Nidorino","Nidoking","Mélofée",
"Mélodelfe","Goupix","Feunard","Rondoudou","Grodoudou",
"Nosferapti","Nosferalto","Mystherbe","Ortide","Rafflesia",
"Paras","Parasect","Mimitoss","Aéromite","Taupiqueur",
"Triopikeur","Miaouss","Persian","Psykokwak","Akwakwak",
"Férosinge","Colossinge","Caninos","Arcanin","Ptitard",
"Têtarte","Tartard","Abra","Kadabra","Alakazam",
"Machoc","Machopeur","Mackogneur","Chétiflor","Boustiflor",
"Empiflor","Tentacool","Tentacruel","Racaillou","Gravalanch",
"Grolem","Ponyta","Galopa","Ramoloss","Flagadoss",
"Magnéti","Magnéton","Canarticho","Doduo","Dodrio",
"Otaria","Lamantine","Tadmorv","Grotadmorv","Kokiyas",
"Crustabri","Fantominus","Spectrum","Ectoplasma","Onix",
"Soporifik","Hypnomade","Krabby","Krabboss","Voltorbe",
"Électrode","Noeunoeuf","Noadkoko","Osselait","Ossatueur",
"Kicklee","Tygnon","Excelangue","Smogo","Smogogo",
"Rhinocorne","Rhinoféros","Leveinard","Tangela","Kangourex",
"Horsea","Hypocéan","Poissirène","Poissoroy","Stari",
"Staross","M. Mime","Insécateur","Lippoutou","Élektek",
"Magmar","Scarabrute","Tauros","Magicarpe","Léviator",
"Lokhlass","Métamorph","Évoli","Aquali","Voltali",
"Pyroli","Porygon","Amonita","Amonistar","Kabuto",
"Kabutops","Ptéra","Ronflex","Artikodin","Électhor",
"Sulfura","Minidraco","Draco","Dracolosse","Mewtwo","Mew"
];

async function loadPokemon() {

const container = document.getElementById("pokemon-list");

container.innerHTML = "<p>⏳ Chargement des 151 Pokémon...</p>";

try {

```
const response = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=151"
);

const data = await response.json();

const details = await Promise.all(
  data.results.map(async pokemonData => {

    const response = await fetch(pokemonData.url);

    return await response.json();

  })
);

pokemon = details.map(p => ({

  id: p.id,

  name: namesFR[p.id - 1],

  types: p.types.map(
    t => typeFR[t.type.name] || t.type.name
  ),

  image:
    p.sprites.other["official-artwork"].front_default

}));

document.getElementById("loading").style.display = "none";

displayPokemon(pokemon);
```

} catch (error) {

```
container.innerHTML =
  "<p>❌ Impossible de charger les Pokémon. Recharge la page.</p>";

console.error(error);
```

}
}

function displayPokemon(list) {

const container =
document.getElementById("pokemon-list");

container.innerHTML = "";

list.forEach(p => {

```
const number =
  String(p.id).padStart(3, "0");

container.innerHTML += `

  <article class="pokemon">

    <img
      src="${p.image}"
      alt="${p.name}"
      loading="lazy"
    >

    <div class="pokemon-number">
      N° ${number}
    </div>

    <h3>${p.name}</h3>

    <span class="pokemon-type">
      ${p.types.join(" • ")}
    </span>

  </article>

`;
```

});

}

function searchPokemon() {

const search =
document
.getElementById("search")
.value
.toLowerCase()
.trim();

const results = pokemon.filter(p =>

```
p.name.toLowerCase().includes(search) ||

String(p.id).includes(search)
```

);

displayPokemon(results);

}

function showPage(page) {

document
.querySelectorAll(".page")
.forEach(section => {

```
  section.classList.add("hidden");

});
```

document
.getElementById(page)
.classList.remove("hidden");

}

function answer(choice) {

const result =
document.getElementById("quiz-result");

if (choice === "Pikachu") {

```
xp += 20;

result.textContent =
  "✅ Bonne réponse ! +20 XP ⚡";
```

} else {

```
result.textContent =
  "❌ Pas cette fois !";
```

}

document.getElementById("xp").textContent = xp;

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
