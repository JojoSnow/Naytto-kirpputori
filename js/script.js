

const listingArray = [];

let IdIndex = 0;


function createListingObject() {
    const listing = {};
    listing.name = 'tuoli';
    listing.date = '10.01.2020';
    listing.desc = 'ruskea, puinen';
    listing.category = 'Huonekalut';
    listing.address = 'Aikakuja 10';
    listing.city = 'Kolari';
    listing.img = 'empty';
    listing.payMethod = 'MobilePay';
    listing.price = '5' + ' €';
    listing.contact = 'sähköposti';
    listing.shape = 'käytetty';

    listingArray.push(listing);
}

function createListing() {
    const store = document.getElementById('store');
    
    const listingDiv = document.createElement('div');
    const nameP = document.createElement('p');
    const listingImg = document.createElement('img');
    const priceP = document.createElement('p');

    listingDiv.id = 'id' + IdIndex;
    store.appendChild(listingDiv);

    const nameNode = document.createTextNode(listingArray[0].name);
    nameP.appendChild(nameNode);
    listingDiv.appendChild(nameP);

    listingImg.src = listingArray[0].img;
    listingDiv.appendChild(listingImg);

    const priceNode = document.createTextNode('Hinta: ' + listingArray[0].price);
    priceP.appendChild(priceNode);
    listingDiv.appendChild(priceP);

    IdIndex++;
}
createListingObject();
createListing();
function expandListing() {

}