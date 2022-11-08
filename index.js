const DomManipulation = (function () {
  const openMenuBtn = document.querySelector(".openMenuBtn");
  const closeMenuBtn = document.querySelector(".closeMenuBtn");
  const sideMenuBtnsContainer = document.querySelector(
    ".sideMenuBtnsContainer"
  );
  const cover = document.querySelector(".cover");
  let bookmarkBtn = document.querySelector(".bookmarkBtn");
  const openSideMenuEventHandler = () => {
    cover.classList.toggle("invisible");
    sideMenuBtnsContainer.classList.toggle("invisible");
    openMenuBtn.classList.toggle("invisible");
    closeMenuBtn.classList.toggle("invisible");
  };

  openMenuBtn.addEventListener("click", openSideMenuEventHandler);
  closeMenuBtn.addEventListener("click", openSideMenuEventHandler);


  bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.classList.toggle('bookmarked')
  })
})();
