// constante url login
let urlLogin = "http://localhost:5678/api/users/login";
const submitSeConnecter = document.getElementById("submit-connecter");
//constante pour le message d'erreur
const errorInformation = document.getElementById("errorInformation");
//style reset for errorInformation
errorInformation.classList.remove = "errorInformation";
// focus in input
document.getElementById("emailUser").focus()
/**** added event listening on the connect button ****/
 submitSeConnecter.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("emailUser").value;
    let password = document.getElementById("password").value;
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
        document.getElementById("errorInformation").innerHTML =
            "Entrer un E-mail valide!"
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
                    "Nous n'avons pas trouvé votre compte";
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
            sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
            sessionStorage.setItem("token", userInformation.token);
            window.location.replace("./index.html");
        })
        .catch((error) => console.error(error));
});
