import { useEffect,useState,useRef } from 'react';
import '../../styles/chat.css';
import axios from 'axios';
import Message from './message';
import { MdVideoCall } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { socketvalue } from '../../App';
import { userdata } from '../Home/Signpage';
function Chat()
{
    let user=userdata.email; //userEmail
    console.log("user: "+user);
    console.log("socket in chat"+socketvalue.id);
    if(!socketvalue)
    {
        console.log("socketvalue in chat: "+socketvalue.id);
    }
    
    const[contactQueue,setContactQueue]=useState([]);
    const[chatQueue,setChatQueue]=useState([]);
    const[dest,setDest]=useState('');
    let to=user;
    const source=user;
    const chatEndRef = useRef(null);
    const navigate=useNavigate();


    const handleMessage=(e)=>
    {
         e.preventDefault();
         let message=document.getElementById('input').value;
         //send message to server
         document.getElementById('input').value="";
         console.log("message: "+message);
         socketvalue.emit("message",({from:source,to:dest,message:message}));
    
    }

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(()=>
    {
       
        //make api call to show all contacts
        axios.get("https://navsarjanbackend-sage.vercel.app/home/chat/contact",{params:{user}})
            .then(res=>{
                    console.log("Contact directory"+JSON.stringify(res.data,null,2));
                    
                    setContactQueue(res.data);
                    
                })
            .catch(err=>console.log(err))

        //server send message
        socketvalue.on("newMessage",({from,to,message})=>{
            console.log("Getting new message");
            if ((from === dest && to === user) || (from === user && to === dest))
            {
                setChatQueue(prevChats => [...prevChats, {
                    Source: from, 
                    message: message
                }]);
            }
            
        })



          // Cleanup on component unmount
          return () => {
            socketvalue.off("newMessage");
        };

    },[user,dest])


    const showChats=(contact)=>
    {

        setDest(contact);
        let to=contact;
        let from=user;
        console.log("contact: "+contact);
        socketvalue.emit("joinRoom", { from: user, to: contact });


        //make api call to load data
        axios.get('https://navsarjanbackend-sage.vercel.app/home/chat/message',{params:{from,to}})
            .then(res=>{
                console.log("Chat directory: "+JSON.stringify(res.data,null,2));
                setChatQueue(res.data);
            })
            .catch(err=>console.log(err));


        //make api call to mark all related message read
        axios.post('https://navsarjanbackend-sage.vercel.app/home/chat/readStatus',{params:{contact}})
        .then(res=>{
            console.log("res.data: "+JSON.stringify(res.data,null,2));
        })
        .catch(err=>console.log(err));

        setTimeout(scrollToBottom, 0); 

    }

    useEffect(() => {
        scrollToBottom(); // Scroll when chatQueue changes
    }, [chatQueue]);


    const handleVideoCall=(e)=>
    {
        e.preventDefault();
        navigate('/dashboard/room');
    }



    return(
        <>
            <section  className="chatContainer">
                    <div    className="contactContainer">
                        <div    className="contactHeader">
                            <button>Add New Contact</button>    
                            <input type="text" placeholder='Search here'/>
                        </div>
                        <div    className="contactBox">
                                
                                    {contactQueue.length>0?(contactQueue.map((contact,indx)=>(
                                        <div    className="contactBoxContainer" key={indx}     onClick={(e)=>showChats(contact._id)} >
                                            <p>{(contact._id!==user?contact._id:null)}</p>
                                            <div id="contactNotificationCounter"    className='dot'></div>
                                        </div>
                                    ))):<p>No Contact Found</p>}
                                    
                                
                                
                        </div>    
                    </div>
                    
                        <div className="chatBox">
                        
                           <div className="chatBoxHeader">
                                    <div    className="chatBoxHeaderName">User:{user}  Dest:{dest}</div>
                                    <button className="chatBoxHeaderVideoCall"  onClick={handleVideoCall}><MdVideoCall /></button>
                            </div>

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












