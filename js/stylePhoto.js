function updateScale(currentScale, scaleValue) {
  const imagePreview = document.querySelector(".img-upload__preview img");
  scaleValue.setAttribute("value", `${currentScale * 100}%`);
  imagePreview.style.transform = `scale(${currentScale})`;
  console.log("Current scale:", currentScale);
}

export function changeImageScale() {
  const scaleValue = document.querySelector(".scale__control--value");
  const smallerButton = document.querySelector(".scale__control--smaller");
  const biggerButton = document.querySelector(".scale__control--bigger");
  let currentScale = 1;
  const step = 0.25;

  smallerButton.addEventListener("click", () => {
    if (currentScale > step) {
      currentScale = currentScale - step;
      updateScale(currentScale, scaleValue);
    }
  });

  biggerButton.addEventListener("click", () => {
    if (currentScale < 1) {
      currentScale = currentScale + step;
    }
    updateScale(currentScale, scaleValue);
  });

  updateScale(currentScale, scaleValue);
}

export function changeImageEffect() {
  const effectsRadio = document.querySelectorAll(".effects__radio");
  const imgPreview = document.querySelector(".img-upload__preview img");
  const sliderElement = document.querySelector(".effect-level__slider");
  const effectLevelValue = document.querySelector(".effect-level__value");

  const slider = noUiSlider.create(sliderElement, {
    start: 1,
    step: 0.1,
    connect: true,
    range: {
      min: 0,
      max: 1,
    },
  });

  const effects = {
    chrome: { filter: "grayscale", min: 0, max: 1, step: 0.1, unit: "" },
    sepia: { filter: "sepia", min: 0, max: 1, step: 0.1, unit: "" },
    marvin: { filter: "invert", min: 0, max: 100, step: 1, unit: "%" },
    phobos: { filter: "blur", min: 0, max: 3, step: 0.1, unit: "px" },
    heat: { filter: "brightness", min: 1, max: 3, step: 0.1, unit: "" },
    none: { filter: "", min: 0, max: 100, step: 1, unit: "" },
  };

  function updateFilter(effect, level) {
    if (effect === "none") {
      imgPreview.style.filter = "none";
    } else {
      // const filter = effects[effect].filter; 
      // const unit = effects[effect].unit;
      // деструктуризація
      const { filter, unit } = effects[effect];
      imgPreview.style.filter = `${filter}(${level}${unit})`;
    }
  }

  effectsRadio.forEach((effectRadio) => {
    effectRadio.addEventListener("change", (evt) => {
      const selectedEffect = evt.target.value;
      imgPreview.className = "";
      imgPreview.classList.add(`effects__preview--${selectedEffect}`);

      if (selectedEffect === 'none') {
        sliderElement.classList.add('hidden');
        imgPreview.style.filter = 'none';
      } else {
        sliderElement.classList.remove('hidden');
        const { min, max, step } = effects[selectedEffect];
        slider.updateOptions({
          start: max,
          step: step,
          range: {
            min: min,
            max: max
          }
        });
        updateFilter(selectedEffect, max);
        effectLevelValue.value = max;
      }
    });
  });

  slider.on('update', (values, handle) => {
    const selectedEffect = document.querySelector('.effects__radio:checked').value;
    const level = values[handle];
    effectLevelValue.value = level;
    updateFilter(selectedEffect, level);
  });

  document.querySelector('#effect-none').checked = true;
  sliderElement.classList.add('hidden');
}