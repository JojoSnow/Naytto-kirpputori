const searchButton = document.getElementById('search_button');

searchButton.addEventListener('click', searchListings);

function searchListings(event) {
    event.preventDefault();

    for (let x = 0; listingArray.length > x; x++) {
        const listing = document.getElementById("listing" + x);
        const object = listingArray[x];
        var statement = true;

        const finCheck = document.getElementById("fin_checkbox")

        if (finCheck.checked && object.city == "Ulkomaalainen")
            statement = false;

        if (statement) {

            const freeCheck = document.getElementById("free_checkbox")
            const priceInput = document.getElementById("search_price_input").value
            const priceSelect = document.getElementById("search_price_select").value

            //Price
            if (freeCheck.checked && object.price != 0)

                statement = false;

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
                    var low = object.price - (object.price / 10);
                    var high = object.price + (object.price / 10);

                    if (object.price > high && object.price < low)

                        statement = false;

                    break;
                case "3": // 20%
                    var low = object.price - ((object.price / 10) * 2);
                    var high = object.price + ((object.price / 10) * 2);

                    console.log(low); console.log(high);

                    if (object.price > high && object.price < low)

                        statement = false;

                    break;

                case null: // Un-used

                    break;
            }

            if (statement) {

                //Category
                const categInput = document.getElementById("search_categ").value

                if (categInput == null && object.categ != categInput)

                    statement = false;

                if (statement) {

                    //Condition
                    const condInput = document.getElementById("search_cond").value

                    if (condInput == null && object.shape != condInput)

                        statement = false;
                }
            }
        }

        //Final
        if (statement)
            openListingAfterSearch(listing);
        else
            closeListingAfterSearch(listing)
    }
}

function closeListingAfterSearch(listing) {
    listing.style.display = "none";
}

function openListingAfterSearch(listing) {
    listing.style.display = "block";
}