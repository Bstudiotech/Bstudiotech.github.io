const STORAGE_KEY = "site_lang";

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.querySelector(".language");
  const button = document.querySelector(".language__block");
  const items = document.querySelectorAll(".language-content__element");

  // открыть / закрыть
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    lang.classList.toggle("language--open");
  });

  // выбор языка
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedLang = item.dataset.lang;

      localStorage.setItem(STORAGE_KEY, selectedLang);
      translateTo(selectedLang);

      lang.classList.remove("language--open");
    });
  });

  // клик вне блока
  document.addEventListener("click", () => {
    lang.classList.remove("language--open");
  });
});

/* ===== GOOGLE TRANSLATE ===== */

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ru",
      includedLanguages: "ru,en,kk,zh-CN",
      autoDisplay: false,
    },
    "google_translate_element"
  );

  // применяем сохранённый язык
  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang) translateTo(savedLang);
}

function translateTo(lang) {
  const timer = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
    clearInterval(timer);
  }, 100);
}
