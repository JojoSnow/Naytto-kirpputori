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

<<<<<<< HEAD
    const nameLabel = createElement('label');

=======
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
>>>>>>> 0317e7c824e23a91782744be86b2219b5e3d2990

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
function createListing(index) {
    const listingList = document.getElementById('store_listing');

    for (let i = 0; listingArray.length > i; i++) {
        const listingDiv = document.createElement('div');
        const titleP = document.createElement('p');
        const listingImg = document.createElement('img');
        const priceP = document.createElement('p');
        const dateP = document.createElement('p');
        const expandBtn = document.createElement('input');

        listingDiv.id = 'listing' + index;
        listingDiv.className = 'listing';
        listingList.appendChild(listingDiv);

        const titleNode = document.createTextNode(listingArray[index].title);
        titleP.appendChild(titleNode);
        titleP.id = 'name' + index;
        titleP.className = 'listing-title';
        listingDiv.appendChild(titleP);

        listingImg.src = listingArray[index].img[0];
        listingImg.alt = 'kuva'
        listingImg.id = 'img' + index;
        listingImg.className = 'listing-img'
        listingDiv.appendChild(listingImg);

        const priceNode = document.createTextNode('Hinta: ' + listingArray[index].price);
        priceP.appendChild(priceNode);
        priceP.id = 'price' + index;
        priceP.className = 'listing-price';
        listingDiv.appendChild(priceP);

        const dateNode = document.createTextNode(listingArray[index].date);
        dateP.appendChild(dateNode);
        dateP.id = 'date' + index;
        dateP.className = 'listing-date';
        listingDiv.appendChild(dateP);

        expandBtn.type = 'button'
        expandBtn.className = 'expand-btn';
        listingDiv.appendChild(expandBtn);

        index++;
    }
    document.querySelectorAll('.expand-btn').forEach(btn => btn.addEventListener('click', expandListing));
}

// expanding the clicked listing
function expandListing(event) {
    const targetId = event.target.parentElement.getAttribute('id');

    const listingDiv = document.getElementById(targetId);

    for (let x = 0; listingArray.length > x; x++) {
        if (listingArray[x].show === 'create' && targetId === listingArray[x].id) {
            const expandDiv = document.createElement('div');
            const listingUl = document.createElement('ul');
            const descP = document.createElement('p');
            const categoryLi = document.createElement('li');
            const shapeLi = document.createElement('li');
            const addressLi = document.createElement('li');
            const cityLi = document.createElement('li');
            const payMethodLi = document.createElement('li');
            const nameLi = document.createElement('li');
            const contactLi = document.createElement('li');


            expandDiv.id = 'listing-expand' + x;
            expandDiv.class = 'listing-expand';
            listingDiv.appendChild(expandDiv);

            for (let i = 0; listingArray[x].img.length > i; i++) {
                const listingExpandImg = document.createElement('img');
                listingExpandImg.src = listingArray[x].img[i];
                listingExpandImg.alt = 'kuva';
                listingExpandImg.className = 'listing-expand-img';
                expandDiv.appendChild(listingExpandImg);
            }

            const br1 = document.createElement('br');
            expandDiv.appendChild(br1);

            if (listingArray[x].desc !== '') {
                const descNode = document.createTextNode(listingArray[x].desc);
                descP.className = 'listing-desc';
                descP.appendChild(descNode);
                expandDiv.appendChild(descP);
            }

            listingUl.className = 'listing-list';
            expandDiv.appendChild(listingUl);

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

            listingArray[x].show = 'hide';
            event.target.style.backgroundImage = 'url(../img/icons/angle-up-solid.svg)';
        } else if (listingArray[x].show === 'hide' && targetId === listingArray[x].id) {
            event.target.nextSibling.style.display = 'none';
            listingArray[x].show = 'show';
            event.target.style.backgroundImage = 'url(../img/icons/angle-down-solid.svg)';
        } else if (listingArray[x].show === 'show' && targetId === listingArray[x].id) {
            event.target.nextSibling.style.display = 'block';
            listingArray[x].show = 'hide';
            event.target.style.backgroundImage = 'url(../img/icons/angle-up-solid.svg)';
        }
    }
}

createListingObject(objectIndex);
createListingObject(objectIndex);
createListing(listingIndex);
showSlides();