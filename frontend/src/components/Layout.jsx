import { Outlet, Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const Layout = () => (
    <div className="h-100">
        <div className="h-100">
            <div className="d-flex flex-column h-100">
                <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                    </Container>
                </Navbar>
                <>
                    <Outlet />
                </>
            </div>
        </div>
    </div>
);

export default Layout;
