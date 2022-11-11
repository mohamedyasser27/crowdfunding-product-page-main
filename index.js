import anime from "./anime.es.js";

const DomManipulation = (function () {
  let bookmarked = false;
  const sideMenuOpenBtn = document.querySelector(".side-menu__open-btn");
  const sideMenuCloseBtn = document.querySelector(".side-menu__close-btn");
  const sideMenu = document.querySelector(".side-menu");
  let bookmarkStatus = document.querySelector(
    ".bookmark-area__bookmark-status"
  );
  const cover = document.querySelector(".cover");
  let projectCardBookmarkBtn = document.querySelector(
    ".bookmark-area__bookmark-btn"
  );
  const openSideMenuEventHandler = () => {
    cover.classList.toggle("invisible");
    sideMenu.classList.toggle("invisible");
    sideMenuOpenBtn.classList.toggle("invisible");
    sideMenuCloseBtn.classList.toggle("invisible");
  };

  sideMenuOpenBtn.addEventListener("click", openSideMenuEventHandler);
  sideMenuCloseBtn.addEventListener("click", openSideMenuEventHandler);

  projectCardBookmarkBtn.addEventListener("click", () => {
    projectCardBookmarkBtn.classList.toggle("bookmarked");
    bookmarkStatus.textContent = bookmarked ? "bookmark" : "bookmarked";
    bookmarked = !bookmarked;
  });

  // let product-selection__close-btn = document.querySelector(".product-selection__close-btn");
  // let product-selection = document.querySelector(".product-selection");
  // product-selection__close-btn.addEventListener("click", () => {
  //   product-selection.classList.add("invisible");
  // });

  // let allProudctsItems = Array.from(
  //   document.querySelectorAll(".product-selection .available-products__description .product")
  // );

  // let lastChecked = null;
  // allProudctsItems.forEach((product) => {
  //   product.addEventListener("click", function () {
  //     this.children[0].children[0].checked = true;
  //     this.classList.add("checked");
  //     if (lastChecked != null) {
  //       lastChecked.classList.remove("checked");
  //       lastChecked = this;
  //     } else {
  //       lastChecked = this;
  //     }
  //   });
  // });

  // console.log(allProudctsItems);
})();

let val = 100000;
let pledges = 89914;
let backers = 5007;
let daysLeft = 56;
let remaining = val - pledges;
let percentage = (pledges / val) * 100;

let moneyCount = document.querySelector(
  ".card__counter--money .counter__currentAmount"
);
let backersCount = document.querySelector(
  ".card__counter--backers-count .counter__currentAmount"
);
let percentageBar = document.querySelector(".progress-bar__done-progress");

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
let target = document.querySelector(".campaign-card");
let observer = new IntersectionObserver(callback, options);
observer.observe(target);

/**
 * 1)
 *
 *
 */
