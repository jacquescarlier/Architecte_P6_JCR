// constante du bouton 'se connecter'
//const sendIt = document.getElementById("submit");
//constante pour le message d'erreur
const errorInformation = document.getElementById("errorInformation");

//ajout d'écoute d'évenement sur le bouton 'se connecter'
submit.addEventListener("click", (e) => {
    /*récupération de l'objet event et lui applique la méthode 'preventDefault'. Bloque l'action par défaut du bouton si l'évennement n'est pas explicitement géré */
    e.preventDefault();
    //constante email et password
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("password").value;
    /* Si pas d'email ou de password, affichage du message dans errorInformation */
    if (!email || !password) {
        document.getElementById("errorInformation").innerHTML =
            "Entrer un identifiant ou un mot de passe valide";
        //fin d'instruction pour le bouton "se connecter"
        return;
    }
    //connexion à l'API
   // fetch("http://localhost:5678/api/users/login", {
        // method post
        method: "POST",
        //entête de requête
        headers: {
            //option pour envoyer du json
            accept: "application/json",
            //type de contenu json
            "Content-type": "application/json",
        },
        //on soumet les objet email & password en json
        body: JSON.stringify({ email: email, password: password }),
    })
        .then(function (authResponse) {
            if (authResponse.status === 200) {
                return authResponse.json();
            } else {
                errorInformation.innerHTML =
                    "Erreur dans l'identifiant ou le mot de passe";
                return Promise.reject();
            }
        })
        //------------------------------------------------------------------------------------------------
        // Enregistrement des informations du login dans la mémoire du navigateur pour la session en cours
        //------------------------------------------------------------------------------------------------
        .then(function (userInformation) {
            if (userInformation) {
                window.sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
                window.sessionStorage.setItem("token", userInformation.token);
                window.location.replace("./index.html");   
            }
        })
        .catch((error) => console.error(error));
});
