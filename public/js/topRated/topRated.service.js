import {topRatedView} from './topRated.view';

const url = "https://developers.zomato.com/api/v2.1/";
const topRatedUrl = url + "collections?city_id=280&count=5";

let myheaders = {
    "user-key": "49773a2f8afd77db210f987d70950b4b"
}

export function topRatedService(){
    fetch(topRatedUrl, {
        method: 'GET',
        headers: myheaders
    }).then((resp) => resp.json())
        .then(function (data) {
            let collections = data.collections; // Get the results
            return collections.map(function (collection) { // Map through the results and for each run the code below
                topRatedView(collection);
            })
        }); // fetching top rated collections and displaying in a section->top Rated
}
