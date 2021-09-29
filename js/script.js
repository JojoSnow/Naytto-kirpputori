

const listingArray = [];
let objectIndex = 0;
let listingIndex = 0;

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
    listing.img = ['empty', 'empty', 'empty'];
    listing.payMethod = ['MobilePay', ' käteinen'];
    listing.price = '5 €';
    listing.contact = ['Sähköposti'];
    listing.shape = 'käytetty';

    listingArray.push(listing);

    index++;
}

// showing the listings on the page
function createListing(index) {
    const listingList = document.getElementById('store'); // change to appropiate div
    
    for (let i = 0; listingArray.length > i; i++) {
        const listingDiv = document.createElement('div');
        const titleP = document.createElement('p');
        const listingImg = document.createElement('img');
        const priceP = document.createElement('p');
        const dateP = document.createElement('p');
        const expandBtn = document.createElement('input');

        listingDiv.id = 'listing' + index;
        listingDiv.className = 'listing-div';
        listingList.appendChild(listingDiv);

        const nameNode = document.createTextNode(listingArray[index].title);
        titleP.appendChild(nameNode);
        titleP.id = 'name' + index;
        titleP.className = 'listing-name';
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
        expandBtn.value = 'Lisää'
        expandBtn.className = 'expand-btn';
        listingDiv.appendChild(expandBtn);

        index++;
    }
    // clicks without clicking on the page. why?
    document.querySelectorAll('.expand-btn').forEach(btn => btn.addEventListener('click', expandListing(0)));
}

// expanding the wanted listing
function expandListing(index) {
    console.log('click')

    const listingDiv = document.getElementById('listing' + index);

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
    

    expandDiv.id = 'listing-expand' + index;
    expandDiv.class = 'listing-expand';
    listingDiv.appendChild(expandDiv);

    for (let i = 0; listingArray[index].img.length > i; i++) {
        const listingExpandImg = document.createElement('img');
        listingExpandImg.src = listingArray[index].img[i];
        listingExpandImg.alt = 'kuva';
        listingExpandImg.className = 'listing-expand-img';
        expandDiv.appendChild(listingExpandImg);
    }

    const br1 = document.createElement('br');
    expandDiv.appendChild(br1);

    if (listingArray[index].desc !== '') {
        const descNode = document.createTextNode(listingArray[index].desc);
        descP.className = 'listing-desc';
        descP.appendChild(descNode);
        expandDiv.appendChild(descNode);
    }

    listingUl.className = 'listing-list';
    expandDiv.appendChild(listingUl);

    const categoryNode = document.createTextNode('Kategoria: ' + listingArray[index].category);
    categoryLi.className = 'listing-list-item';
    categoryLi.appendChild(categoryNode);
    listingUl.appendChild(categoryLi);

    const shapeNode = document.createTextNode('Kunto: ' + listingArray[index].shape);
    shapeLi.className = 'listing-list-item';
    shapeLi.appendChild(shapeNode);
    listingUl.appendChild(shapeLi);

    if (listingArray[index].address !== '') {
        const addressNode = document.createTextNode('Osoite: ' + listingArray[index].address);
        addressLi.className = 'listing-list-item';
        addressLi.appendChild(addressNode);
        listingUl.appendChild(addressLi);
    }

    const cityNode = document.createTextNode('Kaupunki: ' + listingArray[index].city);
    cityLi.className = 'listing-list-item';
    cityLi.appendChild(cityNode);
    listingUl.appendChild(cityLi);

    const payMethodNode = document.createTextNode('Maksutapa: ' + listingArray[index].payMethod);
    payMethodLi.className = 'listing-list-item';
    payMethodLi.appendChild(payMethodNode);
    listingUl.appendChild(payMethodLi);

    const nameNode = document.createTextNode('Listauksen tekijä: ' + listingArray[index].name);
    nameLi.className = 'listing-list-item';
    nameLi.appendChild(nameNode);
    listingUl.appendChild(nameLi);

    const contactNode = document.createTextNode('Yhteydenotto: ' + listingArray[index].contact);
    contactLi.className = 'listing-list-item';
    contactLi.appendChild(contactNode);
    listingUl.appendChild(contactLi);
}

createListingObject(objectIndex);
createListing(listingIndex);