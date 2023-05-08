//log
// constante bouton  submit 
const sendIn = document.getElementById("submit");
//constante <p id="errorInformation">
const errorInformation = document.getElementById("errorInformation");

sendIn.addEventListener("click", () => {

    const email = document.getElementById("emailUser").value;
   // constante password 
    const password = document.getElementById("password").value;
                                    console.log("mail",email)
                                    console.log("password", password)
   // si  pas (! = négatif)email ou pas password
   // (!email || !password) 
    if (!email || !password) {
    // inclus le message dans la constante "errorInforrmation"
       errorInformation.innerHTML = "Entrer un identifiant ou un mot de passe valide";
       //fin de la fonction submit
       return;
   }
// connexion à l'API par fetch
/*fetch("http://localhost:5678/api/users/login", {
//method "post pour envoie des données "
    method: 'POST',
    //type de contenu accepté dans notre cas pour un json 'application/json
    //json est un format texte de représentations structurées basé sur js
    headers : {
         accept: 'application/json',
        'Content-type': 'applicationjson'
    },
    // transforme l'objet litteral en une chaîne json, dans notre cas email et password
    body: JSON.strintify({email: email, password: password}),
})
   //fonction autorisation
   // contrôle du status de la repose de l'api
   // il faut une réponse égale à 200 
   // allowResponse
   //Gestion des erreurs et ne pas oublier window.sessionStorage
   /* La propriété sessionStorage permet d'utiliser un objet Storage valable pour la session de navigation en cours et pour les pages du même domaine que la page actuelle. L'objet global sessionStorage est similaire à Window.localStorage, à la différence que les données enregistrées dans sessionStorage ont une durée vie limitée et expirent à la fin de la session de navigation actuelle. Une session de navigation dure aussi longtemps que le navigateur est ouvert et s'étend sur plusieurs chargements, rechargements et restaurations de pages. En revanche, une session de navigation n'est valable que pour le contexte de navigation actuel, c'est-à-dire que le fait d'ouvrir une page dans un nouvel onglet ou dans une nouvelle fenêtre provoquera l'initialisation d'une nouvelle session de navigation, ce qui diffère du comportement des sessions utilisant des cookies. 
   Il est à noter que les données stockées dans sessionStorage ou localStorage sont spécifiques au protocole de la page.
                window.sessionStorage.setItem("userInformation", JSON.stringify(userInformation));*/
               
          // function respose ok
           //function window.sessionStorage
          // .then(function(){

          // })*/
          
   
});