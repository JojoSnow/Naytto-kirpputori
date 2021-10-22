
const listingArray = [];
let objectIndex = null;
var markers = [];
var listingAddLocatorMap


// Registration
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const regCloseBtn = document.getElementById('reg-close-btn');

// Login
const loginBtn = document.getElementById('login-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginRegText = document.getElementById('not-registered');
const loginCloseBtn = document.getElementById('login-close-btn');

// Logout
const logoutBtn = document.getElementById('logout-btn');

// Admin
const adminBtn = document.getElementById('admin-btn');
const adminCloseBtn = document.getElementById('admin-close-btn');
const adminSelect = document.getElementById('admin-select');
const adminUserBtn = document.getElementById('remove-user-btn');
const adminListingBtn = document.getElementById('remove-listing-btn');

// Report
const reportCloseBtn = document.getElementById('report-close-btn');

// Responsive Navbar
const navbarBtn = document.getElementById('resp-btn');
const closeNavbarBtn = document.getElementById('navbar-close-btn');

// Add Listing
const addListingCloseBtn = document.getElementById('listing-close-btn');
const addListingSelect = document.getElementById('listing_contact');
const addListingImgBtn = document.getElementById('listing_img');
const addListingSubmit = document.getElementById('listing_submit');
const removePicturesBtn = document.getElementById("remove_pictures_btn");

// Map
const locatorBtn = document.getElementById("locator_button");
const currentLocationBtn = document.getElementById("current_location_finder");
const useLocationBtn = document.getElementById("btn_use_location");
const unUseLocationBtn = document.getElementById("btn_unuse_location");


// Registration Events
regBtn.addEventListener('click', openReg);
regModalBtn.addEventListener('click', regUser);
regCloseBtn.addEventListener('click', closeReg);

// Login Events
loginBtn.addEventListener('click', openLogin);
loginRegText.addEventListener('click', fromLoginToReg);
loginModalBtn.addEventListener('click', login);
loginCloseBtn.addEventListener('click', closeLogin);

// Logout Events
logoutBtn.addEventListener('click', logout);

// Admin Events
adminBtn.addEventListener('click', openAdminSettings);
adminSelect.addEventListener('click', selectRemove);
adminUserBtn.addEventListener('click', removeUser);
adminListingBtn.addEventListener('click', removeListing);
adminCloseBtn.addEventListener('click', closeAdminSettings);

// Report Events
if (reportCloseBtn !== null) {
    reportCloseBtn.addEventListener('click', closeReport);
}

// Responsive Events
navbarBtn.addEventListener('click', openRespNavbar);
navbarBtn.addEventListener('mouseenter', respNavOnHover);
navbarBtn.addEventListener('mouseleave', respNavOffHover);
closeNavbarBtn.addEventListener('click', closeRespNavbar);
window.addEventListener('resize', normalHeaderOn);

// Onload Events
window.addEventListener('load', toStorageOnLoad);
window.addEventListener('load', stayLoggedIn);
window.addEventListener("load", createOrLoadListingsOnFirstStart);

// Add Listing Events
addListingCloseBtn.addEventListener('click', closeAddListing);
addListingSelect.addEventListener('click', contactSelect);
addListingImgBtn.addEventListener('change', addListingImg);
addListingSubmit.addEventListener('click', submitListing);
removePicturesBtn.addEventListener("click", removePictures);

// Map Events
locatorBtn.addEventListener("click", findMe);
currentLocationBtn.addEventListener("click", getMyCurrentLocation);
useLocationBtn.addEventListener("click", useLocation);
unUseLocationBtn.addEventListener("click", unUseLocation);



// ONLOAD FUNCTIONS

// add info to localStorage on load
function toStorageOnLoad() {
    const admin1 = ['bunny', 'burrow@hopping.com', 'carrot!!', 'admin0'];
    const admin2 = ['catto', 'claw@attack.co.uk', 'mouse!!123', 'admin1'];
    const admin3 = ['doggo', 'tail@wagging.fi', 'bone!!123', 'admin2'];

    localStorage.setItem(admin1[3], JSON.stringify(admin1));
    localStorage.setItem(admin2[3], JSON.stringify(admin2));
    localStorage.setItem(admin3[3], JSON.stringify(admin3));
}

// keeps admin or user logged in after a refresh of the page
function stayLoggedIn() {
    const getUserLogged = localStorage.getItem('userLogged');
    const userLogged = JSON.parse(getUserLogged);
    const getAdminLogged = localStorage.getItem('adminLogged');
    const adminLogged = JSON.parse(getAdminLogged);

    if (userLogged !== null) {
        loginBtn.style.display = 'none';
        regBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        createAddListingBtn();
    }

    if (adminLogged !== null) {
        const openAddListingBtn = document.getElementById('add-listing-btn');
        loginBtn.style.display = 'none';
        regBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        adminBtn.style.display = 'block';
        if (openAddListingBtn !== null) {
            openAddListingBtn.remove();
        }
    }
}

// creates a button for adding a listing for user
function createAddListingBtn() {
    const addDiv = document.getElementById('add-listing-div');

    const listingBtn = document.createElement('button');
    listingBtn.id = 'add-listing-btn';
    listingBtn.className = 'add-listing-btn';
    listingBtn.innerHTML = 'Lisää ilmoitus';
    if (addDiv !== null) {
        addDiv.appendChild(listingBtn);
    }

    listingBtn.addEventListener('click', openAddListing);
}

// LOGIN FUNCTIONS

// opens the login modal
function openLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('not-registered').style.display = 'block';
    document.getElementById('login-header').style.display = 'block';

    respNavOff();
}

// closes the login modal
function closeLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'none';
    resetLoginForm();
}

// logs the user or admin in - remove admin from doing listings
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

                    // saves the info which user is logged in
                    localStorage.setItem('userLogged', JSON.stringify(userArray));
                    localStorage.setItem('adminLogged', 'null');

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'block';
                    createAddListingBtn();
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
                    const openAddListingBtn = document.getElementById('add-listing-btn');

                    loginBtn.style.display = 'none';
                    regBtn.style.display = 'none';
                    logoutBtn.style.display = 'block';
                    if (openAddListingBtn !== null) {
                        openAddListingBtn.remove();
                    }
                    adminBtn.style.display = 'block';

                    // saves the info which admin is logged in
                    localStorage.setItem('adminLogged', JSON.stringify(adminArray));
                    localStorage.setItem('userLogged', 'null');

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

    // closes the login modal after 1,5 seconds of a successful login -- maybe an animation for closing?
    setTimeout(closeLogin, 1500);
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
function logout() {
    localStorage.setItem('userLogged', 'null');
    localStorage.setItem('adminLogged', 'null');
    const openAddListingBtn = document.getElementById('add-listing-btn');
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    regBtn.style.display = 'block';
    if (openAddListingBtn !== null) {
        openAddListingBtn.remove();
    }
    adminBtn.style.display = 'none';

    document.getElementById('login-form').style.display = 'none';
    document.getElementById('not-registered').style.display = 'none';
    document.getElementById('login-header').style.display = 'none';

    document.getElementById('login-modal').style.display = 'block';
    document.getElementById('login-success').style.display = 'block';
    document.getElementById('login-success').innerText = 'Sinut on kirjattu ulos!';
    setTimeout(closeLogin, 2000);

    respNavOff();
}


