
document.addEventListener("DOMContentLoaded", function() {

  let themeButton = document.getElementById("theme-button");

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeButton.textContent = "Toggle Light Mode";
    } else {
      themeButton.textContent = "Toggle Dark Mode";
    }
  }

  themeButton.addEventListener("click", toggleDarkMode);

  //petition signatures counter
  let count = 3;


  const validateForm = (person) => {

    const validationRules = {
      name: { minLength: 2 },
      hometown: { noDigits: true },
      email: { contains: '.com' },
      cellphone: { pattern: /^\d{10,}$/ }
    };

    let containsErrors = false;

    for (const prop in person) {

      if (validationRules[prop]) {
        const value = person[prop];

        if (validationRules[prop].minLength && value.length < validationRules[prop].minLength) {
          containsErrors = true;
          document.getElementById(prop).classList.add('error');
        } else if (validationRules[prop].noDigits && /\d/.test(value)) {
          containsErrors = true;
          document.getElementById(prop).classList.add('error');
        } else if (validationRules[prop].contains && !value.includes(validationRules[prop].contains)) {
          containsErrors = true;
          document.getElementById(prop).classList.add('error');
        } else if (validationRules[prop].pattern && !validationRules[prop].pattern.test(value)) {
          containsErrors = true;
          document.getElementById(prop).classList.add('error');
        } else {
          document.getElementById(prop).classList.remove('error');
        }
      }
    }

    if (!containsErrors) {
      addSignature(person);

      const petitionInputs = document.getElementById("sign-petition").elements;
      for (let i = 0; i < petitionInputs.length; i++) {
        petitionInputs[i].value = "";
      }
    }
  }

  const signNowButton = document.getElementById("sign-now-button");
  signNowButton.addEventListener('click', () => {
    const person = {
      name: document.getElementById('name').value,
      hometown: document.getElementById('hometown').value,
      email: document.getElementById('email').value,
      cellphone: document.getElementById('cellphone').value
    };
    validateForm(person);
  });

  let scaleFactor = 1;
  const modalImage = document.getElementById("modal-image");

  const scaleImage = () => {
    scaleFactor = (scaleFactor === 1) ? 0.8 : 1;

    modalImage.style.transform = `scale(${scaleFactor})`;
  };

  const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex";

    modalContent.textContent = `Thank you so much ${person.name} for signing our petition!`;

    const intervalId = setInterval(scaleImage, 500);

    setTimeout(() => {
      modal.style.display = "none";

      clearInterval(intervalId);
    }, 3000);
  };

  const addSignature = (person) => {

    const newSignaturesContainer = document.getElementById("new-signatures");

    const signatureParagraph = document.createElement("p");

    signatureParagraph.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

    newSignaturesContainer.appendChild(signatureParagraph);

    const petitionInputs = document.getElementById("sign-petition").elements;
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }

    count = count + 1;


    const oldCounter = document.getElementById("counter");
    if (oldCounter) {
      oldCounter.remove();
    }

    const counterParagraph = document.createElement("p");
    counterParagraph.id = "counter";


    counterParagraph.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;


    newSignaturesContainer.appendChild(counterParagraph);

    toggleModal(person);
  };



  let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease',
  }

  let reducedAnimation = {
    revealDistance: 0,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '0s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease',
  }

  let revealableContainers = document.querySelectorAll(".revealable");

  const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {

      let windowHeight = window.innerHeight;

      let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
        revealableContainers[i].classList.add("active");

      } else {
        revealableContainers[i].classList.remove("active");
      }
    }
  }

  window.addEventListener('scroll', reveal);


  const reduceMotionButton = document.getElementById("reduce-motion");


  function reduceMotion() {
    for (let i = 0; i < revealableContainers.length; i++) {
      const container = revealableContainers[i];

      container.style.transition = reducedAnimation.transition;
      container.style.transitionDuration = reducedAnimation.transitionDuration;
      container.style.opacity = reducedAnimation.opacity;
      container.style.transitionDelay = reducedAnimation.transitionDelay;
    }
  }

  reduceMotionButton.addEventListener("click", reduceMotion);
});