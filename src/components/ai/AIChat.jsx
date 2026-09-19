import { useState, useRef, useEffect } from "react";
import { Bot, X, SendHorizontal, ChevronDown, Copy, Mic } from "lucide-react";
import { sendMessage } from "../../lib/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import ChatBot from "../chatbot/ChatBot";

const AIChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const quickSuggestions = [
    "👕 Men's Wear",
    "👟 Footwear",
    "🏷 Available Brands",
    "🚚 Delivery Charges",
    "💳 Payment Methods",
    "↩ Return Policy",
  ];
  useEffect(() => {
    if (!autoScroll) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, autoScroll]);

  useEffect(() => {
    const box = chatRef.current;

    if (!box) return;

    const handleScroll = () => {
      const distance = box.scrollHeight - box.scrollTop - box.clientHeight;

      const atBottom = distance < 80;

      setAutoScroll(atBottom);
      setShowScrollButton(!atBottom);
    };

    handleScroll();

    box.addEventListener("scroll", handleScroll);

    return () => box.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    setAutoScroll(true);
    setShowScrollButton(false);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const sendQuickMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      document.getElementById("send-btn")?.click();
    }, 100);
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      sender: "user",

      text: message,

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",

        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {
      const history = [
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",

          content: msg.text,
        })),

        {
          role: "user",

          content: currentMessage,
        },
      ];

      const res = await sendMessage(history);

      setMessages((prev) => [
        ...prev,

        {
          sender: "ai",

          text: res.response,

          products: res.products || [],

          filters: res.filters || {},

          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",

            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,

        {
          sender: "ai",

          text: "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ChatBot
        open={open}
        setOpen={setOpen}
        loading={loading}
        message={message}
        setMessage={setMessage}
        messages={messages}
        chatRef={chatRef}
        messagesEndRef={messagesEndRef}
        quickSuggestions={quickSuggestions}
        handleSend={handleSend}
        sendQuickMessage={sendQuickMessage}
        copyMessage={copyMessage}
        scrollToBottom={scrollToBottom}
        showScrollButton={showScrollButton}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        autoScroll={autoScroll}
        navigate={navigate}
        isClosing={isClosing}
      />{" "}
    </>
  );
};

export default AIChat;
