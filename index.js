let openMenuBtn = document.querySelector(".openMenuBtn");
let closeMenuBtn = document.querySelector(".closeMenuBtn");
let sideMenuBtnsContainer = document.querySelector(".sideMenuBtnsContainer");
let cover = document.querySelector(".cover");
openMenuBtn.addEventListener("click", () => {
  cover.classList.toggle("invisible");
  openMenuBtn.classList.toggle("invisible");
  closeMenuBtn.classList.toggle("invisible");
  sideMenuBtnsContainer.classList.toggle("invisible");
});
closeMenuBtn.addEventListener("click", () => {
  cover.classList.toggle("invisible");

  openMenuBtn.classList.toggle("invisible");
  closeMenuBtn.classList.toggle("invisible");
  sideMenuBtnsContainer.classList.toggle("invisible");
});
