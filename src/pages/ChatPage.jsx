import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am your Safety Assistant. How can I help you? (e.g., First Aid for burns, Emergency numbers, Safety tips)' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `You are a Safety Assistant for a campus safety app. 
            Provide concise, helpful, and calm advice for emergency or safety-related queries.
            If the query is life-threatening, immediately advise calling emergency services (100/108).
            User Query: ${input}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: text }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: `Connection Error: ${error.message || error.toString()}. Pleaase check your API key and billing/usage limits.` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '82vh' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={28} color="var(--color-accent)" />
                AI Safety Chat
            </h2>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '1rem'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px'
                    }}>
                        {msg.sender === 'bot' && (
                            <div style={{
                                padding: '6px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-bg-secondary)',
                                marginTop: '4px'
                            }}>
                                <Bot size={16} color="var(--color-accent)" />
                            </div>
                        )}
                        <div style={{
                            padding: '12px',
                            borderRadius: '12px',
                            borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                            borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                            backgroundColor: msg.sender === 'user' ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                            color: msg.sender === 'user' ? '#fff' : 'var(--color-text-primary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.4'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div style={{ alignSelf: 'flex-start', color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginLeft: '30px' }}>
                        Typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about safety..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid #E2E8F0',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    style={{
                        padding: '12px',
                        backgroundColor: 'var(--color-primary-btn)',
                        color: 'white',
                        borderRadius: 'var(--border-radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        cursor: disabled => disabled ? 'not-allowed' : 'pointer',
                        opacity: loading || !input.trim() ? 0.7 : 1
                    }}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
