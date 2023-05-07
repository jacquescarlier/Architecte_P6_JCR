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
    if (!email || !password) {
    // inclus le message dans la constante "errorInforrmation"
       errorInformation.innerHTML = "Entrer un identifiant ou un mot de passe valide";
       //fin de la fonction submit
       return;
   }

   fetch("http://localhost:5678/api/users/login", {
    //method "post pour envoie des données "


    //fonction autorisation

   })

})