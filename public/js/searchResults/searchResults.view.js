import {retrieveCollections} from '../myCollections/myCollections.service';

var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add ";
    button.innerHTML = html;
    return button;
}

const searchSection = document.getElementById("searchSection");
const searchResults = document.getElementById("searchResults");

export function searchResultsView(resto) {

    var div = document.createElement('div'),
        img = document.createElement('img'),
        cardBody = document.createElement('div'),
        h5 = document.createElement('h5'),
        p = document.createElement('p');
    div.className = "resto card col-md-3";
    img.className = "card-img-top";
    cardBody.className = "card-body";
    h5.className = "card-title";
    p.className = "card-text text-muted";
    img.src = resto.restaurant.featured_image;
    h5.innerHTML = `${resto.restaurant.name}`;
    p.innerHTML = `${resto.restaurant.cuisines} <br> Cost ${resto.restaurant.average_cost_for_two} for two`;
    var button = createButton("&#x2661");
    button.id = resto.restaurant.R.res_id;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#collectionModal");
    cardBody.appendChild(h5),
        cardBody.appendChild(p);
    cardBody.appendChild(button);
    div.appendChild(img);
    div.appendChild(cardBody);
    searchResults.appendChild(div);
    searchSection.style.display = "block";
    button.onclick = function () {
        retrieveCollections(button.id);
    }

}

export function noSearchResultsView() {
    var div = document.createElement('div');
    div.className = "noResults";
    div.innerHTML = "No Results Found..!!!";
    searchResults.appendChild(div);
    searchSection.style.display = "block";
    return;
}

