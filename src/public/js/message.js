const socket = io()
const formMessage = document.querySelector('.input-with-button')
const messageRender = document.querySelector('.message-text')
const userMessage = document.querySelector('.users')
const input = document.querySelector('#input')

let user;
let message;

async function getUserInput() {
  try {
    const { value } = await Swal.fire({
      title: "Escriba su Usuario!",
      input: "email",
      inputLabel: "example@correo.com",
      icon: "info",
      allowOutsideClick: false
    });

    return value;
  } catch (error) {
    throw error
  }
}
getUserInput()
  .then(userN => {
    user=userN
    socket.emit('connected', user)
    socket.on('conexion', (user)=>{
      usersHTML(user)
    })
  })
  .catch(error => {
    throw error;
  });

const drawMessageHtmlMe=({user, message})=>{
  const div = document.createElement('div')
  div.classList.add('message-text-me')
  div.innerHTML= `<h3><i>${user} </i>dice:</h3>
  <p>
      ${message}
  </p>`
  messageRender.append(div)
}

const drawMessageHtmlOther = ({user, message})=>{
  const div = document.createElement('div')
  div.classList.add('message-text-other')
  div.innerHTML= `<h3><i>${user} </i>dice:</h3>
  <p>
      ${message}
  </p>`
  messageRender.append(div)
}


function usersHTML  (user)  {
      const div = document.createElement('div')
      div.classList.add('users-message')
      div.innerHTML=`<h3>${user}</h3>
      <p>Usuario conectado</p>`
      userMessage.append(div)
  }
  

formMessage.addEventListener('submit', (e) => {
  e.preventDefault()
 message = formMessage.querySelector('#input').value
 if(!message)return
 socket.emit('send-message', {user, message})
 drawMessageHtmlMe({user, message})
 message = formMessage.querySelector('#input').value = ''
})

// socket.on('get-users', (users)=>{
//   console.log(users);
// } )

socket.on('received-message', (message) =>{
    drawMessageHtmlOther(message)
    usersHTML(message)
})


