import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); 

export default function ChatPopup({ showChat }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hello! How can I help you with your treatment today?" }
  ]);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  console.log(JSON.parse(localStorage.getItem('user')));
  console.log(user);

  useEffect(() => {
    // Listen for replies from backend
    socket.on("botReply", (reply) => {
      setChat((prev) => [...prev, { sender: "bot", text: reply.message || reply }]);
    });

    return () => {
      socket.off("botReply");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user message locally
    setChat((prev) => [...prev, { sender: "user", text: message,context:{user} }]);

    // Emit to backend
    socket.emit("userMessage", {
      message,
      context:{...user}
    });

    setMessage("");
  };

  if (!showChat) return null;

  return (
    <div className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <h4 className="font-semibold">Chat Support</h4>
      </div>

      {/* Chat messages */}
      <div className="p-4 flex-1 overflow-y-auto">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-3 py-2 rounded text-sm ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 border-t flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-3 py-2 border rounded-l text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
