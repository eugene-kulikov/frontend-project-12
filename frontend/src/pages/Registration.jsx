import React, { useEffect, useRef } from 'react';
import {
  Card, Form, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import registration from '../assets/images/registration.jpeg';
import useAuth from '../hook/useAuth.js';

function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signin, signup } = useAuth();
  const usernameRef = useRef();
  const { t } = useTranslation();

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('validation.intervalLength'))
        .max(20, t('validation.intervalLength'))
        .required(t('validation.required')),
      password: yup.string()
        .min(6, t('validation.minLength'))
        .required(t('validation.required')),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], t('validation.passwordMatch'))
        .required(t('validation.required')),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        console.log('registration form', values);
        await signup({
          username: values.username,
          password: values.password,
        });
        signin(values, () => navigate(fromPage, { replace: true }));
      } catch (e) {
        console.log('onSubmit registration form', e);
        const message = e.response.status === 409 ? t('validation.userExist') : e.response?.data?.message;
        setErrors({ auth: message });
      }
    },
  });

  const hasNameError = !!(formik.touched.username && formik.errors.username);
  const hasPasswordError = !!(formik.touched.password && formik.errors.password);
  const hasConfirmPasswordError = !!(formik.touched.confirmPassword
      && formik.errors.confirmPassword);
  const hasAuthError = !!formik.errors.auth;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image roundedCircle={true} src={registration} alt={t('page.registration.title')}/>
              </div>

              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('page.registration.title')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('page.registration.fields.name')}
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={hasNameError || hasAuthError}
                    ref={usernameRef}
                  />
                  <Form.Label htmlFor="username">{t('page.registration.fields.name')}</Form.Label>
                  {hasNameError && <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder={t('page.registration.fields.password')}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={hasPasswordError || hasAuthError}
                  />
                  <Form.Label htmlFor="password">{t('page.registration.fields.password')}</Form.Label>
                  {hasPasswordError && <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    placeholder={t('page.registration.fields.placeholderConfirm')}
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={hasConfirmPasswordError || hasAuthError}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('page.registration.fields.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword || formik.errors.auth}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100" type="submit" variant="outline-primary">
                  {t('page.registration.submit')}
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
