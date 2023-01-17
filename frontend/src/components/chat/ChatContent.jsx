import React from 'react';

function ChatContent({ messages }) {
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
