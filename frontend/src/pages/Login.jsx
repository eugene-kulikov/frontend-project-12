import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Card, Form, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import login from '../assets/images/login.jpeg';

function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .max(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const hasNameError = !!(formik.touched.username && formik.errors.username);
  const hasPasswordError = !!(formik.touched.password && formik.errors.password);

  return (
      <Container fluid className="h-100">
          <Row className="justify-content-center align-content-center h-100">
              <Col xs={12} md={8} xxl={6}>
                  <Card className="shadow-sm">
                      <Card.Body as={Row} className="p-5">
                          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                              <Image roundedCircle={true} src={login}alt="Войти"/>
                          </Col>

                          <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                              <h1 className="text-center mb-4">Войти</h1>
                              <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                      id="username"
                                      name="username"
                                      autoComplete="username"
                                      required
                                      placeholder="Ваш ник"
                                      type="text"
                                      value={formik.values.username}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      isInvalid={hasNameError}
                                  />
                                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                  <Form.Control.Feedback type="invalid" tooltip>
                                      {formik.errors.username}
                                  </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group className="mb-4 form-floating">
                                  <Form.Control
                                      id="password"
                                      name="password"
                                      autoComplete="current-password"
                                      required
                                      placeholder="Пароль"
                                      type="password"
                                      value={formik.values.password}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      isInvalid={hasPasswordError}
                                  />
                                  <Form.Label htmlFor="password">Пароль</Form.Label>
                                  <Form.Control.Feedback type="invalid" tooltip>
                                      {formik.errors.password}
                                  </Form.Control.Feedback>
                              </Form.Group>
                              <Button className="w-100 mb-3" type="submit" variant="outline-primary">
                                  Войти
                              </Button>
                          </Form>

                      </Card.Body>
                      <Card.Footer className="p-4 text-center">
                          <span>Нет аккаунта?&ensp;</span>
                          <Link to="/signup">Регистрация</Link>
                      </Card.Footer>
                  </Card>
              </Col>
          </Row>
      </Container>
  );
}

export default Login;
