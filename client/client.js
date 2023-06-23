const socket = io('http://localhost:8080');


// GET DOM elements in respective Js variable
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInput')
const messageContainer = document.querySelector(".container")
//Audio that will play on receiving message
var audio = new Audio('ting.mp3');


//Function which wil append event info on to the container 
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){

    
    audio.play();
    }
}

//Ask new user for his/her name
const NAME = prompt("Enter Your Name");
socket.emit('new-user-joined', NAME);
//If any new user joins let other users connected to the server know!
socket.on('user-joined', NAME=>{
    append(`${NAME} joined the chat`,'right')

})
//if server send a message receive it
socket.on('receive', data=>{
    append(`${data.NAME}: ${data.message}`, 'left')
})
//If someone leaves the chat let other ppl (append ) know!
socket.on( 'left', NAME=> {
    append(`${NAME} left the chat`, 'right')
})
//If the form get submitted send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInp.value;
    append(`You:${message}`, 'right')
    //if someone send a message, let it know to the other people on server
    socket.emit('Send', message);
    messageInp.value='';
  })
