import {retrieveCollections} from '../myCollections/myCollections.service';
import {createButton} from '../views/view';

const topRated = document.getElementById("topRated");

export function topRatedView(collection){
    let div = document.createElement('div'), //  Create the elements we need
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
                let button = createButton("&#x2661");
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
}