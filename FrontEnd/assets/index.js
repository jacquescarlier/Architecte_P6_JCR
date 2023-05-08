let url = 'http://localhost:5678/api/works';
// constante de l'url de l'API
let urlCategories = 'http://localhost:5678/api/categories';
//constante gallery et portfolio 
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");   

//fonction pour le filtre
function filterbutton(filterChoice) {
    //appel de la constante gallery (querySelector)
    gallery 
    //reset de la galerie
    gallery.innerHTML = '';
                            console.log("filterButtonFilterChoise", filterChoice)
    for (let nombreDeTravaux = 0; nombreDeTravaux < filterChoice.length; nombreDeTravaux++) {
        let filter = filterChoice[nombreDeTravaux];
                            console.log("all", filterChoice)
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

// ancien code pour pb API
/* fetch(url).then(response => response.json()
 .then(data => {console.log("data", data);
}
))
.catch(err => alert('Problème de communication avec l\'API_' + err))*/
// fin de code

/* display filter function */

fetch(url)
//posibilté de mettre rep à la place de reponse ?
.then(async(response) => 
    {
        /*Contient un booléen statuant s'il s'agit d'une réponse indiquant un succès (statut HTTP entre 200 et 299) ou non.*/
        if (response.ok === true) return response.json();
        /*La Promise.reject()méthode statique renvoie un Promiseobjet qui est rejeté avec une raison donnée.*/
        //  https://developer.mozilla.org/fr/docs/Web/HTTP/Status
        else return Promise.reject(`Erreur HTTP fetch 1 => ${rep.status}`)
    }
)
// capture l'échec de connexion à l'API et affiche un message d'alerte
.catch(err => alert("Pas de connexion avec l\'API_" + err))

.then(works => 
    {
        // data dans const works
                                                        console.log("works", works) 
        // constante pour créer le lien entre le dom et "figure"
        /*const gallery = document.querySelector(".gallery");*/
        gallery
        /*const portfolio = document.getElementById("#portfolio");  */ 
        portfolio
                                                        console.log("length-works", works.length)
        //boucle pour générer autant de balise "figure" que la longueur du tableau dans works
            for (let i = 0; i < works.length; i++) {
                let project = works[i];
                //variable "figure" pour créer l'élément correspondant
                let figure = document.createElement("figure");
                // crée une balise <figure> avec image et titre
                                                        console.log(figure);
                //variable img pour créer l'élément image <img src>
                let img = document.createElement("img");
                img.src = project.imageUrl;
                //img est un enfant de figure, création du noeud <img src>
                figure.appendChild(img);

                //variable figcaption pour créer l'élément correspondant <figcaption>
                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = project.title;
                                                        console.log("innerTitle", project.title)
                //figcaption est un enfant de figure, création du noeud <figcaption>
                figure.appendChild(figcaption);
    
                //figure est un enfant de gallery, création du noeud <figure>
                gallery.appendChild(figure);
            }
    }
)

//buttons filters
fetch(url).then(response => response.json())
        .then(data => { console.log("data-button", data);
                gallery   
                //déclaration constante et choix de l'ID du tableau, category.name
                const filterObjets = data.filter(obj => obj.category.name === "Objets");
                // constantes des boutons de l'id 'btn-xxx'
                const btnObject = document.getElementById('btn-object'); 
                //constante du filtre à appliquer (nom dans la catégorie) category.name
                //Possibilité de passé par categoryId
                const filterAppartments = data.filter(obj =>obj.category.name === "Appartements")
                const btnAppartments = document.getElementById('btn-appartment');   
                const filterHotels = data.filter(obj => obj.category.name === 'Hotels & restaurants')
                const btnHotels = document.getElementById('btn-hotel');   
                const displayAll = data
                const btnAll = document.getElementById('btn-all');  
                let filterChoice = '';


                // Ajout de l'écoute des évennements sur bouton Objets
                btnObject.addEventListener("click", function() {
                    // constante du résultat du filtre fait en amont
                    filterObjets;
                   //filterChoice est égale à filterObjets
                    let filterChoice = filterObjets;
                    console.log("choice", filterChoice);
                    filterbutton(filterChoice);
                 })

                btnAppartments.addEventListener("click", function() {
                    filterAppartments;
                    console.log("appartements", filterAppartments);
                    let filterChoice = filterAppartments;
                    filterbutton(filterChoice);
                })       
                            
                    
                btnHotels.addEventListener("click", function() {
                    filterHotels;
                    console.log("Hotel", filterHotels);
                    let filterChoice = filterHotels;
                    filterbutton(filterChoice);
                })   
                            
                btnAll.addEventListener("click", function() {
                    displayAll;
                    let filterChoice = displayAll;
                    gallery.innerHTML = '';
                    filterbutton(filterChoice);
                })  

        })

