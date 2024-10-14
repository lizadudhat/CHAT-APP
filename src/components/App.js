import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import Login from './Login'; 
import Dashboard from '../components/Dashboard';
import '../App.css';

const App = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    
    const chats = [
        { name: 'Krushi', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSij5UJRGh8pDXxRsYCUiSenrEe6KO1TTojqQ&s', lastMessage: 'last seen 12:30!' },
        { name: 'Neha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJpxC44MbjQd_mA8n8FdRduKq48ON912L53xH2OwC2Ded3oZ-fwOnLFk2INK9xa9LUbA&usqp=CAU', lastMessage: 'last seen 1:30' },
        { name: 'Priyanshi', avatar: 'https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg', lastMessage: 'last seen 12:00' },
        { name: 'Khushi', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxXKwxOM-0TNEtOuu5mzrl6Bv-Qnx-X44mg&s', lastMessage: 'last seen 12:30' },
        { name: 'Zeel', avatar: 'https://assets-global.website-files.com/632ac1a36830f75c7e5b16f0/64f1129e4b2c0731e32b700a_V3IzcKYnuLBe_2yi8HQPZM-Renmb8_LBQILlJFHjzsk.webp', lastMessage: 'last seen 1:00' },
        { name: 'Janvi', avatar: 'https://img.freepik.com/premium-photo/girl-kimono-with-japanese-style-her-face_849715-9011.jpg', lastMessage: 'last seen 2:30' },
    ];

   
    const chatMessages = {
        'Krushi': [
            { text: 'Hey !', user: 'Krushi', isUser: false },
            { text: 'Hii', user: 'You', isUser: true },
            { text: 'Can We Meet tomorrow?', user: 'Krushi', isUser: false },
        ],
        'Neha': [
            { text: 'Did you finish the project?', user: 'Neha', isUser: false },
            { text: 'Yes', user: 'You', isUser: true },
        ],
        'Zeel': [
            { text: 'How Are You ', user: 'Zeel', isUser: false },
            { text: 'I’ll be Fine!', user: 'You', isUser: true },
        ],
        'Janvi': [
            { text: 'Can you Give Me Notes?', user: 'Janvi', isUser: false },
            { text: 'Why Not!', user: 'You', isUser: true },
        ],
    };

   
    const handleSelectChat = (chat) => {
        setActiveChat(chat);
        setMessages(chatMessages[chat.name] || []);
    };

   
    const handleSendMessage = (text) => {
        const newMessage = { text, user: 'You', isUser: true };
        setMessages((prev) => [...prev, newMessage]);
    };

   
    const handleLogin = () => {
        setIsLoggedIn(true); 
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                  
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                   
                    <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : (
                        <>
                            <ChatList chats={chats} onSelectChat={handleSelectChat} />
                            {activeChat && (
                                <div className="chat-window">
                                    <ChatWindow messages={messages} activeChat={activeChat} />
                                    <MessageInput onSendMessage={handleSendMessage} />
                                </div>
                            )}
                        </>
                    )} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
