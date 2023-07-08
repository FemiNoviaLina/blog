const token = 'c262f8bc-ed7b-4be1-949f-b084bfbb51a0';
const url = 'https://sistech-api.vercel.app/blog/';

const params = (new URL(document.location)).searchParams;
const key = params.get('key');

const resultsContainer = document.getElementById('results');
const keywordLine = document.getElementById('keyword');

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
        resultsContainer.innerHTML = '<h1>No post to show.<h1>'  
    }

    results.forEach(result => {
        resultsContainer.innerHTML += `
        <div class="my-4 border-t">
            <h2 class="my-2 text-lg font-bold">${result.title}</h2>
            <p class="text-justify max-h-12 overflow-hidden text-ellipsis">${result.content}</p>
            <div class="my-1 flex">
                <img class="w-4 mr-2 ${localStorage.getItem(result.id) ? 'clicked-like' : 'opacity-50'}" src="/assets/images/like.svg" alt="like">
                <p>${result.like} people liked this post</p>
            </div>
        </div>
        `        
    });
};

keywordLine.innerHTML = `Search results for "${key}"`
getResults(key);