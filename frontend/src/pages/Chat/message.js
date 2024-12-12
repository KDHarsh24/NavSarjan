import '../../styles/chat.css';

function Message({message, classs}) {
  
  //console.log("classs"+classs);
  return (
        
          <div className={classs}>{message}</div> 
         
  );
}

export default Message;