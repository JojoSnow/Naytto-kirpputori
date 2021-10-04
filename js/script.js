const listingArray = [];
let objectIndex = 0;
let listingIndex = 0;
let slideIndex = 0;

const loginBtn = document.getElementById('login-btn');
const regBtn = document.getElementById('regis-btn')
const loginCloseBtn = document.getElementById('login-close-btn');
const regCloseBtn = document.getElementById('reg-close-btn');
const addListingBtn = document.getElementById('add-listing-btn');
const addListingCloseBtn = document.getElementById('listing-close-btn');
const addListingSelect = document.getElementById('listing-contact');
const addListingImgBtn = document.getElementById('listing-img');

loginBtn.addEventListener('click', openLogin);
regBtn.addEventListener('click', openReg);
loginCloseBtn.addEventListener('click', closeLogin);
regCloseBtn.addEventListener('click', closeReg);
window.addEventListener('click', clickOutsideLogin);
window.addEventListener('click', clickOutsideReg);
addListingBtn.addEventListener('click', openAddListing);
addListingCloseBtn.addEventListener('click', closeAddListing);
window.addEventListener('click', clickOutsideAddListing);
addListingSelect.addEventListener('click', contactSelect);
addListingImgBtn.addEventListener('change', addListingImg);

// login functions
function openLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'block';
}

function closeLogin() {
    const loginModal = document.getElementById('login-modal');
    loginModal.style.display = 'none';
}

function clickOutsideLogin(event) {
    const loginModal = document.getElementById('login-modal');
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
}

// registration functions
function openReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'block';
}

function closeReg() {
    const regModal = document.getElementById('reg-modal');
    regModal.style.display = 'none';
}

function clickOutsideReg(event) {
    const regModal = document.getElementById('reg-modal');
    if (event.target === regModal) {
        regModal.style.display = 'none';
    }
}

//sliding for info images -- make it actually slide
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

// listing functions
function openAddListing() {
    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'block';
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

function addListingImg() {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        // localStorage.setItem('recent-image', reader.result);
    });

    reader.readAsDataURL(this.files[0]);
}

function contactSelect() {
    const contactValue = document.getElementById('listing-contact').value;

    if (contactValue === 'email') {
        document.getElementById('listing-email').style.display = 'block';
        document.getElementById('listing-phone').style.display = 'none';
    } else if (contactValue === 'phone') {
        document.getElementById('listing-phone').style.display = 'block';
        document.getElementById('listing-email').style.display = 'none';
    } else if (contactValue === 'empty') {
        document.getElementById('listing-phone').style.display = 'none';
        document.getElementById('listing-email').style.display = 'none';
    }

}

// creating object of the listing
function createListingObject(index) {
    const listing = {};
    listing.id = 'listing' + index;
    listing.title = 'ruskea tuoli';
    listing.name = 'Maija Meikäläinen'
    listing.date = '10.01.2020';
    listing.desc = 'ruskea, puinen \n haku';
    listing.category = 'Huonekalut';
    listing.address = 'Aikakuja 10';
    listing.city = 'Kolari';
    listing.img = ['./img/empty.jpg', './img/empty.jpg', './img/empty.jpg'];
    listing.payMethod = ['MobilePay', ' käteinen'];
    listing.price = '5 €';
    listing.contact = ['Sähköposti'];
    listing.shape = 'käytetty';
    listing.show = 'create';

    listingArray.push(listing);

    objectIndex++;
}

