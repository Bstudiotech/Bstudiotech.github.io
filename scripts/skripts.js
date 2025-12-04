document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu");
  const closeButton = document.querySelector(".menu__close");
  const body = document.body;
  const header = document.querySelector(".header");

  // Переменная для отслеживания предыдущей позиции скролла
  let lastScrollTop = 0;
  // Порог скролла для добавления класса (в пикселях)
  const scrollThreshold = 50;

  function toggleMenu() {
    burgerButton.classList.toggle("burger--active");
    menu.classList.toggle("menu--active");
  }

  function closeMenu() {
    menu.classList.remove("menu--active");
    burgerButton.classList.remove("burger--active");
  }

  // Функция для обработки скролла
  function handleScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Проверяем, проскроллили ли мы больше порогового значения
    if (currentScrollTop > scrollThreshold) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    lastScrollTop = currentScrollTop;
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

  // Добавляем обработчик скролла
  window.addEventListener("scroll", handleScroll);

  // Вызываем один раз при загрузке для начального состояния
  handleScroll();
});
