const token = '65a97e3a-b55e-45be-b017-c77371ca3c60';
const url = 'https://sistech-api.vercel.app/blog/';

const params = (new URL(document.location)).searchParams;
const key = params.get('key');

const resultsContainer = document.getElementById('results');
const keywordLine = document.getElementById('keyword');

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

const getResults = key => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json()
    ).then(datas => {
        const results = datas.filter(data => {
            const regex = new RegExp(`${key}`, 'i');
            return regex.test(data.title) || regex.test(data.content);
        })
        showResults(results);
    }
    ).catch(err => {
        if(err == 'Incomplete data') showErrorMessage('Please fill both Title and Content');
        else showErrorMessage('Something went wrong. Please try again.')
    });
};

const showResults = results => {
    if(results.length == 0) {
        resultsContainer.insertAdjacentHTML("beforeend", '<h1>No post to show.<h1>')  
    }

    results.forEach(result => {
        resultsContainer.insertAdjacentHTML("beforeend", `
        <a href="../index.html?id=${result.id}" class="my-4 border-t">
            <h2 class="my-2 text-lg font-bold">${result.title}</h2>
            <p class="text-justify max-h-12 overflow-hidden text-ellipsis">${result.content}</p>
            <div class="my-1 flex">
                <img class="w-4 mr-2 ${localStorage.getItem(result.id) ? 'clicked-like' : 'opacity-50'}" src="../../assets/images/like.svg" alt="like">
                <p>${result.like} people liked this post</p>
            </div>
        </a>
        `);
    });
};

keywordLine.innerText = `Search results for "${key}"`
getResults(key);