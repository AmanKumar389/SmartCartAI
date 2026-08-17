import ChatProductCard from "./ChatProductCard.jsx";
import { useState } from "react";
import axios from "axios";

function ChatBot() {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hello! I am SmartCart AI Assistant. How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (message.trim() === "") return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/chat",
                {
                    message: currentMessage
                }
            );

            console.log(response.data);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: response.data.reply,
                    products: response.data.products
                }
            ]);

        } catch (error) {

            console.log(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong!"
                }
            ]);

        }

        setLoading(false);
    };
    return (
        <>
            {/* Floating Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#0d6efd",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "28px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    zIndex: 9999
                }}
            >
                💬
            </div>

            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "90px",
                        right: "20px",
                        width: "360px",
                        height: "520px",
                        background: "#fff",
                        borderRadius: "15px",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                        zIndex: 9999
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            background: "#0d6efd",
                            color: "white",
                            padding: "15px",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <span>🤖 SmartCart AI</span>

                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "18px"
                            }}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "15px",
                            background: "#f8f9fa"
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: msg.sender === "user" ? "right" : "left",
                                    marginBottom: "12px"
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 15px",
                                        borderRadius: "12px",
                                        maxWidth: "80%",
                                        background: msg.sender === "user" ? "#0d6efd" : "#e9ecef",
                                        color: msg.sender === "user" ? "white" : "black",
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {msg.text}
                                </div>

                                {msg.products &&
                                    msg.products.length > 0 &&
                                    msg.products.map((product) => (
                                        <ChatProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                            </div>
                        ))}
                    </div>

                    {loading && (
                        <div style={{ padding: "10px" }}>
                            🤖 SmartCart AI is typing...
                        </div>
                    )}

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            borderTop: "1px solid #ddd"
                        }}
                    >
                        <input
                            type="text"
                            value={message}
                            placeholder="Ask anything..."
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                padding: "15px"
                            }}
                        />

                        <button
                            onClick={sendMessage}
                            style={{
                                background: "#0d6efd",
                                color: "white",
                                border: "none",
                                padding: "0 20px",
                                cursor: "pointer"
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;