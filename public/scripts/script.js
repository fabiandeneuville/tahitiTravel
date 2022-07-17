"use strict";
/******************** DOM ELEMENTS SELECTION *********************/
// WELCOME MESSAGE
const welcomeMessage = document.querySelector('.welcome-message');
const welcomeMessageButton = document.querySelector('.welcome-message-button');
// FORM
const form = document.querySelector('.form');
const formSlideHeading = document.querySelectorAll('.form-slide-heading');
// SLIDER
const sliderButton = document.querySelectorAll('.slider-button');
const sliderButtonIcons = document.querySelectorAll('.slider-button i');
const sliderButtonIconsArray = Array.from(sliderButtonIcons);
const sliderButtonArray = Array.from(sliderButton);
const slider = document.querySelector('.form-slider');
/******************** LISTENERS ********************/
// WELCOME MESSAGE BUTTON
welcomeMessageButton.addEventListener('click', displayForm);
/******************** FUNCTIONS ********************/
// FORM DISPLAY FUNCTION
function displayForm() {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.zIndex = "-1";
    form.style.opacity = "1";
    form.style.zIndex = "1";
    formSlideHeading.forEach((element) => {
        element.style.opacity = "1";
    });
}
;
// FOOTER DATE SETTING FUNCTION
footerDateSetting();
function footerDateSetting() {
    const year = document.querySelector('.year');
    const currentDate = new Date;
    const currentYear = currentDate.getFullYear();
    year.textContent = `${currentYear}`;
}
// SLIDER HANDLING
let activeSlide = 0;
checkActiveSlide();
for (let i = 0; i < sliderButtonArray.length; i++) {
    sliderButtonArray[i].addEventListener('click', () => {
        const xIndex = -(Number(i + "00") / 5);
        console.log(xIndex);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        checkActiveSlide();
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
