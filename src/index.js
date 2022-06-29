const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

const main = document.querySelector("main");

const container = document.querySelector(".container_characters");

let inputSearch = document.querySelector("#input_search");

const buttonSearch = document.querySelector(".search");

//______________________________________________________________________________________________________________________________________________

let displayCharacter = () => {
  axios
    .get(`https://character-database.becode.xyz/characters`)
    .then((response) =>
      response.data.forEach((item) => {
        const containerCharacter = document.createElement("div");
        containerCharacter.setAttribute("class", "container_character");
        container.appendChild(containerCharacter);

        const image = document.createElement("img");
        image.src = "data:image/png;base64, " + item.image;
        containerCharacter.appendChild(image);

        const name = document.createElement("h2");
        name.textContent = item.name;
        containerCharacter.appendChild(name);

        const shortDescriprt = document.createElement("p");
        shortDescriprt.textContent = item.shortDescription;
        containerCharacter.appendChild(shortDescriprt);

        const linkProfile = document.createElement("button");
        linkProfile.setAttribute("id", "link_profile");
        linkProfile.textContent = "profile";
        containerCharacter.appendChild(linkProfile);
      })
    )
    .then(function () {
      const btnForSeeMore = document.querySelectorAll("#link_profile");
      console.log(btnForSeeMore);
      btnForSeeMore.forEach((el) => {
        el.addEventListener("click", () => {
          let fullprofileName = el.parentNode.children[1].textContent;

          container.remove(containerCharacter);
          buttonAdd.style.display = "none";

          buttonReturn.style.visibility = "visible";

          //___________________________________

          let displayfullprofile = () => {
            axios
              .get(
                `https://character-database.becode.xyz/characters?name=${fullprofileName}`
              )
              .then((response) => {
                const containerFullProfile =
                  document.querySelector(".full_profile");

                containerFullProfile.style.display = "block";

                const image = document.createElement("img");
                image.src = "data:image/png;base64, " + response.data[0].image;
                containerFullProfile.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = response.data[0].name;
                containerFullProfile.appendChild(name);

                const descriprt = document.createElement("p");
                descriprt.textContent = response.data[0].description;
                containerFullProfile.appendChild(descriprt);

                const buttonUpdate = document.createElement("button");
                buttonUpdate.setAttribute("id", "update");
                buttonUpdate.textContent = "update";
                containerFullProfile.appendChild(buttonUpdate);

                const buttonDelete = document.createElement("button");
                buttonDelete.setAttribute("id", "delete");
                buttonDelete.textContent = "delete";
                containerFullProfile.appendChild(buttonDelete);

                const getID = response.data[0].id;
                const formUpdate = document.querySelector(".update_character");

                const inputName = document.querySelector(
                  "#nameCharacter_update"
                );
                const inputSD = document.querySelector(
                  "#shortDescription_update"
                );
                const inputDescr = document.querySelector(
                  "#description_update"
                );

                buttonUpdate.addEventListener("click", () => {
                  inputName.value = response.data[0].name;
                  inputSD.value = response.data[0].shortDescription;
                  inputDescr.value = response.data[0].description;

                  containerFullProfile.style.display = "none";
                  formUpdate.style.display = "block";
                  console.log(getID);
                });

                const buttonSubmitUpdate =
                  document.querySelector(".submit_Update");

                const file = document.querySelector("#file-selector_update");

                let base64String = "";
                base64String = response.data[0].image;
                function Uploaded() {
                  var file = document.querySelector("#file-selector_update")[
                    "files"
                  ][0];
                  var reader = new FileReader();
                  reader.onload = function () {
                    base64String = reader.result
                      .replace("data:", "")
                      .replace(/^.+,/, "");
                    imageBase64Stringsep = base64String;
                  };
                  reader.readAsDataURL(file);
                }

                file.addEventListener("change", () => {
                  Uploaded();
                });

                buttonSubmitUpdate.addEventListener("click", () => {
                  axios.put(
                    `https://character-database.becode.xyz/characters/${getID}`,
                    {
                      name: inputName.value,
                      shortDescription: inputSD.value,
                      description: inputDescr.value,
                      image: base64String,
                    }
                  );

                  alert("You've update the profile!");
                });

                buttonDelete.addEventListener("click", () => {
                  console.log(getID);

                  axios.delete(
                    `https://character-database.becode.xyz/characters/${getID}`
                  );

                  alert("You have delete the profile");

                  containerFullProfile.style.display = "none";
                });
              });
          };

          displayfullprofile();
        });
      });
    });
};

