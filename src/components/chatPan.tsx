import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import "./chatPan.css"; // We'll create this CSS file separately

interface ChatPanProps {
  enable: boolean;
}

const ChatPan: React.FC<ChatPanProps> = ({ enable = false }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; message: string }[]>(
    []
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage;
      setInputMessage("");

      // Update messages with user input immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", message: userMessage },
      ]);

      try {
        const response = await Axios.post(
          "http://localhost:8000/chat/chat",
          {
            question: userMessage,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Update messages with bot response using the callback form
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", message: response.data.answer },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              message: "An error occurred while processing your request.",
            },
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            message: "An error occurred while processing your request.",
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text: string) => {
    // Split the text by newlines and wrap each line in a p tag
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-1 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div
      className={`w-full h-[60vh] rounded-2xl border-y-sky-600 border-solid border-2 flex flex-col ${
        enable ? "bg-sky-950" : "bg-sky-800"
      }`}
    >
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div className="flex flex-col mb-2" key={index}>
            {message.role === "user" ? (
              <div className="text-right">
                <div
                  className="bg-white p-3 rounded-lg inline-block max-w-[70%] text-left message-animation-right"
                  //   style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {formatMessage(message.message)}
                </div>
              </div>
            ) : (
              <div className="text-left">
                <div
                  className="bg-white p-3 rounded-lg inline-block max-w-[70%] message-animation-left"
                  //   style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {formatMessage(message.message)}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="">
        {/* Input Container */}
        <div className="rounded-2xl p-4 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm">
              <input
                type="text"
                disabled={!enable}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-3 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={!inputMessage.trim() || !enable}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPan;
