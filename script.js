const token = '65a97e3a-b55e-45be-b017-c77371ca3c60';
const url = 'https://sistech-api.vercel.app/blog/';

const allContainer = document.getElementById('all');
const popularContainer = document.getElementById('popular');

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');

searchButton.addEventListener('click', event => {
    event.preventDefault();
    const keyword = searchInput.value;
    if(keyword != '') window.location.href = `./post/search/index.html?key=${keyword}`;
});

searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

const fetchArticles = () => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json()
    ).then(data => {
        showAllArticles(data)
        showPopularArticles(data
            .sort((a, b) => b.like - a.like)
            .slice(0, 5))
    }
    ).catch(err => {
        if(err == 'Incomplete data') showErrorMessage('Please fill both Title and Content');
        else showErrorMessage('Something went wrong. Please try again.')
    });
};

const showAllArticles = (articles) => {
    articles.forEach(article => {
        allContainer.innerHTML += `
        <a href="./post/index.html?id=${article.id}" class="my-2">
            <div class="h-32 bg-slate-800 rounded-lg"></div>
            <h3 class="mt-1 text-lg font-bold">${article.title}</h3>
            <p class="text-justify h-12 overflow-hidden text-ellipsis">${article.content}</p>
            <div class="flex">
                <img class="w-4 mr-2 ${localStorage.getItem(article.id) ? 'clicked-like' : 'opacity-50'}" src="./assets/images/like.svg" alt="like">
                <p>${article.like} people liked this post</p>
            </div>
        </a>
        `
    })
};

const showPopularArticles = (articles) => {
    const colors = [
        'text-gray-800', 'text-gray-700', 'text-gray-600', 'text-gray-500', 'text-gray-400'
    ]
    articles.forEach((article, i) => {
        popularContainer.innerHTML += `
        <a href="./post/index.html?id=${article.id}" class="flex align-middle gap-2">
            <h2 class="text-8xl font-bold w-[20%] min-w-[20%] text-center ${colors[i]} max-lg:text-6xl max-lg:min-w-[12%] max-lg:w-[12%]">${i + 1}</h2>
            <div class="mt-2 max-lg:mt-1">
                <h3 class="text-lg font-bold">${article.title}</h3>
                <p class="text-justify h-12 overflow-hidden text-ellipsis">${article.content}</p>
                <div class="flex">
                    <img class="w-4 mr-2 ${localStorage.getItem(article.id) ? 'clicked-like' : 'opacity-50'}" src="./assets/images/like.svg" alt="like">
                    <p>${article.like} people liked this post</p>
                </div>
            </div>
        </a>
        `
    })
};

fetchArticles();