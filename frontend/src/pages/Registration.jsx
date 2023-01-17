import React from 'react';
import {
  Card, Form, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import registration from '../assets/images/registration.jpeg';

function Registration() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const hasNameError = !!(formik.touched.username && formik.errors.username);
  const hasPasswordError = !!(formik.touched.password && formik.errors.password);
  const hasConfirmPasswordError = !!(formik.touched.confirmPassword
      && formik.errors.confirmPassword);

  return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col xs={12} md={8} xxl={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div>
                                <Image roundedCircle={true} src={registration} alt="Регистрация"/>
                            </div>

                            <Form className="w-50" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                        id="username"
                                        name="username"
                                        autoComplete="username"
                                        required
                                        placeholder="Имя пользователя"
                                        type="text"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={hasNameError}
                                    />
                                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                        id="password"
                                        name="password"
                                        autoComplete="new-password"
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
                                <Form.Group className="mb-4 form-floating">
                                    <Form.Control
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        required
                                        placeholder="Пароли должны совпадать"
                                        type="password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={hasConfirmPasswordError}
                                    />
                                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button className="w-100" type="submit" variant="outline-primary">
                                    Зарегистрироваться
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
