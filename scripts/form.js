emailjs.init("vwA7cTp_4nJfw_Zce");

const $modal = $(".form");
const $content = $(".form-content");
const $formBlock = $(".form-block").first();
const $thanks = $("#formThanks");
const $submit = $(".form-button--submit");

let scrollY = 0;

function setLoading(state) {
  $submit.toggleClass("is-loading", state).prop("disabled", state);
}

function openModal() {
  $modal.addClass("is-open");
}

function closeModal() {
  $modal.removeClass("is-open");
  setLoading(false);
  $("#consultForm")[0].reset();

  setTimeout(() => {
    $formBlock.removeClass("is-hidden");
    $thanks.addClass("is-hidden");
  }, 300);
}

function showThanks() {
  $formBlock.addClass("is-hidden");
  setTimeout(() => $thanks.removeClass("is-hidden"), 150);
}

$(".open-form-button").on("click", openModal);
$(".close, .form-button--close").on("click", closeModal);

$modal.on("click", (e) => {
  if (!$(e.target).closest(".form-content").length) closeModal();
});

$("#consultForm").on("submit", function (e) {
  e.preventDefault();
  setLoading(true);

  emailjs
    .send("service_v6kpnud", "template_vxp8xrr", {
      name: $('[name="name"]').val(),
      email: $('[name="email"]').val(),
      subject: $('[name="subject"]').val(),
      message: $('[name="message"]').val(),
    })
    .then(() => {
      setLoading(false);
      showThanks();
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
});
