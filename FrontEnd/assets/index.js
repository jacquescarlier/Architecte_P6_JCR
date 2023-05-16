//   ------------------------------------------
//  |  declaration of constants and variables |
//  ------------------------------------------
let url = 'http://localhost:5678/api/works';
let urlCategories = 'http://localhost:5678/api/categories';
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");

//tableau ['entitled','suffix for button ID', 'category name]
let arrayCreateButton = [['Tous', 'all', 'All'], ['Objets', 'object', 'Objets'], ['Appartements', 'appartment', 'Appartements'], ['Hôtels & restaurants', 'hotel', 'Hotels & restaurants']];

//   --------------------
//  |   Create Button   |
//  --------------------

function createButton() {
    for (item of arrayCreateButton) {
        let newButton = document.createElement("button");
        console.log("bb", newButton);
        //newButton.type = 'button';
        newButton.name = [item[2]]
        newButton.innerHTML = [item[0]];
        newButton.id = 'btn-' + [item[1]];
        newButton.className = 'btn-filter';
        let portfolio = document.getElementById("filterButton");
        console.log("portfolio", portfolio);
        portfolio.appendChild(newButton);
    }
}
createButton();

//  -------------------------------------
// | Check the connection with the API  |
// -------------------------------------

async function getWorks(url) {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    else {
        return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);
    }
}

//   -------------------------------------------
//  |    Creation of the gallery & the filter  |
//  -------------------------------------------

async function buildWorks() {
    // array constant
    let works = await getWorks(url);
    console.log("works", works)
    
    //job creation function
    function working() {
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
    working()
   
    //filter creation function
    async function createFilter() {
        let filterChoice = '';
        const btnFilter = document.querySelectorAll(".btn-filter");
        console.log("rere", btnFilter)
        btnFilter.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                if (e.target.name === "All") {
                    console.log("target-e", e.target)
                    filterChoice = works;
                    console.log("filterChoice", filterChoice)
                    applyFilter(filterChoice);
                } else {
                    filterChoice = works.filter(obj => obj.category.name === e.target.name)
                    console.log("target-e", e.target)
                    console.log("filterChoice", filterChoice);
                    applyFilter(filterChoice);
                }
            })
        })
    }
    createFilter()
}

buildWorks();
//  -----------------
// |  Apply filter  |
// -----------------
function applyFilter(filterChoice) {

    gallery.innerHTML = '';
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
//--------------   
// Creation of filter according to the clicked button
//--------------
/*fetch(url).then(response => response.json())
        .then(data => {   
            let filterChoice = '';
            const btnFilter = document.querySelectorAll(".btn-filter");
            btnFilter.forEach (function(btn){
            btn.addEventListener("click", function(e){
            if (e.target.name === "All") {
                filterChoice = data;                       
                applyFilter(filterChoice);
            }else {
                filterChoice = data.filter(obj => obj.category.name === e.target.name)       
                applyFilter(filterChoice);
            }
            })
            })
})*/

//controle si logger 
//affichage de la barre de navigation admin
/* const adminNav = getElementById("admin-nav");
                adminNav.style["display"]= "flex";*/
//---------------------
//parts of the modals |
//--------------------
let modal = null
const openModal = function (e) {
    console.log("e", e)
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    console.log("target href", target)
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', close)
}
document.querySelectorAll('.modifier').forEach(a => {
    a.addEventListener('click', openModal)
    console.log("a", a)
})
