const listingArray = [];
let objectIndex = 0;
let userIndex = 0;
let slideIndex = 0;

const loginBtn = document.getElementById('login-btn');
const regBtn = document.getElementById('regis-btn');
const regModalBtn = document.getElementById('input-reg-btn');
const loginModalBtn = document.getElementById('input-login-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');
const addListingBtn = document.getElementById('add-listing-btn');
const addListingCloseBtn = document.getElementById('listing-close-btn');
const addListingSelect = document.getElementById('listing_contact');
const addListingImgBtn = document.getElementById('listing_img');
const addListingSubmit = document.getElementById('listing_submit');

loginBtn.addEventListener('click', openLogin);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
addListingBtn.addEventListener('click', openAddListing);
addListingCloseBtn.addEventListener('click', closeAddListing);
addListingSelect.addEventListener('click', contactSelect);
addListingImgBtn.addEventListener('change', addListingImg);
addListingSubmit.addEventListener('click', submitListing);
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
    if (validateEmail(regEmail)) {
        document.getElementById('input-reg-email').style.borderColor = '#a0a0a0';
        regEmailAlert.innerHTML = '';
        regEmailAlert.style.display = 'none';
        if (regEmail === '') {
            document.getElementById('input-reg-email').style.borderColor = '#de0f00';
            regEmailAlert.style.display = 'block';
            regEmailAlert.innerHTML = 'Syötä sähköposti';
        }
    } else {
        document.getElementById('input-reg-email').style.borderColor = '#de0f00';
        regEmailAlert.style.display = 'block';
        regEmailAlert.innerHTML = 'Sähköposti osoite ei kelpaa';
    }

    // checks if the password is longer than 8 chars and not empty - alert if otherwise
    const regPasswordAlert = document.getElementById('reg-password-alert');

    if (regPassword.length < 8) {
        document.getElementById('input-reg-password').style.borderColor = '#de0f00';
        regPasswordAlert.style.display = 'block';
        regPasswordAlert.innerHTML = 'Salasanan pitää olla vähintään 8 merkkiä pitkä'
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
    setTimeout(closeReg, 2000);
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

// add listing functions
function openAddListing() {
    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'block';
    contactSelectDefault();
}

function closeAddListing() {
    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'none';
}

function clickOutsideAddListing(event) {
    const listingModal = document.getElementById('add-listing-modal');
    if (event.target === listingModal) {
        listingModal.style.display = 'none';
    }
}

function submitListing(event) {
    event.preventDefault();
    // event.preventDefault() kunnes local storage toimii
    createNewListingObject();
}

// testing- not working
function addListingImg() {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        localStorage.setItem('recent-image', reader.result);
    });

    reader.readAsDataURL(this.files[0]);
}

function contactSelect() {
    const contactValue = document.getElementById("listing_contact").value;

    switch (contactValue) {

        case "Sähköposti":
            document.getElementById("listing_email").style.display = 'block';
            document.getElementById("listing_phone").style.display = 'none';
            return;

        case "Puhelin":
            document.getElementById("listing_phone").style.display = 'block';
            document.getElementById("listing_email").style.display = 'none';
            return;

        default:
            document.getElementById("listing_phone").style.display = 'none';
            document.getElementById("listing_email").style.display = 'none';
            return;
    }
}

function contactSelectDefault() {
    document.getElementById("listing_phone").style.display = 'none';
    document.getElementById("listing_email").style.display = 'none';
}

// creates an object of the listing
function createListingObjectOnStart() {

    const listing = {};

    listing.id = 'listing' + objectIndex;
    listing.title = 'ruskea tuoli';
    listing.name = 'Maija Meikäläinen'
    listing.date = '10.01.2020';
    listing.desc = 'ruskea, puinen, haku';
    listing.category = 'Huonekalut';
    listing.address = 'Aikakuja 10';
    listing.city = 'Kolari';
    listing.img = ['./img/empty.jpg', './img/empty.jpg', './img/empty.jpg'];
    listing.payMethod = ['MobilePay', ' käteinen'];
    listing.price = '5 €';
    listing.contact = ['Sähköposti'];
    listing.shape = 'käytetty';
    listing.show = "create";

    listingArray.push(listing);

    objectIndex++;
}

