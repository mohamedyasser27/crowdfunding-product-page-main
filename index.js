import anime from "./anime.es.js";
let totalNeededPleges = 100000;
let currentPledges = 89914;
let totalBackers = 5007;
let donePledgesPercentage = (currentPledges / totalNeededPleges) * 100;
let bookmarkStatus = false;
let checkedProjectCache = null;

const DomManipulation = (function () {
  const sideMenuOpenBtn = document.querySelector(".side-menu__open-btn");
  const sideMenuCloseBtn = document.querySelector(".side-menu__close-btn");
  const sideMenu = document.querySelector(".side-menu");
  const bookmarkStatusElement = document.querySelector(
    ".bookmark-area__bookmark-status"
  );
  const cover = document.querySelector(".cover");
  const projectCardBookmarkBtn = document.querySelector(
    ".bookmark-area__bookmark-btn"
  );
  const backProjectBtn = document.querySelector(
    ".project-card__back-project-btn"
  );
  const selectProductModal = document.querySelector(".select-product-modal");
  const modalCloseBtn = document.querySelector(".modal__close-btn");
  const productCardSelectBtns = Array.from(
    document.querySelectorAll(".product-card__select-btn")
  );
  const productCards = Array.from(
    document.querySelectorAll(".purchasing-product-card")
  );

  const finishPaymentBtns = Array.from(
    document.querySelectorAll(".payment-section__finish-payment-btn")
  );
  const totalMoneyCount = document.querySelector(
    ".card__counter--money .counter__currentAmount span"
  );

  const totalBackersCount = document.querySelector(
    ".card__counter--backers-count .counter__currentAmount"
  );

  let successPaymentWindow = document.querySelector(".success-payment");
  console.log(successPaymentWindow);

  let closeThankyouWindowBtn = document.querySelector(
    ".success-payment .finish-btn"
  );

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectProductCardEventHandler(card.classList[1]);
    });
  });

  const selectProductCardEventHandler = (cardName) => {
    let card = document.querySelector(`.${cardName}`);
    if (!card.classList.contains("purchasing-product-card--unavailable")) {
      if (checkedProjectCache == null) {
        checkedProjectCache = card;
      } else {
        checkedProjectCache.classList.toggle("selected");
        checkedProjectCache.querySelector("input").checked = true;
      }

      card.querySelector("input").checked = true;
      card.classList.toggle("selected");
      checkedProjectCache = card;
    }
  };
  const toggleSelectProductModal = () => {
    selectProductModal.classList.toggle("invisible");
    window.location =
      ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") +
      "#selectionWindow";
  };
  const toggleSideMenuEventHandler = () => {
    cover.classList.toggle("invisible");
    sideMenu.classList.toggle("invisible");
    sideMenuCloseBtn.classList.toggle("invisible");
    sideMenuOpenBtn.classList.toggle("invisible");
  };
  const toggleBookmarkStatusHandler = () => {
    bookmarkStatusElement.textContent = bookmarkStatus
      ? "bookmark"
      : "bookmarked";

    bookmarkStatus = !bookmarkStatus;
    if (bookmarkStatus) {
      projectCardBookmarkBtn.classList.add("bookmarked");
    } else {
      projectCardBookmarkBtn.classList.remove("bookmarked");
    }
  };
  const addPledgeEventHandler = (pledgeAmount, specificProductName) => {
    let quantityLeftElement = Array.from(
      document.querySelectorAll(`.${specificProductName} span`)
    );
    quantityLeftElement.forEach((ele) => {
      ele.textContent = `${ele.textContent - 1} `;
    });
    totalBackers++;
    currentPledges += Number(pledgeAmount);
    totalBackersCount.textContent = totalBackers;
    totalMoneyCount.textContent = currentPledges;
    donePledgesPercentage = (currentPledges / totalNeededPleges) * 100;
  };

  sideMenuOpenBtn.addEventListener("click", toggleSideMenuEventHandler);
  sideMenuCloseBtn.addEventListener("click", toggleSideMenuEventHandler);

  projectCardBookmarkBtn.addEventListener("click", toggleBookmarkStatusHandler);

  modalCloseBtn.addEventListener("click", toggleSelectProductModal);
  backProjectBtn.addEventListener("click", toggleSelectProductModal);
  productCardSelectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleSelectProductModal();
      selectProductCardEventHandler(
        btn.parentElement.parentElement.classList[1]
      );
    });
  });

  finishPaymentBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let moneyAmountInput =
        btn.previousElementSibling.querySelector("input").value;
      if (moneyAmountInput == "") {
        btn.previousElementSibling.classList.add("wrongAmount");
      } else {
        toggleSelectProductModal();
        addPledgeEventHandler(
          moneyAmountInput,
          btn.parentElement.parentElement.parentElement.classList[1]
        );
        btn.previousElementSibling.classList.remove("wrongAmount");
        successPaymentWindow.classList.toggle("invisible");
      }
      window.location =
        ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") +
        "#successWindow";
    });
  });
  closeThankyouWindowBtn.addEventListener("click", () => {
    successPaymentWindow.classList.add("invisible");
    AnimateCampaignCard();
  });
})();

function AnimateCampaignCard() {
  let moneyCount = document.querySelector(
    ".card__counter--money .counter__currentAmount span"
  );
  moneyCount.textContent = 0;
  let backersCount = document.querySelector(
    ".card__counter--backers-count .counter__currentAmount"
  );
  backersCount.textContent = 0;

  let percentageBar = document.querySelector(".progress-bar__done-progress");
  percentageBar.style.width = 0;
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
        .add({ targets: moneyCount, textContent: `${[currentPledges]}` }, 0)
        .add({ targets: backersCount, textContent: `${totalBackers}` }, 0)
        .add(
          {
            targets: percentageBar,
            width: `${
              donePledgesPercentage > 100 ? 100 : donePledgesPercentage
            }%`,
          },
          0
        );
      observer.unobserve(target);
    }
  };
  let target = document.querySelector(".campaign-card");
  let observer = new IntersectionObserver(callback, options);
  observer.observe(target);
}

AnimateCampaignCard();
