
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

// Navbar Events
navbarBtn.addEventListener('click', openRespNavbar);
closeNavbarBtn.addEventListener('click', closeRespNavbar);

// Onload Events
window.addEventListener('load', toStorageOnLoad);
window.addEventListener('load', stayLoggedIn);


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
        logoutBtn.style.display = 'table-cell';
    } else if (adminLogged !== null) {
        loginBtn.style.display = 'none';
        regBtn.style.display = 'none';
        logoutBtn.style.display = 'table-cell';
        adminBtn.style.display = 'table-cell';
    }
}

// LOGIN FUNCTIONS

// opens the login modal
function openLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('not-registered').style.display = 'block';
    document.getElementById('login-header').style.display = 'block';
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
                    logoutBtn.style.display = 'table-cell';
                    addListingBtn.style.display = 'block';

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
                    addListingBtn.style.display = 'none';
                    adminBtn.style.display = 'table-cell';

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
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'table-cell';
    regBtn.style.display = 'table-cell';
    addListingBtn.style.display = 'none';
    adminBtn.style.display = 'none';

    document.getElementById('login-form').style.display = 'none';
    document.getElementById('not-registered').style.display = 'none';
    document.getElementById('login-header').style.display = 'none';

    document.getElementById('login-modal').style.display = 'block';
    document.getElementById('login-success').style.display = 'block';
    document.getElementById('login-success').innerText = 'Sinut on kirjattu ulos!';
    setTimeout(closeLogin, 2000);
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
                setTimeout(() => {userAlert.style.display = 'none'}, 2000);

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
                setTimeout(() => {listingAlert.style.display = 'none'}, 2000);

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
function createLi (listId, liClass, text) {
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
            }  else {
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

// opens header links
function openRespNavbar() {
    const navDiv = document.getElementById('header-links');
    navDiv.style.display = 'block';
    closeNavbarBtn.style.display = 'block';
}

// closes header links
function closeRespNavbar() {
    const navDiv = document.getElementById('header-links');
    navDiv.style.display = 'none';
    closeNavbarBtn.style.display = 'none';
}