// REGISTRATION FUNCTIONS

// opens the registration modal
function openReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'block';

    respNavOff();
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

    // closes the registration modal after 1,5 seconds of a successful registration
    setTimeout(closeReg, 1500);
}


// ADMIN FUNCTIONS  

// opens admins settings modal
function openAdminSettings() {
    const getAdmin = localStorage.getItem('adminLogged');
    const admin = JSON.parse(getAdmin);

    if (admin !== null) {
        document.getElementById('admin-modal').style.display = 'block';
    }

    reportListingToAdmin();
    respNavOff();
}

// closes admins settings modal
function closeAdminSettings() {
    const loginModal = document.getElementById('admin-modal');
    loginModal.style.display = 'none';
    resetAdminSettings();
}

// resets the admin modal
function resetAdminSettings() {
    document.getElementById('admin-form').reset();

    document.querySelectorAll('.reports-list').forEach(list => list.remove());
    document.getElementById('remove-user-div').style.display = 'none';
    document.getElementById('remove-listing-div').style.display = 'none';
    document.getElementById('user-id-alert').style.display = 'none';
    document.getElementById('listing-id-alert').style.display = 'none';
    document.getElementById('user-id').style.borderColor = '#a0a0a0';
    document.getElementById('listing-id').style.borderColor = '#a0a0a0';
}

// Admin Settings Functions

// chooses what admin wants to remove from site
function selectRemove() {
    const optionValue = document.getElementById('admin-select').value;

    const listingDiv = document.getElementById('remove-listing-div');
    const userDiv = document.getElementById('remove-user-div');

    switch (optionValue) {
        case 'remove-user':
            userDiv.style.display = 'block';
            listingDiv.style.display = 'none';
            return;
        case 'remove-listing':
            listingDiv.style.display = 'block';
            userDiv.style.display = 'none';
            return;
        default:
            userDiv.style.display = 'none';
            listingDiv.style.display = 'none';
            return;
    }
}

// removes the chosen user from the site
function removeUser(event) {
    event.preventDefault();

    const getUserNum = localStorage.getItem('userNum');
    const userNum = JSON.parse(getUserNum);
    let iLength = 0;

    if (localStorage.length < userNum) {
        iLength = userNum;
    } else {
        iLength = localStorage.length;
    }

    for (let i = 0; iLength >= i; i++) {
        const getUser = localStorage.getItem('user' + i);
        const userArray = JSON.parse(getUser);
        const userId = document.getElementById('user-id').value;
        const userAlert = document.getElementById('remove-user-alert');

        if (userArray !== null) {
            if (userId === userArray[3]) {
                localStorage.removeItem('user' + i);

                document.getElementById('user-id').style.borderColor = '#a0a0a0';
                document.getElementById('user-id-alert').style.display = 'none';
                document.getElementById('user-id-alert').innerHTML = '';
                userAlert.style.display = 'block';
                userAlert.innerHTML = 'Käyttäjä poistettu';
                setTimeout(() => { userAlert.style.display = 'none' }, 2000);

                break;
            } else {
                document.getElementById('user-id').style.borderColor = '#de0f00';
                document.getElementById('user-id-alert').style.display = 'block';
                document.getElementById('user-id-alert').innerHTML = 'Käyttäjä ID on virheellinen';
            }
        } else {
            document.getElementById('user-id').style.borderColor = '#de0f00';
            document.getElementById('user-id-alert').style.display = 'block';
            document.getElementById('user-id-alert').innerHTML = 'Käyttäjä ID on virheellinen';
        }
    }
}

// removes the chosen listing from the site
function removeListing(event) {
    event.preventDefault();

    const getListingNum = localStorage.getItem('listingNum');
    const listingNum = JSON.parse(getListingNum);
    let iLength = 0;

    if (localStorage.length < listingNum) {
        iLength = listingNum;
    } else {
        iLength = localStorage.length;
    }

    const listingId = document.getElementById('listing-id').value;
    const listingAlert = document.getElementById('remove-listing-alert');

    // removes the chosen listing from the listings and from local storage
    for (let i = 0; iLength > i; i++) {
        const getListing = localStorage.getItem('storageListing' + i);
        const listingObject = JSON.parse(getListing);

        console.log(listingObject);

        if (listingObject !== null) {
            if (listingId === listingObject.id) {
                localStorage.removeItem('storageListing' + i);

                document.getElementById(listingObject.id).remove();

                document.getElementById('listing-id').style.borderColor = '#a0a0a0';
                document.getElementById('listing-id-alert').style.display = 'none';
                document.getElementById('listing-id-alert').innerHTML = '';
                listingAlert.style.display = 'block';
                listingAlert.innerHTML = 'Listaus poistettu';
                setTimeout(() => { listingAlert.style.display = 'none' }, 2000);

                break;
            } else {
                document.getElementById('listing-id').style.borderColor = '#de0f00';
                document.getElementById('listing-id-alert').style.display = 'block';
                document.getElementById('listing-id-alert').innerHTML = 'Listaus ID on virheellinen';
            }
        } else {
            document.getElementById('listing-id').style.borderColor = '#de0f00';
            document.getElementById('listing-id-alert').style.display = 'block';
            document.getElementById('listing-id-alert').innerHTML = 'Listaus ID on virheellinen';
        }
    }

    // removes the chosen listing reports from local storage and admin settings
    for (let x = 0; iLength > x; x++) {
        const getReport = localStorage.getItem('reportListing' + x);
        const report = JSON.parse(getReport);

        if (report !== null) {
            if (report.id === listingId) {
                localStorage.removeItem('reportListing' + x);
                document.getElementById('reportListing' + x).remove();
            }
        }
    }
}