displayCharacter();

//_____________________________________________________________________________________________________________________________________________________

let displayCharactersSearch = () => {
  axios
    .get(
      `https://character-database.becode.xyz/characters?name=${inputSearch.value}`
    )
    .then((response) => {
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
      linkProfile.setAttribute("id", "link_profile");
      containerCharacterSearch.appendChild(linkProfile);
    })
    .then(function () {
      const btnForSeeMore = document.querySelectorAll("#link_profile");
      console.log(btnForSeeMore);
      btnForSeeMore.forEach((el) => {
        el.addEventListener("click", () => {
          let fullprofileName = el.parentNode.children[1].textContent;

          let divSearch = document.querySelector(".container_Search");

          divSearch.style.display = "none";

          buttonReturn.style.visibility = "visible";

          //______________________________________________________________________________

          let displayfullprofile = () => {
            axios
              .get(
                `https://character-database.becode.xyz/characters?name=${fullprofileName}`
              )
              .then((response) => {
                const containerFullProfile =
                  document.querySelector(".full_profile");

                containerFullProfile.style.display = "block";

                const image = document.createElement("img");
                image.src = "data:image/png;base64, " + response.data[0].image;
                containerFullProfile.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = response.data[0].name;
                containerFullProfile.appendChild(name);

                const descriprt = document.createElement("p");
                descriprt.textContent = response.data[0].description;
                containerFullProfile.appendChild(descriprt);

                const buttonUpdate = document.createElement("button");
                buttonUpdate.setAttribute("id", "update");
                buttonUpdate.textContent = "update";
                containerFullProfile.appendChild(buttonUpdate);

                const buttonDelete = document.createElement("button");
                buttonDelete.setAttribute("id", "delete");
                buttonDelete.textContent = "delete";
                containerFullProfile.appendChild(buttonDelete);

                const getID = response.data[0].id;
                const formUpdate = document.querySelector(".update_character");

                const inputName = document.querySelector(
                  "#nameCharacter_update"
                );
                const inputSD = document.querySelector(
                  "#shortDescription_update"
                );
                const inputDescr = document.querySelector(
                  "#description_update"
                );

                inputName.value = response.data[0].name;
                inputSD.value = response.data[0].shortDescription;
                inputDescr.value = response.data[0].description;

                buttonUpdate.addEventListener("click", () => {
                  containerFullProfile.style.display = "none";
                  formUpdate.style.display = "block";
                  console.log(getID);
                });

                const buttonSubmitUpdate =
                  document.querySelector(".submit_Update");

                const file = document.querySelector("#file-selector_update");

                let base64String = "";
                base64String = response.data[0].image;
                function Uploaded() {
                  var file = document.querySelector("#file-selector_update")[
                    "files"
                  ][0];
                  var reader = new FileReader();
                  reader.onload = function () {
                    base64String = reader.result
                      .replace("data:", "")
                      .replace(/^.+,/, "");
                    imageBase64Stringsep = base64String;
                  };
                  reader.readAsDataURL(file);
                }

                file.addEventListener("change", () => {
                  Uploaded();
                });

                buttonSubmitUpdate.addEventListener("click", () => {
                  axios.put(
                    `https://character-database.becode.xyz/characters/${getID}`,
                    {
                      name: inputName.value,
                      shortDescription: inputSD.value,
                      description: inputDescr.value,
                      image: base64String,
                    }
                  );

                  alert("You've update the profile!");
                });

                buttonDelete.addEventListener("click", () => {
                  console.log(getID);

                  axios.delete(
                    `https://character-database.becode.xyz/characters/${getID}`
                  );

                  alert("You have delete the profile");

                  containerFullProfile.style.display = "none";
                });
              });
          };

          displayfullprofile();

          //_________________________________________________________________
        });
      });
    });
};

//____________________________________________________________________________

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
  buttonReturn.style.visibility = "visible";
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    container.remove(containerCharacter);
    form.style.display = "none";
    displayCharactersSearch();
    buttonAdd.style.display = "none";
    buttonReturn.style.visibility = "visible";
  }
});

buttonReturn.addEventListener("click", () => {
  location.reload();
});

buttonAdd.addEventListener("click", () => {
  container.remove(containerCharacter);

  form.style.display = "block";
  buttonAdd.style.display = "none";
  buttonReturn.style.visibility = "visible";
});

buttonSubmit.addEventListener("click", () => {
  addCharacterForm();
  inputName.value = "";
  inputSD.value = "";
  inputDescr.value = "";
});

//______________________________________________________________________________
