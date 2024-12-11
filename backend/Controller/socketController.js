import Contact from '../model/contact.js';
import Chat from '../model/chat.js';
import Notification from '../model/notification.js';

import { query } from 'express';


//map two things email =socket.id
let onlineUser=new Map();


export const handleSocketConnection = (io, socket) => 
{
        console.log("Successfully connected: " + socket.id);

        // User connection and room joining
        socket.on("Add", ({ from }) => {
            console.log("User connected: " + from);
            onlineUser.set(from, socket.id);
        });

        // Join room for private messaging
        socket.on("joinRoom", ({ from, to }) => {
            const roomId = [from, to].sort().join('_');
            socket.join(roomId);
            console.log(`User ${from} joined room ${roomId}`);
        });

        socket.on("message", async ({ from, to, message }) => {
            console.log(`Message from ${from} to ${to}: ${message}`);

            try {
                let status = "Unread";

                // Generate unique room ID (sorted to ensure consistency)
                const roomId = [from, to].sort().join('_');
                // Emit message to the specific room
                io.to(roomId).emit("newMessage", { from, to, message });
                
                // Check if both users are online
                if (onlineUser.get(from) && onlineUser.get(to)) {
                    status = "read";
                    
                    console.log("roomID: "+roomId);
                    
                } else {
                    // User is offline, handle notification
                    let contact = await Contact.findOne({
                        contactList: { $in: [to] }
                    });

                    if (!contact) {
                        await Contact.updateOne(
                            { userName: from }, 
                            { $push: { contactList: to } } 
                        );
                    }

                    // Create notification
                    let newNotification = new Notification({
                        Source: from,
                        Destination: to,
                        Message: message,
                        Priority: 1
                    });

                    await newNotification.save();

                    // Emit offline notification
                    if (onlineUser.get(to)) {
                        io.to(onlineUser.get(to)).emit("notification", { from, to, message });
                    }
                }

                // Save message to database
                const newChat = new Chat({
                    message: message,
                    Source: from,
                    Destination: to,
                    Status: status
                });

                await newChat.save();

            } catch (error) {
                console.error("Error while processing message:", error);
            }
        });
}