// makes the listing reports show in admin settings
function reportListingToAdmin() {
    const reportsDiv = document.getElementById('listing-reports');

    for (let i = 0; localStorage.length >= i; i++) {
        const getReport = localStorage.getItem('reportListing' + i);
        const report = JSON.parse(getReport);

        if (report !== null) {
            if (Object.keys(report).length !== 0) {

                const newUl = document.createElement('ul');
                newUl.id = report.key;
                newUl.className = 'reports-list';
                reportsDiv.appendChild(newUl);

                createLi(report.key, 'listing-report', 'ID: ' + report.id);

                for (let x = 0; report.reasons.length > x; x++) {
                    createLi(report.key, 'listing-report', 'Syy: ' + report.reasons[x]);
                }

                if (typeof report.more !== 'undefined') {
                    createLi(report.key, 'listing-report', 'Lisää: ' + report.more);
                }

            }
        }
    }
}

// creates a new li element
function createLi(listId, liClass, text) {
    const reportList = document.getElementById(listId);

    const newLi = document.createElement('li');
    newLi.className = liClass;
    newLi.innerHTML = text;

    reportList.appendChild(newLi);
}


// REPORT FUNCTIONS

// closes the report modal
function closeReport() {
    document.getElementById('report-modal').style.display = 'none';
    localStorage.removeItem('reportListingID');
    resetReportForm();
}

// Report listing functions

// opens listing report modal - add if someone is logged in
let reportModalStatus = false;
function openListingReport(event) {
    document.getElementById('report-modal').style.display = 'block';
    document.getElementById('report-title').innerHTML = 'Ilmianna listaus';

    if (reportModalStatus === false) {
        createReportForm();
    } else if (reportModalStatus) {
        document.getElementById('report-form').style.display = 'block';
    }

    const listingId = event.target.parentElement.parentElement.getAttribute('id');
    localStorage.setItem('reportListingID', listingId);
}

// adds the report to local storage
function reportListing(event) {
    event.preventDefault();

    const checked = [];
    let report = {};

    document.querySelectorAll('.report-check-input').forEach(function checkChecked(box) {
        if (box.checked) {
            checked.push(box.value);
        }
    })

    const listingId = localStorage.getItem('reportListingID');

    if (checked.length !== 0) {

        // adds specific report number for each report
        let reportNum = 0;
        if (!(localStorage.getItem('reportNum'))) {
            localStorage.setItem('reportNum', 0);
            const getReportNum = localStorage.getItem('reportNum');
            reportNum = JSON.parse(getReportNum);
        } else {
            const getReportNum = localStorage.getItem('reportNum');
            reportNum = JSON.parse(getReportNum);
        }

        if (document.getElementById('report-else').checked) {
            const elseMore = document.getElementById('report-else-more').value;

            if (elseMore !== '') {
                report = {
                    id: listingId,
                    reasons: checked,
                    more: elseMore,
                    key: 'reportListing' + reportNum
                };
            } else {
                report = {
                    id: listingId,
                    reasons: checked,
                    key: 'reportListing' + reportNum
                };
            }
        } else {
            report = {
                id: listingId,
                reasons: checked,
                key: 'reportListing' + reportNum
            };
        }

        localStorage.setItem('reportListing' + reportNum, JSON.stringify(report));

        reportNum++;
        localStorage.setItem('reportNum', reportNum);

        thanksMsg();

    } else {
        document.getElementById('report-explain').innerHTML = 'Valitse ainakin yksi vaihtoehto';
        document.getElementById('report-explain').style.display = 'block';
    }

}

// thank you message for reporting
function thanksMsg() {
    document.getElementById('report-form').style.display = 'none';
    document.getElementById('report-reason').style.display = 'none';
    document.getElementById('report-explain').style.display = 'none';

    const formDiv = document.getElementById('report-main');
    const thankMsg = document.createElement('h2');
    thankMsg.id = 'thank-msg';
    thankMsg.className = 'thank-msg';
    thankMsg.innerHTML = 'Kiitos ilmiannosta!';

    formDiv.appendChild(thankMsg);

    setTimeout(function close() {
        document.getElementById('thank-msg').remove();
        closeReport();
    }, 1500)
}

// creates form in report modal
function createReportForm() {
    const reportMain = document.getElementById('report-main');

    const reportForm = document.createElement('form');
    reportForm.id = 'report-form';
    reportForm.className = 'modal-form';

    reportMain.appendChild(reportForm);

    createReportOption('report-bot', 'bot', 'Botti');
    createReportLabel('report-bot', 'Listauksen teki botti-tili');
    createReportBr();

    createReportOption('report-hate', 'hate', 'Vihapuhe');
    createReportLabel('report-hate', 'Listaus sisältää vihapuhetta');
    createReportBr();

    createReportOption('report-racist', 'racist', 'Rasistinen');
    createReportLabel('report-racist', 'Rasistista sisältöä');
    createReportBr();

    createReportOption('report-disturbing', 'disturbing', 'Häiritsevä');
    createReportLabel('report-disturbing', 'Häiritsevää sisältöä');
    createReportBr();

    createReportOption('report-else', 'else', 'Muuta');
    createReportLabel('report-else', 'Jotain muuta');
    createReportBr();

    const reportTextarea = document.createElement('textarea');
    reportTextarea.id = 'report-else-more';

    reportForm.appendChild(reportTextarea);
    reportTextarea.style.display = 'none';

    document.getElementById('report-else').addEventListener('change', function showTextarea() {
        if (this.checked) {
            reportTextarea.style.display = 'block';
        } else {
            reportTextarea.style.display = 'none';
        }
    });

    const submitReportBtn = document.createElement('input');
    submitReportBtn.type = 'submit';
    submitReportBtn.id = 'submit-report-btn';
    submitReportBtn.className = 'modal-btn';
    submitReportBtn.value = 'Ilmianna';

    reportForm.appendChild(submitReportBtn);

    submitReportBtn.addEventListener('click', reportListing);

    reportModalStatus = true;
}

// creates report label
function createReportLabel(labelFor, text) {
    const reportForm = document.getElementById('report-form');

    const newLabel = document.createElement('label');
    newLabel.htmlFor = labelFor;
    newLabel.className = 'report-check-label';
    newLabel.innerText = text;

    reportForm.appendChild(newLabel);
}

// creates report checkbox
function createReportOption(id, name, value) {
    const reportForm = document.getElementById('report-form');

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = id;
    newCheckbox.className = 'report-check-input';
    newCheckbox.name = name;
    newCheckbox.value = value;

    reportForm.appendChild(newCheckbox);
}

// creates report br
function createReportBr() {
    const reportForm = document.getElementById('report-form');

    const newBr = document.createElement('br');

    reportForm.appendChild(newBr);
}

