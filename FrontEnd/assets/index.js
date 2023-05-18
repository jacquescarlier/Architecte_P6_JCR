//  -------------------------------------------
//  |  declaration of constants and variables |
//  -------------------------------------------

//url to access the api database
let url = "http://localhost:5678/api/works";
// url for the category part
let urlCategories = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");
//const admin navigation bar
const adminNav = document.getElementById("admin-nav");
// "edit" buttons for the admin part
const modalCallButtons = document.querySelectorAll(".modifier")
//login or logout button depending on the token
const loginLogout = document.getElementById("login")
console.log("log", loginLogout)
//tableau ['entitled','suffix for button ID' (btn-" "), 'category name']
// tableau pour fonction "create button sans passer par l'API"
//Faute d'orthographe dans un nom de catégorie Hotel => Hôtel
//let arrayCreateButton = [
/*  ["Tous", "Tous", "Tous"],
  ["Objets", "Objets", "Objets"],
  ["Appartements", "Appartements", "Appartements"],
  ["Hôtels & restaurants", "Hotels", "Hotels & restaurants"],
];*/

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

  // creation of the all category button

  let newFilterButton = document.createElement("button");
  newFilterButton.type = "button";
  newFilterButton.name = "Tous";
  newFilterButton.innerHTML = "Tous";
  newFilterButton.id = "btn-" + "Tous";
  newFilterButton.className = "btn-filter";
  let portfolio = document.getElementById("filterButton");
  portfolio.appendChild(newFilterButton);

  //creation of buttons for each category

  for (let i = 0; i < category.length; i++) {
    buttonId = i + 1;
    let newFilterButton = document.createElement("button");
    newFilterButton.type = "button";
    newFilterButton.name = category[i].name;
    newFilterButton.innerHTML = category[i].name;
    console.log("inner", category[i].name);
    newFilterButton.id = "btn-" + category[i].name.split(" ")[0];
    newFilterButton.className = "btn-filter";
    let portfolio = document.getElementById("filterButton");
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
  console.log("works", works);

  // job creation function

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

  // filter creation function
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
}

buildWorks();

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

let controlToken = sessionStorage.getItem('token')
console.log("token", controlToken)
// Make the admin navigation bar and "edit" buttons visible
controlToken === null ? (adminNav.style["display"] = "none") : (adminNav.style["display"] = "flex");
//Change the name of the button according to the token
controlToken === null ? document.getElementById("login").innerHTML = "login" : document.getElementById("login").innerHTML = "logout"
//change header margin-top
controlToken === null ? (header.style.marginTop = "50px"):(header.style.marginTop = "38px");
//make the "edit" buttons appear or disappear
modalCallButtons.forEach(function (item) {
  controlToken === null ? item.style["display"] = "none" : item.style["display"] = "flex";
})

//  ---------------------------------------------------------
//  | Management of the action of the "login/logout" button |
//  ---------------------------------------------------------

// add event listening on the  "login/logout" button
loginLogout.addEventListener("click", function () {
  logInLogOut()
})

// redirect function to a page according to the token
function logInLogOut() {
  if (controlToken === null) {
    window.location.replace("./login.html");

  } else {
    console.log("token", controlToken)
    sessionStorage.clear();
    window.location.replace("./index.html");
  }
}

// ---------------------
// parts of the modals |
// --------------------
const modalContainer = document.querySelector(".modal-container");

const modalTrigger =document.querySelectorAll(".modal-trigger");

modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
  modalContainer.classList.toggle("active")
}





