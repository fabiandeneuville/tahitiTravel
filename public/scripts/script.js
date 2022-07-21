"use strict";
/******************** GLOBAL VARIABLES ********************/
let activeSlide = 0;
const pickedActivities = [];
let nameIsValide = false;
let emailIsValide = false;
let phoneIsValide = false;
/******************** REGEXP ********************/
const nameRegexp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const firstNameRegexp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const emailRegexp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
const phoneRegexp = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
/******************** DOM ELEMENTS SELECTION *********************/
/********** WELCOME MESSAGE **********/
const welcomeMessage = document.querySelector('.welcome-message');
const welcomeMessageButton = document.querySelector('.welcome-message-button');
/********** FORM ***********/
const form = document.querySelector('.form');
const formSlideHeading = document.querySelectorAll('.form-slide-heading');
const formSubmitButton = document.querySelector('.send-form-btn');
const activitiesButton = document.querySelectorAll('.activity-button');
/********** CONFIRMATION **********/
const confirmation = document.querySelector('.confirmation');
// INPUTS 
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const numberInput = Array.from(document.querySelectorAll('.number-input'));
// ERROR MESSAGES
const nameError = document.querySelector('.name-error-message');
const emailError = document.querySelector('.email-error-message');
const phoneError = document.querySelector('.phone-error-message');
/********** SLIDER **********/
const slides = document.querySelectorAll('.form-slide');
const slidesArray = Array.from(slides);
const sliderButton = document.querySelectorAll('.slider-button');
const sliderButtonIcons = document.querySelectorAll('.slider-button i');
const sliderButtonIconsArray = Array.from(sliderButtonIcons);
const sliderButtonArray = Array.from(sliderButton);
const slider = document.querySelector('.form-slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
/******************** LISTENERS ********************/
/********** WELCOME MESSAGE BUTTON **********/
welcomeMessageButton.addEventListener('click', displayForm);
welcomeMessageButton.addEventListener('keypress', displayForm);
/********** FORM **********/
form.addEventListener('input', activateSubmitButton);
formSubmitButton.addEventListener('click', () => {
    form.style.display = "none";
    confirmation.style.display = "block";
});
formSubmitButton.addEventListener('keypress', () => {
    form.style.display = "none";
    confirmation.style.display = "block";
});
/********** ACTIVITY BUTTONS ***********/
activitiesButton.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('picked');
        if (pickedActivities.includes(button.dataset.name)) {
            for (let i = 0; i < pickedActivities.length; i++) {
                if (pickedActivities[i] === button.dataset.name) {
                    pickedActivities.splice(i, 1);
                }
            }
        }
        else {
            pickedActivities.push(button.dataset.name);
        }
    });
    button.addEventListener('keypress', () => {
        button.classList.toggle('picked');
        if (pickedActivities.includes(button.dataset.name)) {
            for (let i = 0; i < pickedActivities.length; i++) {
                if (pickedActivities[i] === button.dataset.name) {
                    pickedActivities.splice(i, 1);
                }
            }
        }
        else {
            pickedActivities.push(button.dataset.name);
        }
    });
});
/******************** FUNCTIONS ********************/
/********** FORM DISPLAY FUNCTION **********/
function displayForm() {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.zIndex = "-1";
    form.style.opacity = "1";
    form.style.zIndex = "1";
    displaySubmitButton();
    formSlideHeading.forEach((element) => {
        element.style.opacity = "1";
    });
}
;
/********** FORM INPUTS VALIDATION **********/
numberInput.forEach((input) => {
    input.addEventListener('change', () => {
        let value = parseInt(input.value);
        if (value < 0) {
            input.value = "0";
            input.style.border = "2px solid crimson";
        }
        else {
            input.style.border = "2px solid rgb(116,191,229)";
        }
    });
});
nameInput.addEventListener('input', () => {
    if (nameRegexp.test(nameInput.value)) {
        nameError.innerText = "";
        nameIsValide = true;
    }
    else if (!nameRegexp.test(nameInput.value)) {
        nameError.innerText = "Saisie invalide !";
        nameIsValide = false;
    }
});
emailInput.addEventListener('input', () => {
    if (emailRegexp.test(emailInput.value)) {
        emailError.innerText = "";
        emailIsValide = true;
    }
    else if (!emailRegexp.test(emailInput.value)) {
        emailError.innerText = "Saisie invalide !";
        emailIsValide = false;
    }
});
phoneInput.addEventListener('input', () => {
    if (phoneRegexp.test(phoneInput.value)) {
        phoneError.innerText = "";
        phoneIsValide = true;
    }
    else if (!phoneRegexp.test(phoneInput.value)) {
        phoneError.innerText = "Saisie invalide !";
        phoneIsValide = false;
    }
});
/********** FORM SUBMIT HANDLING **********/
function activateSubmitButton() {
    if (nameIsValide && emailIsValide && phoneIsValide) {
        formSubmitButton.classList.add('show-send-form-btn');
        formSubmitButton.setAttribute("tabindex", "0");
    }
    else if (!nameIsValide || !emailIsValide || !phoneIsValide) {
        formSubmitButton.classList.remove('show-send-form-btn');
        formSubmitButton.setAttribute("tabindex", "-1");
    }
}
function displaySubmitButton() {
    if (activeSlide !== 5) {
        formSubmitButton.style.display = "none";
    }
    else {
        formSubmitButton.style.display = "block";
    }
}
/********** FOOTER DATE SETTING FUNCTION ***********/
footerDateSetting();
function footerDateSetting() {
    const year = document.querySelector('.year');
    const currentDate = new Date;
    const currentYear = currentDate.getFullYear();
    year.textContent = `${currentYear}`;
}
/********** SLIDER HANDLING **********/
checkActiveSlide();
checkArrowsDisplay();
for (let i = 0; i < sliderButtonArray.length; i++) {
    sliderButtonArray[i].addEventListener('click', () => {
        const xIndex = -(Number(i + "00") / 6);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        displaySubmitButton();
        checkActiveSlide();
        checkArrowsDisplay();
    });
    sliderButtonArray[i].addEventListener('keypress', () => {
        const xIndex = -(Number(i + "00") / 6);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        displaySubmitButton();
        checkActiveSlide();
        checkArrowsDisplay();
    });
}
function checkActiveSlide() {
    for (let i = 0; i < sliderButtonIconsArray.length; i++) {
        if (activeSlide === i) {
            sliderButtonIconsArray[i].style.color = "rgb(116,191,229)";
            sliderButtonIconsArray[i].style.transform = "scale(1.7)";
            slidesArray[i].classList.add('showSlide');
            setTabindex(slidesArray[i], "0");
        }
        else {
            sliderButtonIconsArray[i].style.color = "rgb(241, 233, 212)";
            sliderButtonIconsArray[i].style.transform = "scale(1)";
            slidesArray[i].classList.remove('showSlide');
            setTabindex(slidesArray[i], "-1");
        }
    }
}
function checkArrowsDisplay() {
    if (activeSlide === 0) {
        leftArrow.classList.add('hidden');
        rightArrow.classList.remove('hidden');
    }
    else if (activeSlide === 5) {
        leftArrow.classList.remove('hidden');
        rightArrow.classList.add('hidden');
    }
    else {
        leftArrow.classList.remove('hidden');
        rightArrow.classList.remove('hidden');
    }
}
leftArrow.addEventListener('click', () => {
    activeSlide -= 1;
    const xIndex = Number(activeSlide + "00") / 6;
    slider.style.transform = `translateX(-${xIndex}%)`;
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});
leftArrow.addEventListener('keypress', () => {
    activeSlide -= 1;
    const xIndex = Number(activeSlide + "00") / 6;
    slider.style.transform = `translateX(-${xIndex}%)`;
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});
rightArrow.addEventListener('click', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide + "00") / 6;
    slider.style.transform = `translateX(-${xIndex}%)`;
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});
rightArrow.addEventListener('keypress', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide + "00") / 6;
    slider.style.transform = `translateX(-${xIndex}%)`;
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});
function setTabindex(slide, value) {
    const tabInputs = slide.querySelectorAll('.tab-input');
    tabInputs.forEach((input) => {
        input.setAttribute('tabindex', value);
    });
}
