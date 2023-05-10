let url = 'http://localhost:5678/api/works';
// constante de l'url de l'API
let urlCategories = 'http://localhost:5678/api/categories';
//constante gallery et portfolio 
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");   

//fonction pour le filtre changer le nom de la fonction
function applyFilter(filterChoice) {
    //reset de la galerie
    gallery.innerHTML = '';
                                        console.log("applyFilterFilterChoise", filterChoice)
                            //for  of(filter of filterChoice)
    for (const filter of filterChoice)  {        
                                        console.log("filter", filter)
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

// from API



/* display filter function */
//fuction check fetch
async function getWorks (url) {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    else return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`)
}


//function build data 
async function buildWorks ()   {
        let works = await getWorks(url);
        // data dans const works
                                                        console.log("works", works) 
                                                        console.log("length-works", works.length)
        //boucle pour générer autant de balise "figure" que la longueur du tableau dans works for of
        for (const project of works) {
                let figure = document.createElement("figure");
                // crée une balise <figure> avec image et titre
                                                        console.log("project", project);
                                                        console.log("figure",figure);
                //variable img pour créer l'élément image <img src>
                let img = document.createElement("img");
                // récupère l'url de l'image pour l'insérer dans img.src
                img.src = project.imageUrl;
                //img est un enfant de figure, création du noeud <img src>
                figure.appendChild(img);

                //variable figcaption pour créer l'élément correspondant <figcaption>
                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = project.title;
                                                        
                //figcaption est un enfant de figure, création du noeud <figcaption>
                figure.appendChild(figcaption);
    
                //figure est un enfant de gallery, création du noeud <figure>
                gallery.appendChild(figure);
            }
    }
buildWorks();

//buttons filters
fetch(url).then(response => response.json())
        .then(data => { console.log("data-button", data);
                gallery   
                //déclaration constante et choix de l'ID du tableau, category.name
                //const filterObjets = data.filter(obj => obj.category.name === "Objets");
                // constantes des boutons de l'id 'btn-xxx'
                 // const  btnObject = 
                //constante du filtre à appliquer (nom dans la catégorie) category.name
                //Possibilité de passé par categoryId qui est lui un chiffre
               // const filterAppartments = data.filter(obj =>obj.category.name === "Appartements")
               // const btnAppartments = document.getElementById('btn-appartment');   
              //  const filterHotels = data.filter(obj => obj.category.name === 'Hotels & restaurants')
               // const btnHotels = document.getElementById('btn-hotel');   
                const displayAll = data
                const btnAll = document.getElementById('btn-all');  
                let filterChoice = '';

//for each e target
const btnFilter = document.querySelectorAll(".btn-filter");
btnFilter.forEach (function(btn){
    btn.addEventListener("click", function(e){
       
        console.log("click", e.target.name);
        if (e.target.name === "All") {
                filterChoice = data;
                applyFilter(filterChoice);
        }else {
        //const btntriage = document.getElementById('e.target.id');
                filterChoice = data.filter(obj => obj.category.name === e.target.name)
                   //Initialisation de la variable filterChoice en lui onnant la valeur de filterObjets
                    //let filterChoice = filterTriage;
                    console.log("filterChoiceTriage", filterChoice)
                    applyFilter(filterChoice);
        }
    })
})


//console.log("btnfilter", btnFilter)
//btnFilter.addEventListener("click", function(e)
//{
    //let filterChoice = e.value
    //console.log ("target", filterChoice);
    //applyFilter(filterChoice);
//})

// for each 
                // Ajout de l'écoute des évennements sur bouton Objets
               /* btnObject.addEventListener("click", function() {
                    // constante du résultat du filtre fait en amont
                    filterObjets;
                   //Initialisation de la variable filterChoice en lui onnant la valeur de filterObjets
                    let filterChoice = filterObjets;
                 //                                       console.log("objets", filterChoice);
                 applyFilter(filterChoice);
                })*/

                 //Ajout de l'écoute des évennements sur bouton Appartments
              /*  btnAppartments.addEventListener("click", function() {
                    filterAppartments;
                                                        console.log("appartements", filterAppartments);
                    let filterChoice = filterAppartments;
                    applyFilter(filterChoice);
                })       
                            
                //Ajout de l'écoute des évennements sur bouton Hotels   
                btnHotels.addEventListener("click", function() {
                    filterHotels;
                                                        console.log("Hotel", filterHotels);
                    let filterChoice = filterHotels;
                    applyFilter(filterChoice);
                })   
                  
                //Ajout de l'écoute des évennements sur bouton All
                btnAll.addEventListener("click", function() {
                    displayAll;
                    let filterChoice = displayAll;
                    gallery.innerHTML = '';
                    applyFilter(filterChoice);
                })  
*/
        })

