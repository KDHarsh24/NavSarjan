import '../../styles/CHAT/chat.css';

function Message({message, classs}) {
  console.log("message: "+message);
  console.log("classs"+classs);
  return (
        
          <div className={classs}>{message}</div> 
         
  );
}

export default Message;