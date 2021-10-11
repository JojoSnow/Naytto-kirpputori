let userIndex = 0;

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');
const loginRegText = document.getElementById('not-registered');

window.addEventListener('load', toStorageOnLoad);
loginBtn.addEventListener('click', openLogin);
logoutBtn.addEventListener('click', userLogout);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
regModalBtn.addEventListener('click', regUser);
loginModalBtn.addEventListener('click', login);
loginRegText.addEventListener('click', fromLoginToReg);

// add the admin info to localStorage on load
function toStorageOnLoad() {
    const admin1 = ['bunny', 'burrow@hopping.com', 'carrot!!', 'admin1'];
    const admin2 = ['catto', 'claw@attack.co.uk', 'mouse!!123', 'admin2'];
    const admin3 = ['doggo', 'tail@wagging.fi', 'bone!!123', 'admin3'];

    localStorage.setItem(admin1[1], JSON.stringify(admin1));
    localStorage.setItem(admin2[1], JSON.stringify(admin2));
    localStorage.setItem(admin3[1], JSON.stringify(admin3));

    localStorage.setItem('userLogged', 'false');
    localStorage.setItem('adminLogged', 'false');
}

// LOGIN FUNCTIONS

// opens the login modal
function openLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'block';
}

// closes the login modal
function closeLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'none';
    resetLoginForm();
}

// logs the user or admin in
function login(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('input-login-name').value;
    const loginPassword = document.getElementById('input-login-password').value;

    const loginEmailAlert = document.getElementById('login-name-alert');
    const loginPasswordAlert = document.getElementById('login-password-alert');

    const getInfo = localStorage.getItem(loginEmail);
    const infoArray = JSON.parse(getInfo);

    // checks if the user or admin are registered - alerts if not
    // checks if the email and password are right to login with - alerts if not
    if (infoArray === null) {
        document.getElementById('input-login-name').style.borderColor = '#de0f00'
        loginEmailAlert.style.display = 'block';
        loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
    } else {
        document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
        loginEmailAlert.style.display = 'none';
        loginEmailAlert.innerHTML = '';

        if (infoArray[2] === loginPassword) {
            document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
            loginPasswordAlert.style.display = 'none';
            loginPasswordAlert.innerHTML = '';
        } else {
            document.getElementById('input-login-password').style.borderColor = '#de0f00'
            loginPasswordAlert.style.display = 'block';
            loginPasswordAlert.innerHTML = 'Väärä salasana';
        }
    }

    // logs admin or user in if the email and password are right
    if (infoArray !== null && loginEmail === infoArray[1] && loginPassword === infoArray[2]) {
        loginSuccess();

        loginBtn.style.display = 'none';
        regBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        addListingBtn.style.display = 'block';

        if (infoArray[3].includes('user')) {
            localStorage.setItem('userLogged', 'true');
        } else if (infoArray[3].includes('admin')) {
            localStorage.setItem('adminLogged', 'true');
        }
    }
}

// tells the user or admin login has been successful
function loginSuccess() {
    const success = document.getElementById('login-success');

    success.style.display = 'block';
    success.innerHTML = 'Olet kirjautunut sisään!';

    document.querySelectorAll('.modal-question').forEach(question => question.style.display = 'none');

    loginModalBtn.style.display = 'none';

    // closes the login modal after 2 seconds of a successful login -- maybe an animation for closing?
    setTimeout(closeLogin, 2000);
}

// resets the login form when it is closed
function resetLoginForm() {
    document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
    document.getElementById('login-name-alert').style.display = 'none';

    document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
    document.getElementById('login-password-alert').style.display = 'none';

    document.getElementById('login-success').style.display = 'none';

    document.querySelectorAll('.modal-question').forEach(question => question.style.display = 'block');

    loginModalBtn.style.display = 'block';

    document.getElementById('login-form').reset();
}

// directs user from login to registration
function fromLoginToReg() {
    closeLogin();
    openReg();
}

// LOGOUT FUNCTIONS

// logs the user or admin out
function userLogout() {
    localStorage.setItem('userLogged', 'false');
    localStorage.setItem('adminLogged', 'false');
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'table-cell';
    regBtn.style.display = 'table-cell';
    addListingBtn.style.display = 'none';
}

// REGISTRATION FUNCTIONS

// opens the registration modal
function openReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'block';
}

// closes the registration modal
function closeReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'none';
    resetRegForm();
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
        if (!(localStorage.getItem(regEmail))) {
            // registered user array
            let user = [regName, regEmail, regPassword, 'user'];
            // adds the user array to localStorage
            localStorage.setItem(user[1], JSON.stringify(user));

            regSuccess();

            
        } else {
            document.getElementById('input-reg-email').style.borderColor = '#de0f00';
            document.getElementById('reg-email-alert').style.display = 'block';
            document.getElementById('reg-email-alert').innerHTML = 'Sähköposti jo käytössä';
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
    regModalBtn.style.display = 'block';

    document.getElementById('reg-form').reset();
}

// tells the user that the registration has been successful
function regSuccess() {
    const success = document.getElementById('reg-success');

    success.style.display = 'block';
    success.innerHTML = 'Rekisteröityminen onnistui!';
    regModalBtn.style.display = 'none';

    // closes the registration modal after 2 seconds of a successful registration
    setTimeout(closeReg, 2000);
}