// resets the report form
function resetReportForm() {
    document.getElementById('report-form').reset();

    document.getElementById('report-else-more').style.display = 'none';
    document.getElementById('report-reason').style.display = 'block';
    document.getElementById('report-explain').style.display = 'none';
}


// RESPONSIVE NAVBAR

let navOpen = false;
// opens sidenav header links and closes if pressed a second time
function openRespNavbar() {
    const navDiv = document.getElementById('header-links');
    navDiv.style.display = 'block';
    navDiv.style.height = '100%';

    closeNavbarBtn.style.display = 'block';

    if (navOpen === true) {
        closeRespNavbar();
        respNavOffHover();
    } else {
        navOpen = true;
    }
}

// closes header links
function closeRespNavbar() {
    const navDiv = document.getElementById('header-links');
    navDiv.style.display = 'none';
    closeNavbarBtn.style.display = 'none';
    navOpen = false;
}

// three lines change color when mouse enters
function respNavOnHover() {
    const threeLines = document.querySelectorAll('.three-lines');
    threeLines.forEach(line => line.style.backgroundColor = '#35b4c5');
}

// three lines change color back to normal when mouse leaves
function respNavOffHover() {
    const threeLines = document.querySelectorAll('.three-lines');
    threeLines.forEach(line => line.style.backgroundColor = '#067d8d');
}

// shows the normal header when window is big enough
function normalHeaderOn() {
    if (window.innerWidth > 917) {
        const navDiv = document.getElementById('header-links');
        navDiv.style.display = 'block';
        navDiv.style.height = '0';
        closeNavbarBtn.style.display = 'none';
    }
}

// closes sidenavbar if window is less than 900px
function respNavOff() {
    if (window.innerWidth < 917) {
        const navDiv = document.getElementById('header-links');
        navDiv.style.display = 'none';
        closeNavbarBtn.style.display = 'none';
    }
}


// ADD LISTING FUNCTIONS

function openAddListing() {
    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'block';
    contactSelectDefault();
}

function closeAddListing() {
    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'none';
}

function submitListing(event) {
    event.preventDefault()
    createNewListingObject();
}

function addListingImg() {
    const reader = new FileReader();

    reader.readAsDataURL(this.files[0]);

    reader.addEventListener("load", () => {
        imager.push(reader.result);
        const listingImgPreview = document.createElement("img");

        listingImgPreview.src = imager[imagerX];
        listingImgPreview.alt = "kuva"

        const div = document.getElementById("listing_img_preview");
        div.appendChild(listingImgPreview);
        imagerX++;
        document.getElementById("listing_img").value = "";
    });
}

const imager = [];
let imagerX = 0;

function contactSelect() {
    const contactValue = document.getElementById("listing_contact").value;

    switch (contactValue) {

        case "Sähköposti":
            document.getElementById("listing_email").style.display = "block";
            document.getElementById("listing_phone").style.display = "none";
            return;

        case "Puhelin":
            document.getElementById("listing_phone").style.display = "block";
            document.getElementById("listing_email").style.display = "none";
            return;

        default:
            document.getElementById("listing_phone").style.display = "none";
            document.getElementById("listing_email").style.display = "none";
            return;
    }
}

function contactSelectDefault() {
    document.getElementById("add_listing_error").style.display = "none";
    document.getElementById("listing_phone").style.display = "none";
    document.getElementById("listing_email").style.display = "none";
    document.getElementById("listing_map").style.display = "none";
    document.getElementById("p_map_location").style.display = "none";
    document.getElementById("current_location_finder").style.display = "none";
    useLocationBtn.style.display = "none";
    unUseLocationBtn.style.display = "none";
    useLocationBtn.disabled = true;
    unUseLocationBtn.disabled = true;
    locatorBtn.style.display = "block";
    locatorBtn.disabled = false;

    document.getElementById("p_map_location").className = "textMapDef";
    document.getElementById("p_map_location").innerText = "Paina karttaa asettaaksesi paikannin";

    const name = document.getElementById("listing_name");
    name.value = "";
    name.className = "listing-input";

    const desc = document.getElementById("listing_desc");
    desc.value = "";
    desc.className = "listing-input";

    const categ = document.getElementById("listing_categ");
    categ.value = "0";
    categ.className = "listing-select";

    const address = document.getElementById("listing_address");
    address.value = "";
    address.className = "listing-input";

    const city = document.getElementById("listing_city");
    city.value = "0";
    city.className = "listing-select";

    const payment = document.getElementById("listing_payment");
    payment.value = "";
    payment.className = "listing-input";

    const price = document.getElementById("listing_price");
    price.value = "";
    price.className = "listing-input";

    const contact = document.getElementById("listing_contact");
    contact.value = "0";
    contact.className = "listing-select"

    const cond = document.getElementById("listing_cond");
    cond.value = "0";
    cond.className = "listing-select";

    const email = document.getElementById("listing_email");
    email.value = "";
    email.className = "listing-input";

    const phone = document.getElementById("listing_phone");
    phone.value = "";
    phone.className = "listing-input";

    const imageCarrier = document.getElementById("listing_img_preview");
    while (imageCarrier.firstChild) {
        imageCarrier.removeChild(imageCarrier.lastChild);
    }

    while (imagerX != 0) {
        imager.splice(imagerX - 1);
        imagerX--;
    }
}

function removePictures(event) {
    event.preventDefault();

    const imageCarrier = document.getElementById("listing_img_preview");
    while (imageCarrier.firstChild) {
        imageCarrier.removeChild(imageCarrier.lastChild);
    }

    while (imagerX != 0) {
        imager.splice(imagerX - 1);
        imagerX--;
    }
}

