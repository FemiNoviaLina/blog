const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');

searchButton.addEventListener('click', event => {
    event.preventDefault();
    const keyword = searchInput.value;
    if(keyword != '') window.location.href = `/post/search/?key=${keyword}`
})

searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});