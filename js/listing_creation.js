const listingArray = [];
let objectIndex = 0;

const addListingBtn = document.getElementById('add-listing-btn');
const addListingCloseBtn = document.getElementById('listing-close-btn');
const addListingSelect = document.getElementById('listing_contact');
const addListingImgBtn = document.getElementById('listing_img');
const addListingSubmit = document.getElementById('listing_submit');

addListingBtn.addEventListener('click', openAddListing);
addListingCloseBtn.addEventListener('click', closeAddListing);
addListingSelect.addEventListener('click', contactSelect);
addListingImgBtn.addEventListener('change', addListingImg);
addListingSubmit.addEventListener('click', submitListing);

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
    if (event.target === listingModal) {
        const listingModal = document.getElementById('add-listing-modal');
        listingModal.style.display = 'none';
    }
}

function submitListing(event) {
    event.preventDefault();
    // event.preventDefault() kunnes local storage toimii
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
    });
}

const imager = [];
let imagerX = 0;

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
    listing.category = 'Koti';
    listing.address = 'Aikakuja 10';
    listing.city = 'Kolari';
    listing.img = ['./img/empty.jpg', './img/empty.jpg', './img/empty.jpg'];
    listing.payMethod = ['MobilePay', ' käteinen'];
    listing.price = 5;
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
    var payMethod = document.getElementById("listing_payment").value;
    var price = document.getElementById("listing_price").value;
    var contact = document.getElementById("listing_contact").value;
    var cond = document.getElementById("listing_cond").value;

    //Lisää function toimittomuuden syyt tekijälle

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
            const email = document.getElementById("listing_email").value;
            if (email == "")
                return;
            contact = contact + ": " + email;
            break;

        case "Puhelin":
            const phoneNumber = document.getElementById("listing_phone").value;
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

    listing.img = [];
    for (var i of imager) {
        listing.img.push(i);
    }

    console.log(listing.img);

    listing.payMethod = payMethod;
    listing.price = price;
    listing.contact = contact;
    listing.shape = cond;
    listing.show = "create";

    listingArray.push(listing);

    objectIndex++;

    const listingModal = document.getElementById('add-listing-modal');
    listingModal.style.display = 'none';

    resetAddListing();
    clearAllListings();
    createListing();
}

function resetAddListing() {
    document.getElementById("listing_name").value = "";
    document.getElementById("listing_desc").value = "";
    document.getElementById("listing_categ").value = null;
    document.getElementById("listing_address").value = "";
    document.getElementById("listing_city").value = null;
    document.getElementById("listing_payment").value = "";
    document.getElementById("listing_price").value = "";
    document.getElementById("listing_contact").value = null;
    document.getElementById("listing_cond").value = null;
    document.getElementById("listing_email").value = "";
    document.getElementById("listing_phone").value = "";

    const imageCarrier = document.getElementById("listing_img_preview");
    while (imageCarrier.firstChild) {
        imageCarrier.removeChild(imageCarrier.lastChild);
    }

    while (true) {
        if (imagerX == 0) break;
        imager.splice(imagerX - 1);
        imagerX--;
    }
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

        const listingInnerImgDiv = document.createElement('div');
        const listingInnerInfoDiv = document.createElement('div');

        listingInnerImgDiv.className = 'inner-listing-img';
        listingInnerInfoDiv.className = 'inner-listing-info';

        listingInnerDiv.appendChild(listingInnerImgDiv);
        listingInnerDiv.appendChild(listingInnerInfoDiv);

        const listingInnerExpand = document.createElement('div');
        listingInnerExpand.className = 'inner-listing-expand';

        listingInnerDiv.appendChild(listingInnerExpand);

        createTitleP(x, listingInnerInfoDiv, 0);

        createImg(x, listingInnerImgDiv, 0)

        createPriceP(x, listingInnerInfoDiv);

        createDateP(x, listingInnerInfoDiv);

        const expandBtn = document.createElement('input');
        expandBtn.type = 'button'
        expandBtn.className = 'expand-btn';

        listingInnerExpand.appendChild(expandBtn);

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

    const targetId = event.target.parentElement.parentElement.parentElement.getAttribute('id');
    const targetInnerId = event.target.parentElement.parentElement.getAttribute('id');
    const listingDiv = document.getElementById(targetId);
    const listingInnerDiv = document.getElementById(targetInnerId);

    for (let x = 0; listingArray.length > x; x++)
        if (targetId == listingArray[x].id) {
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
                    listingInnerDiv.style.display = "flex";
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
            break;
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
    const priceNode = document.createTextNode("Hinta: " + listingArray[x].price + " €");

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

createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();
createListingObjectOnStart();

createListing();