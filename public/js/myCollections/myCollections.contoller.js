import {createCollection, addToCollection, showCollections} from './myCollections.service';

const createCollectionButton = document.getElementById("createCollectionButton");
const selectCollectionButton = document.getElementById("selectCollectionButton");

createCollectionButton.onclick = () => {
    createCollection();
}

selectCollectionButton.onclick = () =>{
    let selectedCollection  = document.getElementById("selectedCollection");
    let value = selectedCollection.value;
    let id = selectedCollection.nextSibling.id;
    addToCollection(id,value);
} // create button from adding to collection modal

showCollections();