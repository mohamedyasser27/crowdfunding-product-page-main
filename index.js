import anime from "./anime.es.js";

const DomManipulation = (function () {
  let bookmarked = false;
  const openMenuBtn = document.querySelector(".openMenuBtn");
  const closeMenuBtn = document.querySelector(".closeMenuBtn");
  const sideMenuBtnsContainer = document.querySelector(
    ".sideMenuBtnsContainer"
  );
  let bookmarkStatus = document.querySelector(".bookmarkStatus");
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

  bookmarkBtn.addEventListener("click", () => {
    bookmarkBtn.classList.toggle("bookmarked");
    bookmarkStatus.textContent = bookmarked ? "bookmark" : "bookmarked";
    bookmarked=!bookmarked
  });
})();

let val = 100000;
let pledges = 89914;
let backers = 5007;
let daysLeft = 56;
let remaining = val - pledges;
let percentage = (pledges / val) * 100;

let moneyCount = document.querySelector(".moneyCount .currentAmount");
let backersCount = document.querySelector(".backersCount .currentAmount");
let percentageBar = document.querySelector(".percentageBar");

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.45,
};

const callback = function (entries) {
  if (entries[0].isIntersecting) {
    anime
      .timeline({
        duration: 1100,
        easing: "cubicBezier(0.000, 0.000, 0.580, 1.000)",
        easing: "linear",

        round: 1,
      })
      .add({ targets: moneyCount, textContent: `$${[pledges]}` }, 0)
      .add({ targets: backersCount, textContent: `${backers}` }, 0)
      .add({ targets: percentageBar, width: `${percentage}%` }, 0);
    observer.unobserve(target);
  }
};
let target = document.querySelector(".campaignDetails");
let observer = new IntersectionObserver(callback, options);
observer.observe(target);
