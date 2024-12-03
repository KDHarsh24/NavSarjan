import Contact from '../modals/contactModal.js';
import Chat from '../modals/chatModal.js';
import Notification from '../modals/notificationModal.js';

import { query } from 'express';


//map two things email =socket.id
let onlineUser=new Map();
let roomUser=new Map();


export const handleSocketConnection=(io,socket)=>
{
    
    // i have to sent specific things 
    io.on("connect",(socket)=>{
        console.log("Successfully add  "+socket.id);


        socket.on("Add",({from})=>{
            //sent two things (self mail and user associated mail)
            if(from != undefined )
            {
                onlineUser.set(from,socket.id);
            }
        })

        socket.on("message", async ({ from, to, message }) => {
            if(!roomUser.get(from))
            {
                roomUser.set(from,to);
            }
            if(!roomUser.get(to))
            {
                roomUser.set(to,from);
            }
            console.log("Message: " + message);
        
            let status = "";
            console.log("from: " + from);
            console.log("to: " + to);
        
            try {
                io.to(onlineUser.get(from)).emit("newMessage", { from, to, message });

                if (onlineUser.get(from) && onlineUser.get(to)) 
                {

                    status = "read";
                    if(roomUser.get(from)!==to)
                    {
                        //add number of chats message
                        io.to(onlineUser.get(to)).emit("msgNotification", { from, to, message });
                        roomUser.set(from)=to;
                    }
                    else
                        io.to(onlineUser.get(to)).emit("newMessage", { from, to, message });

                } 
                else 
                {
                    console.log("One of the users is offline or not found in onlineUser map.");
                    status = "Unread";

                    //check user exist or not
                    let contact = await Contact.findOne({
                        contactList: { $in: [to] }  // Check if userName exists in the contactList
                    });
                    if(!contact)
                    {
                        //then save it to list
                        contact=await Contact.updateOne(
                            { userName: from }, 
                            { $push: { contactList:to} } 
                        );
                    }
                    //save notification here 
                    let newNotification = new Notification({
                        Source:from,
                        Destination:to,
                        Message:message,
                        Priority:1
                    });

                    newNotification=await newNotification.save();

                    if (newNotification) {
                        console.log("Notification successfully inserted:", newNotification);
                    } else {
                        console.error("Failed to insert Notification");
                    }

                    //user offline                
                    io.to(onlineUser.get(to)).emit("notification", { to, message });

                }
            
                // Save it to the database
                const newChat = new Chat({
                    message: message,
                    Source: from,
                    Destination: to,
                    Status: status
                });
            
                // Save to the database and handle the response
                const savedChat = await newChat.save();
            
                if (savedChat) {
                    console.log("Message successfully inserted:", savedChat);
                } else {
                    console.error("Failed to insert message");
                }
            } catch (error) {
                console.error("Error while saving message:", error);
            }

        });



        socket.on("disconnection",()=>{
            console.log("USER LEFT of socketID: "+socket.id);
            for (const [key, value] of onlineUser.entries()) {
                if (value === socket.id) {
                    onlineUser.delete(key);
                    roomUser.delete(key);
                    console.log(`Removed user: ${key}`);
                }
            }

        })


    })

}