// creates an object of the listing 
function createListingObjectOnStart() {

    const listing = {};

    switch (objectIndex) {
        case 0:
            listing.title = "ruskea tuoli";
            listing.name = "Maija Meikäläinen"
            listing.date = "10.01.2020";
            listing.desc = "ruskea, puinen, haku";
            listing.category = "Koti";
            listing.address = "Aikakuja 10";
            listing.city = "Imatra";
            listing.img = ["./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg"];
            listing.payMethod = "MobilePay, käteinen";
            listing.price = 5;
            listing.contact = "Sähköposti";
            listing.shape = "Käytetty";
            listing.location = { lat: 61.198177, lng: 28.783296 };
            break;
        case 1:
            listing.title = "Pölynimuri";
            listing.name = "Marko Peltosaari"
            listing.date = "27.09.2012";
            listing.desc = "kyllä se toimii";
            listing.category = "Elektroniikat";
            listing.address = "Aikakuja 18";
            listing.city = "Joensuu";
            listing.img = ["./img/empty.jpg", "./img/empty.jpg"];
            listing.payMethod = "Kaikki käy";
            listing.price = 20;
            listing.contact = "Sähköposti";
            listing.shape = "Käytetty";
            listing.location = { lat: null, lng: null };
            break;
        case 2:
            listing.title = "Harry Potter kirja-kokoelma";
            listing.name = "Juuso Hämäläinen"
            listing.date = "15.04.2018";
            listing.desc = "Täydellinen kokoelma";
            listing.category = "Harrastukset";
            listing.address = "Aikakuja 19";
            listing.city = "Pori";
            listing.img = ["./img/empty.jpg"];
            listing.payMethod = "Bitcoin";
            listing.price = 5000;
            listing.contact = "Sähköposti";
            listing.shape = "Erinomainen";
            listing.location = { lat: null, lng: null };
            break;
        case 3:
            listing.title = "Entinen kitara";
            listing.name = "Emilia Salminen"
            listing.date = "27.09.2012";
            listing.desc = "langat poikki";
            listing.category = "Harrastukset";
            listing.address = "Aikakuja 8";
            listing.city = "Espoo";
            listing.img = ["./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg"];
            listing.payMethod = "Käteinen";
            listing.price = 20;
            listing.contact = "Sähköposti";
            listing.shape = "Rikki";
            listing.location = { lat: null, lng: null };
            break;
        case 4:
            listing.title = "Kotini";
            listing.name = "Herra X"
            var date = new Date();
            var time = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
            listing.date = time;
            listing.desc = "kaikki rahat meni kasinoon, ostakaa";
            listing.category = "Koti";
            listing.address = "Hotelli Ässä, huone 202";
            listing.city = "Helsinki";
            listing.img = ["./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg"];
            listing.payMethod = "Suoraan pankkitilille";
            listing.price = 499;
            listing.contact = "Puhelin";
            listing.shape = "Käytetty";
            listing.location = { lat: null, lng: null };
            break;
    }
    listing.id = "listing" + objectIndex;
    listing.show = "create";

    addToListingStorage(listing);
}

function createNewListingObject() {

    const listing = {};
    var date = new Date();
    var time = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    var title = document.getElementById("listing_name");
    var desc = document.getElementById("listing_desc");
    var categ = document.getElementById("listing_categ");
    var address = document.getElementById("listing_address");
    var city = document.getElementById("listing_city");
    var payMethod = document.getElementById("listing_payment");
    var price = document.getElementById("listing_price");
    var contact = document.getElementById("listing_contact");
    var cond = document.getElementById("listing_cond");

    var allIsFilled = true;

    if (title.value == "") {
        title.className = "listing-input-error";
        allIsFilled = false;
    } else {
        title.className = "listing-input";
    }

    if (desc.value == "") {
        desc.className = "listing-input-error";
        allIsFilled = false;
    } else {
        desc.className = "listing-input";
    }

    if (categ.value == "0") {
        categ.className = "listing-select-error";
        allIsFilled = false;
    } else {
        categ.className = "listing-select";
    }

    if (city.value == "0") {
        city.className = "listing-select-error";
        allIsFilled = false;
    } else {
        city.className = "listing-select";
    }

    if (payMethod.value == "") {
        payMethod.className = "listing-input-error";
        allIsFilled = false;
    } else {
        payMethod.className = "listing-input";
    }

    if (price.value == "") {
        price.className = "listing-input-error";
        allIsFilled = false;
    } else {
        price.className = "listing-input";
    }

    switch (contact.value) {
        case "Sähköposti":
            const email = document.getElementById("listing_email");
            if (email.value == "") {
                email.className = "listing-input-error";
                allIsFilled = false;
            } else {
                email.className = "listing-input";
            }
            contact = contact.value + ": " + email.value;
            contact.className = "listing-select";
            break;

        case "Puhelin":
            const phoneNumber = document.getElementById("listing_phone");
            if (phoneNumber.value == "") {
                phoneNumber.className = "listing-input-error";
                allIsFilled = false;
            } else {
                phoneNumber.className = "listing-input";
            }
            contact = contact.value + ": " + phoneNumber.value;
            contact.className = "listing-select";
            break;

        case "0":
            contact.className = "listing-select-error";
            allIsFilled = false;
    }

    if (cond.value == "0") {
        cond.className = "listing-select-error";
        allIsFilled = false;
    } else {
        cond.className = "listing-select";
    }

    if (allIsFilled) {

        listing.id = "listing" + objectIndex;
        listing.title = title.value;
        listing.name = "Null";
        listing.date = time;
        listing.desc = desc.value;
        listing.category = categ.value;
        listing.address = address.value;
        listing.city = city.value;

        listing.img = [];
        for (var i of imager) {
            listing.img.push(i);
        }

        listing.payMethod = payMethod.value;
        listing.price = price.value;
        listing.contact = contact;
        listing.shape = cond.value;
        listing.show = "create";

        if (useLocator)
            listing.location = locator
        else {
            listing.location = { lat: null, lng: null };
        }

        const listingModal = document.getElementById("add-listing-modal");
        listingModal.style.display = "none";

        addToListingStorage(listing);

        clearAllListings();
        createListing();
    } else {
        document.getElementById("add_listing_error").style.display = "block";
    }
}

function addToListingStorage(listing) {
    localStorage.setItem(("storageListing") + objectIndex, JSON.stringify(listing));
    objectIndex++;
    localStorage.setItem("listingNum", objectIndex + 1);
}

function clearAllListings() {
    let x = 0;

    while (x < objectIndex) {
        const object = JSON.parse(localStorage.getItem(("storageListing") + x));

        if (object != null) {
            object.show = "create"
            localStorage.setItem(("storageListing") + x, JSON.stringify(object));
        }

        const listing = document.getElementById("listing" + x);

        if (listing != null)
            listing.remove();

        x++;
    }
}

// creates the listings for the page
function createListing() {
    const listingList = document.getElementById("store_listing");

    for (let x = 0; x < objectIndex; x++) {

        if (JSON.parse(localStorage.getItem(("storageListing") + x)) == null) { x++; continue; }

        const listingDiv = document.createElement("div");
        const listingInnerDiv = document.createElement("div");
        const listingInnerImgDiv = document.createElement("div");
        const listingInnerInfoDiv = document.createElement("div");
        const listingInnerExpand = document.createElement("div");

        createNewDiv(x, listingDiv, "listing", "listing-style1", listingList)
        createNewDiv(x, listingInnerDiv, "listingInner", "inner-listing", listingDiv)
        createNewDiv(x, listingInnerImgDiv, null, "inner-listing-img", listingInnerDiv)
        createNewDiv(x, listingInnerInfoDiv, null, "inner-listing-info", listingInnerDiv)
        createNewDiv(x, listingInnerExpand, null, "inner-listing-expand", listingInnerDiv)

        createTitleP(x, listingInnerInfoDiv, 0);

        createImg(x, listingInnerImgDiv, 0);

        createPriceP(x, listingInnerInfoDiv);

        createDateP(x, listingInnerInfoDiv);

        const expandBtn = document.createElement("input");
        expandBtn.type = "button"
        expandBtn.className = "expand-btn";

        expandBtn.addEventListener("click", function () {
            expandListing(x);
        });

        listingInnerExpand.appendChild(expandBtn);
    }
    updateListingAmountInfo()
}

