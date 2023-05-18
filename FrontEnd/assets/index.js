//  -------------------------------------------
//  |  declaration of constants and variables |
//  -------------------------------------------

//url de la base  de données de l'API
let url = "http://localhost:5678/api/works";
// url ne donnant accès qu'à la partie catégorie
let urlCategories = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");
//const barre navigation admin
const adminNav = document.getElementById("admin-nav");
// boutons modifier dans partie admin
const modalCallButtons = document.querySelectorAll(".modifier")
//bouton login ou logout en fonction de la connexion
const loginLogout = document.getElementById("login")

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
                                                 console.log("i", i);
                                                 console.log("newButton", newFilterButton);
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

//Login admin

let controlToken = sessionStorage.getItem('token')
console.log("token", controlToken)

controlToken===null? (adminNav.style["display"]= "none"): (adminNav.style["display"]= "flex");
controlToken ===null? document.getElementById("login").innerHTML = "login": document.getElementById("login").innerHTML ="logout"
 


modalCallButtons.forEach(function(item){
  controlToken ===null? item.style["display"]= "none":  item.style["display"]= "flex";
})

//logout admin
loginLogout.addEventListener("click",function(){
  console.log("appuie login", loginLogout)
  logInLogOut()
})
 function logInLogOut() {
  if (controlToken ===null){

  }else{

  }
 }
//controle si logger
//affichage de la barre de navigation admin
/* const adminNav = getElementById("admin-nav");
                adminNav.style["display"]= "flex";*/
// réduire margin-top header à 38px(50px)
// faire apparaître les boutons "modifier" x3
// changer login per logout voir toggle
// ---------------------
// parts of the modals |
// --------------------
let modal = null;
const openModal = function (e) {
  console.log("e", e);
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
                                            console.log("target href", target);
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", close);
};
document.querySelectorAll(".modifier").forEach((a) => {
  a.addEventListener("click", openModal);
  console.log("a", a);
});
