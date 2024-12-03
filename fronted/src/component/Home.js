import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:8081/";
let socket;

function Home({ user, socketValue }) {
  console.log("user: " + user);

  const navigate = useNavigate();

  useEffect(() => {
    // Ensure socket connection is established once
    if (!socket) {
      socket = socketIO(ENDPOINT, { transports: ['websocket'] });
      socketValue(socket);

      socket.on("connect", () => {
        console.log("Client Id: " + socket.id);
      });

      socket.emit("Add", { from: user });

      socket.on("notification", ({ to, message }) => {
        console.log("Notification from " + to + " with message: " + message);
      });
    }

    return () => {
      socket?.off(); // Clean up socket listeners
    };
  }, [user, socketValue]); // Only trigger on user or socketValue changes

  const handleChat = (e) => {
    e.preventDefault();
    navigate('/home/chat');
  };

  const handleNotification = (e) => {
    e.preventDefault();
    navigate('/home/notification');
  };

  return (
    <>
      <section>
        <div>
          <h3>Welcome {user}</h3>
          <button onClick={handleChat}>Chat</button>
          <button onClick={handleNotification}>Notification</button>
        </div>
      </section>
    </>
  );
}

export default Home;
