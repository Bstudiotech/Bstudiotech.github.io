document.addEventListener("DOMContentLoaded", () => {
  const langBlock = document.querySelector(".language");
  const langButton = document.querySelector(".language__block");
  const langItems = document.querySelectorAll(".language-content__element");

  langButton.addEventListener("click", (e) => {
    e.stopPropagation();
    langBlock.classList.toggle("language--open");
  });

  langItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = btn.dataset.lang;
      if (lang) setLang(lang);
      langBlock.classList.remove("language--open");
    });
  });

  document.addEventListener("click", () => {
    langBlock.classList.remove("language--open");
  });
});

/* ================== TRANSLATE ================== */

const LANG_DEFAULT = "ru";
const STORAGE_KEY = "site_lang";
const RESET_KEY = "gt_reset";
const LANGS = ["ru", "en", "kk", "zh-CN"];

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ru",
      includedLanguages: "en,kk,zh-CN",
      autoDisplay: false,
    },
    "google_translate_element"
  );

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

function waitForSelect(cb, tries = 0) {
  const timer = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      clearInterval(timer);
      cb(select);
    }
    if (tries++ > 50) clearInterval(timer);
  }, 100);
}

window.setLang = function (lang, save = true) {
  if (!LANGS.includes(lang)) return;

  updateButtons(lang);
  if (save) localStorage.setItem(STORAGE_KEY, lang);

  // ===== RU RESET =====
  if (lang === LANG_DEFAULT) {
    document.cookie =
      "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "googtrans=; path=/ru; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    sessionStorage.setItem(RESET_KEY, "1");
    location.reload();
    return;
  }

  // ===== TRANSLATE =====
  waitForSelect((select) => {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  });
};

function updateButtons(activeLang) {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const isActive = btn.dataset.lang === activeLang;
    btn.classList.toggle("active", isActive);
    btn.disabled = isActive;
  });
}
