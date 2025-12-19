document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu");
  const closeButton = document.querySelector(".menu__close");
  const body = document.body;
  const header = document.querySelector(".header");

  const scrollThreshold = 50; // Порог для класса
  const maxRadius = 24; // Максимальный радиус нижних углов

  function toggleMenu() {
    burgerButton.classList.toggle("burger--active");
    menu.classList.toggle("menu--active");
  }

  function closeMenu() {
    menu.classList.remove("menu--active");
    burgerButton.classList.remove("burger--active");
  }

  function handleScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Добавление/удаление класса
    if (currentScrollTop > scrollThreshold) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    // Плавное изменение border-radius нижних углов
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
    // Если в истории только текущая страница,
    // перенаправляем на главную или другую страницу
    window.location.href = "/";
  }
}
