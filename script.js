const buttonEl = document.getElementById('btn');
const galleryEl = document.getElementById('gallery');
const errorMsgEl = document.getElementById('error_msg');

const api_key = 'get your own api key at unsplash.com'


async function getImages() {
    const inputEl = document.getElementById('input');
    const number = inputEl.value;
    let imgs = ''
    
    if (number > 10 || number < 1) {
        errorMsgEl.style.visibility='visible';
        errorMsgEl.innerText='Mininum photos = 2 and Max Photos = 10';
        return;
    }

    try {
        await fetch(`https://api.unsplash.com/photos?per_page=${number}&page=${Math.round(Math.random() * 1000)}&client_id=${api_key}`).then((res) => res.json().then((data) => {
            if(data) {
                data.forEach((pic) => {
                    imgs += `
                        <img src=${pic.urls.small} alt=${pic.alt_description} />
                    `;

                    galleryEl.innerHTML = imgs;
                    galleryEl.style.display = 'block';
                });
            }
        }));

        errorMsgEl.style.visibility='hidden';

        
    } catch (error) {
        errorMsgEl.style.visibility = 'visible';
        errorMsgEl.innerText = 'An error happened...Try again later'
    }
    


}

buttonEl.addEventListener('click',  getImages);
    

