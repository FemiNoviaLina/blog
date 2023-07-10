const token = '65a97e3a-b55e-45be-b017-c77371ca3c60';
const url = 'https://sistech-api.vercel.app/blog/';

const createBlogForm = document.getElementById('create');

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');

searchButton.addEventListener('click', event => {
    event.preventDefault();
    const keyword = searchInput.value;
    if(keyword != '') window.location.href = `../../post/search/index.html?key=${keyword}`;
});

searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

createBlogForm.addEventListener('submit', event => {
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        if(value != '' && value != null) {
            data[key] = value
        }
    });

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data), 
    }).then(response => {
        if(response.status == 400) throw 'Incomplete data';
        return response.json();
    }).then(data => {
        window.location.href = `../index.html?id=${data.id}&success=true`;
    }).catch(err => {
        if(err == 'Incomplete data') showErrorMessage('Please fill both Title and Content');
        else showErrorMessage('Something went wrong. Please try again.')
    });

    event.preventDefault();
});

const showErrorMessage = message => {
    const alert = document.getElementById('alert');
    alert.insertAdjacentHTML("beforeend", `
    <div class="bg-red-500 h-1"></div>
    <div class="py-2 px-4 mb-4 border border-red-500 bg-red-500 text-red-500 bg-opacity-10 flex justify-between align-middle">
        <p><b>Error!</b> ${message}</p>
        <p class="font-bold hover:cursor-pointer" id="close-alert">X</p>
    </div>
    `)
    const closeAlertButton = document.getElementById('close-alert');
    closeAlertButton.addEventListener('click', event => {
        alert.classList.add('hidden')
        event.preventDefault();
    })
};