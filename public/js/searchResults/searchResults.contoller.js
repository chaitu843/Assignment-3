import {searchResultsService} from './searchResults.service';

const searchSection = document.getElementById("searchSection");
const searchForm = document.getElementById("searchForm");

searchForm.onsubmit = (event) => {
    event.preventDefault();
    const searchValue = document.getElementById('search').value;
    if (searchValue == "") {
        searchSection.style.display = "none";
        return;
    }
    searchResultsService(searchValue);
}