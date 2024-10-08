const maxHashtags = 5;
const maxHashtagLength = 20;
const maxCommentLength = 140;

const hashtagInput = document.querySelector(".text__hashtags");
const commentInput = document.querySelector(".text__description");

function validateHashtags() {
  const hashtags = hashtagInput.value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const hashtagRegex = /^#[a-zA-Z0-9]+$/;

  if (hashtags.length > maxHashtags) {
    hashtagInput.setCustomValidity(`Не більше ${maxHashtags} хеш-тегів.`);
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    if (!hashtagRegex.test(tag)) {
      hashtagInput.setCustomValidity(
        `Хеш-тег "${tag}" некоректний. Має починатися з # та складатися з літер і цифр.`
      );
      return false;
    }
    if (tag.length > maxHashtagLength) {
      hashtagInput.setCustomValidity(
        `Хеш-тег не повинен перевищувати ${maxHashtagLength} символів.`
      );
      return false;
    }
    if (hashtags.indexOf(tag) !== i) {
      hashtagInput.setCustomValidity(`Хеш-тег "${tag}" вже використано.`);
      return false;
    }
  }

  hashtagInput.setCustomValidity("");
  return true;
}

function validateComment() {
  if (commentInput.value.length > maxCommentLength) {
    commentInput.setCustomValidity(
      `Коментар не може бути більше ${maxCommentLength} символів.`
    );
    return false;
  }
  commentInput.setCustomValidity("");
  return true;
}

function closeForm() {
  document.querySelector("#upload-select-image").reset();
  hashtagInput.setCustomValidity("");
  commentInput.setCustomValidity("");
  document.querySelector(".img-upload__overlay").classList.add("hidden");
}

function closeBigPictureEsc(evt) {
  if (evt.key === "Escape") {
    closeForm();
  }
}

function resetStyles() {
  const imagePreview = document.querySelector(".img-upload__preview img");
  const scaleValue = document.querySelector(".scale__control--value");
  const sliderElement = document.querySelector(".effect-level__slider");
  const effectLevelValue = document.querySelector(".effect-level__value");

  let currentScale = 1;
  scaleValue.setAttribute("value", "100%");
  imagePreview.style.transform = `scale(${currentScale})`;

  imagePreview.style.filter = "none";
  imagePreview.className = "";

  sliderElement.classList.add("hidden");
  effectLevelValue.value = 0;

  document.querySelector("#effect-none").checked = true;
}

function uploadImage(evt){
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imagePreview = document.querySelector(".img-upload__preview img");
      imagePreview.src = e.target.result;
      resetStyles();
    };
    reader.readAsDataURL(file);
  }
}

export function events() {
  document.querySelector("#upload-file").addEventListener("change", uploadImage);

  document
    .querySelector("#upload-select-image")
    .addEventListener("submit", (event) => {
      const isHashtagValid = validateHashtags();
      const isCommentValid = validateComment();

      if (!isHashtagValid || !isCommentValid) {
        event.preventDefault();
      }
    });

  hashtagInput.addEventListener("input", validateHashtags);
  commentInput.addEventListener("input", validateComment);

  document.querySelector("#upload-cancel").addEventListener("click", closeForm);
  document.addEventListener("keydown", closeBigPictureEsc);

  document.querySelector("#upload-file").addEventListener("change", () => {
    document.querySelector(".img-upload__overlay").classList.remove("hidden");
  });

  hashtagInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
    }
  });

  commentInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
    }
  });
}
