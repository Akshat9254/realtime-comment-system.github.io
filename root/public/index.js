const commentList = document.getElementById("comment_list");
const postBtn = document.getElementById("post_btn");
const textArea = document.getElementById("textarea");
let socket = io();
let user;

while(!user){
    user = prompt("Enter your name");
}

postBtn.addEventListener("click", () => {
  const data = {
    username: user,
    message: textArea.value,
  };

  addToDOM(data);

  broadcast(data);


});

function addToDOM(data) {
  const lTag = document.createElement("li");
  lTag.classList.add("card", "comment", "w-75", "mb-2", "bg-transparent");
  lTag.innerHTML = `<h5 class="card-body py-1 mt-1">${data.username}</h5>
    <p class="card-body py-1 mb-0">${data.message}</p>
    <div class="card-body py-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
      </svg> <small>${moment(data.time).format("LT")}</small></div>`;

  commentList.prepend(lTag);

  textArea.value = "";
}

function broadcast(data){
    socket.emit("broadcast", data);
}

socket.on("broadcast", (data) => {
    addToDOM(data);
})


// Typing Animation

textArea.addEventListener("keyup", ()=>{
    socket.emit("typing", user);
    
});

let typingArea = document.getElementById("typing")

let typingId = null;
const debounce = (removeTyping, timer) => {
    if(typingId){
        clearTimeout(typingId);
    }
    typingId = setTimeout(() => {
        removeTyping();
    }, timer);

}

socket.on("typing", (username) => {
    typingArea.innerHTML = `${username} is typing...`;
    debounce(() => {
        typingArea.innerHTML = "&nbsp;";
    }, 1000);

})
