const express = require("express");
const convert = require("xml-js"); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.text({ type: "application/xml" })); 
app.use(express.static("public"));


app.post("/json-to-xml", (req, res) => {
    const json = req.body; 
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const result = convert.json2xml(json, options);
    
    res.set("Content-Type", "text/xml");
    res.send(result);
});

app.post("/xml-to-json", (req, res) => {
    const xml = req.body;     
    const result = convert.xml2json(xml, { compact: true, spaces: 4 });
    
    res.json(JSON.parse(result));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Nueva ruta para buscar Pokémon y convertir a XML
app.post("/convertPokemon", async (req, res) => {
    try {
        const name = req.body.data; 
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        
        if (!response.ok) {
            return res.status(404).json({ error: "Pokémon no trobat" });
        }

        const pokemonJson = await response.json(); [cite: 71]

        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const resultXML = convert.json2xml(pokemonJson, options);

        res.json({ 
            xml: resultXML, 
            original: pokemonJson 
        });
    } catch (error) {
        res.status(500).json({ error: "Error al servidor" });
    }
});