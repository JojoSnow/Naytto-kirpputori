

const listingArray = [];


function createListingObject() {
    const listing = {};
    listing.id = 'listing' + 0;
    listing.title = 'ruskea tuoli';
    listing.name = 'Maija Meikäläinen'
    listing.date = '10.01.2020';
    listing.desc = 'ruskea, puinen \n haku';
    listing.category = 'Huonekalut';
    listing.address = 'Aikakuja 10';
    listing.city = 'Kolari';
    listing.img = ['empty'];
    listing.payMethod = ['MobilePay', 'käteinen'];
    listing.price = '5' + ' €';
    listing.contact = ['Sähköposti'];
    listing.shape = 'käytetty';

    listingArray.push(listing);
}

function createListing(i) {
    const listingList = document.getElementById('store');
    
    const listingDiv = document.createElement('div');
    const titleP = document.createElement('p');
    const listingImg = document.createElement('img');
    const priceP = document.createElement('p');
    const dateP = document.createElement('p');

    listingDiv.id = 'listing' + i;
    listingDiv.className = 'listing-div';
    listingList.appendChild(listingDiv);

    const nameNode = document.createTextNode(listingArray[i].title);
    titleP.appendChild(nameNode);
    titleP.id = 'name' + i;
    titleP.className = 'listing-name';
    listingDiv.appendChild(titleP);

    listingImg.src = listingArray[i].img;
    listingImg.id = 'img' + i;
    listingImg.className = 'listing-img'
    listingDiv.appendChild(listingImg);

    const priceNode = document.createTextNode('Hinta: ' + listingArray[i].price);
    priceP.appendChild(priceNode);
    priceP.id = 'price' + i;
    priceP.className = 'listing-price';
    listingDiv.appendChild(priceP);

    const dateNode = document.createTextNode(listingArray[i].date);
    dateP.appendChild(dateNode);
    dateP.id = 'date' + i;
    dateP.className = 'listing-date';
    listingDiv.appendChild(dateP);
}

function expandListing(i) {
    const listingDiv = document.getElementById('listing' + i);

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
    

    expandDiv.id = 'listing-expand' + i;
    expandDiv.class = 'listing-expand';
    listingDiv.appendChild(expandDiv);

    const descNode = document.createTextNode(listingArray[i].desc);
    descP.className = 'listing-desc';
    descP.appendChild(descNode);
    listingDiv.appendChild(descNode);

    listingUl.className = 'listing-list';
    listingDiv.appendChild(listingUl);

    const categoryNode = document.createTextNode('Kategoria: ' + listingArray[i].category);
    categoryLi.className = 'listing-list-item';
    categoryLi.appendChild(categoryNode);
    listingUl.appendChild(categoryLi);

    const shapeNode = document.createTextNode('Kunto: ' + listingArray[i].shape);
    shapeLi.className = 'listing-list-item';
    shapeLi.appendChild(shapeNode);
    listingUl.appendChild(shapeLi);

    const addressNode = document.createTextNode('Osoite: ' + listingArray[i].address);
    addressLi.className = 'listing-list-item';
    addressLi.appendChild(addressNode);
    listingUl.appendChild(addressLi);

    const cityNode = document.createTextNode('Kaupunki: ' + listingArray[i].city);
    cityLi.className = 'listing-list-item';
    cityLi.appendChild(cityNode);
    listingUl.appendChild(cityLi);

    const payMethodNode = document.createTextNode('Maksutapa: ' + listingArray[i].payMethod);
    payMethodLi.className = 'listing-list-item';
    payMethodLi.appendChild(payMethodNode);
    listingUl.appendChild(payMethodLi);

    const nameNode = document.createTextNode('Listauksen tekijä: ' + listingArray[i].name);
    nameLi.className = 'listing-list-item';
    nameLi.appendChild(nameNode);
    listingUl.appendChild(nameLi);

    const contactNode = document.createTextNode('Yhteydenotto: ' + listingArray[i].contact);
    contactLi.className = 'listing-list-item';
    contactLi.appendChild(contactNode);
    listingUl.appendChild(contactLi);
}

createListingObject(0);
createListing(0);
expandListing(0);