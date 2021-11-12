// console.log('Client-side JavaScript loaded...');



const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const messageOne = document.querySelector('#message-1');    //document.getElementById('message-1');
const messageTwo = document.querySelector('#message-2');    //document.getElementById('message-2');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = searchElement.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //return console.log(data.error);
                messageOne.textContent = data.error;
                return;
            }
            // console.log(data.forecast, data.location);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

        });
    });
});