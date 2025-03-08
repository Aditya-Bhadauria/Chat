"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";
import Message from "../components/Message";
const socket = io("http://localhost:5000");

const ChatPage = () => {
  const { id } = useParams(); // Get friend ID from URL
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", id);

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [id]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { sender: "Me", text: input };
      socket.emit("sendMessage", { receiverId: id, text: input });
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <div className="h-[80vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} isOwnMessage={msg.sender === "Me"} />
          ))}
        </div>
        <div className="flex mt-4">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button 
            onClick={sendMessage} 
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
