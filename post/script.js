const params = (new URL(document.location)).searchParams;
const id = params.get('id');
const success = params.get('success');

const token = '65a97e3a-b55e-45be-b017-c77371ca3c60';
const url = 'https://sistech-api.vercel.app/blog/';

const titleText = document.getElementById('title');
const contentText = document.getElementById('content');
const likeText = document.getElementById('likes-count');
const likeIcon = document.getElementById('like');
const editText = document.getElementById('edit-text');
const editIcon = document.getElementById('edit-icon');
const editLink = document.getElementById('edit');

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

const getPost = id => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json()
    ).then(datas => {
        const data = datas.find(data => data.id == id);
        showPost(data);
    }
    ).catch(err => {
        if(err == 'Incomplete data') showErrorMessage('Please fill both Title and Content');
        else showErrorMessage('Something went wrong. Please try again.')
    });
};

const showPost = post => {
    titleText.innerHTML = post.title;
    contentText.innerHTML = post.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    likeText.innerHTML = `${post.like} people liked this post`;
    likeIcon.classList.remove('hidden');
    editIcon.classList.remove('hidden');
    editText.classList.remove('hidden');
    document.title = `Blog: ${post.title}`
}

const showMessage = () => {
    const alert = document.getElementById('message');
    alert.innerHTML = `
    <div class="bg-green-500 h-1"></div>
    <div class="py-2 px-4 mb-4 border border-green-500 bg-green-500 text-green-500 bg-opacity-10 flex justify-between align-middle">
        <p><b>Success!</b> Blog post created/modified.</p>
        <p class="font-bold hover:cursor-pointer" id="close-message">X</p>
    </div>
    `
    const closeAlertButton = document.getElementById('close-message');
    closeAlertButton.addEventListener('click', event => {
        alert.classList.add('hidden')
        event.preventDefault();
    })
}

const showErrorMessage = message => {
    const alert = document.getElementById('message');
    alert.innerHTML = `
    <div class="bg-red-500 h-1"></div>
    <div class="py-2 px-4 mb-4 border border-red-500 bg-red-500 text-red-500 bg-opacity-10 flex justify-between align-middle">
        <p><b>Error!</b> ${message}</p>
        <p class="font-bold hover:cursor-pointer" id="close-alert">X</p>
    </div>
    `
    const closeAlertButton = document.getElementById('close-alert');
    closeAlertButton.addEventListener('click', event => {
        alert.classList.add('hidden')
        event.preventDefault();
    })
};

likeIcon.addEventListener('click', event => {
    if(localStorage.getItem(id) != null) return;
    
    fetch(url + 'like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ id }), 
    }).then(response => response.json()
    ).then(data => {
        if(data.error) throw 'Post not Found'
        likeText.innerHTML = `${data.like} people liked this post`;
        likeIcon.classList.add('clicked-like');
        localStorage.setItem(id, true);
    }).catch(err => {
        if(err == 'Post not Found') showErrorMessage('Post not Found');
        else showErrorMessage('Something went wrong. Please try again.')
    });
})

editLink.addEventListener('click', event => {
    window.location.href = `./update/index.html?id=${id}`;
})

if(id == null  && id == undefined) window.location.href = '../index.html';
else getPost(id);

if(localStorage.getItem(id) != null) likeIcon.classList.add('clicked-like');

if(success != null) showMessage();