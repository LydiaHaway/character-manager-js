const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

//______________________________________________________________________

const URL = `https://character-database.becode.xyz/characters`;

axios
  .get(URL)
  .then((response) => {
    const main = document.querySelector("main");

    const container = document.createElement("section");
    container.setAttribute("class", "container_characters");
    main.appendChild(container);

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
    displayCharacters(4);
  })
  .catch((error) => {
    console.log(error);
  });
