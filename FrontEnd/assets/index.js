let url = 'http://localhost:5678/api/works';
// let urlCategories = 'http://localhost:5678/api/categories';
// constante gallery et portfolio 
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("#portfolio");   

//fonction d'application du filtre
function applyFilter(filterChoice) {
    //reset de la galerie
    gallery.innerHTML = '';
                                        console.log("applyFilterFilterChoise", filterChoice)
    
    for (const filter of filterChoice)  {        
                                        console.log("filter", filter)
        //// variable pour créer une balise <figure> avec image et titre                                
        let figure = document.createElement("figure");
        //variable img pour créer l'élément image <img src>
        let img = document.createElement("img");
        img.src = filter.imageUrl;
        // mise en place de <img src>  dans <figure>
        figure.appendChild(img);
        //variable pour créer l'élément <figcaption>
        let figcaption = document.createElement("figcaption");
        figcaption.innerHTML = filter.title;
        // mise en place de l'élément >figcaption dans <figure>
        figure.appendChild(figcaption);
        //mise en plce de l'élément <figure> dans .gallery
        gallery.appendChild(figure);                                      
        }
   }  

//fuction check fetch
async function getWorks (url) {
    const response = await fetch(url);
    //lancement de la requête, avec un "await" pour suspendre la fonction en attendant la réponse
    // quand la demande est terminé response est affecté à l'objet de réponse de la demande
    if (response.ok) return await response.json();
    /*si la réponse est O.K, récupération de l'objet JSON, méthode response.ok qui permet de savoir si la connexion est faite ou pas*/
    // sinon promesse rejetée
    else return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);  
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
    //appel de la fonction buildWorks
    buildWorks();

//buttons filters
fetch(url).then(response => response.json())
        .then(data => { console.log("data-button", data);
            // 
            //gallery   
            //variable ou sera stocké le filtre 
            let filterChoice = '';
            //constante du sélécteur des boutons
            const btnFilter = document.querySelectorAll(".btn-filter");
            //pour chaque btnFilter (bouton)
            btnFilter.forEach (function(btn){
                //on ajoute une écoute sur btn
            btn.addEventListener("click", function(e){
                //on va récupérer l'objet event qui est transmis par le gestionnaire d'évennement
                                        console.log("click", e.target.name);
            // si target.name === "All" alors filterChoice est égale à data, cad tout le tableau
            if (e.target.name === "All") {
                //la valeur de filterChoice prends la valeur data
                filterChoice = data;
                                        console.log("All", filterChoice)
                //appel de la fonction filterChoice
                applyFilter(filterChoice);
            }else {
                // sinon filterChoice est égale au filtre effectué sur nom de la catégorie
                filterChoice = data.filter(obj => obj.category.name === e.target.name)
                                        console.log("filterChoiceTriage", filterChoice)
                 //appel de la fonction filterChoice       
                applyFilter(filterChoice);
            }
            })
            })
})

