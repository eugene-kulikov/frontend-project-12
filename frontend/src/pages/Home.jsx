import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Chat from '../components/chat/Chat.jsx';
import ChatList from '../components/chat/ChatList.jsx';
import { fetchDataChat } from '../slices/channelsSlice.js';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect fetchDataChat');
    dispatch(fetchDataChat());
  }, []);

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
