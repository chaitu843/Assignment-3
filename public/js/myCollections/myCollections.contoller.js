import {createCollection, addToCollection, showCollections} from './myCollections.service';

const createCollectionButton = document.getElementById("createCollectionButton");
const selectCollectionButton = document.getElementById("selectCollectionButton");

createCollectionButton.onclick = function () {
    createCollection();
}

selectCollectionButton.onclick = function(){
    var selectedCollection  = document.getElementById("selectedCollection");
    var value = selectedCollection.value;
    var id = selectedCollection.nextSibling.id;
    addToCollection(id,value);
} // create button from adding to collection modal

showCollections();