const express = require("express");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple

  res.json({ result });
});

//7.1 JsonToXML
app.post("/Json-to-xml", (req, res) => {



//7.2 XMLToJson

function XMLtoJson(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  let obj = {};
  const root = xml.documentElement;

  for (let node of root.children) {
    obj[node.nodeName] = node.textContent;
  }

  return { [root.nodeName]: obj };
}


