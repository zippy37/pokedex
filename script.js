const pokemonCount = 1025;
var pokedex = {}; // {1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass, poison"], "desc" : "...."}}
pokedexRegex = /[\f\n]+/igm;

window.onload = async () => {
    // getPokemon(1025);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = `${i.toString()}. ${pokedex[i]["name"].toUpperCase()}`;
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon)
        document.getElementById("pokemon-list").append(pokemon);
    }
    
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"].replace(pokedexRegex, " ");  
    // console.log(pokedex);
}

const getPokemon = async num => {
    let url = `https://pokeapi.co/api/v2/pokemon/${num.toString()}`;
    
    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);
    
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);

    if (pokemonDesc["flavor_text_entries"].length > 1) {
        pokemonDesc = pokemonDesc["flavor_text_entries"][1]["flavor_text"]
    }
    
    else {
        pokemonDesc = pokemonDesc["flavor_text_entries"][0]["flavor_text"]
    }
    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc}
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    // clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // background color, font
        typesDiv.append(type);
    }
    // update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"].replace(pokedexRegex, " ");

}