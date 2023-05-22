// constante url login
let urlLogin = "http://localhost:5678/api/users/login";
//constante pour le message d'erreur
const submitSeConnecter = document.getElementById("submit-connecter")
const errorInformation = document.getElementById("errorInformation");
//style reset for errorInformation
errorInformation.style.background = "none";
errorInformation.style.border = "none ";
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
    if (!email || !password) {
    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) ) {
        console.log("email",email)
        document.getElementById("errorInformation").innerHTML =
            "Entrer un E-mail  ou un E-mail valide!"
        errorInformation.style.background = "#F0CCD8";
        errorInformation.style.border = "solid 1px #FF0000";
        return;
    }
     if (!password){
        console.log("email",email)
        console.log("password", password)
        document.getElementById("errorInformation").innerHTML =
            "Entrer un mot de passe !"
        errorInformation.style.background = "#F0CCD8";
        errorInformation.style.border = "solid 1px #FF0000";
        return;
    };
    
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
            if (authResponse.status === 200) {
                console.log("zeze")
                return authResponse.json();
            } else {
                errorInformation.innerHTML =
                    "Erreur dans l'identifiant ou le mot de passe";
                email.value = ""
                password.value = ""
                errorInformation.style.background = "#F0CCD8";
                errorInformation.style.border = "solid 1px #FF0000";
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