// creates the listings for the page
function createListing(x) {
    const listingList = document.getElementById('store_listing');

    for (let i = 0; listingArray.length > i; i++) {
        const listingDiv = document.createElement('div');
        const listingInnerDiv = document.createElement('div');
        const expandBtn = document.createElement('input');

        listingDiv.id = 'listing' + x;
        listingDiv.className = 'listing';

        listingInnerDiv.id = 'listingInner' + x;
        listingInnerDiv.className = 'inner-listing';

        createTitleP(x, listingInnerDiv, 0);

        createImg(x, listingInnerDiv, 0)

        createPriceP(x, listingInnerDiv);

        createDateP(x, listingInnerDiv);

        expandBtn.type = 'button'
        expandBtn.className = 'expand-btn';

        listingInnerDiv.appendChild(expandBtn);

        listingList.appendChild(listingDiv);
        listingDiv.appendChild(listingInnerDiv);

        x++;
    }
    document.querySelectorAll('.expand-btn').forEach(btn => btn.addEventListener('click', expandListing));
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
                const newBtn = document.createElement('input');

                expandDiv.id = 'listing-expand' + x;
                expandDiv.class = 'listing-expand';
                listingDiv.appendChild(expandDiv);

                createTitleP(x, expandDiv, 1);

                createImg(x, expandDiv, 1);

                createPriceP(x, expandDiv);

                createDescP(x, expandDiv);

                createListingUl(x, expandDiv);

                createDateP(x, expandDiv);

                newBtn.type = "button"
                newBtn.className = "expand-btn";
                newBtn.style.backgroundImage = "url(../img/icons/angle-up-solid.svg)";
                expandDiv.appendChild(newBtn);

                newBtn.addEventListener("click", function () {
                    listingArray[x].show = "hide"

                    expandDiv.style.display = "none";
                    listingInnerDiv.style.display = "block";
                })

                listingInnerDiv.style.display = "none";
            } else if (listingArray[x].show == "hide") {
                listingArray[x].show = "show";

                listingInnerDiv.style.display = "none";

                expandDiv = document.getElementById('listing-expand' + x);
                expandDiv.style.display = "block";
            }
}

function createTitleP(x, div, type) {
    const titleP = document.createElement('p');
    const titleNode = document.createTextNode(listingArray[x].title);

    titleP.appendChild(titleNode);
    titleP.id = 'name' + x;
    switch (type) {
        case 0:
            titleP.className = 'listing-title';
            break;
        case 1:
            titleP.className = 'listing-expand-title';
            break;
    }
    div.appendChild(titleP);
}

function createPriceP(x, div) {
    const priceP = document.createElement('p');
    const priceNode = document.createTextNode(listingArray[x].title);

    priceP.id = 'price' + x;
    priceP.className = 'listing-price';

    priceP.appendChild(priceNode);
    div.appendChild(priceP);
}

function createDescP(x, div) {
    if (listingArray[x].desc == '')
        return

    const descP = document.createElement('p');
    const descNode = document.createTextNode(listingArray[x].desc);

    descP.id = 'desc' + x;
    descP.className = 'listing-desc';

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
        case 1:
            const listingImg = document.createElement('img');

            listingImg.src = listingArray[x].img[0];
            listingImg.alt = 'kuva'
            listingImg.id = 'img' + x;
            listingImg.className = 'listing-img'
            div.appendChild(listingImg);
            return;
        case 2:
            for (let i = 0; listingArray[x].img.length > i; i++) {
                const listingExpandBigImg = document.createElement('img');

                if (i == 0) {
                    listingExpandBigImg.src = listingArray[x].img[0];
                    listingExpandBigImg.alt = 'kuva';
                    listingExpandBigImg.className = 'listing-expand-img-main';
                    div.appendChild(listingExpandBigImg);
                }

                const listingExpandImg = document.createElement('img');
                listingExpandImg.src = listingArray[x].img[i];
                listingExpandImg.alt = 'kuva';
                listingExpandImg.className = 'listing-expand-img-small';
                listingExpandImg.addEventListener('click', function () {
                    listingExpandBigImg.src = listingExpandImg.src;
                });
                div.appendChild(listingExpandImg);
            }
            return;
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

createListingObject(objectIndex);
createListingObject(objectIndex);
createListing(listingIndex);
showSlides();