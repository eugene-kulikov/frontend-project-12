import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Chat from '../components/chat/Chat.jsx';
import ChatList from '../components/chat/ChatList.jsx';

function Home() {
  return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
              <ChatList />
              <Chat/>
          </Row>
      </Container>
  );
}

export default Home;
