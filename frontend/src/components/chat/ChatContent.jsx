import React from 'react';
import { useSelector } from 'react-redux';
import { selectorMessages } from '../../slices/messagesSlice.js';

function ChatContent() {
  const messages = useSelector(selectorMessages.selectAll);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({ username, message, id }) => (
          <div key={id} className='text-break mb-2'>
            <b>{ username }: </b>
            <span>{ message }</span>
          </div>
      ))}
    </div>
  );
}

export default ChatContent;
