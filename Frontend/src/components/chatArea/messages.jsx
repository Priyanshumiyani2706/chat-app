import React, { useEffect, useRef } from 'react'
import './message.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessages, selectReceiver } from '../../Store/messages/message.selector'
import { selectUser } from '../../Store/user/user.selector'
import { io } from 'socket.io-client'
import { getMessages, setMessages } from '../../Store/messages/message.action'
import { selectSocket } from '../../Store/socket/scoket.selector'
const Messages = () => {
    const messages = useSelector(selectMessages);
    const user = useSelector(selectUser);
    const receiver = useSelector(selectReceiver);
    const socket = useSelector(selectSocket);
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", () => {
                dispatch(getMessages({ [receiver.isGroup ? "name" : "users"]: receiver.isGroup ? receiver.username : receiver.users }));
            })
        }
    }, [socket]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="Message-Container">
            {messages && messages.length > 0 && messages.map(({ senderId, message }) => {
                return (<div className={`message ${senderId === user._id ? 'sent' : 'received'}`}>
                    <div className="message-content">
                        <p className="message-text">{message}</p>
                    </div>
                </div>)
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages