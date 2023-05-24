//  -------------------------------------------
//  |  declaration of constants and variables |
//  -------------------------------------------

//url to access the api database
let url = "http://localhost:5678/api/works";
// url for the category part
let urlCategories = "http://localhost:5678/api/categories";

const gallery = document.querySelector(".gallery");
//const admin navigation bar
const adminNav = document.getElementById("admin-nav");
// "edit" buttons for the admin part
const modalCallButtons = document.querySelectorAll(".modifier")
//login or logout button depending on the token
const loginLogout = document.getElementById("login")

/*tableau ['entitled','suffix for button ID' (btn-" "), 'category name']
tableau pour fonction "create button sans passer par l'API"
Faute d'orthographe dans un nom de catégorie Hotel => Hôtel, désactivé pour l'instant
let arrayCreateButton = [["Tous", "Tous", "Tous"],["Objets", "Objets", "Objets"], ["Appartements", "Appartements", "Appartements"], ["Hôtels & restaurants", "Hotels", "Hotels & restaurants"]];*/

// --------------------------------------
// | Check the connection with the API  |
// --------------------------------------

async function getWorks(url) {
  const response = await fetch(url);
  if (response.ok) return await response.json();
  else {
    return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);
  }
}

//  ---------------------------------------------------------
//  |   data recovery through the api url for categories    |
//  ---------------------------------------------------------

async function getCategories(urlCategories) {
  const response = await fetch(urlCategories);
  if (response.ok) return await response.json();
}

//  ---------------------------------------------
//  | Create buttons dynamically whith the API  |
//  ---------------------------------------------

async function createButtons() {
  let category = await getCategories(urlCategories);
 
  //creation of buttons for each category

  for (let i = 0; i < category.length; i++) {
    //variable pour la création d'un bouton
    let newFilterButton = document.createElement("button");
    //attribut type du bouton
    newFilterButton.type = "button";
    // attibut nom du bouton
    newFilterButton.name = category[i].name;
    // Texte entre les balises button
    newFilterButton.innerHTML = category[i].name;
                      console.log("inner", category[i].name);
    newFilterButton.id = "btn-" + category[i].name.split(" ")[0];
    // id du bouton "btn-"" + premier mot récupéré
    ////console.log("newFilterButton.id => ", newFilterButton.id)
    // class ajouté au bouton
    newFilterButton.className = "btn-filter";
    //variable portfolio
    let portfolio = document.getElementById("filterButton");
    // ajout de "newFilterButton" à la div "#portfolio" 
    portfolio.appendChild(newFilterButton);
  }
}
createButtons();
//  -------------------------------
//  |   Create Button with Array  |
//  -------------------------------

//fonction avec tableau perso pour corriger la faute sur Hôtels (ô)
//désactivé pour l'instant
/*function createButton() {
    for (item of arrayCreateButton) {
        let newButton = document.createElement("button");
        console.log("newbutton", newButton);
        newButton.type = 'button';
        newButton.name = [item[2]]
        newButton.innerHTML = [item[0]];
        newButton.id = 'btn-' + [item[1]];
        console.log("id",newButton)
        newButton.className = 'btn-filter';
        let portfolio = document.getElementById("filterButton");
        console.log("id button", newButton.id)
        console.log("portfolio", portfolio);
        portfolio.appendChild(newButton);
    }
}
createButton();*/

//  --------------------------------------------
//  |    Creation of the gallery & the filter  |
//  --------------------------------------------

async function buildWorks() {
  // array constant
  let works = await getWorks(url);
  
// -------------------------
// | job creation function |
// -------------------------

  function createWork() {
    for (const project of works) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      img.src = project.imageUrl;
      figure.appendChild(img);
      let figcaption = document.createElement("figcaption");
      figcaption.innerHTML = project.title;
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  }
  createWork();
//  ----------------------------
//  | filter creation function |
//  ----------------------------

  async function createFilter() {
    let filterChoice = "";
    const btnFilter = document.querySelectorAll(".btn-filter");
    btnFilter.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (e.target.name === "Tous") {
                              console.log("target-e", e.target);
          filterChoice = works;
                              console.log("filterChoice", filterChoice);
          applyFilter(filterChoice);
        } else {
          filterChoice = works.filter(
            (obj) => obj.category.name === e.target.name
          );
                              console.log("target-e", e.target);
                              console.log("filterChoice", filterChoice);
          applyFilter(filterChoice);
        }
      });
    });
  }
  createFilter();
//}

//buildWorks();

// ------------------
// |  Apply filter  |
// ------------------

function applyFilter(filterChoice) {
  gallery.innerHTML = "";
  for (const filter of filterChoice) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = filter.imageUrl;
    figure.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = filter.title;
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

//  ---------------------------------------------
//  | setting up element according to the token |
//  ---------------------------------------------

// storing the token in a variable
let controlToken = sessionStorage.getItem('token')
                                        console.log("token", controlToken)
// Modifies elements when switching to "edit mode"
controlToken === null ? (adminNav.style.display = "none") : (adminNav.style.display = "flex");
controlToken === null ? document.getElementById("login").innerHTML = "login" : document.getElementById("login").innerHTML = "logout"
controlToken === null ? (header.style.marginTop = "50px") : (header.style.marginTop = "38px");
modalCallButtons.forEach(function (item) {
  controlToken === null ? item.style.display = "none" : item.style.display = "flex";
})

//  ---------------------------------------------------------
//  | Management of the action of the "login/logout" button |
//  ---------------------------------------------------------

// add event listening on the  "login/logout" button
loginLogout.addEventListener("click", function () {logInLogOut()})

// redirect function to a page according to the token
function logInLogOut() {
  if (controlToken === null) {
    window.location.replace("./login.html");
  } else {
    sessionStorage.clear();
    window.location.replace("./index.html");
  }
}

//  -----------------------
//  | parts of the modals |
//  -----------------------


// page refresh
const reload=()=>{
  window.location.reload();
}

//  ------------------------
//  | constantes for modal |
//  ------------------------

// gallery modal

const modalContainer = document.querySelector(".modal-container");
const modalGallery = document.querySelector(".modal-galerie")
const modalTrigger = document.querySelectorAll(".modal-trigger");
const buttonAddPhotos = document.getElementById("button-add-modal");
const galleryOfModal = document.querySelector(".gallery-modal");

//modal add photo

const modal2Container = document.querySelector(".modal2-container")
const modalTrigger2 = document.querySelectorAll(".modal-trigger2");
const addPhotos = document.querySelector(".add-photo");
const buttonValidPhoto = document.getElementById("button-add-photo")

//  ---------------------
//  | modal 1 - gallery |
//  ---------------------
//  |  Create gallery   |
//  ---------------------

  for (const project of works) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = project.imageUrl;
    figure.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = "éditer";
    figure.appendChild(figcaption);
    let spanGallery = document.createElement("i");
    spanGallery.className = "fa-solid fa-trash-can";
    spanGallery.innerHTML = "";
    figure.appendChild(spanGallery);
    galleryOfModal.appendChild(figure);
  }   
//display modal
modalContainer.className === "modal-container active" ? (modalgallery.style.display = "flex") : (modalGallery.style.display = "none");
//list of  elements listened to under the class "trigger"
modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal));
// change the name of the class using toggle                                     
function toggleModal() {
  modalContainer.classList.toggle("active");
// makes the modal appears or disappear depending on the class
  modalContainer.className === "modal-container active" ? modalGallery.style.display = "flex" : modalGallery.style.display = "none"; 
}

//  ---------------------
//  | modal - add photo |
//  ---------------------

//for close modal
modalTrigger2.forEach(trigger =>trigger.addEventListener("click", toggleModal2));

// conditions of appearance of the modal
function toggleModal2(){
  modal2Container.classList.toggle("active");
  modalContainer.className === "modal-container active" ? modalGallery.style.display = "flex" : modalGallery.style.display = "none";   
  modal2Container.className === "modal2-container active" ? addPhotos.style.display = "flex" : addPhotos.style.display = "none";   
  modal2Container.className === "modal2-container active" ? modalGallery.style.display = "none" : modalGallery.style.display = "flex";                               
}

//toogle funtion to manage the appearance of the modal
buttonAddPhotos.addEventListener("click", function() {
  toggleModal();
  toggleModal2();
})
//  ------------------------------------
//  | modal - add photo Arrow previous |
//  ------------------------------------

const previousArrow = document.getElementById("previous-arrow")
console.log("previous",previousArrow)
previousArrow.addEventListener("click", function(){
  console.log("clickou")
  toggleModal2();
  modalContainer.classList.toggle("active");
})
//  ------------------------------
//  | add photo  input file part |
//  ------------------------------

let  image;
const inputFile = document.getElementById("my-file")
const recAddPhoto = document.querySelector(".rectangle-add-photo")


inputFile.addEventListener("click", function (e) {
     inputFile.addEventListener("change",  function (e) {
      const typeImg = inputFile.value.split('.').reverse()[0]
      if (typeImg === "png" || typeImg === "PNG" || typeImg === "jpg" || typeImg ==="jpeg") {
                          console.log("img Ok")
                          buttonValidPhoto.style.background= "#1D6154"

      } else {
                          console.log("img not ok")
                          
        return
      }
      //e.preventDefault();
      image = e.target.files[0].name
                          console.log("type =>", typeImg)
                          console.log("fichier =>", image)
    }
    );
});
}

buildWorks();