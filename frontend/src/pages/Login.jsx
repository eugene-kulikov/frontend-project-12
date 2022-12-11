import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import login from '../assets/images/login.jpeg';

function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const hasInputsError = (formik.touched.username && formik.errors.username)
      || (formik.touched.password && formik.errors.password);

  const inputClass = cn('form-control', {
    'is-invalid': hasInputsError,
  });

  return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body row p-5">
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                <img className="rounded-circle"
                                     src={login}
                                     alt="Войти"
                                />
                            </div>

                                <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                                    <h1 className="text-center mb-4">Войти</h1>
                                    <div className="form-floating mb-3">
                                        <input className={inputClass}
                                            id="username"
                                            name="username"
                                            autoComplete="username"
                                            required=""
                                            placeholder="Ваш ник"
                                            type="text"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <label htmlFor="username">Ваш ник</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input className={inputClass}
                                               id="password"
                                               name="password"
                                               autoComplete="current-password"
                                               required=""
                                               placeholder="Пароль"
                                               type="password"
                                               value={formik.values.password}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        <label className="form-label" htmlFor="password">Пароль</label>
                                        {
                                            hasInputsError && (
                                                <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                                            )
                                        }
                                    </div>
                                    <button className="w-100 mb-3 btn btn-outline-primary"
                                            type="submit"
                                    >Войти</button>
                                </form>

                        </div>
                        <div className="card-footer p-4">
                            <div className="text-center"><span>Нет аккаунта?&ensp;</span>
                                <Link to="/signup">Регистрация</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Login;
