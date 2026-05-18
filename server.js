import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

import testRoutes from "./routes/testRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

import { initSocket }
  from "./socket/socket.js";

dotenv.config();

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",

      "https://e-learning-frontend-psi.vercel.app",
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  })
);

// STATIC UPLOADS
app.use(
  "/uploads",

  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/course",
  courseRoutes
);

app.use(
  "/api/lecture",
  lectureRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/certificate",
  certificateRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/live",
  liveClassRoutes
);

app.use(
  "/api/instructor",
  instructorRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/progress",
  progressRoutes
);

// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "🚀 API is running..."
  );

});

// ERROR HANDLER
app.use(errorHandler);

// CREATE HTTP SERVER
const server =
  http.createServer(app);

// INIT SOCKET
initSocket(server);

// PORT
const PORT =
  process.env.PORT || 5000;

// START SERVER
server.listen(PORT, () => {

  console.log(
    `🔥 Server running on port ${PORT}`
  );

});