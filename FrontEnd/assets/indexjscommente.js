//--------------------------------------------
// declaration of constants and variables
//--------------------------------------------
//let url = 'http://localhost:5678/api/works';
// let urlCategories = 'http://localhost:5678/api/categories';
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");   
//--------------------------------
// Apply filter
//--------------------------------
function applyFilter(filterChoice) {
    //reset de la galerie
    gallery.innerHTML = '';
    // Pour chaque constante "filter" (element) de "filterChoice" nous effectuons les opérations suivantes
    for (const filter of filterChoice)  {        
        // variable pour créer une balise <figure> avec image et titre                                
        let figure = document.createElement("figure");
        //variable img pour créer l'élément image <img src>
        let img = document.createElement("img");
        img.src = filter.imageUrl;
        // mise en place de <img src>  dans <figure>, img étant l'enfant de figure
        figure.appendChild(img);
        //variable pour créer l'élément <figcaption>
        let figcaption = document.createElement("figcaption");
        figcaption.innerHTML = filter.title;
        // mise en place de l'élément <figcaption> dans <figure>, figcaption étant l'enfant de figure
        figure.appendChild(figcaption);
        //mise en place de l'élément <figure> dans .gallery.
        gallery.appendChild(figure);                                      
        }
   }  
//-----------------------------------------------
// Check the connection with the API
//-----------------------------------------------
async function getWorks (url) {
    // constante response qui est le réponse du fetch avec un "await" pour attendre la réponse
    const response = await fetch(url);
    console.log(response)
    console.log("response.status  ", response.status)
    //lancement de la requête, avec un "await" pour suspendre la fonction en attendant la réponse
    // quand la demande est terminé response est affecté à l'objet de réponse de la demande
    if (response.ok) return await response.json(); 
    /*si la réponse est O.K, récupération de l'objet JSON, méthode response.ok qui permet de savoir si la connexion est faite ou pas*/
    // sinon promesse rejetée
    else {
    alert ("api pb");
    return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);  }
}
//-----------------------
// Creation of the gallery
//-----------------------
async function buildWorks ()   {
        let works = await getWorks(url);
        // data dans const works avec un "await pour attendre la réponse"
        //Récupération du tableau des données
                                                        console.log("works", works) 
                                                        console.log("length-works", works.length)
        //boucle pour générer autant de balise "figure" que d'éléments dans works
        for (const project of works) {
                let figure = document.createElement("figure");
                // crée une balise <figure> avec image et titre
                // le constante project est égale à chaque ligne du tableau qui est séparé en plusieurs éléments différents
                                                        //console.log("project", project);
                //variable img pour créer l'élément image <img src = "">
                let img = document.createElement("img");
                // récupère l'url de l'image>
                img.src = project.imageUrl;
                // mise en place de <img src>  dans <figure>, img étant l'enfant de figure
                figure.appendChild(img);
                //variable figcaption pour créer l'élément correspondant <figcaption>
                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = project.title;                                        
                // mise en place de l'élément <figcaption> dans <figure>, figcaption étant l'enfant de figure
                figure.appendChild(figcaption);
                //figure est un enfant de gallery, création du noeud <figure> dans .gallery
                gallery.appendChild(figure);
            }
    }
    //appel de la fonction buildWorks
    buildWorks();
//--------------   
// Creation of filter according to the clicked button
//--------------
fetch(url).then(response => response.json())
        .then(data => {   
            //async function buildFilter ()   {
            //variable ou sera stocké le filtre 
            let filterChoice = '';
            //constante du sélécteur des boutons
            const btnFilter = document.querySelectorAll(".btn-filter");
            //pour chaque btnFilter (bouton)
            btnFilter.forEach (function(btn){
                //on ajoute une écoute d'événement sur btn
            btn.addEventListener("click", function(e){
                //on va récupérer l'objet event  qui est transmis par le gestionnaire d'évenement du bouton correspondant.
                //nous récupérons le nom du bouton
            // si target.name === "All" alors filterChoice est égale à data, cad tout le tableau
            if (e.target.name === "All") {
                //la valeur de filterChoice prends la valeur data
                filterChoice = data;
                                        console.log("click_button =>", e.target.name, "// filterChoice_length =>", filterChoice.length)
                //appel de la fonction filterChoice
                applyFilter(filterChoice);
            }else {
                // sinon filterChoice est égale à l'event de l'objet avec la cible category.name
                filterChoice = data.filter(obj => obj.category.name === e.target.name)
                                        console.log("click_button =>", e.target.name, "// filterChoice_length =>", filterChoice.length)
                //appel de la fonction filterChoice       
                applyFilter(filterChoice);
            }
            })
            })
})

//controle si logger 
//affichage de la barre de navigation admin
/* const adminNav = getElementById("admin-nav");
                adminNav.style["display"]= "flex";*/