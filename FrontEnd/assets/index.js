/**** API call ****/
let url = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

/**** Constante ****/
// const gallery container
const gallery = document.querySelector(".gallery");
//const admin navigation bar
const adminNav = document.getElementById("admin-nav");
// "edit" buttons for the admin part
const modalCallButtons = document.querySelectorAll(".modifier");
// login or logout button depending on the token
const loginLogout = document.getElementById("login");

// ---------------------------------------------
// | Check the connection with the API "works" |
// ---------------------------------------------
async function getWorks(url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(`Erreur HTTP fetch 1 => ${response.status}`);
  }
}
//  ---------------------------------------------------------
//  |   data recovery through the api url for categories    |
//  ---------------------------------------------------------
async function getCategories(urlCategories) {
  const response = await fetch(urlCategories);
  if (response.ok) return await response.json();
}
//  ------------------------
//  | CategoryId for modal |
//  ------------------------
async function forCategory() {
  let category = await getCategories(urlCategories);

  function categoryIdForModal() {
    const select = document.querySelector("#category");
    for (let i = 0; i < category.length; i++) {
      let option = document.createElement("option");
      option.value = category[i].id;
      option.innerHTML = category[i].name;
      select.appendChild(option);
    }
  }
  categoryIdForModal();
  //  ---------------------------------------------
  //  | Create buttons dynamically whith the API  |
  //  ---------------------------------------------
  function createButtons() {
    for (let i = 0; i < category.length; i++) {
      let newFilterButton = document.createElement("button");
      newFilterButton.type = "button";
      newFilterButton.name = category[i].name;
      newFilterButton.innerHTML = category[i].name;
      newFilterButton.id = "btn-" + category[i].name.split(" ")[0];
      newFilterButton.className = "btn-filter";
      let portfolio = document.getElementById("filterButton");
      portfolio.appendChild(newFilterButton);
    }
  }
  createButtons();
}
forCategory();
//  --------------------------------------------
//  |    Creation of the gallery & the filter  |
//  --------------------------------------------
async function buildWorks() {
  // object array 
  let works = await getWorks(url);
  // ----------------------------
  // |  function to create a job|
  // ----------------------------
  function addNewProject(project, container, isModal) {
    //first parameter is a json with the variables
    // 2nd parameter  is the target container
    //third parameter is a boolean
    let idPhoto = project.id;
    let figure = document.createElement("figure");
    figure.id = idPhoto;
    figure.className = "figure-gallery";
    let img = document.createElement("img");
    img.src = project.img;
    img.alt = project.alt;
    figure.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = project.caption;
    figure.appendChild(figcaption);
    if (isModal) {
      let trashGallery = document.createElement("i");
      trashGallery.className = "fa-solid fa-trash-can trash";
      trashGallery.innerHTML = "";
      figure.appendChild(trashGallery);
    }
    container.appendChild(figure);
  }
  //creation of the gallery
  function createWork(container) {
    for (const work of works) {
      let project = {
        id: work.id,
        img: work.imageUrl,
        caption: work.title,
        alt: work.title,
      };
      addNewProject(project, container, false);
    }
  }
  createWork(gallery);
  // add new work  in gallery
  function addNewWorkGallery() {
    let project = {
      id: works.length + 1,
      img: addedImage,
      caption: title.value,
      alt: title.value,
    };
    addNewProject(project, gallery, false);
  }
  // add new work in modal
  function addNewWorkInModal() {
    let project = {
      id: works.length + 1,
      img: addedImage,
      caption: "éditer",
    };
    addNewProject(project, galleryOfModal, true);
  }
  //  ----------------------------
  //  | filter creation function |
  //  ----------------------------
  function createFilter() {
    let filterChoice = "";
    const btnFilter = document.querySelectorAll(".btn-filter");
    btnFilter.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (e.target.name === "Tous") {
          filterChoice = works;
          applyFilter(filterChoice);
        } else {
          filterChoice = works.filter(
            (obj) => obj.category.name === e.target.name
          );
          applyFilter(filterChoice);
        }
      });
    });
  }
  createFilter();
  // ------------------
  // |  Apply filter  |
  // ------------------
  function applyFilter(filterChoice) {
    gallery.innerHTML = "";
    for (const filter of filterChoice) {
      container = filterChoice;
      let project = {
        id: filter.id,
        img: filter.imageUrl,
        caption: filter.title,
        alt: filter.title,
      };
      addNewProject(project, gallery, false);
    }
  }
  //  ---------------------------------------------
  //  | setting up element according to the token |
  //  ---------------------------------------------
  const btnsFilter = document.querySelector(".btns-filter");
  const mesProjetsMarginH2 = document.querySelector(".mes-projets");

  let controlToken = sessionStorage.getItem("token");
  // Modifies elements when switching to "edit mode"
  controlToken === null
    ? (adminNav.style.display = "none")
    : (adminNav.style.display = "flex");
  controlToken === null
    ? (document.getElementById("login").innerHTML = "login")
    : (document.getElementById("login").innerHTML = "logout");
  controlToken === null
    ? (btnsFilter.style.display = "flex")
    : (btnsFilter.style.display = "none");
  controlToken === null
    ? (mesProjetsMarginH2.style.marginBottom = "30px")
    : (mesProjetsMarginH2.style.marginBottom = "92px");
  controlToken === null
    ? (btnsFilter.style.marginBotton = "")
    : (btnsFilter.style.marginBotton = "none");
  controlToken === null
    ? (header.style.marginTop = "50px")
    : (header.style.marginTop = "38px");
  //edit buttons
  modalCallButtons.forEach(function (item) {
    controlToken === null
      ? (item.style.display = "none")
      : (item.style.display = "flex");
  });
  //  ---------------------------------------------------------
  //  | Management of the action of the "login/logout" button |
  //  ---------------------------------------------------------
  // add event listening on the  "login/logout" button
  loginLogout.addEventListener("click", function () {
    logInLogOut();
  });
  // redirect function to a page according to the token
  function logInLogOut() {
    if (controlToken === null) {
      window.location.replace("./login.html");
    } else {
      sessionStorage.clear();
      window.location.replace("./index.html");
    }
  }
  //  -----------------------
  //  | parts of the modals |
  //  -----------------------
  // general container & gallery
  // container first modal
  const modalContainer = document.querySelector(".modal-container");
  // container for the gallery in the modal
  const modalGallery = document.querySelector(".modal-photo-gallery");
  //container 2nd modal
  const modal2Container = document.querySelector(".modal2-container");
  // container to add a job
  const addPhotos = document.querySelector(".add-photo");
  /**** gallery modal ****/
  //all elements that can close or open the modal
  const modalTrigger = document.querySelectorAll(".modal-trigger");
  // button to open 2nd modal
  const buttonAddPhotos = document.getElementById("button-add-modal");
  // gallery container
  const galleryOfModal = document.querySelector(".gallery-modal");
  /**** modal add photo ****/
  //all elements that can close or open the modal
  const modalTrigger2 = document.querySelectorAll(".modal-trigger2");
  //validate button
  const buttonValidatePhoto = document.getElementById("button-validate-photo");
  // messages for image size or error when selecting
  const infoFile = document.querySelector(".info-file");
  // arrow previous
  const previousArrow = document.getElementById("previous-arrow");
  /****  containers for the photo adds ****/
  const containerAddPhoto = document.querySelector(".container-add-photo");
  const containerAddPhoto2 = document.querySelector(".container-add-photo2");

  //  ---------------------
  //  | modal 1 - gallery |
  //  ---------------------
  /**** Create the gallery for modal ****/
  async function createWorksForModalGallery() {
    for (const work of works) {
      let project = {
        id: work.id,
        img: work.imageUrl,
        caption: "éditer",
        alt: work.title,
      };
      addNewProject(project, galleryOfModal, true);
    }
  }
  createWorksForModalGallery();

  modalContainer.className === "modal-container active"
    ? (modalgallery.style.display = "flex")
    : (modalGallery.style.display = "none");
  //list of  elements listened to under the class "trigger"
  modalTrigger.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );
  // change the name of the class using toggle
  function toggleModal() {
    modalContainer.classList.toggle("active");
    alertModalGallery.style.display = "none";
    // makes the modal appears or disappear depending on the class
    modalContainer.className === "modal-container active"
      ? (modalGallery.style.display = "flex")
      : (modalGallery.style.display = "none");
  }
  /**** delete image  ****/
  let trashButton = document.querySelectorAll(".fa-trash-can");
  let alertModalGallery = document.querySelector(".alert-modal");

  trashButton.forEach((trash) =>
    trash.addEventListener("click", function (e) {
      let figure = this.parentNode;
      let idPhoto = figure.id;

      async function deletePhoto() {
        await fetch(`${url}/${idPhoto}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${controlToken}`,
          },
        }).then(function (response) {
          if (response.status === 204) {
            figure.remove();
            let figureDelete = figure.id;
            const figureToDelete = document.getElementById(figureDelete);
            figureToDelete.remove();
          } else {
            resStatus = response.status;
            alertModalGallery.innerHTML =
              "impossible d'effacé le fichier, statut du serveur :  " +
              resStatus;
            alertModalGallery.style.display = "flex";
          }
        });
      }
      deletePhoto();
    })
  );
  /**** how the modals close ****/
  modalGallery.addEventListener("click", function () {
    alertModalGallery.style.display = "none";
  });
  alertModalGallery.innerHTML = " ";
  /**** close the modal by clicking outside ****/
  modalContainer.addEventListener("click", (e) => {
    toggleModal();
  });
  modalContainer.children[1].addEventListener("click", function (e) {
    e.stopPropagation();
  });
  modal2Container.addEventListener("click", (e) => {
    toggleModal2();
  });
  modal2Container.children[1].addEventListener("click", function (e) {
    e.stopPropagation();
  });

  //  ---------------------
  //  | modal - add photo |
  //  ---------------------
  modalTrigger2.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal2)
  );
  // conditions of appearance of the modal
  function toggleModal2() {
    modal2Container.classList.toggle("active");
    modalContainer.className === "modal-container active"
      ? (modalGallery.style.display = "flex")
      : (modalGallery.style.display = "none");
    modal2Container.className === "modal2-container active"
      ? (addPhotos.style.display = "flex")
      : (addPhotos.style.display = "none");
    modal2Container.className === "modal2-container active"
      ? (modalGallery.style.display = "none")
      : (modalGallery.style.display = "flex");
    deleteDisplay();
    errorMessage.style.display = "none";
    errorMessage.innerHTML = " ";
  }

  // toogle funtion to manage the appearance of the modal
  buttonAddPhotos.addEventListener("click", function () {
    toggleModal();
    toggleModal2();
  });
  /****modal - add photo Arrow previous ****/
  previousArrow.addEventListener("click", function () {
    modalContainer.classList.toggle("active");
    errorMessage.style.display = "none";
    toggleModal2();
  });
  /**** add photo  input file part  ****/
  const fileUploadInput = document.querySelector("#my-file");
  infoFile.innerHTML = "jpg png : 4 mo max";
  fileUploadInput.addEventListener("change", previewNewWork);

  //function reset after adding work
  function deleteDisplay() {
    containerAddPhoto2.innerHTML = " ";
    containerAddPhoto2.style.display = "none";
    containerAddPhoto.style.display = "flex";
    infoFile.innerHTML = "jpg png : 4 mo max";
    infoFile.classList.remove("infoFileNotOk");
    infoFile.classList.add("infoFileOK");
    title.value = " ";
    category.value = " ";
    buttonValidatePhoto.style.background = "#A7A7A7";
    buttonValidatePhoto.style.cursor = "default";
  }

  let imageUploaded;
  function previewNewWork() {
    const sizeFile = this.files[0].size;
    imageUploaded = this.files[0];
    const fileExtensionRegex = /\.(jpe?g|png)$/i;
    //.test renvoie true ou false par rapport au regex
    if (this.files.length === 0 || !fileExtensionRegex.test(this.files[0].name) ||
      sizeFile > 4194304 //size file max  = 4* 1024 * 1024
    ) {
      infoFileNotOk();
      return;
    }

    function infoFileNotOk() {
      infoFile.innerHTML = "Le fichier n'est pas valide";
      infoFile.classList.remove("infoFileOk");
      infoFile.classList.add("infoFileNotOk");
    }
    // disable add work validation button
    buttonValidatePhoto.disabled = true

    let file = this.files[0];
    const newFileReader = new FileReader();
    newFileReader.readAsDataURL(file);
    newFileReader.addEventListener("load", (event) =>
      displayImage(event, file)
    );

    function displayImage(event) {
      figureUpload = document.createElement("figure");
      figureUpload.id = works.length + 1;
      figureUpload.className = "thumbnail"
      const image = document.createElement("img");
      image.src = event.target.result;
      addedImage = event.target.result;
      figureUpload.appendChild(image);
      image.style.width = "129px";
      image.style.height = "169px";
      document.querySelector(".container-add-photo2").appendChild(figureUpload);
      containerAddPhoto2.style.display = "flex";
      containerAddPhoto.style.display = "none";
    }
  }
  const vignette = document.querySelector(".thumbnail")
  console.log("vignette", vignette)
    

  /**** formData ****/
  let controleContenuInput = document.querySelectorAll(".controle-contenu");
  controleContenuInput.forEach((controle) =>
    controle.addEventListener("change", function (e) {
      console.log("imagename", imageUploaded.name)
      if (imageUploaded.name === "") { return }
      if (title.value !== " " && category.value !== " " && addedImage !== " ") {
        buttonValidatePhoto.style.background = "#1D6154";
        buttonValidatePhoto.style.cursor = "pointer";
        buttonValidatePhoto.disabled = false;
      }
    })
  );

  /**** Send new work in API db****/
  function sendNewWork(e) {
    const formData = new FormData();
    formData.append("image", imageUploaded);
    formData.append("title", title.value);
    formData.append("category", category.value);
    if (title.value === " " || category.value === " "|| addedImage === "") {
      errorMessage.style.display = "flex";
      errorMessage.innerHTML = " Veuillez complèter tous les champs";
      return;
    } else {

    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${controlToken}`,
      },
      body: formData,
    }).then(function (response) {
      if (response.status === 201) {
        addNewWorkGallery();
        addNewWorkInModal();
        errorMessage.style.display = "flex";
        errorMessage.innerHTML = "Envoie des travaux validé !";
        category.value = " ";
        title.value = " ";
        buttonValidatePhoto.disabled = true;
        setTimeout(deleteDisplay, 1000);
        setTimeout(toggleModal2, 1500);
      } else {
        errorMessage.style.display = "flex";
        errorMessage.innerHTML =
          "pas de connexion serveur, contacter votre administrateur";
      }
    });
  }

  // validation button
  buttonValidatePhoto.addEventListener("click", function () {
    sendNewWork();
  });
}
buildWorks();
