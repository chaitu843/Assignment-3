const topRated = document.getElementById("topRated");
const searchResults = document.getElementById("searchResults");
const searchSection = document.getElementById("searchSection");
const myCollections = document.getElementById("myCollections");
const searchForm = document.getElementById("searchForm");
const search = document.getElementById("search");

const url = "https://developers.zomato.com/api/v2.1/";
const topRatedUrl = url + "collections?city_id=280&count=5";

let myheaders = {
    "user-key": "49773a2f8afd77db210f987d70950b4b"
}

var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add";
    button.innerHTML = html;
    button.style.fontSize = 15 + "px";
    return button;
}              // function to create a button

search.onclick = function () {
    this.style.width = "67%";
    this.parentElement.style.width = "100%";
}             // Search Box Expanding

fetch(topRatedUrl, {
    method: 'GET',
    headers: myheaders
}).then((resp) => resp.json())
    .then(function (data) {
        let collections = data.collections; // Get the results
        return collections.map(function (collection) { // Map through the results and for each run the code below
            var div = document.createElement('div'), //  Create the elements we need
                img = document.createElement('img'),
                cardBody = document.createElement('div'),
                h5 = document.createElement('h5'),
                p = document.createElement('p');
            div.className = "collection card";
            img.className = "card-img-top";
            cardBody.className = "card-body";
            h5.className = "card-title";
            p.className = "card-text";
            img.src = collection.collection.image_url;  // Add the source of the image to be the src of the img element
            h5.innerHTML = `${collection.collection.title}`;
            p.innerHTML = `${collection.collection.description}`; // Make the HTML of our span to be the first and last name of our author
            var button = createButton("&#x2661");
            button.id = collection.collection.collection_id;
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(button);
            div.appendChild(img);
            div.appendChild(cardBody);
            topRated.appendChild(div);
            const id = button.id;
            button.onclick = function () {
                addCollection(id);
            }
        })
    })
    .then(reload()); // fetching top rated collections and displaying in a section->top Rated

searchForm.onsubmit = function (event) {
    event.preventDefault();
    const searchValue = document.getElementById('search').value;
    // var patt = new RegExp("[^\s*$]");
    // var res = patt.test(searchValue);
    if (searchValue == "") {
        searchSection.style.display = "none";
        return;
    }
    const searchUrl = url + "search?q=" + searchValue + "&count=10";
    searchResults.innerHTML = "";
    fetch(searchUrl, {
        method: 'GET',
        headers: myheaders
    }).then((resp) => resp.json())
        .then(function (data) {
            if (data.results_found == 0) {
                var div = document.createElement('div');
                div.className = "noResults";
                div.innerHTML = "No Results Found..!!!";
                searchResults.appendChild(div);
                searchSection.style.display = "block";
                return;
            }
            let restos = data.restaurants;
            return restos.map(function (resto) {
                var div = document.createElement('div'),
                    img = document.createElement('img'),
                    cardBody = document.createElement('div'),
                    h5 = document.createElement('h5'),
                    p = document.createElement('p');
                button = createButton;
                div.className = "resto card col-md-2";
                img.className = "card-img-top";
                cardBody.className = "card-body";
                h5.className = "card-title";
                p.className = "card-text text-muted";
                img.src = resto.restaurant.featured_image;
                h5.innerHTML = `${resto.restaurant.name}`;
                p.innerHTML = `${resto.restaurant.cuisines} <br> Cost ${resto.restaurant.average_cost_for_two} for two`;
                var button = createButton("&#x2661");
                button.id = resto.restaurant.R.res_id;
                cardBody.appendChild(h5),
                    cardBody.appendChild(p);
                cardBody.appendChild(button);
                div.appendChild(img);
                div.appendChild(cardBody);
                searchResults.appendChild(div);
                searchSection.style.display = "block";
                button.onclick = function () {
                    addCollection(button.id);
                }
            })
        })
}

function addCollection(id) {
    console.log("Inside click function");
    console.log(id);
    var div = document.getElementById(id).parentElement.parentElement;
    var img = div.firstChild;
    var cardBody = img.nextSibling;
    var name = cardBody.firstChild;
    var text = name.nextSibling;
    var jsonString = {
        "id": id,
        "img": img.src,
        "name": name.innerHTML,
        "text": text.innerHTML
    }
    let fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    }
    let addUrl = "http://localhost:3000/collections";

    fetch(addUrl, fetchData)
        .then(reload());        //Adding to json-server and calling reload function

    console.log(div);
}

function reload() {
    var getUrl = "http://localhost:3000/collections";
    myCollections.innerHTML = "";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            let collections = data; // Get the results
            return collections.map(function (collection) { // Map through the results and for each run the code below
                var div = document.createElement('div'), //  Create the elements we need
                    img = document.createElement('img'),
                    cardBody = document.createElement('div'),
                    h5 = document.createElement('h5'),
                    p = document.createElement('p');
                div.className = "collection card col-md-2";
                img.className = "card-img-top";
                cardBody.className = "card-body";
                h5.className = "card-title";
                p.className = "card-text text-muted";
                img.src = collection.img;  // Add the source of the image to be the src of the img element
                h5.innerHTML = `${collection.name}`;
                p.innerHTML = `${collection.text}`; // Make the HTML of our span to be the first and last name of our author
                var button = createButton("&#x2717");
                button.id = collection.id;
                cardBody.appendChild(h5);
                cardBody.appendChild(p);
                div.appendChild(img);
                div.appendChild(cardBody);
                cardBody.appendChild(button);
                myCollections.appendChild(div);
                const id = button.id;
                button.onclick = function () {
                    deleteCollection(id);
                }
            })
        })
}

function deleteCollection(id) {
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/collections/" + id;

    fetch(deleteUrl, fetchData)
        .then(reload());
}

createCollectionButton.onclick = function () {
    createCollection();
}

function createCollection() {
    var createCollectionName = document.getElementById("createCollectionName");
    var jsonString = {
        "name": createCollectionName.value
    }
    let fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    }
    let addUrl = "http://localhost:3000/myCollections";

    fetch(addUrl, fetchData)
        .then(showCollecions());        //Adding to json-server and calling reload function

}

function showCollecions() {
    var getUrl = "http://localhost:3000/myCollections";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let myCollection = data;
            myCollection.map(function (collection) {
                var div = document.createElement('div');
                div.className = "myCollection";
                div.innerHTML = collection.name;
                myCollections.appendChild(div);
            })
        })
}