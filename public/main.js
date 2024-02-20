
var form = document.getElementById("form");
var fullName = document.getElementById("fullname");
var email = document.getElementById("email");
var number = document.getElementById("number");
var state = document.getElementById("state");
var city = document.getElementById("city");
var captcha = document.getElementById("captcha");
var url = getUrl('Google', 'Instagram', 'Btech2024');

// error id's
var fullNameError = document.getElementById("fullnameError");
var emailError = document.getElementById("emailError");
var numberError = document.getElementById("numberError");
var stateError = document.getElementById("stateError");
var cityError = document.getElementById("cityError");
var captchaError = document.getElementById("captchaError");




form.addEventListener("submit", (event) => {
    event.preventDefault();

    fullNameError.textContent = "";
    emailError.textContent = "";
    numberError.textContent = "";
    stateError.textContent = "";
    cityError.textContent = "";

    checkFormInputFields();



    var formData = new FormData();

    formData.append("name", fullName.value.trim())
    formData.append("email", email.value.trim())
    formData.append("number", number.value.trim())
    formData.append("state", state.value)
    formData.append("city", city.value)
    formData.append("url", url)

    const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

    // Save the JSON string to localStorage
    localStorage.setItem('formData', formDataJsonString);

    // api code

    // var apiUrl = "";

    // fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "name": fullname.value.trim(),
    //         "email": email.value.trim(),
    //         "number": number.value.trim(),
    //         "state": state.value.trim(),
    //         "city": city.value.trim(),
    //         "url": url
    //     })
    // })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         }
    //         return res.json();
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //         alert("Form submitted successfully!");
    //         form.reset();
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //         alert("Form submission failed. Please try again.");
    //     });

});

function checkFormInputFields() {
    if (fullName.value.trim() === "") {
        fullNameError.textContent = "Full Name is Required";
        return;
    }
    else {
        fullNameError.textContent = "";
    }

    if (email.value.trim() === "") {
        emailError.textContent = "Email is Required";
        return
    } else if (!isValidEmail(email.value.trim())) {
        emailError.textContent = "Invalid ! Enter proper email id";
        return;
    } else {
        emailError.textContent = "";
    }

    if (number.value.trim() === "") {
        numberError.textContent = "Number is Required";
        return;
    }
    else if (!isValidPhoneNumber(number.value.trim())) {
        numberError.textContent = "Invalid ! Enter 10 Digit Mobile Number";
        return;
    }
    else {
        numberError.textContent = "";
    }

    if (state.value.trim() === "") {
        stateError.textContent = "State is Required";
        return;
    }
    else {
        stateError.textContent = "";
    }

    if (city.value.trim() === "") {
        cityError.textContent = "City is Required";
        return;
    }
    else {
        cityError.textContent = "";
    }

    if (captcha.value.trim() === "") {
        captchaError.textContent = "Captcha is Required";
        return;
    }
    else if (!validateCaptcha(captcha.value.trim())) {
        captchaError.textContent = "Invalid ! Captcha";
        return;
    }
    else {
        captchaError.textContent = "";
    }
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
    captchaContainer.src = `https://dummyimage.com/120x40/000/fff?text=${captcha}`;
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

function getUrl(utmSource, utmMedium, utmCampaign) {
    var currentURL = window.location.href;
    var separator = currentURL.includes('?') ? '&' : '?';
    var utmParameters = `utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
    var updatedURL = currentURL + `${separator}${utmParameters}`;
    return updatedURL;
}


