document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".link--blue");
  const closeButtons = document.querySelectorAll(".modal-close");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // блокируем скролл
      }
    });
  });

  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  });

  // Закрытие при клике вне модалки
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
