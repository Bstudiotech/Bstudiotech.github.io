document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu");
  const closeButton = document.querySelector(".menu__close");
  const body = document.body;

  function toggleMenu() {
    burgerButton.classList.toggle("burger--active");
    menu.classList.toggle("menu--active");
    body.classList.toggle("no-scroll");
  }

  function closeMenu() {
    menu.classList.remove("menu--active");
    body.classList.remove("no-scroll");
    burgerButton.classList.remove("burger--active");
  }

  burgerButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", closeMenu);

  // Закрытие при клике на ссылку в меню
  const menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Закрытие при клике вне меню (опционально)
  menu.addEventListener("click", function (e) {
    if (e.target === menu) {
      closeMenu();
    }
  });

  // Закрытие при нажатии Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
});
