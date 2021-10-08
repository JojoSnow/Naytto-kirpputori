const searchButton = document.getElementById('search_button');

searchButton.addEventListener('click', searchListings);

function searchListings() {

    for (let x = 0; listingArray.length > x; x++) {
        const listing = document.getElementById("listing" + x);

        const finCheck = document.getElementById("fin_checkbox")

        if (finCheck.value) {

        }
        const freeCheck = document.getElementById("free_checkbox")
        const priceInput = document.getElementById("search_price_input")
        const priceSelect = document.getElementById("search_price_select")

        if (freeCheck.value && listing[x].price != 0) {

            closeListingAfterSearch(listing);
            continue;

        } else if (priceInput != "") {
            if (priceSelect == 0 && listing[x].price > priceInput) {

                // Halvempi kuin...
                closeListingAfterSearch(listing);
                continue;

            } else if (priceSelect == 1 && listing[x].price < priceInput) {

                // Kalliimpi kuin...
                closeListingAfterSearch(listing);
                continue;

            }

            const categInput = document.getElementById("search_categ")

            if (listing[x].categ != categInput) {

                closeListingAfterSearch(listing);
                continue;

            }

            const condInput = document.getElementById("search_cond")

            if (listing[x].categ != categInput) {

                closeListingAfterSearch(listing);
                continue;

            }
        }
        //If it succeeds?


    }
}

function closeListingAfterSearch(listing) {
    listing.style.display = "none";
}