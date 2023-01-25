import { Outlet, Link } from 'react-router-dom';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';
import { isEmptyObject } from '../utils/common.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const Layout = () => {
  const dispatch = useDispatch();
  const { user, signout } = useAuth();
  const { t } = useTranslation();
  const showSignOut = !isEmptyObject(user);
  const logout = () => {
    dispatch(channelsActions.setCurrentChannelId(1));
    signout();
  };

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">{t('component.layout.brand')}</Navbar.Brand>
              {showSignOut
                && (
                  <Nav>
                    <Nav.Item className="ms-4">
                      <Button variant="primary" onClick={logout}>{t('component.layout.logout')}</Button>
                    </Nav.Item>
                  </Nav>
                )}
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
