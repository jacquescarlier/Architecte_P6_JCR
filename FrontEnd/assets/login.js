// constante url login
let urlLogin = "http://localhost:5678/api/users/login";
//constante pour le message d'erreur
const errorInformation = document.getElementById("errorInformation");
//style reset for errorInformation
errorInformation.style.background = "none";
errorInformation.style.border = "none ";
//  -----------------------------------------------
//  | added event listening on the connect button |
//  -----------------------------------------------
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        console.log(email)
        email.value = ' ';
        password.value = '';
        document.getElementById("errorInformation").innerHTML =
            "Entrer un identifiant ou un mot de passe valide"    
        // change font & background color    
        errorInformation.style.background = "#F0CCD8";
        errorInformation.style.border = "solid 1px #FF0000";
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
        if (authResponse.status === 200) {
            return authResponse.json();
        } else {
             errorInformation.innerHTML =
                "Erreur dans l'identifiant ou le mot de passe";
                email.value = ""
                password.value= ""
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
