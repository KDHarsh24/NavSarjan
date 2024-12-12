import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const generateRoomCode = () => {
  // Simple random room code generator
  return Math.random().toString(36).substr(2, 8); // 8-character alphanumeric code
};

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    let currentRoomId = roomId;

    // If no roomId is present, generate one and navigate to the new room URL
    if (!currentRoomId) {
      currentRoomId = generateRoomCode();
      navigate(`/room/${currentRoomId}`);
    }

    const MyMeeting = async () => {
      const appId = 1915977727; // Replace with your actual App ID
      const serverSecret = "b037df774a03e13c9d992bf7968424aa"; // Replace with your actual Server Secret

      try {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          currentRoomId,
          Date.now().toString(),
          "User_" + Date.now() // Example user ID
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `${window.location.protocol}//${window.location.hostname}:3000/room/${currentRoomId}`, // Dynamically generate the link
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Enable group chat mode
          },
          showScreenSharingButton: true, // Show screen sharing button
        });

        // Add custom screen sharing functionality
        zc.on("ScreenShareStarted", () => {
          console.log("Screen sharing has started.");
        });
        zc.on("ScreenShareStopped", () => {
          console.log("Screen sharing has stopped.");
        });
      } catch (error) {
        console.error("Error generating token or joining room:", error);
      }
    };

    MyMeeting();
  }, [roomId, navigate]);

  return (
    <div ref={meetingContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default RoomPage;