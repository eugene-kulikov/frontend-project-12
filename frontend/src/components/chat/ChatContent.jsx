import React from 'react';
import { useSelector } from 'react-redux';
import { selectorMessages } from '../../slices/messagesSlice.js';

function ChatContent() {
  const messages = useSelector(selectorMessages.selectAll);
  console.log('messages', messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
  );
}

export default ChatContent;
