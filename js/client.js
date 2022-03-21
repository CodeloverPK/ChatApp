const socket=io('http://localhost:8000');


// Get DOM elements in respective JS Variables
const form=document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

// Audio that will on receiving sms
var audio = new Audio('ting.ogg');

// Fucntion which will append info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
    if(position=='left'){
        audio.play();
    }
}


// Ask new  user to Enter name , and let the sever Know 
const  Name=prompt("Enter Name to Join");
socket.emit('new-user-joined',Name);

// If new user joined , receive name  from the server
socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right');
})

// If server send the message , receive it 
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

// If new user leaves chat , append the info to the container 
socket.on('left',name=>{
    append(`${name} left the Chat`,'right');
})


// if form get submitted, send messages to server 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);

    messageInput.value='';
})

