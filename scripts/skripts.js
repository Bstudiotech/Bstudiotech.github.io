document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu");
  const closeButton = document.querySelector(".menu__close");
  const body = document.body;
  const header = document.querySelector(".header");

  const scrollThreshold = 50;
  const maxRadius = 24;

  function toggleMenu() {
    const isActive = burgerButton.classList.contains("burger--active");

    burgerButton.classList.toggle("burger--active");
    burgerButton.classList.toggle("burger--out", isActive);
    menu.classList.toggle("menu--active");

    if (isActive) {
      burgerButton.classList.remove("burger--opened");
    } else {
      burgerButton.classList.add("burger--opened");
    }
  }
  function closeMenu() {
    burgerButton.classList.remove("burger--active");
    burgerButton.classList.add("burger--out");
    menu.classList.remove("menu--active");
    burgerButton.classList.remove("burger--opened");
  }

  function handleScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > scrollThreshold) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    const radius = Math.min(
      (currentScrollTop / scrollThreshold) * maxRadius,
      maxRadius
    );
    header.style.borderRadius = `0 0 ${radius}px ${radius}px`;
  }

  burgerButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", closeMenu);

  const menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  menu.addEventListener("click", function (e) {
    if (e.target === menu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("scroll", handleScroll);

  handleScroll();
});

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
}
