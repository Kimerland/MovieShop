import React, { FC, useEffect, useRef, useState } from "react";
import MessagesStyle from "../MessagesContent/MessagesContent.module.scss";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatForm from "./ChatForm/ChatForm";
import ChatMessage from "./ChatMessage/ChatMessage";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

interface ChatMessageType {
  role: "user" | "bot";
  text: string;
}

const MessagesContent: FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    if (isLoading) return;
    setIsLoading(true);

    const lastMessage = history[history.length - 2];

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: lastMessage.text }),
      });

      const data = await response.json();

      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "Thinking..." ? { role: "bot", text: data.message } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={MessagesStyle.wrapper_chat}>
      <div className={MessagesStyle.container_chat}>
        <div className={MessagesStyle.header_chat}>
          <div className={MessagesStyle.header_info}>
            <SmartToyIcon className={MessagesStyle.header_icon} />
            <h2 className={MessagesStyle.logo_text}>Chatbot</h2>
          </div>
        </div>

        <div className={MessagesStyle.body_chat}>
          <div className={MessagesStyle.bot_message}>
            <SmartToyIcon />
            <p className={MessagesStyle.bot_text}>What can I help with?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          <div ref={messageRef} />
        </div>

        <ChatForm
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
          chatHistory={chatHistory}
        />
      </div>
    </div>
  );
};

export default MessagesContent;