// expanding the clicked listing
function expandListing(x) {

    const listingDiv = document.getElementById("listing" + x);
    const listingInnerDiv = document.getElementById("listingInner" + x);

    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    if (object.show == "create") {

        const expandDiv = document.createElement("div");
        const headerDiv = document.createElement("div");

        createNewDiv(x, expandDiv, "listing-expand", "listing-expand", listingDiv); // x, div, id, class, adult
        createNewDiv(x, headerDiv, null, null, expandDiv);

        const infoDiv = document.createElement("div");
        const imgDiv = document.createElement("div");
        const descDiv = document.createElement("div");

        createNewDiv(x, infoDiv, null, "listing-expand-info", expandDiv);
        createNewDiv(x, imgDiv, null, "listing-expand-imgDiv", infoDiv);
        createNewDiv(x, descDiv, null, "listing-expand-descDiv", infoDiv);

        const externalDiv = document.createElement("div");
        const locationDiv = document.createElement("div");
        const locatorWarningDiv = document.createElement("div");
        const ulDiv = document.createElement("div");

        createNewDiv(x, locatorWarningDiv, "locWarning", "listing-expand-locWarning", expandDiv);
        createNewDiv(x, externalDiv, null, "listing-expand-external", expandDiv);
        createNewDiv(x, locationDiv, null, "listing-expand-location", externalDiv);
        createNewDiv(x, ulDiv, null, "listing-expand-ul", externalDiv);

        createTitleP(x, headerDiv, 1);

        createImg(x, imgDiv, 1);

        createPriceP(x, descDiv);

        createDescP(x, descDiv);

        createGoogleMaps(x, locationDiv);

        createListingUl(x, ulDiv);

        createDateP(x, expandDiv);

        const reportBtn = document.createElement("button");
        reportBtn.id = 'listing-report-btn';
        reportBtn.className = 'listing-report-btn';
        reportBtn.innerHTML = "Ilmianna";

        const getAdmin = localStorage.getItem('adminLogged');
        const admin = JSON.parse(getAdmin);
        const getUser = localStorage.getItem('userLogged');
        const user = JSON.parse(getUser);

        if (admin === null && user === null) {
            reportBtn.style.display = 'none';
        } else if (admin !== null || user !== null) {
            reportBtn.style.display = 'inline-block';
        }

        reportBtn.addEventListener("click", openListingReport);

        expandDiv.appendChild(reportBtn);

        const newBtn = document.createElement("input");
        newBtn.type = "button"
        newBtn.className = "expand-btn";
        newBtn.style.backgroundImage = "url(../img/icons/angle-up-solid.svg)";
        expandDiv.appendChild(newBtn);

        newBtn.addEventListener("click", function () {
            object.show = "hide"

            expandDiv.style.display = "none";
            listingDiv.className = "listing-style1";
            listingInnerDiv.style.display = "flex";
        })

        listingInnerDiv.style.display = "none";
        listingDiv.className = "listing-style2";
    } else if (object.show == "hide") {
        object.show = "show";

        listingInnerDiv.style.display = "none";
        listingDiv.className = "listing-style2";

        expandDiv = document.getElementById("listing-expand" + x);
        expandDiv.style.display = "block";
    }
}

function createTitleP(x, div, type) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    const titleP = document.createElement("p");
    const titleNode = document.createTextNode(object.title);

    titleP.id = "name" + x;
    switch (type) {
        case 0:
            titleP.className = "listing-title";
            break;
        case 1:
            titleP.className = "listing-expand-title";
    }

    titleP.appendChild(titleNode);
    div.appendChild(titleP);
}

function createNewDiv(x, newDiv, divId, divClass, div) {
    if (divId != null) newDiv.id = divId + x;
    if (divClass != null) newDiv.className = divClass;

    div.appendChild(newDiv);
}

function createPriceP(x, div) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    const priceP = document.createElement("p");
    const priceNode = document.createTextNode("Hinta: " + object.price + " €");

    priceP.id = "price" + x;
    priceP.className = "listing-price";

    priceP.appendChild(priceNode);
    div.appendChild(priceP);
}

function createDescP(x, div) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    const descHeading = document.createElement("p");
    const descHeadingNode = document.createTextNode("Lisätietoja:");

    descHeading.className = "listing-desc-heading";

    descHeading.appendChild(descHeadingNode);
    div.appendChild(descHeading);

    const descP = document.createElement("p");
    const descNodeEmpty = document.createTextNode("Tällä tuotteella ei ole lisätietoja");
    const descNode = document.createTextNode(object.desc);

    descP.id = "desc" + x;
    descP.className = "listing-desc";

    if (object.desc == "")
        descP.appendChild(descNodeEmpty);
    else
        descP.appendChild(descNode);

    div.appendChild(descP);
}

function createDateP(x, div) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    const dateP = document.createElement("p");
    const dateNode = document.createTextNode(object.date);

    dateP.id = "date" + x;
    dateP.className = "listing-date";

    dateP.appendChild(dateNode);
    div.appendChild(dateP);
}

function createImg(x, div, type) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    switch (type) {
        case 0:
            const listingImg = document.createElement("img");

            listingImg.src = object.img[0];
            listingImg.alt = "kuva";
            listingImg.id = "img" + x;
            listingImg.className = "listing-img";

            div.appendChild(listingImg);

            return;
        case 1:
            const imgDivSmall = document.createElement("div");
            const imgDivBig = document.createElement("div");

            imgDivSmall.className = "listing-expand-imgDiv-small";
            imgDivBig.className = "listing-expand-imgDiv-big";

            div.appendChild(imgDivBig);
            div.appendChild(imgDivSmall);

            const listingExpandBigImg = document.createElement("img");

            listingExpandBigImg.src = object.img[0];
            listingExpandBigImg.alt = "kuva";
            listingExpandBigImg.id = "imgBig" + x;
            listingExpandBigImg.className = "listing-expand-img-main";

            imgDivBig.appendChild(listingExpandBigImg);

            for (let i = 0; object.img.length > i; i++) {
                const listingExpandSmallImg = document.createElement("img");

                listingExpandSmallImg.src = object.img[i];
                listingExpandSmallImg.alt = "kuva";
                listingExpandSmallImg.className = "listing-expand-img-small";
                listingExpandSmallImg.addEventListener("click", function () {
                    listingExpandBigImg.src = listingExpandSmallImg.src;
                });

                imgDivSmall.appendChild(listingExpandSmallImg);
            }
            return;
    }
}

