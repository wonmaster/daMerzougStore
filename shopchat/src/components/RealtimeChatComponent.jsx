import React, { useState, useEffect, useRef } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('mahfoud');
  const [socket, setSocket] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef(null);

  // Connect to socket on component mount
  useEffect(() => {
    const newSocket = io('http://localhost:3000');

    // Listen for received messages
    newSocket.on('receive_message', (message) => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now(),
          text: message.content,
          sender: 'bot',
          username: message.username
        }
      ]);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || !socket) return;

    // Send message via socket
    socket.emit('send_message', {
      username: username,
      content: inputMessage
    });

    // Add user message to local state
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        username: username
      }
    ]);

    // Clear input
    setInputMessage('');
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg border">
      <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold">Chat Iencli</h3>
        <button
          onClick={toggleMinimize}
          className="text-white hover:bg-blue-600 p-1 rounded"
        >
          {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
        </button>
      </div>


      {!isMinimized && (
       <>
      <div className="h-96 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          !(message.username === username && message.sender === 'bot') && (
            <div
              key={message.id}
              className={`p-2 rounded-lg max-w-[80%] ${message.sender === 'user'
                  ? 'bg-blue-100 self-end ml-auto text-black'
                  : 'bg-gray-100 self-start mr-auto text-black'
                }`}
            >



              <div className="text-xs text-gray-600 mb-1">{message.username}</div>
              {message.text}
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex grid grid-cols-4 p-4 border-t">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black mr-2 p-2 col-span-1 border rounded"
          placeholder="Enter your name..."
        />
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="text-black flex-grow col-span-2 mr-2 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 col-span-1 rounded hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
      </>
      )}
    </div>
  );
};

export default ChatComponent;