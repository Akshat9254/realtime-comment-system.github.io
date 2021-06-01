const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

//middleware
app.use(express.static(path.join(__dirname, "../public")));




const server = app.listen(port, () => {
    console.log(`Server running at ${port}`);
})

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("broadcast", (data) => {
        socket.broadcast.emit("broadcast", data);
    })

    socket.on("typing", (username) => {
        socket.broadcast.emit("typing", username);
    });
    
})
