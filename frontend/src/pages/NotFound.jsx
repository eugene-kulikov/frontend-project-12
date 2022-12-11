import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/notFound.svg';

function NotFound() {
  return (
    <div className="text-center">
        <img src={notFound} alt="Страница не найдена" className="img-fluid h-25"/>
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти&ensp;
            <Link to="/">на главную страницу</Link>
        </p>
    </div>
  );
}

export default NotFound;
