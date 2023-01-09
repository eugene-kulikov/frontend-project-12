import React from 'react';
import { Button, Col, Nav } from 'react-bootstrap';

function ChatList() {
  return (
      <Col md={2} className="col-4 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>

        <Nav as="ul" className="flex-column px-2" variant="pills" fill>
          <Nav.Item as="li" className="w-100">
            <Button type="button" variant="secondary" className="w-100 rounded-0 text-start">
              <span className="me-1">#</span>general
            </Button>
          </Nav.Item>
          <Nav.Item as="li" className="w-100">
            <Button type="button" variant="" className="w-100 rounded-0 text-start">
              <span className="me-1">#</span>random
            </Button>
          </Nav.Item>
        </Nav>
      </Col>
  );
}

export default ChatList;
