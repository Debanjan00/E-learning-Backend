import Message from "../models/Message.js";
import User from "../models/User.js";

// SEND MESSAGE
export const sendMessage = async (
  req,
  res
) => {
  try {

    const {
      receiverId,
      message,
    } = req.body;

    const newMessage =
      await Message.create({

        sender: req.user._id,

        receiver: receiverId,

        message,
      });

    res.status(201).json({
      message: "Message sent",
      newMessage,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CHAT MESSAGES
export const getMessages = async (
  req,
  res
) => {
  try {

    const receiverId =
      req.params.receiverId;

    const messages =
      await Message.find({

        $or: [

          {
            sender: req.user._id,

            receiver: receiverId,
          },

          {
            sender: receiverId,

            receiver: req.user._id,
          },
        ],
      }).sort({
        createdAt: 1,
      });

    res.json({
      messages,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getUsers = async (
  req,
  res
) => {
  try {

    const users =
      await User.find(
        {
          _id: {
            $ne: req.user._id,
          },
        },
        "name email role"
      );

    res.json({
      users,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};