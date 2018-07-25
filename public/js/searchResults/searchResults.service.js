import {searchResultsView, noSearchResultsView} from './searchResults.view';

const url = "https://developers.zomato.com/api/v2.1/"; //*
let myheaders = {
    "user-key": "49773a2f8afd77db210f987d70950b4b"
}
const searchResults = document.getElementById("searchResults");

export let searchResultsService = (searchValue) => {
    const searchUrl = url + "search?q=" + searchValue + "&count=9";
    fetch(searchUrl, {
        method: 'GET',
        headers: myheaders
    }).then((resp) => resp.json())
        .then((data) => {
            searchResults.innerHTML = "";
            if (data.results_found == 0) {
                noSearchResultsView();
            }
            let restos = data.restaurants;
            return restos.map(function (resto) {
                searchResultsView(resto);
            })
        })
}