function createNewListingObject() {

    const listing = {};
    var date = new Date();
    var time = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    var title = document.getElementById("listing_name").value
    var desc = document.getElementById("listing_desc").value;
    var categ = document.getElementById("listing_categ").value;
    var address = document.getElementById("listing_address").value;
    var city = document.getElementById("listing_city").value;
    // Väliaikainen
    var img = ["./img/empty.jpg", "./img/empty.jpg", "./img/empty.jpg2"];
    var payMethod = document.getElementById("listing_payment").value;
    var price = document.getElementById("listing_price").value;
    var contact = document.getElementById("listing_contact").value;
    var cond = document.getElementById("listing_cond").value;

    if (title == "")
        return;

    if (desc == "")
        return;

    if (categ == null)
        return;

    if (address == "")
        return;

    if (city == null)
        return;

    if (payMethod == "")
        return;

    switch (contact) {
        case "Sähköposti":
            const email = document.getElementById("listing_email");
            if (email == "")
                return;
            contact = contact + ": " + email;
            break;

        case "Puhelin":
            const phoneNumber = document.getElementById("listing_phone");
            if (phoneNumber == "")
                return;
            contact = contact + ": " + phoneNumber;
            break;

        case null:
            return;
    }

    if (cond == null)
        return;

    listing.id = "listing" + objectIndex;
    listing.title = title;
    listing.name = "Null";
    listing.date = time;
    listing.desc = desc;
    listing.category = categ;
    listing.address = address;
    listing.city = city;
    listing.img = img;
    listing.payMethod = payMethod;
    listing.price = price;
    listing.contact = contact;
    listing.shape = cond;
    listing.show = "create";

    listingArray.push(listing);

    objectIndex++;

    clearAllListings();
    createListing();
}



// creates the listings for the page
function createListing() {
    let x = 0;
    const listingList = document.getElementById('store_listing');

    for (let i = 0; listingArray.length > i; i++) {
        const listingDiv = document.createElement('div');
        const listingInnerDiv = document.createElement('div');

        listingDiv.id = 'listing' + x;
        listingDiv.className = 'listing-style1';

        listingInnerDiv.id = 'listingInner' + x;
        listingInnerDiv.className = 'inner-listing';

        createTitleP(x, listingInnerDiv, 0);

        createImg(x, listingInnerDiv, 0)

        createPriceP(x, listingInnerDiv);

        createDateP(x, listingInnerDiv);

        const expandBtn = document.createElement('input');
        expandBtn.type = 'button'
        expandBtn.className = 'expand-btn';

        listingInnerDiv.appendChild(expandBtn);

        listingDiv.appendChild(listingInnerDiv);
        listingList.appendChild(listingDiv);

        x++;
    }
    document.querySelectorAll('.expand-btn').forEach(btn => btn.addEventListener('click', expandListing));
}

function clearAllListings() {
    let x = 0, y = listingArray.length - 1;

    if (y == 0)
        return;

    for (let x = 0; listingArray.length > x; x++)
        listingArray[x].show = "create";

    while (x < y) {
        document.getElementById("listing" + x).remove();
        x++;
    }
}

