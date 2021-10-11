
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const regBtn = document.getElementById('regis-btn');
const adminBtn = document.getElementById('admin-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const adminCloseBtn = document.getElementById('admin-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');
const loginRegText = document.getElementById('not-registered');
const adminSelect = document.getElementById('admin-select');

window.addEventListener('load', toStorageOnLoad);
adminBtn.addEventListener('click', adminSettings);
adminCloseBtn.addEventListener('click', closeAdmin);
loginBtn.addEventListener('click', openLogin);
logoutBtn.addEventListener('click', userLogout);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
regModalBtn.addEventListener('click', regUser);
loginModalBtn.addEventListener('click', login);
loginRegText.addEventListener('click', fromLoginToReg);
adminSelect.addEventListener('click', selectRemove);

// add the admin info to localStorage on load
function toStorageOnLoad() {
    const admin1 = ['bunny', 'burrow@hopping.com', 'carrot!!', 'admin0'];
    const admin2 = ['catto', 'claw@attack.co.uk', 'mouse!!123', 'admin1'];
    const admin3 = ['doggo', 'tail@wagging.fi', 'bone!!123', 'admin2'];

    localStorage.setItem(admin1[3], JSON.stringify(admin1));
    localStorage.setItem(admin2[3], JSON.stringify(admin2));
    localStorage.setItem(admin3[3], JSON.stringify(admin3));

    localStorage.setItem('user', 'false');
    localStorage.setItem('admin', 'false');
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

// logs the user or admin in - alerts don't work as they should yet
function login(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('input-login-name').value;
    const loginPassword = document.getElementById('input-login-password').value;

    const loginEmailAlert = document.getElementById('login-name-alert');
    const loginPasswordAlert = document.getElementById('login-password-alert');

    let userBoolean = false;
    let adminBoolean = false;

    for (let i = 0; localStorage.length >= i; i++) {
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);

        if (userArray !== null && userBoolean === false && adminBoolean === false) {
            // checks if it's user or admin logging in
            if (userArray[3].includes('user')) {
                // checks if admin is registered - alerts if not
                // checks if the email and password are right to login with - alerts if not
                if (userArray[1] !== loginEmail) {
                    document.getElementById('input-login-name').style.borderColor = '#de0f00'
                    loginEmailAlert.style.display = 'block';
                    loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
                } else {
                    document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
                    loginEmailAlert.style.display = 'none';
                    loginEmailAlert.innerHTML = '';

                    if (userArray[2] === loginPassword) {
                        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
                        loginPasswordAlert.style.display = 'none';
                        loginPasswordAlert.innerHTML = '';
                    } else {
                        document.getElementById('input-login-password').style.borderColor = '#de0f00'
                        loginPasswordAlert.style.display = 'block';
                        loginPasswordAlert.innerHTML = 'Väärä salasana';
                    }
                }
                // logs user in if the email and password are right
                if (userArray !== null && loginEmail === userArray[1] && loginPassword === userArray[2]) {
                    loginSuccess();

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'table-cell';
                    addListingBtn.style.display = 'block';
                    
                    localStorage.setItem('user', 'true');
                }
                
            } 
        } else {
            userBoolean = true;
        }

        const getAdmin = localStorage.getItem('admin' + i);
        const adminArray = JSON.parse(getAdmin);
        
        if (adminArray !== null && userBoolean === false && adminBoolean === false) {
            // checks if it's user or admin logging in
            if (adminArray[3].includes('admin')) {
                // checks if admin is registered - alerts if not
                // checks if the email and password are right to login with - alerts if not
                if (adminArray[1] !== loginEmail) {
                    document.getElementById('input-login-name').style.borderColor = '#de0f00'
                    loginEmailAlert.style.display = 'block';
                    loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
                } else {
                    document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
                    loginEmailAlert.style.display = 'none';
                    loginEmailAlert.innerHTML = '';

                    if (adminArray[2] === loginPassword) {
                        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
                        loginPasswordAlert.style.display = 'none';
                        loginPasswordAlert.innerHTML = '';
                    } else {
                        document.getElementById('input-login-password').style.borderColor = '#de0f00'
                        loginPasswordAlert.style.display = 'block';
                        loginPasswordAlert.innerHTML = 'Väärä salasana';
                    }
                }

                // logs admin in if the email and password are right
                if (adminArray !== null && loginEmail === adminArray[1] && loginPassword === adminArray[2]) {
                    loginSuccess();

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'table-cell';
                    addListingBtn.style.display = 'block';

                    localStorage.setItem('admin', 'true');
                    adminBtn.style.display = 'table-cell';

                }
            }
        } else {
            adminBoolean = true;
        }
           
        const getAdminStatus = localStorage.getItem('admin');
        const adminStatus = JSON.parse(getAdminStatus);
        const getUserStatus = localStorage.getItem('user');
        const userStatus = JSON.parse(getUserStatus);

        if (adminStatus) {
            break;
        } else if (userStatus) {
            break;
        } else if (adminBoolean) {
            break;
        } else if (userBoolean) {
            break;
        }

    }    
}

// tells the user or admin if login has been successful
function loginSuccess() {
    const success = document.getElementById('login-success');

    success.style.display = 'block';
    success.innerHTML = 'Tervetuloa!';

    document.querySelector('.modal-question').style.display = 'none';

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
  
    // makes an identifying number for the user
    let userNum = 0;
    if (!(localStorage.getItem('userNum'))) {
        localStorage.setItem('userNum', 0);
        const getUserNum = localStorage.getItem('userNum');
        userNum = JSON.parse(getUserNum);
    } else {
        const getUserNum = localStorage.getItem('userNum');
        userNum = JSON.parse(getUserNum);
    }

    // adds the user array to localStorage
    if (regName !== '' && validateEmail(regEmail) && regPassword.length >= 8) {
        if (!(localStorage.getItem('user' + userNum))) {

            // registered user array
            let user = [regName, regEmail, regPassword, 'user' + userNum];
            // adds the user array to localStorage
            localStorage.setItem(user[3], JSON.stringify(user));

            regSuccess();

            userNum += 1;
            localStorage.setItem('userNum', userNum);
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

// ADMIN FUNCTIONS  

function adminSettings() {
    console.log('admin');

    document.getElementById('admin-modal').style.display = 'block';

    const userId = document.getElementById('user-id').value;

    for (let i = 0; localStorage.length < i; i++) {
        if (localStorage.getItem('user' + i)) {}
    }
}

function selectRemove() {
    const optionValue = document.getElementById('admin-select').value;

    switch (optionValue) {
        case 'remove-user':
            document.getElementById('remove-user-div').style.display = 'block';
            document.getElementById('remove-listing-div').style.display = 'none';
            return;
        case 'remove-listing':
            document.getElementById('remove-listing-div').style.display = 'block';
            document.getElementById('remove-user-div').style.display = 'none';
            return;
        default: 
            document.getElementById('remove-user-div').style.display = 'none';
            document.getElementById('remove-listing-div').style.display = 'none';
            return;
    }
}

// closes admins settings modal
function closeAdmin() {
    const loginModal = document.getElementById('admin-modal');
    loginModal.style.display = 'none';
    resetAdminForm();
}

function resetAdminForm() {
    document.getElementById('admin-form').reset();
}
