
var form = document.getElementById("form");
var fullName = document.getElementById("fullname");
var email = document.getElementById("email");
var number = document.getElementById("number");
var state = document.getElementById("state");
var city = document.getElementById("city");
var captcha = document.getElementById("captcha");
var term = document.getElementById("term");
var url = getUrl();

// error id's
var fullNameError = document.getElementById("fullnameError");
var emailError = document.getElementById("emailError");
var numberError = document.getElementById("numberError");
var stateError = document.getElementById("stateError");
var cityError = document.getElementById("cityError");
var captchaError = document.getElementById("captchaError");
var termError = document.getElementById("termError");


// form modal
const formModal = document.getElementById("formModal");
const formMessageCard = document.getElementById("formMessageCard");


form.addEventListener("submit", (event) => {

    event.preventDefault();

    fullNameError.textContent = "";
    emailError.textContent = "";
    numberError.textContent = "";
    stateError.textContent = "";
    cityError.textContent = "";

    const isFormValid = checkFormInputFields();

    if (isFormValid) {

        var formData = new FormData();

        formData.append("name", fullName.value.trim())
        formData.append("email", email.value.trim())
        formData.append("number", number.value)
        formData.append("state", state.value)
        formData.append("city", city.value)
        formData.append("url", url)

        const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

        localStorage.setItem('formData', formDataJsonString);


        // api code

        var apiUrl = "https://service.letsupgrade.in/v2/itm/isu/leads";

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": fullName.value.trim(),
                "email": email.value.trim(),
                "number": number.value,
                "state": state.value,
                "city": city.value,
                "url": url
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(function (response) {
                console.log(response);
                form.reset();
                // window.location.href = "https://www.itm.edu/thankyou/itm-skills-university-b.tech-cse-thank-you-page"
            })
            .catch(error => {
                console.error("Error:", error);
                formPopup();
            });
    }

});

function formPopup() {
    formModal.style.display = "flex";

    setTimeout(() => {
        formModal.style.display = 'none';
    }, 3000)

}

function checkFormInputFields() {
    // Function to check if a field is empty
    const checkEmptyField = (value, errorElement, errorMessage) => {
        if (value.trim() === "") {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    const checkFullNameValidity = (fullnameValue, errorElement, errorMessage) => {
        if (!isValidFullName(fullnameValue.trim())) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    // Function to check email validity
    const checkEmailValidity = (emailValue, errorElement, errorMessage) => {
        if (!isValidEmail(emailValue.trim())) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    // Function to check phone number validity
    const checkPhoneNumberValidity = (numberValue, errorElement, errorMessage) => {
        if (!isValidPhoneNumber(numberValue.trim())) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    // Function to check captcha validity
    const checkCaptchaValidity = (captchaValue, errorElement, errorMessage) => {
        if (!validateCaptcha(captchaValue.trim())) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    // Function to check ter, validity
    const checkTermValidity = (termValue, errorElement, errorMessage) => {
        if (!term.checked) {
            termError.textContent = errorMessage;
            return; // Exit the function
        } else {
            errorElement.textContent = "";
            return true;
        }
    };


    // Check each form field
    const isFullNameValid = checkEmptyField(fullName.value, fullNameError, "Full Name is Required") &&
        checkFullNameValidity(fullName.value, fullNameError, "Name Cannot be number, Enter a Valid Name");
    const isEmailValid = checkEmptyField(email.value, emailError, "Email is Required") &&
        checkEmailValidity(email.value, emailError, "Invalid! Enter a proper email id");
    const isNumberValid = checkEmptyField(number.value, numberError, "Number is Required") &&
        checkPhoneNumberValidity(number.value, numberError, "Invalid! Enter a 10-digit Mobile Number");
    const isStateValid = checkEmptyField(state.value, stateError, "State is Required");
    const isCityValid = checkEmptyField(city.value, cityError, "City is Required");
    const isCaptchaValid = checkEmptyField(captcha.value, captchaError, "Captcha is Required") &&
        checkCaptchaValidity(captcha.value, captchaError, "Invalid! Captcha");
    const isTermValid = checkTermValidity(term.value, termError, "Term & Condition need to Checked Required");

    // Return true if all fields are valid, otherwise false
    return isFullNameValid && isEmailValid && isNumberValid && isStateValid && isCityValid && isCaptchaValid && isTermValid;
}

function isValidFullName(name) {
    const digitRegex = /\d/;

    if (digitRegex.test(name)) {
        return false;
    }
    return true;
}

function isValidEmail(email) {
    // Basic email validation using regular expression
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phone) {
    // Phone number validation using regular expression
    var phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

function generateCaptcha() {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captchaLength = 6;
    let captcha = "";
    for (let i = 0; i < captchaLength; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
}

function insertCaptcha() {
    const captchaContainer = document.getElementById("captchaImage");
    const captcha = generateCaptcha();
    captchaContainer.src = `https://dummyimage.com/120x40/fff/000?text=${captcha}`;
    captchaContainer.alt = "CAPTCHA Image";
    document.getElementById("captcha").value = "";
    document.getElementById("captcha").focus();
    document.getElementById("captcha").dataset.captcha = captcha;
}
// Validate CAPTCHA
function validateCaptcha() {
    const userInput = document.getElementById("captcha").value.trim();
    const captchaValue = document.getElementById("captcha").dataset.captcha;
    return userInput === captchaValue;
}

document.getElementById("refreshCaptchaBtn").addEventListener("click", function () {
    insertCaptcha();
});
insertCaptcha();

function getUrl() {
    let url = window.location.href;
    let urlParams = window.location.search;
    return url + urlParams;

}


