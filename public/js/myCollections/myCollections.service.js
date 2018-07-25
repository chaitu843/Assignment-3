import { myCollectionsView, myCollectionModalView, myCollectModalView } from "./myCollections.view";

const myCollections = document.getElementById("myCollections");
const myCollectionModal = document.getElementById("myCollectionModal");
const collectModal = document.getElementById("collectModal");


export let createCollection = () => {
    let createCollectionName = document.getElementById("createCollectionName");
    let jsonString = {
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
    let addUrl = "http://10.150.222.76:3000/myCollections";

    fetch(addUrl, fetchData)
        .then(function(data){
            showCollections();
        });        //Adding to json-server and calling reload function

} // Creating a Collection with name as user requested

export let retrieveCollections = (id) => {
    collectModal.innerHTML = "";
    let getUrl = "http://10.150.222.76:3000/myCollections";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            let myCollection = data;
            myCollectModalView(myCollection,collectModal,id);
        })
} // Displays collections in modal select

export let showCollections = () => {
    myCollections.innerHTML = "";
    
    let getUrl = "http://10.150.222.76:3000/myCollections";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            let myCollection = data;
            myCollection.map(function (collection) {
                myCollectionsView(collection,myCollections);
            })
        })
} //Displays all collections

export let addToCollection = (id,collectionName) => {
    let div = document.getElementById(id).parentElement.parentElement;
    let img = div.firstChild;
    let cardBody = img.nextSibling;
    let name = cardBody.firstChild;
    let text = name.nextSibling;
    let jsonString = {
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

    let addUrl = "http://10.150.222.76:3000/collections";
    fetch(addUrl, fetchData);        //Adding to json-server

} // Add resto to spec. collection

export function showFromCollection(collectionName) {
    let getUrl = "http://10.150.222.76:3000/collections/?collection=" + collectionName;
    myCollectionModal.innerHTML = "";
    fetch(getUrl)
        .then((resp) => resp.json())
        .then(function (data) {
            let collections = data; // Get the results
            return collections.map(function (collection) { // Map through the results and for each run the code below
                myCollectionModalView(myCollectionModal,collection, collectionName);
            })
        })
} // Show restos from a spec. collection

export function deleteFromCollection(id,collectionName) {
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://10.150.222.76:3000/collections/" + id;

    fetch(deleteUrl, fetchData)
        .then(function(data){
            showFromCollection(collectionName)
        });
} // Delete resto from a spec. collection

export function deleteCollection(id) {
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://10.150.222.76:3000/myCollections/" + id;
    let getUrl = "http://10.150.222.76:3000/collections?collection=" + id;
    fetch(deleteUrl, fetchData)
        .then(function(data){
           showCollections();
     });
    fetch(getUrl).
    then((resp)=>resp.json())
    .then(function(data){
        return data.map(function(collection){
            let dlt = "http://10.150.222.76:3000/collections/" + collection.id;
            fetch(dlt,fetchData);
        })
    });
} // Delete a Collection along with restos present in it..!!!