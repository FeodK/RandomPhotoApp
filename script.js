const apiKey = 'xxmIxu_GQ30qsc9EREdhCePnrth1ce56cAYpjJZL-EQ';
const apiUrl = 'https://api.unsplash.com/photos/random?client_id=' + apiKey;

let likeCount = 0; 
const photoElement = document.getElementById('photo');
const photographerNameElement = document.getElementById('photographer-name');
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('like-count');

document.addEventListener('DOMContentLoaded', () => {
    loadRandomPhoto();

    likeButton.addEventListener('click', () => {
        likeCount++;
        likeCountElement.textContent = likeCount;
        localStorage.setItem('likeCount', likeCount);
    });
});

function loadRandomPhoto() {
    console.log('Отправка запроса на Unsplash API...');

    fetch(apiUrl)
        .then(response => {
            console.log('Ответ от API:', response);

            if (!response.ok) {
                throw new Error('Ошибка ответа от API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные от API:', data);

            if (data && data.urls && data.urls.regular) {
                const photo = data;

                photoElement.src = photo.urls.regular;
                photographerNameElement.textContent = `Фотограф: ${photo.user.name}`;
                likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
                likeCountElement.textContent = likeCount;
            } else {
                console.error('Ошибка: API не вернуло фотографий');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}
