//--------------------------------------------
// declaration of constants and variables
//--------------------------------------------
let url = 'http://localhost:5678/api/works';
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");   
//--------------------------------
// Apply filter
//--------------------------------
function applyFilter(filterChoice) {
    
    gallery.innerHTML = '';
    for (const filter of filterChoice)  {        
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
//-----------------------------------------------
// Check the connection with the API
//-----------------------------------------------
async function getWorks (url) {
    const response = await fetch(url);
    if (response.ok) return await response.json(); 
    else {
    return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);  }
}
//-----------------------
// Creation of the gallery
//-----------------------
async function buildWorks ()   {
        let works = await getWorks(url);
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
    
    buildWorks();
//--------------   
// Creation of filter according to the clicked button
//--------------
fetch(url).then(response => response.json())
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
})

//controle si logger 
//affichage de la barre de navigation admin
/* const adminNav = getElementById("admin-nav");
                adminNav.style["display"]= "flex";*/
             
//parie modal
let modal = null
const openModal = function (e) {
    console.log("e",e)
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
