"use strict";
/******************** GLOBAL VARIABLES ********************/
let activeSlide = 0;
const pickedActivities = [];
/******************** REGEXP ********************/
const nameRegexp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const firstNameRegexp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const emailRegexp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
/******************** DOM ELEMENTS SELECTION *********************/
/********** WELCOME MESSAGE **********/
const welcomeMessage = document.querySelector('.welcome-message');
const welcomeMessageButton = document.querySelector('.welcome-message-button');
/********** FORM ***********/
const form = document.querySelector('.form');
const formSlideHeading = document.querySelectorAll('.form-slide-heading');
const formSubmitButton = document.querySelector('.send-form-btn');
const activitiesButton = document.querySelectorAll('.activity-button');
/********** SLIDER **********/
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
            console.log(pickedActivities);
        }
        else {
            pickedActivities.push(button.dataset.name);
            console.log(pickedActivities);
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
/********** FORM SUBMIT HANDLING **********/
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
}
function checkActiveSlide() {
    for (let i = 0; i < sliderButtonIconsArray.length; i++) {
        if (activeSlide === i) {
            sliderButtonIconsArray[i].style.color = "rgb(124,252,0)";
            sliderButtonIconsArray[i].style.transform = "scale(1.7)";
        }
        else {
            sliderButtonIconsArray[i].style.color = "rgb(241, 233, 212)";
            sliderButtonIconsArray[i].style.transform = "scale(1)";
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
rightArrow.addEventListener('click', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide + "00") / 6;
    slider.style.transform = `translateX(-${xIndex}%)`;
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});
