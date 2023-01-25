import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Card, Form, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import loginImage from '../assets/images/login.jpeg';
import useAuth from '../hook/useAuth.js';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signin, login } = useAuth();
  const usernameRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const fromPage = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('validation.required')),
      password: yup.string()
        .required(t('validation.required')),
    }),
    onSubmit: async (values, { setErrors }) => {
      console.log('login form', values);
      try {
        await login({
          username: values.username,
          password: values.password,
        });
        signin(values, () => navigate(fromPage, { replace: true }));
      } catch (e) {
        console.log('onSubmit login form', e);
        const message = e.code === 'ERR_BAD_REQUEST' ? t('validation.invalidData') : e.response?.data?.message;
        setErrors({ auth: message });
      }
    },
  });

  const hasNameError = !!(formik.touched.username && formik.errors.username);
  const hasPasswordError = !!(formik.touched.password && formik.errors.password);
  const hasAuthError = !!formik.errors.auth;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body as={Row} className="p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image roundedCircle src={loginImage} alt={t('page.login.title')} />
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('page.login.submit')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('page.login.fields.name')}
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={hasNameError || hasAuthError}
                    ref={usernameRef}
                  />
                  <Form.Label htmlFor="username">{t('page.login.fields.name')}</Form.Label>
                  {hasNameError && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('page.login.fields.password')}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={hasPasswordError || hasAuthError}
                  />
                  <Form.Label htmlFor="password">{t('page.login.fields.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password || formik.errors.auth}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 mb-3" type="submit" variant="outline-primary">
                  {t('page.login.title')}
                </Button>
              </Form>

            </Card.Body>
            <Card.Footer className="p-4 text-center">
              <span>
                {t('page.login.footer.text')}
                &ensp;
              </span>
              <Link to="/signup">{t('page.login.footer.link')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
