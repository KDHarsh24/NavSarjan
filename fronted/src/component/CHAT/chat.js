import { useEffect,useState,useRef } from 'react';
import '../../styles/CHAT/chat.css';
import axios from 'axios';
import Message from './message';



function Chat({user,socket})
{
    console.log("socket in chat: "+socket.id);
    const[contactQueue,setContactQueue]=useState([]);
    const[chatQueue,setChatQueue]=useState([]);
    const[dest,setDest]=useState('');
    const source=user;
    const chatEndRef = useRef(null);



    const handleMessage=(e)=>
    {
         e.preventDefault();
         let message=document.getElementById('input').value;
         //send message to server
         document.getElementById('input').value="";
         socket.emit("message",({from:source,to:dest,message:message}));
    
    }

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(()=>
    {
        console.log("Welcome to useffect");
        //make api call to show all contacts
        axios.get("http://localhost:8081/home/chat/contact",{params:{user}})
            .then(res=>{
                    console.log("Contact directory"+res.data);
                    
                    setContactQueue(res.data);
                    
                })
            .catch(err=>console.log(err))

        //server send message
        socket.on("newMessage",({from,to,message})=>{
            console.log("Getting new message: "+message);
            if ((from === dest && to === user) || (from === user && to === dest))
            {
                setChatQueue(prevChats => [...prevChats, {
                    Source: from, 
                    message: message
                }]);
            }
            
        })

        socket.on("msgNotification", ({ from, to, message })=>{
            setContactQueue((prevQueue) =>
                prevQueue.map((msg) =>
                    msg.Source === from && msg.Destination === user
                        ? { ...msg, unreadMessageCount: msg.unreadMessageCount + 1 }
                        : msg
                )
            );
            
        })


          // Cleanup on component unmount
          return () => {
            socket.off("newMessage");
        };

    },[user,socket,dest])


    const showChats=(contact)=>
    {
        setDest(contact);
        let to=contact;
        let from=user;
        console.log("contact: "+contact);
        //make number of unread message to 0 for that contact
        const pTags = document.querySelectorAll('#contactNotificationCounter div');
        console.log("value: "+pTags.value);
        pTags.value=0;


        //make api call to load data
        axios.get('http://localhost:8081/home/chat/message',{params:{from,to}})
            .then(res=>{
                console.log("Chat directory");
                setChatQueue(res.data);
            })
            .catch(err=>console.log(err));


        //make api call to mark all related message read
        axios.post('http://localhost:8081/home/chat/readStatus',{params:{contact}})
        .then(res=>{
            console.log("res.data: "+res.data);
        })
        .catch(err=>console.log(err));

         setTimeout(scrollToBottom, 0); 

    }

    useEffect(() => {
        scrollToBottom(); // Scroll when chatQueue changes
    }, [chatQueue]);


    return(
        <>
            <section    className="chatContainer">
                    <div    className="contactContainer">
                        <div    className="contactHeader">
                            <button>Add New Contact</button>    
                            <input type="text" placeholder='Search here'/>
                        </div>
                        <div    className="contactBox">
                                
                                    {contactQueue.length>0?(contactQueue.map((contact,indx)=>(
                                        <div    className="contactBoxContainer" key={indx}     onClick={(e)=>showChats(contact._id)} >
                                            <p>{(contact._id!==user?contact._id:null)}</p>
                                            <div id="contactNotificationCounter"    className='dot'>{(contact.unreadMessageCount!==0?contact.unreadMessageCount:null)}</div>
                                        </div>
                                    ))):<p>No Contact Found</p>}
                                    
                                
                                
                        </div>    
                    </div>
                    
                        <div className="chatBox">
                        
                           <div className="chatBoxHeader">User:{user}  Dest:{dest}</div>

                            {chatQueue.length > 0 &&
                                chatQueue.map((chat, indx) => (
                                   
                                        <Message
                                            key={indx}
                                            message={chat.message}
                                            classs={chat.Source === user ? 'messageright' : 'messageleft'}
                                        />
                                  
                                ))}
                     
                            <div ref={chatEndRef} />
                    
                        
                        <div    className="inputBox">
                            <input type="text" placeholder="Enter message" id="input"/>
                            <button onClick={handleMessage}>Send</button>
                        </div>
                    </div>
            </section>
           
        </>
    );
}

export default Chat;












