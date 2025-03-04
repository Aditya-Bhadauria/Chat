"use client"
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Predefined color options
const colors = ["bg-red-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400", "bg-indigo-400"];

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userColor, setUserColor] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);

      // Assign a random color to this user when they connect
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setUserColor(randomColor);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        id: userId,
        text: message,
        color: userColor, // Send user-specific color
      };

      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>
        <div className="h-64 overflow-y-auto border p-3 flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-2 rounded text-white max-w-xs ${
                msg.id === userId ? "self-end" : "self-start"
              } ${msg.color}`}
            >
              {msg.text}
            </p>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
