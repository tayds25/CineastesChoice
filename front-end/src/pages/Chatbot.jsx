import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your movie recommendation assistant. Ask me about movies, actors, directors, or genres!", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

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
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong!', sender: 'bot' }]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-[8rem]">
        {/* Main Chat Area*/}
        <div className="col-span-12 md:col-span-8 lg:col-span-8">
          <div className="bg-[#2a2b2a] rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">

            {/* Chat Messages */}
            <div className="flex-grow p-6 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-[#e9975d] text-white rounded-br-none'
                      : 'bg-[#5c5357] text-gray-100 rounded-bl-none'
                  }`}>
                    {msg.sender === 'bot' ? (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1 mt-2">
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#e9975d] animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-[#e9975d] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#e9975d] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-700">
              <div className="flex items-center bg-[#3d3d3d] p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about movies..."
                  className="w-full px-6 py-3 bg-[#3d3d3d] text-white focus:outline-none focus:ring-1 focus:ring-[#e9975d] placeholder-gray-400 border-0"
                />
                <button
                  onClick={handleSend}
                  className="flex items-center bg-[#e9975d] text-white gap-1 px-4 py-2 mx-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-[#E16A54] duration-300 hover:gap-2 hover:translate-x-1"
                >
                  Send
                  <svg
                    className="w-5 h-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Sidebar - Information */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3">
          <h3 className="text-white text-xl font-bold mb-4">The Cineaste's Assistant</h3>

          <div className="prose prose-invert">
            <p className="text-gray-300 mb-4">
              Welcome to your personal movie recommendation assistant! I'm here to help you discover films based on your preferences.
            </p>

            <h4 className="text-white text-lg font-semibold mt-6 mb-2">What I can do:</h4>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>Recommend movies based on genres you enjoy</li>
              <li>Suggest films similar to your favorites</li>
              <li>Find movies by specific directors or actors</li>
              <li>Help discover hidden gems and classics</li>
            </ul>

            <h4 className="text-white text-lg font-semibold mt-6 mb-2">Tips:</h4>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>Be specific about what you're looking for</li>
              <li>Mention genres, actors, or directors you like</li>
              <li>Tell me about movies you've enjoyed in the past</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;