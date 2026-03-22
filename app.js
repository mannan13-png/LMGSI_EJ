const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
    const pokemonName = document.getElementById("input").value;

    const res = await fetch("/convertPokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: pokemonName })
    });

    const json = await res.json();

    if (json.error) {
        alert(json.error);
        return;
    }

    document.getElementById("output").value = json.xml;


    const oldImg = document.querySelector("img");
    if (oldImg) oldImg.remove();

    const img = document.createElement("img"); [cite: 108]
    img.src = json.original.sprites.front_default; 
    document.body.appendChild(img); [cite: 107]


    const habilidades = json.original.abilities.map(a => a.ability.name).join(", ");
    console.log("Habilitats:", habilidades);
    
    alert("Habilitats de " + pokemonName + ": " + habilidades);
});