function createListingUl(x, div) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    const listingUl = document.createElement("ul");
    const categoryLi = document.createElement("li");
    const shapeLi = document.createElement("li");
    const addressLi = document.createElement("li");
    const cityLi = document.createElement("li");
    const payMethodLi = document.createElement("li");
    const nameLi = document.createElement("li");
    const contactLi = document.createElement("li");

    listingUl.className = "listing-list";
    div.appendChild(listingUl);

    const categoryNode = document.createTextNode("Kategoria: " + object.category);
    categoryLi.className = "listing-list-item";
    categoryLi.appendChild(categoryNode);
    listingUl.appendChild(categoryLi);

    const shapeNode = document.createTextNode("Kunto: " + object.shape);
    shapeLi.className = "listing-list-item";
    shapeLi.appendChild(shapeNode);
    listingUl.appendChild(shapeLi);

    if (object.address !== "") {
        const addressNode = document.createTextNode("Osoite: " + object.address);
        addressLi.className = "listing-list-item";
        addressLi.appendChild(addressNode);
        listingUl.appendChild(addressLi);
    }

    const cityNode = document.createTextNode("Kaupunki: " + object.city);
    cityLi.className = "listing-list-item";
    cityLi.appendChild(cityNode);
    listingUl.appendChild(cityLi);

    const payMethodNode = document.createTextNode("Maksutapa: " + object.payMethod);
    payMethodLi.className = "listing-list-item";
    payMethodLi.appendChild(payMethodNode);
    listingUl.appendChild(payMethodLi);

    const nameNode = document.createTextNode("Listauksen tekijä: " + object.name);
    nameLi.className = "listing-list-item";
    nameLi.appendChild(nameNode);
    listingUl.appendChild(nameLi);

    const contactNode = document.createTextNode("Yhteydenotto: " + object.contact);
    contactLi.className = "listing-list-item";
    contactLi.appendChild(contactNode);
    listingUl.appendChild(contactLi);
}

function createGoogleMaps(x, div) {
    const object = JSON.parse(localStorage.getItem(("storageListing") + x));

    var zoom = 8;

    var city = findCity(object);

    if (object.city == "Ulkomaalainen")
        zoom = 4;

    marker = { lat: object.location.lat, lng: object.location.lng };

    if (marker.lat == null || marker.lng == null) {
        const warningDiv = document.getElementById("locWarning" + x);
        const warningP = document.createElement("p");
        const warningNode = document.createTextNode("Aluetta ei pystytty paikantamaan");
        warningP.appendChild(warningNode);
        warningDiv.appendChild(warningP);
    }

    initMapFinder(city, zoom, div, marker);
}


// MAP FUNCTIONS

function getMyCurrentLocation(event) {
    event.preventDefault();

    if (navigator.geolocation) {
        // timeout at 30000 milliseconds (30 seconds)
        var options = { timeout: 30000 };
        navigator.geolocation.getCurrentPosition
            (showLocation, errorHandler, options);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function showLocation(position) {

    locator = { lat: position.coords.latitude, lng: position.coords.longitude };
    document.getElementById("p_map_location").innerText = "Lat = " + locator.lat + ", Lng = " + locator.lng;

    deleteMarkers();

    const marker = new google.maps.Marker({
        position: locator,
        map: listingAddLocatorMap,
    });

    markers.push(marker);

    locator.lat = locator.lat.toFixed(5);
    locator.lat = Number(locator.lat)

    locator.lng = locator.lng.toFixed(5);
    locator.lng = Number(locator.lng)

    console.log(locator);

    useLocationBtn.disabled = false;
}

function findMe(event) {
    event.preventDefault();

    document.getElementById("locator_button").disabled = true;
    document.getElementById("p_map_location").style.display = "block";
    document.getElementById("btn_use_location").style.display = "block";
    document.getElementById("btn_unuse_location").style.display = "block";
    document.getElementById("current_location_finder").style.display = "block";
    document.getElementById("locator_button").style.display = "none";

    const mapDiv = document.getElementById("listing_map");
    mapDiv.style.display = "block"

    var location = { lat: 62.349609, lng: 26.162455 };

    initMapLocator(location, 5, mapDiv)
}

function setMapOnAll(setMarker) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(setMarker);
    }
}

function hideMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    hideMarkers();
    markers = [];
}


function initMapLocator(location, zoom, div) {
    listingAddLocatorMap = new google.maps.Map(div, {
        zoom: zoom,
        center: location
    });

    listingAddLocatorMap.addListener("click", function (event) {
        deleteMarkers();

        document.getElementById("btn_use_location").disabled = false;

        useLocator = false;
        locator.lat = event.latLng.lat();
        locator.lng = event.latLng.lng();

        const marker = new google.maps.Marker({
            position: locator,
            map: listingAddLocatorMap,
        });

        markers.push(marker);

        locator.lat = locator.lat.toFixed(5);
        locator.lat = Number(locator.lat)

        locator.lng = locator.lng.toFixed(5);
        locator.lng = Number(locator.lng)

        console.log(locator);

        document.getElementById("p_map_location").innerText = "Lat = " + locator.lat + ", Lng = " + locator.lng;
    })
}

function useLocation(event) {
    event.preventDefault();
    if (locator.lat == null || locator.lng == null) {
        document.getElementById("p_map_location").innerText = "Paina karttaa asettaaksesi paikannin";
    } else {
        useLocator = true;
        document.getElementById("p_map_location").innerText = "Tallennettu! " + locator.lat + ", " + locator.lng;
        document.getElementById("p_map_location").className = "textMapSuccess";
        document.getElementById("btn_use_location").disabled = true;
        document.getElementById("btn_unuse_location").disabled = false;
    }
}

function unUseLocation(event) {
    event.preventDefault();
    document.getElementById("p_map_location").innerText = "Paina karttaa asettaaksesi paikannin";
    document.getElementById("btn_use_location").disabled = true;
    document.getElementById("btn_unuse_location").disabled = true;
    document.getElementById("p_map_location").className = "textMapDef";
    useLocator = false;
    locator.lat = null;
    locator.lng = null;
    deleteMarkers();
}