// expanding the clicked listing
function expandListing(event) {

    const targetId = event.target.parentElement.parentElement.getAttribute('id');
    const targetInnerId = event.target.parentElement.getAttribute('id');
    const listingDiv = document.getElementById(targetId);
    const listingInnerDiv = document.getElementById(targetInnerId);

    for (let x = 0; listingArray.length > x; x++)
        if (targetId == listingArray[x].id)
            if (listingArray[x].show == 'create') {
                const expandDiv = document.createElement('div');

                expandDiv.id = 'listing-expand' + x;
                expandDiv.className = 'listing-expand';

                listingDiv.appendChild(expandDiv);

                const headerDiv = document.createElement('div');
                expandDiv.appendChild(headerDiv);

                const infoDiv = document.createElement('div');
                const imgDiv = document.createElement('div');
                const descDiv = document.createElement('div');

                infoDiv.className = 'listing-expand-info';
                imgDiv.className = 'listing-expand-imgDiv';
                descDiv.className = 'listing-expand-descDiv';

                expandDiv.appendChild(infoDiv);
                infoDiv.appendChild(imgDiv);
                infoDiv.appendChild(descDiv);

                const externalDiv = document.createElement('div');
                const locationDiv = document.createElement('div');
                const ulDiv = document.createElement('div');

                externalDiv.className = 'listing-expand-external';
                locationDiv.className = 'listing-expand-location';
                ulDiv.className = 'listing-expand-ul';

                expandDiv.appendChild(externalDiv);
                externalDiv.appendChild(locationDiv);
                externalDiv.appendChild(ulDiv);

                //Poista kun saadaan kartta
                const funny = document.createElement('canvas');
                locationDiv.appendChild(funny);
                //Poista kun saadaan kartta

                createTitleP(x, headerDiv, 1);

                createImg(x, imgDiv, 1);

                createPriceP(x, descDiv);

                createDescP(x, descDiv);

                createListingUl(x, ulDiv);

                createDateP(x, expandDiv);

                const newBtn = document.createElement('input');
                newBtn.type = "button"
                newBtn.className = "expand-btn";
                newBtn.style.backgroundImage = "url(../img/icons/angle-up-solid.svg)";
                expandDiv.appendChild(newBtn);

                newBtn.addEventListener("click", function () {
                    listingArray[x].show = "hide"

                    expandDiv.style.display = "none";
                    listingDiv.className = "listing-style1";
                    listingInnerDiv.style.display = "block";
                })

                listingInnerDiv.style.display = "none";
                listingDiv.className = "listing-style2";
            } else if (listingArray[x].show == "hide") {
                listingArray[x].show = "show";

                listingInnerDiv.style.display = "none";
                listingDiv.className = "listing-style2";

                expandDiv = document.getElementById('listing-expand' + x);
                expandDiv.style.display = "block";
            }
}

function createTitleP(x, div, type) {
    const titleP = document.createElement('p');
    const titleNode = document.createTextNode(listingArray[x].title);

    titleP.id = 'name' + x;
    switch (type) {
        case 0:
            titleP.className = 'listing-title';
            break;
        case 1:
            titleP.className = 'listing-expand-title';
    }

    titleP.appendChild(titleNode);
    div.appendChild(titleP);
}

function createPriceP(x, div) {
    const priceP = document.createElement('p');
    const priceNode = document.createTextNode("Hinta: " + listingArray[x].price);

    priceP.id = 'price' + x;
    priceP.className = 'listing-price';

    priceP.appendChild(priceNode);
    div.appendChild(priceP);
}

function createDescP(x, div) {
    const descHeading = document.createElement('p');
    const descHeadingNode = document.createTextNode("Lisätietoja:");

    descHeading.className = 'listing-desc-heading';

    descHeading.appendChild(descHeadingNode);
    div.appendChild(descHeading);

    const descP = document.createElement('p');
    const descNodeEmpty = document.createTextNode("Tällä tuotteella ei ole lisätietoja");
    const descNode = document.createTextNode(listingArray[x].desc);

    descP.id = 'desc' + x;
    descP.className = 'listing-desc';

    if (listingArray[x].desc == '')
        descP.appendChild(descNodeEmpty);
    else
        descP.appendChild(descNode);

    div.appendChild(descP);
}

