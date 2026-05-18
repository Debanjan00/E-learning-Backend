import { Server } from "socket.io";

let io;

// SOCKET CONNECTION
export const initSocket = (server) => {

  io = new Server(server, {

    cors: {
      origin:
        "https://e-learning-frontend-psi.vercel.app",

      methods: ["GET", "POST"],

      credentials: true,
    },

    transports: ["websocket"],

    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket) => {

    console.log(
      "User connected:",
      socket.id
    );

    // JOIN USER ROOM
    socket.on("join", (userId) => {

      socket.join(userId);

      console.log(
        `User joined room: ${userId}`
      );
    });

    // SEND MESSAGE
    socket.on("sendMessage", (data) => {

      const {
        senderId,
        receiverId,
        message,
      } = data;

      io.to(receiverId).emit(
        "receiveMessage",
        {
          senderId,
          message,
        }
      );
    });

    // DISCONNECT
    socket.on(
      "disconnect",
      (reason) => {

        console.log(
          "User disconnected:",
          socket.id,
          reason
        );
      }
    );
  });
};

// EXPORT IO
export const getIO = () => io;