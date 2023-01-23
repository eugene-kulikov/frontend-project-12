import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import notFound from '../assets/images/notFound.svg';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
        <Image className="h-25" src={notFound} alt={t('page.notFound.title')} fluid={true}/>
        <h1 className="h4 text-muted">{t('page.notFound.title')}</h1>
        <p className="text-muted">{t('page.notFound.text')}&ensp;
            <Link to="/">{t('page.notFound.link')}</Link>
        </p>
    </div>
  );
}

export default NotFound;
