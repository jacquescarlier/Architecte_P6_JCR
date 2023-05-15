// constante du bouton 'se connecter'
const sendIt = document.getElementById("submit");
//constante pour le message d'erreur
const errorInformation = document.getElementById("errorInformation");
//style reset for errorInformation
errorInformation.style.background = "none";
errorInformation.style.border = "none ";
//-------------------------------------------------------
//ajout d'écoute d'évenement sur le bouton 'se connecter'
//-------------------------------------------------------
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("password").value;
    if (!email || !password) {
        document.getElementById("errorInformation").innerHTML =
            "Entrer un identifiant ou un mot de passe valide";
        // change font & background color    
        errorInformation.style.background = "#F0CCD8";
        errorInformation.style.border = "solid 1px #FF0000";
        return;
    }
//-----------------
//connexion à l'API
//-----------------
fetch("http://localhost:5678/api/users/login", {
        
    method: "POST",
    headers: {
        accept: "application/json",
        "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
    })
    //-------------------
    //Contrôle du status de connexion
    //-------------------
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
