import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import env from "dotenv";

// Import required dependencies

env.config();

// Create an instance of the Express application
const app = express({});
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define the Message schema and model
const messageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.String,
            ref: "User",
        },
        fightId: {
            type: mongoose.Schema.Types.String,
            ref: "Fight",
        },
        message: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
    },
    { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);

// Define the FightConversation schema and model
const fightConversationSchema = new mongoose.Schema(
    {
        fightId: {
            type: mongoose.Schema.Types.String,
            ref: "Fight",
            required: true,
        },
        participants: {
            type: [mongoose.Schema.Types.String],
            ref: "User",
        },
        messages: {
            type: [messageSchema],
            default: [],
        },
    },
    { timestamps: true }
);
const FightConversation = mongoose.model(
    "FightConversation",
    fightConversationSchema
);

// Controller function to handle sending a message
const sendMessage = async (req, res) => {
    try {
        console.log("sendMessage controller");
        console.log(req.body);
        const { message, userId, username } = req.body;
        const { fightId } = req.params;
        console.log(fightId);

        let conversation = await FightConversation.findOne({
            fightId,
        });

        if (!conversation) {
            conversation = await FightConversation.create({
                fightId,
                participants: [userId],
            });
        }

        if (!conversation.participants.includes(userId)) {
            conversation.participants.push(userId);
            await conversation.save();
        }

        const newMessage = new Message({
            userId,
            fightId,
            message,
            username,
        });

        conversation.messages.push(newMessage);
        await Promise.all([conversation.save(), newMessage.save()]);

        io.emit(fightId, newMessage);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to handle retrieving messages for a fight
const getMessages = async (req, res) => {
    try {
        const { fightId } = req.params;

        const conversation = await FightConversation.findOne({
            fightId,
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Routes
app.post("/api/fights/:fightId/messages", sendMessage);
app.get("/api/fights/:fightId/messages", getMessages);

const userSocketMap = {};

// Socket.IO event handling
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    socket.on("joinFight", (fightId) => {
        socket.join(fightId);
    });
    socket.on("disconnect", () => {
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
            }
        }
    });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
