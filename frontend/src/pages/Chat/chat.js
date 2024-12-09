import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

export default function Chat() {
  // Local JSON object for chat data
  const initialData = {
    members: [
      {
        id: "1",
        name: "John Doe",
        avatar: "avatar-8.webp",
        lastMessage: "Hello, Are you there?",
        time: "Just now",
        unreadCount: 1,
      },
      {
        id: "2",
        name: "Danny Smith",
        avatar: "avatar-1.webp",
        lastMessage: "Lorem ipsum dolor sit.",
        time: "5 mins ago",
        unreadCount: 0,
      },
      {
        id: "3",
        name: "Lara Croft",
        avatar: "avatar-5.webp",
        lastMessage: "Sed ut perspiciatis.",
        time: "Yesterday",
        unreadCount: 0,
      },
    ],
    messages: {
      "1": [
        { id: "1", sender: "John Doe", content: "Hello! How are you?", time: "12 mins ago" },
        { id: "2", sender: "You", content: "I'm good, thank you! How about you?", time: "10 mins ago" },
      ],
      "2": [
        { id: "1", sender: "Danny Smith", content: "Lorem ipsum dolor sit amet.", time: "5 mins ago" },
      ],
      "3": [
        { id: "1", sender: "Lara Croft", content: "Sed ut perspiciatis unde.", time: "Yesterday" },
      ],
    },
  };

  const [members, setMembers] = useState(initialData.members);
  const [messages, setMessages] = useState(initialData.messages);
  const [currentMemberId, setCurrentMemberId] = useState("1");
  const [currentMessage, setCurrentMessage] = useState("");

  // Handle sending a message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: (messages[currentMemberId]?.length || 0) + 1,
      sender: "You",
      content: currentMessage.trim(),
      time: "Just now",
    };

    const updatedMessages = {
      ...messages,
      [currentMemberId]: [...(messages[currentMemberId] || []), newMessage],
    };

    setMessages(updatedMessages);
    setCurrentMessage("");

    // Update last message in member list
    const updatedMembers = members.map((member) =>
      member.id === currentMemberId
        ? { ...member, lastMessage: newMessage.content, time: newMessage.time, unreadCount: 0 }
        : member
    );
    setMembers(updatedMembers);
  };

  // Handle selecting a member
  const handleSelectMember = (id) => {
    setCurrentMemberId(id);

    // Reset unread count for the selected member
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, unreadCount: 0 } : member
    );
    setMembers(updatedMembers);
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        {/* Member List */}
        <MDBCol md="4" lg="3" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">Members</h5>
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {members.map((member) => (
                  <li
                    key={member.id}
                    className={`p-2 border-bottom ${currentMemberId === member.id ? "bg-light" : ""}`}
                    onClick={() => handleSelectMember(member.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <img
                          src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/${member.avatar}`}
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{member.name}</p>
                          <p className="small text-muted">{member.lastMessage}</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-muted mb-1">{member.time}</p>
                        {member.unreadCount > 0 && (
                          <span className="badge bg-danger float-end">{member.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Chat Messages */}
        <MDBCol md="8" lg="9">
          <MDBTypography listUnStyled>
            {(messages[currentMemberId] || []).map((message) => (
              <li
                key={message.id}
                className={`d-flex justify-content-${
                  message.sender === "You" ? "end" : "start"
                } mb-4`}
              >
                {message.sender !== "You" && (
                  <img
                    src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/${
                      members.find((member) => member.id === currentMemberId).avatar
                    }`}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                )}
                <MDBCard className="w-75">
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.sender}</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> {message.time}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">{message.content}</p>
                  </MDBCardBody>
                </MDBCard>
                {message.sender === "You" && (
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="60"
                  />
                )}
              </li>
            ))}

            <li className="bg-white mb-3">
              <MDBTextArea
                label="Type your message"
                rows={4}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </li>
            <MDBBtn color="info" rounded className="float-end" onClick={handleSendMessage}>
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
