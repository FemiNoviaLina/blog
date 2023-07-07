const params = (new URL(document.location)).searchParams;
const id = params.get('id');
const success = params.get('success');

const token = 'c262f8bc-ed7b-4be1-949f-b084bfbb51a0';
const url = 'https://sistech-api.vercel.app/blog/';

const titleText = document.getElementById('title');
const contentText = document.getElementById('content');
const likeText = document.getElementById('likes-count');
const likeIcon = document.getElementById('like')

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
    contentText.innerHTML = post.content.replace(/(?:\r\n|\r|\n)/g, '<br><br>');
    likeText.innerHTML = `${post.like} people liked this post`;
    likeIcon.classList.remove('hidden');
    document.title = `Blog: ${post.title}`
}

const showMessage = () => {
    const alert = document.getElementById('message');
    alert.innerHTML = `
    <div class="bg-green-500 h-1"></div>
    <div class="py-2 px-4 mb-4 border border-green-500 bg-green-500 text-green-500 bg-opacity-10 flex justify-between align-middle">
        <p><b>Success!</b> Blog post created.</p>
        <p class="font-bold hover:cursor-pointer" id="close-message">X</p>
    </div>
    `
    const closeAlertButton = document.getElementById('close-message');
    closeAlertButton.addEventListener('click', event => {
        alert.classList.add('hidden')
        event.preventDefault();
    })
}

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

if(id == null) window.location.replace('/');
else getPost(id);

if(localStorage.getItem(id) != null) likeIcon.classList.add('clicked-like');

if(success != null) showMessage();