function createDateP(x, div) {
    const dateP = document.createElement('p');
    const dateNode = document.createTextNode(listingArray[x].date);

    dateP.id = 'date' + x;
    dateP.className = 'listing-date';

    dateP.appendChild(dateNode);
    div.appendChild(dateP);
}

function createImg(x, div, type) {
    switch (type) {
        case 0:
            const listingImg = document.createElement('img');

            listingImg.src = listingArray[x].img[0];
            listingImg.alt = 'kuva'
            listingImg.id = 'img' + x;
            listingImg.className = 'listing-img'

            div.appendChild(listingImg);

            return;
        case 1:
            const imgDivSmall = document.createElement('div');
            const imgDivBig = document.createElement('div');

            imgDivSmall.className = 'listing-expand-imgDiv-small';
            imgDivBig.className = 'listing-expand-imgDiv-big';

            div.appendChild(imgDivBig);
            div.appendChild(imgDivSmall);

            const listingExpandBigImg = document.createElement('img');

            listingExpandBigImg.src = listingArray[x].img[0];
            listingExpandBigImg.alt = 'kuva';
            listingExpandBigImg.id = 'imgBig' + x;
            listingExpandBigImg.className = 'listing-expand-img-main';

            imgDivBig.appendChild(listingExpandBigImg);

            for (let i = 0; listingArray[x].img.length > i; i++) {
                const listingExpandSmallImg = document.createElement('img');

                listingExpandSmallImg.src = listingArray[x].img[i];
                listingExpandSmallImg.alt = 'kuva';
                listingExpandSmallImg.className = 'listing-expand-img-small';
                listingExpandSmallImg.addEventListener('click', function () {
                    listingExpandBigImg.src = listingExpandSmallImg.src;
                });

                imgDivSmall.appendChild(listingExpandSmallImg);
            }
    }
}

function createListingUl(x, div) {
    const listingUl = document.createElement('ul');
    const categoryLi = document.createElement('li');
    const shapeLi = document.createElement('li');
    const addressLi = document.createElement('li');
    const cityLi = document.createElement('li');
    const payMethodLi = document.createElement('li');
    const nameLi = document.createElement('li');
    const contactLi = document.createElement('li');

    listingUl.className = 'listing-list';
    div.appendChild(listingUl);

    const categoryNode = document.createTextNode('Kategoria: ' + listingArray[x].category);
    categoryLi.className = 'listing-list-item';
    categoryLi.appendChild(categoryNode);
    listingUl.appendChild(categoryLi);

    const shapeNode = document.createTextNode('Kunto: ' + listingArray[x].shape);
    shapeLi.className = 'listing-list-item';
    shapeLi.appendChild(shapeNode);
    listingUl.appendChild(shapeLi);

    if (listingArray[x].address !== '') {
        const addressNode = document.createTextNode('Osoite: ' + listingArray[x].address);
        addressLi.className = 'listing-list-item';
        addressLi.appendChild(addressNode);
        listingUl.appendChild(addressLi);
    }

    const cityNode = document.createTextNode('Kaupunki: ' + listingArray[x].city);
    cityLi.className = 'listing-list-item';
    cityLi.appendChild(cityNode);
    listingUl.appendChild(cityLi);

    const payMethodNode = document.createTextNode('Maksutapa: ' + listingArray[x].payMethod);
    payMethodLi.className = 'listing-list-item';
    payMethodLi.appendChild(payMethodNode);
    listingUl.appendChild(payMethodLi);

    const nameNode = document.createTextNode('Listauksen tekijä: ' + listingArray[x].name);
    nameLi.className = 'listing-list-item';
    nameLi.appendChild(nameNode);
    listingUl.appendChild(nameLi);

    const contactNode = document.createTextNode('Yhteydenotto: ' + listingArray[x].contact);
    contactLi.className = 'listing-list-item';
    contactLi.appendChild(contactNode);
    listingUl.appendChild(contactLi);
}

createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();

createListing();

showSlides();