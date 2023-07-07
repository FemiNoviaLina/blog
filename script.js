const token = 'c262f8bc-ed7b-4be1-949f-b084bfbb51a0';
const url = 'https://sistech-api.vercel.app/blog/';

const allContainer = document.getElementById('all');
const popularContainer = document.getElementById('popular');

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
        <a href="/post/?id=${article.id}" class="my-2">
            <div class="h-32 bg-slate-800 rounded-lg"></div>
            <h3 class="mt-1 text-lg font-bold">${article.title}</h3>
            <p class="text-justify h-12 overflow-hidden text-ellipsis">${article.content}</p>
            <div class="flex">
                <img class="w-4 mr-2 ${localStorage.getItem(article.id) ? 'clicked-like' : 'opacity-50'}" src="/assets/images/like.svg" alt="like">
                <p>${article.like} people liked this post</p>
            </div>
        </a>
        `
    })
}

const showPopularArticles = (articles) => {
    let i = 0;
    articles.forEach(article => {
        popularContainer.innerHTML += `
        <a href="/post/?id=${article.id}" class="flex align-middle">
            <h2 class="text-8xl font-bold mr-3 min-w-[12%] text-center text-gray-${800 - (i++ * 100)}">${i}</h2>
            <div class="mt-3">
                <h3 class="text-lg font-bold">${article.title}</h3>
                <p class="text-justify h-12 overflow-hidden text-ellipsis">${article.content}</p>
                <div class="flex">
                    <img class="w-4 mr-2 ${localStorage.getItem(article.id) ? 'clicked-like' : 'opacity-50'}" src="/assets/images/like.svg" alt="like">
                    <p>${article.like} people liked this post</p>
                </div>
            </div>
        </a>
        `
    })
}

fetchArticles();