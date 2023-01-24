import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Chat from '../components/chat/Chat.jsx';
import ChannelList from '../components/channels/ChannelList.jsx';
import Modal from '../components/modals/Modal.jsx';
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
        <Modal/>
        <ChannelList/>
        <Chat/>
      </Row>
    </Container>
  );
}

export default Home;
