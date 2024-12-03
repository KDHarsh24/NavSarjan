import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/Notification/notify.css';

function Notify({ user, socket }) {
  const [notifyQueue, setNotifyQueue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/home/notification', { params: { user } })
      .then(res => {
        console.log("Fetched notifications:", res.data);
        setNotifyQueue(res.data);
      })
      .catch(err => console.log(err));
  }, [user]);

  const handleNotification = useCallback((source, priority) => {
    axios.post('http://localhost:8081/home/chat/removeNotify', { params: { source, priority, user } })
      .then(() => {
        setNotifyQueue(prevQueue =>
          prevQueue.filter(notify =>
            notify.Priority !== priority || notify.Source !== source
          )
        );
      })
      .catch(err => console.log(err));

    if (priority === 1) {
      navigate('/home/chat');
    }
  }, [user, navigate]);

  return (
    <section className="notification">
      <div className="notificationheader">Welcome {user} in notification centre</div>
      <div className="notificationContainer">
        {Array.isArray(notifyQueue) &&
          notifyQueue.map((notify, indx) => (
            <div
              className="notificationMsg"
              key={indx}
              onClick={() => handleNotification(notify.Source, notify.Priority)}
            >
              {notify.Source} Sent message. Your message: {notify.Message}
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default Notify;
