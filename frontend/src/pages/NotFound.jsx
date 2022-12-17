import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import notFound from '../assets/images/notFound.svg';

function NotFound() {
  return (
    <div className="text-center">
        <Image className="h-25" src={notFound} alt="Страница не найдена" fluid={true}/>
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти&ensp;
            <Link to="/">на главную страницу</Link>
        </p>
    </div>
  );
}

export default NotFound;
