import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BackButton({ title, iconClassName }) {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate('/');
    }

    return (
        <>
            <button className='btn btn-link' onClick={handleGoBack}>
                {iconClassName && <i className={iconClassName}></i>}
                {title}
            </button>
        </>
    );

}