import { Outlet, Link } from 'react-router-dom';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import useAuth from '../hook/useAuth.js';

const Layout = () => {
  const { user, signout } = useAuth();

  return (
        <div className="h-100">
            <div className="h-100">
                <div className="d-flex flex-column h-100">
                    <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
                        <Container>
                            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                            {user && <Nav>
                                <Nav.Item className='ms-4'>
                                    <Button variant="primary" onClick={signout}>Выйти</Button>
                                </Nav.Item>
                            </Nav>}
                        </Container>
                    </Navbar>
                    <>
                        <Outlet />
                    </>
                </div>
            </div>
        </div>
  );
};

export default Layout;
