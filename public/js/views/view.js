export let createButton = function (html) {
    let button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add ";
    button.innerHTML = html;
    return button;
}              // function to create a button