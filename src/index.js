const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

const main = document.querySelector("main");

const container = document.querySelector(".container_characters");

let inputSearch = document.querySelector("#input_search");

const buttonSearch = document.querySelector(".search");

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

      const linkProfile = document.createElement("button");
      linkProfile.setAttribute("class", "link_profile");
      linkProfile.textContent = "profile";
      containerCharacter.appendChild(linkProfile);
    };

    displayCharacter(0);
    displayCharacter(1);
    displayCharacter(2);
    displayCharacter(3);
    displayCharacter(4);
    displayCharacter(5);
    displayCharacter(6);
    displayCharacter(7);
    displayCharacter(8);
    displayCharacter(9);
  } catch (err) {
    console.error(err);
  }
};

//_____________________________________________________________________________

displayCharacters();

//_____________________________________________________________________________

const displayCharactersSearch = async () => {
  try {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters?name=${inputSearch.value}`
    );

    const containerCharacterSearch = document.createElement("div");
    containerCharacterSearch.setAttribute("class", "container_Search");
    main.appendChild(containerCharacterSearch);

    const image = document.createElement("img");
    image.src = "data:image/png;base64, " + response.data[0].image;
    containerCharacterSearch.appendChild(image);

    const name = document.createElement("h2");
    name.textContent = response.data[0].name;
    containerCharacterSearch.appendChild(name);

    const shortDescriprt = document.createElement("p");
    shortDescriprt.textContent = response.data[0].shortDescription;
    containerCharacterSearch.appendChild(shortDescriprt);

    const linkProfile = document.createElement("button");
    linkProfile.textContent = "profile";
    linkProfile.setAttribute("class", "link_profile");
    containerCharacterSearch.appendChild(linkProfile);
  } catch (err) {
    console.error(err);
  }
};

//____________________________________________________________________________

const containerCharacter = document.querySelector(".container_character");

const buttonReturn = document.querySelector(".return");
const buttonAdd = document.querySelector(".add_character_button");
const buttonSubmit = document.querySelector(".submit");

const form = document.querySelector(".add_character");

const inputName = document.querySelector("#nameCharacter");
const inputSD = document.querySelector("#shortDescription");
const inputDescr = document.querySelector("#description");

//__________________________________________________________________________

const file = document.querySelector("input[type=file]");

var base64String = "";
function Uploaded() {
  var file = document.querySelector("input[type=file]")["files"][0];
  var reader = new FileReader();
  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
  };
  reader.readAsDataURL(file);
}

file.addEventListener("change", () => {
  Uploaded();
});

//___________________________________________________________________________

const addCharacterForm = async () => {
  try {
    const response = await axios.post(
      `https://character-database.becode.xyz/characters`,
      {
        name: inputName.value,
        shortDescription: inputSD.value,
        description: inputDescr.value,
        image: base64String,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

//___________________________________________________________________________

buttonSearch.addEventListener("click", () => {
  container.remove(containerCharacter);
  form.style.display = "none";
  displayCharactersSearch();
  buttonAdd.style.display = "none";
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    container.remove(containerCharacter);
    form.style.display = "none";
    displayCharactersSearch();
    buttonAdd.style.display = "none";
  }
});

buttonReturn.addEventListener("click", () => {
  location.reload();
});

buttonAdd.addEventListener("click", () => {
  container.remove(containerCharacter);
  form.style.display = "block";
  buttonAdd.style.display = "none";
});

buttonSubmit.addEventListener("click", () => {
  addCharacterForm();
});

//______________________________________________________________________________
