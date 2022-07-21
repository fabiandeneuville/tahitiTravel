/******************** GLOBAL VARIABLES ********************/ 

let activeSlide : number = 0;

const pickedActivities : string[] = [];

let nameIsValide : boolean = false;
let emailIsValide : boolean = false;                    
let phoneIsValide : boolean = false;

/******************** REGEXP ********************/

const nameRegexp : RegExp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const firstNameRegexp : RegExp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
const emailRegexp : RegExp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
const phoneRegexp : RegExp = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

/******************** DOM ELEMENTS SELECTION *********************/

/********** WELCOME MESSAGE **********/

const welcomeMessage = document.querySelector('.welcome-message') as HTMLDivElement;
const welcomeMessageButton = document.querySelector('.welcome-message-button') as HTMLDivElement;

/********** FORM ***********/

const form = document.querySelector('.form') as HTMLFormElement;
const formSlideHeading = document.querySelectorAll('.form-slide-heading') as NodeListOf<HTMLHeadingElement>;
const formSubmitButton = document.querySelector('.send-form-btn') as HTMLDivElement;

const activitiesButton = document.querySelectorAll('.activity-button') as NodeListOf<HTMLDivElement>;

/********** CONFIRMATION **********/

const confirmation = document.querySelector('.confirmation') as HTMLDivElement;

// INPUTS 
const nameInput = document.querySelector('#name') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const phoneInput = document.querySelector('#phone') as HTMLInputElement;
const numberInput : HTMLInputElement[] = Array.from(document.querySelectorAll('.number-input') as NodeListOf<HTMLInputElement>)

// ERROR MESSAGES
const nameError = document.querySelector('.name-error-message') as HTMLParagraphElement;
const emailError = document.querySelector('.email-error-message') as HTMLParagraphElement;
const phoneError = document.querySelector('.phone-error-message') as HTMLParagraphElement;

/********** SLIDER **********/

const slides = document.querySelectorAll('.form-slide') as NodeListOf<HTMLDivElement>;
const slidesArray : HTMLDivElement[] = Array.from(slides);
const sliderButton = document.querySelectorAll('.slider-button') as NodeListOf<HTMLDivElement>;
const sliderButtonIcons = document.querySelectorAll('.slider-button i') as NodeListOf<HTMLParagraphElement>;
const sliderButtonIconsArray : HTMLParagraphElement[] = Array.from(sliderButtonIcons);
const sliderButtonArray : HTMLDivElement[] = Array.from(sliderButton);
const slider = document.querySelector('.form-slider') as HTMLDivElement;
const leftArrow = document.querySelector('.left') as HTMLDivElement;
const rightArrow = document.querySelector('.right') as HTMLDivElement;

/******************** LISTENERS ********************/

/********** WELCOME MESSAGE BUTTON **********/ 

welcomeMessageButton.addEventListener('click', displayForm);
welcomeMessageButton.addEventListener('keypress', displayForm);

/********** FORM **********/

form.addEventListener('input', activateSubmitButton);

formSubmitButton.addEventListener('click', () => {
    form.style.display = "none";
    confirmation.style.display = "block";
})

formSubmitButton.addEventListener('keypress', () => {
    form.style.display = "none";
    confirmation.style.display = "block";
})

/********** ACTIVITY BUTTONS ***********/

activitiesButton.forEach((button : HTMLDivElement) => {
    button.addEventListener('click', () => {
        button.classList.toggle('picked');
        if(pickedActivities.includes(button.dataset.name as string)){
            for(let i = 0 ; i < pickedActivities.length ; i++){
                if(pickedActivities[i] === button.dataset.name){
                    pickedActivities.splice(i, 1);
                }
            }
        } else {
            pickedActivities.push(button.dataset.name as string)
        }
    })
    button.addEventListener('keypress', () => {
        button.classList.toggle('picked');
        if(pickedActivities.includes(button.dataset.name as string)){
            for(let i = 0 ; i < pickedActivities.length ; i++){
                if(pickedActivities[i] === button.dataset.name){
                    pickedActivities.splice(i, 1);
                }
            }
        } else {
            pickedActivities.push(button.dataset.name as string)
        }
    })
});

/******************** FUNCTIONS ********************/ 

/********** FORM DISPLAY FUNCTION **********/

function displayForm() : void {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.zIndex = "-1"
    form.style.opacity = "1";
    form.style.zIndex = "1";
    displaySubmitButton();
    formSlideHeading.forEach((element : HTMLHeadingElement) => {
        element.style.opacity = "1"
    });
};

/********** FORM INPUTS VALIDATION **********/

