let userIndex = 0;

const loginBtn = document.getElementById('login-btn');
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');

window.addEventListener('load', toStorageOnLoad);
loginBtn.addEventListener('click', openLogin);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
regModalBtn.addEventListener('click', regUser);
loginModalBtn.addEventListener('click', login);
loginRegText.addEventListener('click', fromLoginToReg);

function toStorageOnLoad() {
    let admin1 = ['admin1', 'bunny', 'burrow@hopping.com', 'carrot!!'];
    let admin2 = ['admin2', 'catto', 'claw@attack.co.uk', 'mouse!!123'];
    let admin3 = ['admin3', 'doggo', 'tail@wagging.fi', 'bone!!123'];

    localStorage.setItem(admin1[0], JSON.stringify(admin1));
    localStorage.setItem(admin2[0], JSON.stringify(admin2));
    localStorage.setItem(admin3[0], JSON.stringify(admin3));

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
}

// logs the user or admin in
function login(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('input-login-name').value;
    const loginPassword = document.getElementById('input-login-password').value;

    for (let i = 0; localStorage.length > i; i++) {
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);
        const getAdmin = localStorage.getItem('admin' + i);
        const adminArray = JSON.parse(getAdmin);
        console.log(adminEmail);
        console.log(userEmail);
        if (userArray !== null) {
            if (userEmail === false && adminEmail === true) {
                checkLoginInfo(loginEmail, loginPassword, userArray);
            }
            // checks if username and password are both right - logs in if yes
            if (loginEmail === userArray[2] && loginPassword === userArray[3]) {
                localStorage.setItem('userLogged', 'true');

                loginSuccess();

                loginBtn.style.display = 'none';
                regBtn.style.display = 'none';
                logoutBtn.style.display = 'block';
                addListingBtn.style.display = 'block';
                userEmail = false;
                break;
            }
        }
        if (adminArray !== null) {
            if (adminEmail === true && userEmail === false) {
                checkAdminLoginInfo(loginEmail, loginPassword, adminArray);
            }

            // checks if username and password are both right - logs in if yes
            if (loginEmail === adminArray[2] && loginPassword === adminArray[3]) {
                localStorage.setItem('adminLogged', 'true');

                loginSuccess();

                loginBtn.style.display = 'none';
                regBtn.style.display = 'none';
                logoutBtn.style.display = 'block';
                addListingBtn.style.display = 'block';
                adminEmail = true;
                break;
            }
        }
    }
}

// alerts user for missing or not valid login info
function checkLoginInfo(loginEmail, loginPassword, array) {
    const loginEmailAlert = document.getElementById('login-name-alert');
    const loginPasswordAlert = document.getElementById('login-password-alert');

    // checks if the email is right and if the password wrong - alert if it is
    if (loginEmail === array[2] && loginPassword !== array[3]) {
        document.getElementById('input-login-password').style.borderColor = '#de0f00'
        loginPasswordAlert.style.display = 'block';
        loginPasswordAlert.innerHTML = 'Väärä salasana';
        userEmail = true;
    } else if (loginPassword !== '') {
        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
        loginPasswordAlert.style.display = 'none';
        loginPasswordAlert.innerHTML = '';
    }
    
    // checks if the user is not registered and if the input field is empty - alert if wrong
    if (loginEmail !== array[2] && userEmail === false) {
        document.getElementById('input-login-name').style.borderColor = '#de0f00'
        loginEmailAlert.style.display = 'block';
        loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
    } else {
        document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
        loginEmailAlert.style.display = 'none';
        loginEmailAlert.innerHTML = '';
    }

    //  checks if the input field is empty - alert if it is
    if (loginPassword === '') {
        document.getElementById('input-login-password').style.borderColor = '#de0f00'
        loginPasswordAlert.style.display = 'block';
        loginPasswordAlert.innerHTML = 'Syötä salasana';
    } else {
        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
        loginPasswordAlert.style.display = 'none';
        loginPasswordAlert.innerHTML = '';
    }
}

// alerts admin for missing or not valid login info
function checkAdminLoginInfo(loginEmail, loginPassword, array) {
    const loginEmailAlert = document.getElementById('login-name-alert');
    const loginPasswordAlert = document.getElementById('login-password-alert');

    // checks if the email is right and if the password wrong - alert if it is
    if (loginEmail === array[2] && loginPassword !== array[3]) {
        document.getElementById('input-login-password').style.borderColor = '#de0f00'
        loginPasswordAlert.style.display = 'block';
        loginPasswordAlert.innerHTML = 'Väärä salasana';
        adminEmail = false;
    } else if (loginPassword !== '') {
        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
        loginPasswordAlert.style.display = 'none';
        loginPasswordAlert.innerHTML = '';
    }
    
    // checks if the user is not registered and if the input field is empty - alert if wrong
    if (loginEmail !== array[2] && adminEmail === true) {
        document.getElementById('input-login-name').style.borderColor = '#de0f00'
        loginEmailAlert.style.display = 'block';
        loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
    } else {
        document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
        loginEmailAlert.style.display = 'none';
        loginEmailAlert.innerHTML = '';
    }

    //  checks if the input field is empty - alert if it is
    if (loginPassword === '') {
        document.getElementById('input-login-password').style.borderColor = '#de0f00'
        loginPasswordAlert.style.display = 'block';
        loginPasswordAlert.innerHTML = 'Syötä salasana';
    } else {
        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
        loginPasswordAlert.style.display = 'none';
        loginPasswordAlert.innerHTML = '';
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

// logs the user out
function userLogout() {
    localStorage.setItem('userLogged', 'false');
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
