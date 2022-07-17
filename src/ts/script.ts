/******************** DOM ELEMENTS SELECTION *********************/

// WELCOME MESSAGE
const welcomeMessage = document.querySelector('.welcome-message') as HTMLDivElement;
const welcomeMessageButton = document.querySelector('.welcome-message-button') as HTMLDivElement;

// FORM
const form = document.querySelector('.form') as HTMLFormElement;
const formSlideHeading = document.querySelectorAll('.form-slide-heading') as NodeListOf<HTMLHeadingElement>;

// SLIDER
const sliderButton = document.querySelectorAll('.slider-button') as NodeListOf<HTMLDivElement>;
const sliderButtonIcons = document.querySelectorAll('.slider-button i') as NodeListOf<HTMLParagraphElement>;
const sliderButtonIconsArray : HTMLParagraphElement[] = Array.from(sliderButtonIcons);
const sliderButtonArray : HTMLDivElement[] = Array.from(sliderButton);
const slider = document.querySelector('.form-slider') as HTMLDivElement;
const leftArrow = document.querySelector('.left') as HTMLDivElement;
const rightArrow = document.querySelector('.right') as HTMLDivElement;

/******************** LISTENERS ********************/

// WELCOME MESSAGE BUTTON
welcomeMessageButton.addEventListener('click', displayForm)

/******************** FUNCTIONS ********************/ 

// FORM DISPLAY FUNCTION
function displayForm() : void {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.zIndex = "-1"
    form.style.opacity = "1";
    form.style.zIndex = "1";
    formSlideHeading.forEach((element : HTMLHeadingElement) => {
        element.style.opacity = "1"
    });
};

// FOOTER DATE SETTING FUNCTION
footerDateSetting();
function footerDateSetting() : void{
    const year = document.querySelector('.year') as HTMLSpanElement;
    const currentDate = new Date as Date;
    const currentYear : number = currentDate.getFullYear();
    year.textContent = `${currentYear}`;
}

// SLIDER HANDLING
let activeSlide : number = 0;
checkActiveSlide();
checkArrowsDisplay();

for(let i = 0 ; i < sliderButtonArray.length ; i++){
    sliderButtonArray[i].addEventListener('click', () => {
        const xIndex = - (Number(i + "00") / 6);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        checkActiveSlide();
        checkArrowsDisplay();
    })
}

function checkActiveSlide() : void {
    for(let i = 0; i < sliderButtonIconsArray.length ; i++){
        if(activeSlide === i){
            sliderButtonIconsArray[i].style.color = "rgb(124,252,0)";
            sliderButtonIconsArray[i].style.transform = "scale(1.7)"
        } else {
            sliderButtonIconsArray[i].style.color = "rgb(241, 233, 212)";
            sliderButtonIconsArray[i].style.transform = "scale(1)"
        }
    }
}

function checkArrowsDisplay() : void {
    if(activeSlide === 0){
        leftArrow.classList.add('hidden');
        rightArrow.classList.remove('hidden');
    } else if (activeSlide === 5){
        leftArrow.classList.remove('hidden');
        rightArrow.classList.add('hidden');
    } else {
        leftArrow.classList.remove('hidden');
        rightArrow.classList.remove('hidden');
    }
}

leftArrow.addEventListener('click', () => {
    activeSlide -= 1;
    const xIndex = Number(activeSlide+"00")/6;
    slider.style.transform = `translateX(-${xIndex}%)`
    checkArrowsDisplay();
    checkActiveSlide();
});

rightArrow.addEventListener('click', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide+"00")/6;
    slider.style.transform = `translateX(-${xIndex}%)`
    checkArrowsDisplay();
    checkActiveSlide();
});