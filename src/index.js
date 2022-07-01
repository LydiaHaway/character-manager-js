const axios = require("axios");

import "./scss/style.scss";

//_____________________________________________________________________

const main = document.querySelector("main");

const container = document.querySelector(".container_characters");

let inputSearch = document.querySelector("#input_search");

const buttonSearch = document.querySelector(".search");

//____________________________________________________________________________________________________________________________________________________________________________

let displayCharacter = () => {
  axios
    .get(`https://character-database.becode.xyz/characters`)
    .then((response) =>
      response.data.forEach((item) => {
        const containerCharacter = document.createElement("div");
        containerCharacter.setAttribute("class", "container_character");
        container.appendChild(containerCharacter);

        const divImg = document.createElement("div");
        divImg.setAttribute("class", "divImg");
        containerCharacter.appendChild(divImg);

        const image = document.createElement("img");
        image.src = "data:image/png;base64, " + item.image;
        image.alt = "illustration";
        divImg.appendChild(image);

        const name = document.createElement("h2");
        name.textContent = item.name;
        containerCharacter.appendChild(name);

        const shortDescriprt = document.createElement("p");
        shortDescriprt.textContent = item.shortDescription;
        containerCharacter.appendChild(shortDescriprt);

        const linkProfile = document.createElement("button");
        linkProfile.setAttribute("class", "link_profile");
        linkProfile.textContent = "profile";
        containerCharacter.appendChild(linkProfile);
      })
    )

    //______________________________________________________________________________

    .then(function () {
      const btnForSeeMore = document.querySelectorAll(".link_profile");
      btnForSeeMore.forEach((el) => {
        el.addEventListener("click", () => {
          let fullprofileName = el.parentNode.children[1].textContent;

          container.remove(containerCharacter);
          buttonAdd.style.display = "none";

          buttonReturn.style.visibility = "visible";

          //_________________________________________________________________________

          let displayfullprofile = () => {
            axios
              .get(
                `https://character-database.becode.xyz/characters?name=${fullprofileName}`
              )
              .then((response) => {
                const containerFullProfile =
                  document.querySelector(".full_profile");

                containerFullProfile.style.display = "block";

                const divImgTitle = document.createElement("div");
                divImgTitle.setAttribute("class", "Container_img_title");
                containerFullProfile.appendChild(divImgTitle);

                const image = document.createElement("img");
                image.src = "data:image/png;base64, " + response.data[0].image;
                image.alt = "illustration";
                divImgTitle.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = response.data[0].name;
                divImgTitle.appendChild(name);

                const shortDescriprt = document.createElement("p");
                shortDescriprt.setAttribute("class", "short_description");
                shortDescriprt.textContent = response.data[0].shortDescription;
                containerFullProfile.appendChild(shortDescriprt);

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

                //_____________________________________________________________

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
                  let file = document.querySelector("#file-selector_update")[
                    "files"
                  ][0];
                  let reader = new FileReader();
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
                  let text = "Are you sure ?";
                  if (confirm(text) == true) {
                    axios.put(
                      `https://character-database.becode.xyz/characters/${getID}`,
                      {
                        name: inputName.value,
                        shortDescription: inputSD.value,
                        description: inputDescr.value,
                        image: base64String,
                      }
                    );
                  }
                });

                buttonDelete.addEventListener("click", () => {
                  let text = "Do you really want to delete this character ?";
                  if (confirm(text) == true) {
                    axios.delete(
                      `https://character-database.becode.xyz/characters/${getID}`
                    );
                    containerFullProfile.style.display = "none";
                  }
                });
              });
          };

          displayfullprofile();
        });
      });
    });
};

displayCharacter();

//____________________________________________________________________________________________________________________________________________________________________________

let displayCharactersSearch = () => {
  axios
    .get(
      `https://character-database.becode.xyz/characters?name=${inputSearch.value}`
    )
    .then((response) => {
      const containerCharacterSearch = document.createElement("section");
      containerCharacterSearch.setAttribute("class", "container_Search");
      main.appendChild(containerCharacterSearch);

      const divImg = document.createElement("div");
      divImg.setAttribute("class", "divImg");
      containerCharacterSearch.appendChild(divImg);

      const image = document.createElement("img");
      image.src = "data:image/png;base64, " + response.data[0].image;
      image.alt = "illustration";
      divImg.appendChild(image);

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
    })

    //____________________________________________________________________________________

    .then(function () {
      const btnForSeeMore = document.querySelectorAll(".link_profile");
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

                const divImgTitle = document.createElement("div");
                divImgTitle.setAttribute("class", "Container_img_title");
                containerFullProfile.appendChild(divImgTitle);

                const image = document.createElement("img");
                image.src = "data:image/png;base64, " + response.data[0].image;
                image.alt = "illustration";
                divImgTitle.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = response.data[0].name;
                divImgTitle.appendChild(name);

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

                //__________________________________________________________________________

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
                });

                const buttonSubmitUpdate =
                  document.querySelector(".submit_Update");

                const file = document.querySelector("#file-selector_update");

                let base64String = "";
                base64String = response.data[0].image;
                function Uploaded() {
                  let file = document.querySelector("#file-selector_update")[
                    "files"
                  ][0];
                  let reader = new FileReader();
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
                  let text = "Are you sure ?";
                  if (confirm(text) == true) {
                    axios.put(
                      `https://character-database.becode.xyz/characters/${getID}`,
                      {
                        name: inputName.value,
                        shortDescription: inputSD.value,
                        description: inputDescr.value,
                        image: base64String,
                      }
                    );
                  }
                });

                buttonDelete.addEventListener("click", () => {
                  let text = "Do you really want to delete this character ?";
                  if (confirm(text) == true) {
                    axios.delete(
                      `https://character-database.becode.xyz/characters/${getID}`
                    );
                    containerFullProfile.style.display = "none";
                  }
                });
              });
          };

          displayfullprofile();
        });
      });
    });
};

//______________________________________________________________________________________________________________________________________________________

const containerCharacter = document.querySelector(".container_character");

const buttonReturn = document.querySelector(".return");
const buttonAdd = document.querySelector(".add_character_button");
const buttonSubmit = document.querySelector(".submit");

const form = document.querySelector(".add_character");

const inputName = document.querySelector("#nameCharacter");
const inputSD = document.querySelector("#shortDescription");
const inputDescr = document.querySelector("#description");

//_____________________________________________________________________________

const file = document.querySelector("input[type=file]");

let base64String = "";
function Uploaded() {
  let file = document.querySelector("input[type=file]")["files"][0];
  let reader = new FileReader();
  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
  };
  reader.readAsDataURL(file);
}

file.addEventListener("change", () => {
  Uploaded();
});

//_________________________________________________________________________________________________________________

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
  let text = "Are you sure it's complete ?";
  if (confirm(text) == true) {
    addCharacterForm();
    inputName.value = "";
    inputSD.value = "";
    inputDescr.value = "";
  }
});
