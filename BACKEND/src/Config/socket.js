import socketIo from "socket.io";

const configureSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:5173/",
            creadential: true,
        }
    });

}

// socket methods
// on => "on method is used to catch the any event."
// emit => "emit method is used to emit (send) the any event."
// disconnect => "disconnect method is used to catch the disconnect event."

// if you use the without the event manipulation then you can use the socketIo.send("message") with settimeout

// you can handle this event using the socket.io("message",function(data){
// console.log(data)
// })