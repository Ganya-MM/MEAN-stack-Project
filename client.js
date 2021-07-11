const message =document.getElementById('messages');
const msgForm = document.getElementById('msgForm');


var socket = io('http://localhost:3000');


socket.on('message',data=>{
    console.log(data)
    appendMessage(data) 
})


socket.on('output-messages',data=>{
    console.log(data)
    if (data.length){
        data.forEach(message => {
            appendMessage(message.msg)
        })
    }
     
})



msgForm.addEventListener('submit',e=>{
    e.preventDefault();
    socket.emit('chatmessage',msgForm.msg.value);
    msgForm.msg.value = '';
})


function appendMessage(message){
    const html = `<div>${message}</div>`;
    messages.innerHTML += html;
}

