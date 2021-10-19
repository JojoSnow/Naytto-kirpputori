function characterBio(number) {

    const image = document.getElementById("person_img")
    const title = document.getElementById("person_h2")
    const bio = document.getElementById("person_p")

    switch (number) {
        case 0:

            title.textContent = "Meistä"

            bio.textContent = "Olemme hyviä ihmisiä"

            image.src = "../img/icons/favicon/favicon.ico"

            break;
        case 1:

            title.textContent = "Maija Meikäläinen"

            bio.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur id reiciendis debitis, cupiditate eaque? Pariatur eos ut placeat beatae facere dolorem sed provident, enim labore, doloribus ullam laboriosam maxime natus voluptatem aspernatur esse veritatis quod expedita quasi iusto minima."

            image.src = "../img/people/business-woman.jpg"

            break;
        case 2:

            title.textContent = "Matti Meikäläinen"

            bio.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur id reiciendis debitis, cupiditate eaque? Pariatur eos ut placeat beatae facere dolorem sed provident, enim labore, doloribus ullam laboriosam maxime natus voluptatem aspernatur esse veritatis quod expedita quasi iusto minima."

            image.src = "../img/people/business-woman.jpg"

            break;
        case 3:

            title.textContent = "John Doe"

            bio.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur id reiciendis debitis, cupiditate eaque? Pariatur eos ut placeat beatae facere dolorem sed provident, enim labore, doloribus ullam laboriosam maxime natus voluptatem aspernatur esse veritatis quod expedita quasi iusto minima."

            image.src = "../img/people/business-woman.jpg"

            break;
        case 4:

            title.textContent = "Jane Doe"

            bio.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur id reiciendis debitis, cupiditate eaque? Pariatur eos ut placeat beatae facere dolorem sed provident, enim labore, doloribus ullam laboriosam maxime natus voluptatem aspernatur esse veritatis quod expedita quasi iusto minima."

            image.src = "../img/people/business-woman.jpg"

            break;
    }
}