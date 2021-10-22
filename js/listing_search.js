const searchButton = document.getElementById('search_button');

let amountQ = 0;
let amountW = 0;
let amountE = 0;
searchButton.addEventListener('click', searchListings);

function searchListings(event) {
    event.preventDefault();

    for (let x = 0; x < objectIndex; x++) {
        if (JSON.parse(localStorage.getItem(("storageListing") + x)) == null) {
            x++;
            continue;
        }

        const listing = document.getElementById("listing" + x);
        const object = JSON.parse(localStorage.getItem(("storageListing") + x));

        var statement = true;

        const finCheck = document.getElementById("fin_checkbox")

        if (finCheck.checked && object.city == "Ulkomaalainen") {

            statement = false;

        }

        if (statement) {

            const freeCheck = document.getElementById("free_checkbox")
            const priceInput = Number(document.getElementById("search_price_input").value)
            const priceSelect = document.getElementById("search_price_select").value

            //Price
            if (freeCheck.checked && object.price != 0) {

                statement = false;

            }

            switch (priceSelect) {

                case "0": // Halvempi kuin...
                    if (object.price >= priceInput)
                        statement = false;

                    break;
                case "1": // Kalliimpi kuin...
                    if (object.price <= priceInput)
                        statement = false;

                    break;
                case "2": // 10%
                    var dampener = Math.round(priceInput / 10);
                    var low = priceInput - dampener;
                    var high = priceInput + dampener;

                    if (!(object.price <= high && object.price >= low))

                        statement = false;

                    break;
                case "3": // 20%
                    var dampener = Math.round(priceInput / 10);
                    var low = priceInput - (dampener * 2);
                    var high = priceInput + (dampener * 2);

                    if (!(object.price <= high && object.price >= low))

                        statement = false;

                    break;
                case null: // Un-used

                    break;
            }

            if (statement) {

                //Category
                const categInput = document.getElementById("search_categ").value;

                if (categInput != "null") {
                    if (object.category != categInput)
                        statement = false;
                }

                if (statement) {

                    //Condition
                    const condInput = document.getElementById("search_cond").value;

                    if (condInput != "null") {
                        if (object.shape != condInput)
                            statement = false;
                    }
                }
            }
        }

        //Final
        if (statement) {
            openListingAfterSearch(listing);
            amountE--;
        } else {
            closeListingAfterSearch(listing)
        }
    }
    updateListingAmountInfo();
}

function closeListingAfterSearch(listing) {
    listing.style.display = "none";
}

function openListingAfterSearch(listing) {
    listing.style.display = "block";
}

function updateListingAmountInfo() {
    let x = 0;

    amountQ = objectIndex;
    amountW = 0;
    amountE = 0;

    while (x < objectIndex) {
        if (JSON.parse(localStorage.getItem(("storageListing") + x)) == null) {
            x++;
            amountQ--;
            continue;
        }

        const object = JSON.parse(localStorage.getItem(("storageListing") + x));
        const listing = document.getElementById("listing" + x);

        if (object.price == 0)

            amountW++;

        if (listing.style.display == "none")

            amountE++;

        x++;
    }
    document.getElementById("listingCounterAll").innerText = "Ilmoituksia: " + amountQ;
    document.getElementById("listingCounterFree").innerText = "Ilmaisia: " + amountW;
    document.getElementById("listingCounterFiltered").innerText = "Suodatettu: " + amountE;
}