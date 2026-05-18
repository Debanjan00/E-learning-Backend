import express from "express";

import {
  sendMessage,
  getMessages,
  getUsers,
} from "../controllers/chatController.js";

import { isAuth }
from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL USERS
router.get(
  "/users/all",
  isAuth,
  getUsers
);

// SEND MESSAGE
router.post(
  "/send",
  isAuth,
  sendMessage
);

// GET CHAT MESSAGES
router.get(
  "/:receiverId",
  isAuth,
  getMessages
);

export default router;