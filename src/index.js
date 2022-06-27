const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

const main = document.querySelector("main");

const container = document.querySelector(".container_characters");

//______________________________________________________________________

const sendGetRequest = async () => {
  try {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters`
    );

    let displayCharacters = (e) => {
      const containerCharacter = document.createElement("div");
      containerCharacter.setAttribute("class", "container_character");
      container.appendChild(containerCharacter);

      const image = document.createElement("img");
      image.src = "data:image/png;base64, " + response.data[e].image;
      containerCharacter.appendChild(image);

      const name = document.createElement("h2");
      name.textContent = response.data[e].name;
      containerCharacter.appendChild(name);

      const shortDescriprt = document.createElement("p");
      shortDescriprt.textContent = response.data[e].shortDescription;
      containerCharacter.appendChild(shortDescriprt);
    };

    displayCharacters(0);
    displayCharacters(1);
    displayCharacters(2);
    displayCharacters(3);
  } catch (err) {
    console.error(err);
  }
};

sendGetRequest();
