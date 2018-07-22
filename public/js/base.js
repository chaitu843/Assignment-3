const topRated = document.getElementById("topRated");
const searchResults = document.getElementById("searchResults");
const searchSection = document.getElementById("searchSection");
const myCollections = document.getElementById("myCollections");
const searchForm = document.getElementById("searchForm");
const collectModal = document.getElementById("collectModal");
const myCollectionModal = document.getElementById("myCollectionModal");
const createCollectionButton = document.getElementById("createCollectionButton");
const selectCollectionButton = document.getElementById("selectCollectionButton");

const url = "https://developers.zomato.com/api/v2.1/";
const topRatedUrl = url + "collections?city_id=280&count=5";

let myheaders = {
    "user-key": "49773a2f8afd77db210f987d70950b4b"
}

var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add ";
    button.innerHTML = html;
    return button;
}              // function to create a button

createCollectionButton.onclick = function () {
    createCollection();
}

function createCollection() {
    var createCollectionName = document.getElementById("createCollectionName");
    var jsonString = {
        "id": createCollectionName.value
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
        .then(function(data){
            console.log(data);
            showCollections();
        });        //Adding to json-server and calling reload function

} // Creating a Collection

function retrieveCollections(id){
    collectModal.innerHTML = "";
    var getUrl = "http://localhost:3000/myCollections";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let myCollection = data;
            var form  = document.createElement("form"),
                select = document.createElement("select"),
                option = document.createElement("option"),
                input = document.createElement("input");
                input.type="hidden";
                input.id = id;
            form.id = "collectionForm";
            select.id = "selectedCollection";
            option.value = "select";
            option.innerHTML = "--SELECT--";
            select.appendChild(option);
        
            myCollection.map(function (collection) {
                var opt = document.createElement("option");
                opt.value = collection.id;
                opt.innerHTML = collection.id;
                select.appendChild(opt);
            })
            form.appendChild(select);
            form.appendChild(input);
            collectModal.appendChild(form);
        })
} // Displays collections in modal

selectCollectionButton.onclick = function(){
    var selectedCollection  = document.getElementById("selectedCollection");
    var value = selectedCollection.value;
    var id = selectedCollection.nextSibling.id;
    addToCollection(id,value);
}

function showCollections() {
    myCollections.innerHTML = "";
    
    var getUrl = "http://localhost:3000/myCollections";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let myCollection = data;
            myCollection.map(function (collection) {
                var outerDiv = document.createElement('div');
                var div = document.createElement('div');
                var button = createButton("DELETE");
                outerDiv.className = "text-center";
                button.id = collection.id;
                button.classList.remove("add");
                button.classList.add("delete");
                div.className = "myCollection";
                div.setAttribute("data-toggle","modal");
                div.setAttribute("data-target","#myModal")
                div.innerHTML = collection.id;
                outerDiv.appendChild(div);
                outerDiv.appendChild(button);
                myCollections.appendChild(outerDiv);
                button.onclick = function(){
                    deleteCollection(button.id);
                }
                div.onclick = function(){
                    showFromCollection(collection.id);
                }
            })
        })
} //Displays all collections

function addToCollection(id,collectionName) {
    console.log("Inside click function");
    console.log(id);
    var div = document.getElementById(id).parentElement.parentElement;
    var img = div.firstChild;
    var cardBody = img.nextSibling;
    var name = cardBody.firstChild;
    var text = name.nextSibling;
    var jsonString = {
        "id": id,
        "collection" : collectionName,
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

    fetch(addUrl, fetchData);        //Adding to json-server

    console.log(div);
}

function showFromCollection(collectionName) {
    var getUrl = "http://localhost:3000/collections/?collection=" + collectionName;
    myCollectionModal.innerHTML = "";
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
                div.className = "collection card col-md-offset-2 col-md-5";
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
                myCollectionModal.appendChild(div);
                const id = button.id;
                button.onclick = function () {
                    deleteFromCollection(id,collectionName);
                }
            })
        })
}

function deleteFromCollection(id,collectionName) {
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
        .then(function(data){
            showFromCollection(collectionName)
        });
}

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
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#collectionModal");
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(button);
            div.appendChild(img);
            div.appendChild(cardBody);
            topRated.appendChild(div);
            button.onclick = function(){
                retrieveCollections(button.id);
            }
        })
    }); // fetching top rated collections and displaying in a section->top Rated
    
//showCollecions(); // fetching myCollections and displaying in a section->myColletions

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
                button.setAttribute("data-toggle","modal");
                button.setAttribute("data-target","#collectionModal");
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
            })
        })
}

showCollections();







function deleteCollection(id) {
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/myCollections/" + id;

    fetch(deleteUrl, fetchData)
        .then(function(data){
           console.log(data);
           showCollections();
     });
}



// call addtocollection and change it accordingly
// call deletefromcollection and change it accordingly
// Collections on click --> showCollections with name