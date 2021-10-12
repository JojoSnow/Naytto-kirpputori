
// Register Buttons
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const regCloseBtn = document.getElementById('reg-close-btn');

// Login Buttons
const loginBtn = document.getElementById('login-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginRegText = document.getElementById('not-registered');
const loginCloseBtn = document.getElementById('login-close-btn');

// Logout Buttons
const logoutBtn = document.getElementById('logout-btn');

// Admin Buttons
const adminBtn = document.getElementById('admin-btn');
const adminCloseBtn = document.getElementById('admin-close-btn');
const adminSelect = document.getElementById('admin-select');
const adminUserBtn = document.getElementById('remove-user-btn');
const adminListingBtn = document.getElementById('remove-listing-btn');


// Register Events
regBtn.addEventListener('click', openReg);
regModalBtn.addEventListener('click', regUser);
regCloseBtn.addEventListener('click', closeReg);

// Login Events
loginBtn.addEventListener('click', openLogin);
loginRegText.addEventListener('click', fromLoginToReg);
loginModalBtn.addEventListener('click', login);
loginCloseBtn.addEventListener('click', closeLogin);

// Logout Events
logoutBtn.addEventListener('click', userLogout);

// Admin Events
adminBtn.addEventListener('click', openAdminSettings);
adminSelect.addEventListener('click', selectRemove);
adminUserBtn.addEventListener('click', removeUser);
// adminListingBtn.addEventListener('click', removeListing);
adminCloseBtn.addEventListener('click', closeAdmin);

// Other Events
window.addEventListener('load', toStorageOnLoad);



// add the admin info to localStorage on load
function toStorageOnLoad() {
    const admin1 = ['bunny', 'burrow@hopping.com', 'carrot!!', 'admin0'];
    const admin2 = ['catto', 'claw@attack.co.uk', 'mouse!!123', 'admin1'];
    const admin3 = ['doggo', 'tail@wagging.fi', 'bone!!123', 'admin2'];

    localStorage.setItem(admin1[3], JSON.stringify(admin1));
    localStorage.setItem(admin2[3], JSON.stringify(admin2));
    localStorage.setItem(admin3[3], JSON.stringify(admin3));

    localStorage.setItem('userLogged', 'null');
    localStorage.setItem('adminLogged', 'null');
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

    for (let i = 0; localStorage.length >= i; i++) {
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);
        
        const getAdmin = localStorage.getItem('admin' + i);
        const adminArray = JSON.parse(getAdmin);

        let userEmail = false;
        let userPassword = false;
        let adminEmail = false;
        let adminPassword = false;

        if (userArray !== null && adminEmail === false) {
            // checks if it's user or admin logging in
            if (userArray[3].includes('user')) {
                // checks if user is registered - alerts if not
                // checks if the email and password are right to login with - alerts if not
                if (userArray[1] !== loginEmail) {
                    document.getElementById('input-login-name').style.borderColor = '#de0f00'
                    loginEmailAlert.style.display = 'block';
                    loginEmailAlert.innerHTML = 'Tiliä ei ole olemassa';
                } else {
                    document.getElementById('input-login-name').style.borderColor = '#a0a0a0';
                    loginEmailAlert.style.display = 'none';
                    loginEmailAlert.innerHTML = '';
                    userEmail = true;

                    if (userArray[2] === loginPassword) {
                        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
                        loginPasswordAlert.style.display = 'none';
                        loginPasswordAlert.innerHTML = '';
                        userPassword = true;
                    } else {
                        document.getElementById('input-login-password').style.borderColor = '#de0f00'
                        loginPasswordAlert.style.display = 'block';
                        loginPasswordAlert.innerHTML = 'Väärä salasana';
                    }
                }
                // logs user in if the email and password are right
                if (loginEmail === userArray[1] && loginPassword === userArray[2]) {
                    loginSuccess();

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'table-cell';
                    addListingBtn.style.display = 'block';

                    // saves the info which user is logged in
                    localStorage.setItem('userLogged', JSON.stringify(userArray));

                    break;
                }
                
            } 
        }
        
        if (adminArray !== null && userEmail === false) {
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
                    adminEmail = true;

                    if (adminArray[2] === loginPassword) {
                        document.getElementById('input-login-password').style.borderColor = '#a0a0a0';
                        loginPasswordAlert.style.display = 'none';
                        loginPasswordAlert.innerHTML = '';
                        adminPassword = true;
                    } else {
                        document.getElementById('input-login-password').style.borderColor = '#de0f00'
                        loginPasswordAlert.style.display = 'block';
                        loginPasswordAlert.innerHTML = 'Väärä salasana';
                    }
                }

                // logs admin in if the email and password are right
                if (loginEmail === adminArray[1] && loginPassword === adminArray[2]) {
                    loginSuccess();

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'table-cell';
                    addListingBtn.style.display = 'block';
                    adminBtn.style.display = 'table-cell';

                    // saves the info which admin is logged in
                    localStorage.setItem('adminLogged', JSON.stringify(adminArray));

                    break;
                }
            }
        }
        
        if (userEmail === true && userPassword === false) {
            break;
        } else if (adminEmail === true && adminPassword === false) {
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
    localStorage.setItem('userLogged', 'null');
    localStorage.setItem('adminLogged', 'null');
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

// opens admins settings modal
function openAdminSettings() {
    document.getElementById('admin-modal').style.display = 'block';
}

// closes admins settings modal
function closeAdmin() {
    const loginModal = document.getElementById('admin-modal');
    loginModal.style.display = 'none';
    resetAdminForm();
}

// chooses what admin wants to remove from site
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

// removes the chosen user from the site
function removeUser(event) {
    event.preventDefault();

    for (let i = 0; localStorage.length >= i; i++) {        
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);
        const userId = document.getElementById('user-id').value;

        if (userArray !== null) {
            if (userId === userArray[3]) {
                localStorage.removeItem('user' + i);

                document.getElementById('user-id').style.borderColor = '#a0a0a0';
                document.getElementById('user-id-alert').style.display = 'none';
                document.getElementById('user-id-alert').innerHTML = '';

                break;
            } else {
                document.getElementById('user-id').style.borderColor = '#de0f00';
                document.getElementById('user-id-alert').style.display = 'block';
                document.getElementById('user-id-alert').innerHTML = 'Käyttäjä ID on virheellinen';
            }
        }
    }
}

// resets the form in admin modal
function resetAdminForm() {
    document.getElementById('admin-form').reset();
}
