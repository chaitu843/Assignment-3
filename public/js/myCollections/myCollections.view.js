import {deleteCollection, showFromCollection, deleteFromCollection} from './myCollections.service';

var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add ";
    button.innerHTML = html;
    return button;
}              // function to create a button

export function myCollectModalView(myCollection, collectModal, id) {
    var form = document.createElement("form"),
        select = document.createElement("select"),
        option = document.createElement("option"),
        input = document.createElement("input");
    input.type = "hidden";
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
}

export function myCollectionsView(collection, myCollections) {
    var outerDiv = document.createElement('div');
    var div = document.createElement('div');
    var button = createButton("DELETE");
    outerDiv.className = "text-center";
    button.id = collection.id;
    button.classList.remove("add");
    button.classList.add("delete");
    div.className = "myCollection";
    div.setAttribute("data-toggle", "modal");
    div.setAttribute("data-target", "#myModal")
    div.innerHTML = collection.id;
    outerDiv.appendChild(div);
    outerDiv.appendChild(button);
    myCollections.appendChild(outerDiv);
    button.onclick = function () {
        deleteCollection(button.id);
    }
    div.onclick = function () {
        showFromCollection(collection.id);
    }
}

export function myCollectionModalView(myCollectionModal,collection, collectionName){
    var div = document.createElement('div'), //  Create the elements we need
                    img = document.createElement('img'),
                    cardBody = document.createElement('div'),
                    h5 = document.createElement('h5'),
                    p = document.createElement('p');
                div.className = "collection card col-md-5";
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
}