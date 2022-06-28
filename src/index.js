const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

const main = document.querySelector("main");

const container = document.querySelector(".container_characters");

//______________________________________________________________________

const displayCharacters = async () => {
  try {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters`
    );

    let displayCharacter = (e) => {
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

      const linkProfile = document.createElement("a");
      linkProfile.textContent = "profile";
      containerCharacter.appendChild(linkProfile);
      linkProfile.href = "exemple.com";
    };

    for (let i = 0; i > 99; i++) {
      displayCharacter(i);
    }

    displayCharacter(0);
    displayCharacter(1);
    displayCharacter(2);
    displayCharacter(3);
    displayCharacter(4);
    displayCharacter(5);
    displayCharacter(6);
  } catch (err) {
    console.error(err);
  }
};

displayCharacters();
