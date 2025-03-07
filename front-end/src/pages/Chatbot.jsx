import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    const userInput = input;
    setInput('');

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyARLnirUAq8gxsKX6QJI8_1yTvaojaneSo`,
        {
          contents: [
            { role: 'user', parts: [{ text: `You are a movie recommendation chatbot. Your purpose is to recommend movies, discuss movie genres, actors, directors, and other movie-related topics. If the user asks about something unrelated to movies, politely respond that you can only talk about movies. User: ${userInput}` }] },
          ],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const botReply = response.data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong!', sender: 'bot' }]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
