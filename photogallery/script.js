function login(){
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(name === "" || pass === ""){
    alert("Please fill both fields");
    return;
  }

  localStorage.setItem("username", name);
  localStorage.setItem("password", pass);

  document.querySelector(".container").style.display = "none";
  document.getElementById("gallery").style.display = "block";

  loadUserData(name);
}


/* -------------- LOGOUT FUNCTION -------------- */
function logout(){
  localStorage.clear(); // removes saved data
  location.reload();
}


/* -------------- ADD IMAGES TO GALLERY -------------- */
function addImages(){
  let galleryName = document.getElementById("galleryName").value;
  let files = document.getElementById("imageUpload").files;

  document.getElementById("showGalleryName").innerText = galleryName;
  localStorage.setItem("galleryName", galleryName);

  let savedImages = JSON.parse(localStorage.getItem("images")) || [];

  for(let i = 0; i < files.length; i++){
    let reader = new FileReader();

    reader.onload = function(e){
      let imgData = e.target.result; // base64 image

      savedImages.push(imgData);
      localStorage.setItem("images", JSON.stringify(savedImages));

      let img = document.createElement("img");
      img.src = imgData;
      img.onclick = () => openLightbox(imgData);

      document.getElementById("imagesContainer").appendChild(img);
    };

    reader.readAsDataURL(files[i]);
  }
}

function loadUserData(name){
  document.getElementById("welcome").innerText = "Welcome " + name;

  let galleryName = localStorage.getItem("galleryName");
  let images = JSON.parse(localStorage.getItem("images")) || [];

  if(galleryName){
    document.getElementById("showGalleryName").innerText = galleryName;
  }

  document.getElementById("imagesContainer").innerHTML = "";

  images.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    img.onclick = () => openLightbox(src);
    document.getElementById("imagesContainer").appendChild(img);
  });
}
window.onload = function(){
  let user = localStorage.getItem("username");

  if(user){
    document.querySelector(".container").style.display = "none";
    document.getElementById("gallery").style.display = "block";
    loadUserData(user);
  }
};





/* -------------- DRAG CAROUSEL -------------- */
let slides = document.getElementById("slides");
let startX = 0;
let currentTranslate = 0;

const imageWidth = 600;   // adjust if you change size

slides.addEventListener("pointerdown", startDrag);
slides.addEventListener("pointerup", endDrag);
slides.addEventListener("pointermove", moveDrag);

function startDrag(e){
  startX = e.clientX;
}

function moveDrag(e){
  if(startX === 0) return;

  let move = e.clientX - startX;

  slides.style.transform = `translateX(${currentTranslate + move}px)`;
}

function endDrag(e){
  let move = e.clientX - startX;

  if(move < -100) currentTranslate -= imageWidth;
  if(move > 100) currentTranslate += imageWidth;

  slides.style.transform = `translateX(${currentTranslate}px)`;

  startX = 0;
}
function openLightbox(src){
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightboxImg").src = src;
}

function closeLightbox(){
  document.getElementById("lightbox").style.display = "none";
}
window.onload = function(){
  let savedUser = localStorage.getItem("username");
  let savedPass = localStorage.getItem("password");

  if(savedUser && savedPass){
    document.querySelector(".container").style.display = "none";
    document.getElementById("gallery").style.display = "block";
    loadUserData(savedUser);
  }
};
