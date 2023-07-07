const params = (new URL(document.location)).searchParams;
const id = params.get('id');

const token = 'c262f8bc-ed7b-4be1-949f-b084bfbb51a0';
const url = 'https://sistech-api.vercel.app/blog/';

const titleField = document.getElementById('title');
const contentField = document.getElementById('content');
const updateBlogForm = document.getElementById('update');

const fetchArticle = (id) => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json()
    ).then(datas => {
        const data = datas.find(data => data.id == id);
        titleField.value = data.title;
        contentField.value = data.content;
    }
    ).catch(err => {
        if(err == 'Incomplete data') showErrorMessage('Please fill both Title and Content');
        else showErrorMessage('Something went wrong. Please try again.')
    });
}

updateBlogForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = { id };
    let errorOccurred = false;
    formData.forEach((value, key) => {
        if(value == null || value == '') {
            showErrorMessage('Please fill both Title and Content');
            errorOccurred = true;
            return;
        }
        data[key] = value;
    });

    if(errorOccurred) return;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data), 
    }).then(response => response.json()
    ).then( _ => {
        window.location.replace(`/post/?id=${id}&success=true`);
    }).catch( _ => {
        showErrorMessage('Something went wrong. Please try again.')
    });
});

const showErrorMessage = message => {
    const alert = document.getElementById('alert');
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

if(id == null && id == undefined) window.location.replace('/');
else fetchArticle(id);