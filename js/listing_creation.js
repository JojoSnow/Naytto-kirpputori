const listingArray = [];
let objectIndex = null;
var markers = [];

const addListingBtn = document.getElementById('add-listing-btn');
const addListingCloseBtn = document.getElementById('listing-close-btn');
const addListingSelect = document.getElementById('listing_contact');
const addListingImgBtn = document.getElementById('listing_img');
const addListingSubmit = document.getElementById('listing_submit');
const locatorBtn = document.getElementById("locator_button");
const useLocationBtn = document.getElementById("btn_use_location");
const unUseLocationBtn = document.getElementById("btn_unuse_location");

window.addEventListener("load", createOrLoadListingsOnFirstStart);
addListingBtn.addEventListener('click', openAddListing);
addListingCloseBtn.addEventListener('click', closeAddListing);
addListingSelect.addEventListener('click', contactSelect);
addListingImgBtn.addEventListener('change', addListingImg);
addListingSubmit.addEventListener('click', submitListing);
locatorBtn.addEventListener("click", findMe);
useLocationBtn.addEventListener("click", useLocation);
unUseLocationBtn.addEventListener("click", unUseLocation);

function findMe(event) {
    event.preventDefault();

    document.getElementById("locator_button").disabled = true;
    document.getElementById("p_map_location").style.display = "block";
    document.getElementById("btn_use_location").style.display = "block";
    document.getElementById("btn_unuse_location").style.display = "block";
    document.getElementById("locator_button").style.display = "none";

    const mapDiv = document.getElementById("listing_map");
    mapDiv.style.display = "block"

    var location = { lat: 62.349609, lng: 26.162455 };

    initMapLocator(location, 5, mapDiv)
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
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
    var map = new google.maps.Map(div, {
        zoom: zoom,
        center: location
    });

    map.addListener("click", function (event) {
        deleteMarkers();

        document.getElementById("btn_use_location").disabled = false;

        useLocator = false;
        locator.lat = event.latLng.lat();
        locator.lng = event.latLng.lng();

        const marker = new google.maps.Marker({
            position: locator,
            map: map,
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
    let x = 0;
    const listingList = document.getElementById("store_listing");

    while (x < objectIndex) {

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
        expandBtn.value = x;

        expandBtn.addEventListener("click", function () {
            expandListing(expandBtn.getAttribute("value"));
        });

        listingInnerExpand.appendChild(expandBtn);

        x++;
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

        createNewDiv(x, externalDiv, null, "listing-expand-external", expandDiv);
        createNewDiv(x, locationDiv, null, "listing-expand-location", externalDiv);
        createNewDiv(x, locatorWarningDiv, "locWarning", "listing-expand-locWarning", externalDiv);
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

function initMapFinder(city, zoom, div, markPos) {
    const map = new google.maps.Map(div, {
        zoom: zoom,
        center: city
    });

    console.log(markPos);

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