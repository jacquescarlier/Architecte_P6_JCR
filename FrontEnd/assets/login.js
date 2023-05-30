
// constante url login
let urlLogin = "http://localhost:5678/api/users/login";
//constante pour le message d'erreur
const submitSeConnecter = document.getElementById("submit-connecter")
const errorInformation = document.getElementById("errorInformation");
//style reset for errorInformation
errorInformation.classList.remove = "errorInformation";
// focus in input
document.getElementById("emailUser").focus()
//  -----------------------------------------------
//  | added event listening on the connect button |
//  -----------------------------------------------
 submitSeConnecter.addEventListener("click", (e) => {
    e.preventDefault();
    /*récupération de l'objet event et lui applique la méthode 'preventDefault'. Bloque l'action par défaut du bouton si l'évennement n'est pas explicitement géré */
    let email = document.getElementById("emailUser").value;
    let password = document.getElementById("password").value;
    //utilisation d'une expression régulière (RegExp) pour confirmer la validité de l'email
    // ^ pour commencer l'expression, $ pour terminer,\w tous les caractères, _- pour les 2 tirets, et le point qu'on échappe avec le backslash, + @ pour @ et tous les caratères {2,4} de 2 à 4 carractères, i pas sensible aux majuscule ou minuscule ,.
    //if (!email || !password){
    
    if (!email.match(/^[\w_\-.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
        document.getElementById("errorInformation").innerHTML =
            "Entrer un E-mail  ou un E-mail valide!"
            errorInformation.classList = "errorInformation";
        return;
    }
      else if (!password){
        document.getElementById("errorInformation").innerHTML =
            "Entrer un mot de passe !"
            errorInformation.classList = "errorInformation";
            
        return;
    }
    //  ------------------
    //  | API connection |
    //  ------------------
    fetch(urlLogin, {

        method: "POST",
        headers: {
            accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        //  ---------------------------
        //  | Connection status check |
        //  ---------------------------
        .then(function (authResponse) {
            if(authResponse.status === 404){
                errorInformation.innerHTML =
                    "Nous n'avons pas trouvé de compte avec cette adresse e-mail";
                    errorInformation.classList = "errorInformation";

            } else if (authResponse.status === 200) {
                return authResponse.json();
            } else {
                errorInformation.innerHTML =
                    "Erreur dans l'identifiant ou le mot de passe";
                email.value = ""
                password.value = ""
                errorInformation.classList  = "errorInformation";
                return Promise.reject();
            }
        })
        //  -------------------------------- 
        //  | save token in sessionStorage |
        //  --------------------------------
        .then(function (userInformation) {
            //if (userInformation) {
            sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
            sessionStorage.setItem("token", userInformation.token);
            window.location.replace("./index.html");
            //}
        })
        .catch((error) => console.error(error));
});
