import './pages/index.css';

const form = document.forms.form;
const containers = form.getElementsByClassName("form__container");
const popup = document.querySelector(".popup");
const popupSuccess = document.querySelector(".popup__container");
const popupLoading = document.querySelector(".popup__loading-container");
let step = 1;

function nextQuestion() {
  showQuestion(step += 1);
}

function previousQuestion() {
  showQuestion(step -= 1);
}

function showQuestion(n) {

  let containers = document.getElementsByClassName("form__container");

  if (step < containers.length) {

    const buttonNext = containers[step - 1].querySelector(".form__next");
    const buttonBack = containers[step - 1].querySelector(".form__back");

    buttonNext.addEventListener("click", nextQuestion)
    buttonBack.addEventListener("click", previousQuestion)

  }

  for (let container of containers) {
    container.classList.remove("form__container_active")
  }

  containers[step - 1].classList.add("form__container_active")

  if (step > 1) {
    containers[step - 2].classList.add("form__container_skipped")
    containers[step - 1].classList.remove("form__container_skipped")
  }

  if (step === 1) {
    containers[step - 1].classList.remove("form__container_skipped")
  }

}

for (let container of containers) {

  const labels = container.getElementsByClassName("form__label");

  for (let label of labels) {

    label.addEventListener('click', ()=>{
      for (let label of labels) {
        label.classList.remove("form__label_active")
      }
      label.classList.add("form__label_active")
    });
  }

  const radios = container.getElementsByClassName('form__radio');
  const buttonNext = container.querySelector(".form__next");

    function buttonActivation(evt) {
      buttonNext.classList.add("form__next_active")
      nextQuestion()
    }

    for (let radio of radios) {
      radio.addEventListener('change', buttonActivation);
    }
}

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  Promise.resolve()
  .then(function () {
    popup.classList.add("popup_opened")
    popupLoading.classList.add("popup__loading-container_opened")
  })
  .then(function () {
    setTimeout(function() {
      popupLoading.classList.remove("popup__loading-container_opened")
      popupSuccess.classList.add("popup__container_opened")
    }, 1000)
  }) 
}); 

showQuestion(step);