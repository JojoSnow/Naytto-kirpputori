let userIndex = 0;
let slideIndex = 0;

const loginBtn = document.getElementById('login-btn');
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');

loginBtn.addEventListener('click', openLogin);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
regModalBtn.addEventListener('click', regUser);
loginModalBtn.addEventListener('click', loginUser);


// login functions
// opens the login modal
function openLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'block';
}

//closes the login modal
function closeLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'none';
}

// checks if user is registered
function loginUser(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('input-login-name').value;
    const loginPassword = document.getElementById('input-login-password').value;

    for (let i = 0; localStorage.length > i; i++) {
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);

        if (loginEmail !== userArray[2]) {
            // the user does not exist
            console.log('user does not exist');
        }

        if (loginEmail === userArray[2] && loginPassword !== userArray[3]) {
            // right username, wrong password
            console.log('wrong password');
        }

        if (loginEmail === userArray[2] && loginPassword === userArray[3]) {
            // username and password are both right
            console.log('logged in');
        }
    }
}

// registration functions
// opens the registration modal
function openReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'block';
}

// closes the registration modal
function closeReg() {
    const regModal = document.getElementById('reg-modal');
    resetRegForm();
    regModal.style.display = 'none';
}

// creates an array of user to localStorage
function regUser(event) {
    event.preventDefault();

    const regName = document.getElementById('input-reg-name').value;
    const regEmail = document.getElementById('input-reg-email').value;
    const regPassword = document.getElementById('input-reg-password').value;

    checkRegInfo(regName, regEmail, regPassword);

    // adds the user array to localStorage
    if (regName !== '' && validateEmail(regEmail) && regPassword.length >= 8) {
        for (let i = 0; localStorage.length >= i; i++) {
            if (!(localStorage.getItem('user' + i))) {
                // registered user array
                let user = ['user' + i, regName, regEmail, regPassword];
                // adds the user array to localStorage
                localStorage.setItem(user[0], JSON.stringify(user));

                regSuccess();

                break;
            }
        }
    }
}

// alerts user for missing or not valid info
function checkRegInfo(regName, regEmail, regPassword) {
    // checks if the name is empty - alert if otherwise
    const regNameAlert = document.getElementById('reg-username-alert');
    if (regName === '') {
        document.getElementById('input-reg-name').style.borderColor = '#de0f00';
        regNameAlert.style.display = 'block';
        regNameAlert.innerHTML = 'Syötä nimi';
    } else {
        document.getElementById('input-reg-name').style.borderColor = '#a0a0a0';
        regNameAlert.innerHTML = '';
        regNameAlert.style.display = 'none';
    }

    // checks if the email is valid and not empty - alert if otherwise
    const regEmailAlert = document.getElementById('reg-email-alert');
    if (!(validateEmail(regEmail))) {
        document.getElementById('input-reg-email').style.borderColor = '#de0f00';
        regEmailAlert.style.display = 'block';
        regEmailAlert.innerHTML = 'Sähköposti osoite ei kelpaa';
        if (regEmail === '') {
            document.getElementById('input-reg-email').style.borderColor = '#de0f00';
            regEmailAlert.style.display = 'block';
            regEmailAlert.innerHTML = 'Syötä sähköposti';
        }
    } else {
        document.getElementById('input-reg-email').style.borderColor = '#a0a0a0';
        regEmailAlert.innerHTML = '';
        regEmailAlert.style.display = 'none';
    }

    // checks if the password is longer than 8 chars and not empty - alert if otherwise
    const regPasswordAlert = document.getElementById('reg-password-alert');

    if (regPassword.length < 8) {
        document.getElementById('input-reg-password').style.borderColor = '#de0f00';
        regPasswordAlert.style.display = 'block';
        regPasswordAlert.innerHTML = 'Salasana on liian lyhyt (min. 8 merkkiä)'
        if (regPassword === '') {
            document.getElementById('input-reg-password').style.borderColor = '#de0f00';
            regPasswordAlert.style.display = 'block';
            regPasswordAlert.innerHTML = 'Syötä salasana';
        }
    } else {
        document.getElementById('input-reg-password').style.borderColor = '#a0a0a0';
        regPasswordAlert.innerHTML = '';
        regPasswordAlert.style.display = 'none';
    }
}

// checks that the registration email is valid
function validateEmail(regEmail) {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (regEmail.match(pattern)) {
        return true;
    } else {
        return false;
    }
}

// resets the registration form when it is closed
function resetRegForm() {
    document.getElementById('input-reg-name').style.borderColor = '#a0a0a0';
    document.getElementById('reg-username-alert').style.display = 'none';

    document.getElementById('input-reg-email').style.borderColor = '#a0a0a0';
    document.getElementById('reg-email-alert').style.display = 'none';

    document.getElementById('input-reg-password').style.borderColor = '#a0a0a0';
    document.getElementById('reg-password-alert').style.display = 'none';

    document.getElementById('reg-success').style.display = 'none';

    document.getElementById('reg-form').reset();
}

// tells the user that the registration has been successful
function regSuccess() {
    const success = document.getElementById('reg-success');

    success.style.display = 'block';
    success.innerHTML = 'Rekisteröityminen onnistui!';

    // closes the registration modal after 2 seconds of a successful registration
    setTimeout(closeReg, 5000);
}

// sliding for info images -- have a better animation
function showSlides() {
    let slides = document.querySelectorAll('.slides');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 7000);
}

showSlides();