numberInput.forEach((input : HTMLInputElement) => {
    input.addEventListener('change', () => {
        let value : number = parseInt(input.value);
        if(value < 0){
            input.value = "0"
            input.style.border = "2px solid crimson";
        } else {
            input.style.border = "2px solid rgb(116,191,229)";
        }
    })
})

nameInput.addEventListener('input', () => {
    if(nameRegexp.test(nameInput.value)){
        nameError.innerText = "";
        nameIsValide = true;
    } else if (!nameRegexp.test(nameInput.value)){
        nameError.innerText = "Saisie invalide !";
        nameIsValide = false;
    }
})

emailInput.addEventListener('input', () => {
    if(emailRegexp.test(emailInput.value)){
        emailError.innerText = "";
        emailIsValide = true;
    } else if (!emailRegexp.test(emailInput.value)){
        emailError.innerText = "Saisie invalide !";
        emailIsValide = false;
    }
})

phoneInput.addEventListener('input', () => {
    if(phoneRegexp.test(phoneInput.value)){
        phoneError.innerText = "";
        phoneIsValide = true;
    } else if (!phoneRegexp.test(phoneInput.value)){
        phoneError.innerText = "Saisie invalide !";
        phoneIsValide = false;
    }
})

/********** FORM SUBMIT HANDLING **********/

function activateSubmitButton() : void {
    if(nameIsValide && emailIsValide && phoneIsValide){
        formSubmitButton.classList.add('show-send-form-btn');
        formSubmitButton.setAttribute("tabindex", "0");
    } else if (!nameIsValide || !emailIsValide || !phoneIsValide){
        formSubmitButton.classList.remove('show-send-form-btn');
        formSubmitButton.setAttribute("tabindex", "-1");
    }
}

function displaySubmitButton() : void {
    if(activeSlide !== 5){
        formSubmitButton.style.display = "none";
    } else {
        formSubmitButton.style.display = "block";
    }
}

/********** FOOTER DATE SETTING FUNCTION ***********/

footerDateSetting();
function footerDateSetting() : void{
    const year = document.querySelector('.year') as HTMLSpanElement;
    const currentDate = new Date as Date;
    const currentYear : number = currentDate.getFullYear();
    year.textContent = `${currentYear}`;
}

/********** SLIDER HANDLING **********/

checkActiveSlide();
checkArrowsDisplay();

for(let i = 0 ; i < sliderButtonArray.length ; i++){
    sliderButtonArray[i].addEventListener('click', () => {
        const xIndex = - (Number(i + "00") / 6);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        displaySubmitButton();
        checkActiveSlide();
        checkArrowsDisplay();
    })
    sliderButtonArray[i].addEventListener('keypress', () => {
        const xIndex = - (Number(i + "00") / 6);
        slider.style.transform = `translateX(${xIndex}%)`;
        activeSlide = i;
        displaySubmitButton();
        checkActiveSlide();
        checkArrowsDisplay();
    })
}

function checkActiveSlide() : void {
    for(let i = 0; i < sliderButtonIconsArray.length ; i++){
        if(activeSlide === i){
            sliderButtonIconsArray[i].style.color = "rgb(116,191,229)";
            sliderButtonIconsArray[i].style.transform = "scale(1.7)";
            slidesArray[i].classList.add('showSlide');
            setTabindex(slidesArray[i], "0");
        } else {
            sliderButtonIconsArray[i].style.color = "rgb(241, 233, 212)";
            sliderButtonIconsArray[i].style.transform = "scale(1)";
            slidesArray[i].classList.remove('showSlide');
            setTabindex(slidesArray[i], "-1");
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
    displaySubmitButton();
});

leftArrow.addEventListener('keypress', () => {
    activeSlide -= 1;
    const xIndex = Number(activeSlide+"00")/6;
    slider.style.transform = `translateX(-${xIndex}%)`
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});

rightArrow.addEventListener('click', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide+"00")/6;
    slider.style.transform = `translateX(-${xIndex}%)`
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});

rightArrow.addEventListener('keypress', () => {
    activeSlide += 1;
    const xIndex = Number(activeSlide+"00")/6;
    slider.style.transform = `translateX(-${xIndex}%)`
    checkArrowsDisplay();
    checkActiveSlide();
    displaySubmitButton();
});

function setTabindex(slide : HTMLDivElement, value : string) : void {
    const tabInputs = slide.querySelectorAll('.tab-input') as NodeListOf<HTMLElement>;
    tabInputs.forEach((input : HTMLElement) => {
        input.setAttribute('tabindex', value);
    })
}