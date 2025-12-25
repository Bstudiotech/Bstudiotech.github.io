document.addEventListener("DOMContentLoaded", function () {
  const languageBlock = document.querySelector(".language");
  const languageButton = document.querySelector(".language__block");
  const languageItems = document.querySelectorAll(
    ".language-content__element, [data-lang]"
  );

  // Открытие/закрытие при клике на кнопку языка
  if (languageButton) {
    languageButton.addEventListener("click", function () {
      languageBlock.classList.toggle("language--open");
    });
  }

  // Закрытие при клике на любой элемент выбора языка
  if (languageItems.length > 0) {
    languageItems.forEach((item) => {
      item.addEventListener("click", function () {
        languageBlock.classList.remove("language--open");

        // Здесь можно добавить вызов вашей функции setLang, если нужно
        const lang = this.getAttribute("data-lang");
        if (lang && window.setLang) {
          setLang(lang);
        }
      });
    });
  }

  // Закрытие при клике вне блока (опционально)
  document.addEventListener("click", function (event) {
    if (
      !languageBlock.contains(event.target) &&
      !event.target.closest(".language__block")
    ) {
      languageBlock.classList.remove("language--open");
    }
  });
});

const LANG_DEFAULT = "ru";
const LANGS = ["ru", "en", "kk", "zh-CN"];
const STORAGE_KEY = "site_lang";
const RESET_KEY = "gt_reset";

// ===== INIT =====
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ru",
      includedLanguages: "en,kk,zh-CN",
      autoDisplay: false,
    },
    "google_translate_element"
  );

  // если это возврат после RU — не переводим
  if (sessionStorage.getItem(RESET_KEY)) {
    sessionStorage.removeItem(RESET_KEY);
    updateButtons(LANG_DEFAULT);
    return;
  }

  const savedLang = localStorage.getItem(STORAGE_KEY) || LANG_DEFAULT;

  if (savedLang !== LANG_DEFAULT) {
    waitForSelect(() => setLang(savedLang, false));
  } else {
    updateButtons(LANG_DEFAULT);
  }
}

// ===== WAIT FOR GOOGLE SELECT =====
function waitForSelect(cb) {
  const i = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      clearInterval(i);
      cb(select);
    }
  }, 100);
}

// ===== SWITCH LANGUAGE =====
window.setLang = function (lang, save = true) {
  if (!LANGS.includes(lang)) return;

  if (save) localStorage.setItem(STORAGE_KEY, lang);
  updateButtons(lang);

  // ===== RU — ПОЛНЫЙ СБРОС =====
  if (lang === LANG_DEFAULT) {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.setItem(RESET_KEY, "1");
    location.reload();
    return;
  }

  // ===== EN / KZ / CN =====
  waitForSelect((select) => {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  });
};

// ===== BUTTON STATE =====
function updateButtons(activeLang) {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const isActive = btn.dataset.lang === activeLang;
    btn.classList.toggle("active", isActive);
    btn.disabled = isActive;
  });
}