var useLocator = false;
var locator = { lat: null, lng: null };

function createOrLoadListingsOnFirstStart() {

    if (localStorage.getItem("listingNum") == null) { // On first start, creates 5 listings
        localStorage.setItem("listingNum", 0);
        objectIndex = 0;

        createListingObjectOnStart();
        createListingObjectOnStart();
        createListingObjectOnStart();
        createListingObjectOnStart();
        createListingObjectOnStart();
    } else
        objectIndex = localStorage.getItem("listingNum") - 1;
    clearAllListings();
    createListing();
}



function initMapFinder(city, zoom, div, markPos) {
    const map = new google.maps.Map(div, {
        zoom: zoom,
        center: city
    });

    if (markPos.lat != null || markPos.lng != null) {
        const marker = new google.maps.Marker({
            position: markPos,
            map: map,
        });
    }
}

function createMapsError(div) {
    const p = document.createElement("p");
    const pNode = document.createTextNode("Tätä tuotetta ei voi paikantaa");
    p.appendChild(pNode);
    div.appendChild(p);
}

function findCity(object) { // https://developers.google.com/maps/documentation/javascript/examples/map-latlng-literal

    var location = { lat: null, lng: null };

    switch (object.city) {
        case "Espoo":
            location.lat = 60.205238;
            location.lng = 24.654079;
            break;
        case "Hamina":
            location.lat = 60.569199;
            location.lng = 27.193800;
            break;
        case "Hanko":
            location.lat = 59.823101;
            location.lng = 22.969290;
            break;
        case "Helsinki":
            location.lat = 60.166621;
            location.lng = 24.942961;
            break;
        //Loput rikki
        case "Hyvinkää":
            location.lat = 60.633511;
            location.lng = 24.869645;
            break;
        case "Hämeenlinna":
            location.lat = 60.994590;
            location.lng = 24.466780;
            break;
        case "Iisalmi":
            location.lat = 63.556733;
            location.lng = 27.189261;
            break;
        case "Imatra":
            location.lat = 61.192243;
            location.lng = 28.771721;
            break;
        case "Joensuu":
            location.lat = 62.600372;
            location.lng = 29.758586;
            break;
        case "Jyväskylä":
            location.lat = 62.238912;
            location.lng = 25.745847;
            break;
        case "Järvenpää":
            location.lat = 60.473634;
            location.lng = 25.092372;
            break;
        case "Kaarina":
            location.lat = 60.407071;
            location.lng = 22.367808;
            break;
        case "Kajaani":
            location.lat = 64.223328;
            location.lng = 27.733689;
            break;
        case "Kangasala":
            location.lat = 61.464199;
            location.lng = 24.066209;
            break;
        case "Kaskinen":
            location.lat = 62.384362;
            location.lng = 21.222466;
            break;
        case "Kauniainen":
            location.lat = 60.213557;
            location.lng = 24.713982;
            break;
        case "Kemi":
            location.lat = 65.732884;
            location.lng = 24.568087;
            break;
        case "Kemijärvi":
            location.lat = 66.715892;
            location.lng = 27.433173;
            break;
        case "Kerava":
            location.lat = 60.403383;
            location.lng = 25.104175;
            break;
        case "Kokkola":
            location.lat = 63.838928;
            location.lng = 23.133657;
            break;
        case "Kotka":
            location.lat = 60.467162;
            location.lng = 26.945404;
            break;
        case "Kouvola":
            location.lat = 60.869906;
            location.lng = 26.701903;
            break;
        case "Kuopio":
            location.lat = 62.892206;
            location.lng = 27.678394;
            break;
        case "Lahti":
            location.lat = 60.982351;
            location.lng = 25.661290;
            break;
        case "Lappeenranta":
            location.lat = 61.058119;
            location.lng = 28.187490;
            break;
        case "Lohja":
            location.lat = 60.252292;
            location.lng = 24.068770;
            break;
        case "Loviisa":
            location.lat = 60.456350;
            location.lng = 26.227232;
            break;
        case "Mikkeli":
            location.lat = 61.687430;
            location.lng = 27.273005;
            break;
        case "Naantali":
            location.lat = 60.468748;
            location.lng = 22.029149;
            break;
        case "Nokia":
            location.lat = 61.478014;
            location.lng = 23.509858;
            break;
        case "Närpiö":
            location.lat = 62.477515;
            location.lng = 21.336766;
            break;
        case "Oulu":
            location.lat = 65.011793;
            location.lng = 25.472112;
            break;
        case "Pietarsaari":
            location.lat = 63.665913;
            location.lng = 22.699698;
            break;
        case "Pori":
            location.lat = 61.486332;
            location.lng = 21.796934;
            break;
        case "Porvoo":
            location.lat = 60.395159;
            location.lng = 25.660761;
            break;
        case "Raahe":
            location.lat = 64.679620;
            location.lng = 24.470728;
            break;
        case "Raasepori":
            location.lat = 59.980913;
            location.lng = 23.443507;
            break;
        case "Raisio":
            location.lat = 60.487759;
            location.lng = 22.164681;
            break;
        case "Rauma":
            location.lat = 61.128775;
            location.lng = 21.503906;
            break;
        case "Riihimäki":
            location.lat = 60.738525;
            location.lng = 24.772740;
            break;
        case "Rovaniemi":
            location.lat = 66.496973;
            location.lng = 25.718899;
            break;
        case "Salo":
            location.lat = 60.384344;
            location.lng = 23.128398;
            break;
        case "Savonlinna":
            location.lat = 61.868899;
            location.lng = 28.879824;
            break;
        case "Seinäjoki":
            location.lat = 62.795249;
            location.lng = 22.844504;
            break;
        case "Tampere":
            location.lat = 61.497885;
            location.lng = 23.760054;
            break;
        case "Tornio":
            location.lat = 65.845555;
            location.lng = 24.146198;
            break;
        case "Turku":
            location.lat = 60.451123;
            location.lng = 22.267514;
            break;
        case "Ulvila":
            location.lat = 61.433227;
            location.lng = 21.883293;
            break;
        case "Vaasa":
            location.lat = 63.095613;
            location.lng = 21.615825;
            break;
        case "Vantaa":
            location.lat = 60.309054;
            location.lng = 25.036531;
            break;
        case "Varkaus":
            location.lat = 62.186014;
            location.lng = 26.000915;
            break;
        case "Ulkomaalainen":
            location.lat = -8.581021;
            location.lng = -55.749495;
            break;
        default:
            location.lat = -8.581021;
            location.lng = -55.749495;
            break;
    }

    return location;
}
