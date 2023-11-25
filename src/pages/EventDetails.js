import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';

import axios from 'axios';
import { API_URL } from '../constants/api';
import WithMainLayout from '../layout/WithMainLayout';
import BackButton from '../components/BackButton';
import { EventProvider, useEventContext } from '../context/EventContext';

function EventDetails() {
    const { currentEvent, setCurrentEvent } = useEventContext();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`${API_URL}/events/${id}`)
                .then(response => {
                    setCurrentEvent(response.data);
                })
                .catch(error => {
                    console.error('Error details:', error);
                });
        }
        setCurrentEvent('');
    }, [id]);

    if (!currentEvent.id || !currentEvent.date || !currentEvent.time || !currentEvent.place || !currentEvent.description) {
        return (
            <div className='row ms-3 mt-3'>
                <BackButton
                    iconClassName='fa-solid fa-check'
                    title='Изберете събитие'
                />
            </div>
        );
    }

    return (
        <>
            <div className='col-12'>
                <div className='row ms-5 mt-3' >
                    <h5 className='text-primary'>{currentEvent.description}</h5>
                    <p>
                        <img src='/images/image-4.png' style={{ width: '50px', height: 'auto' }} alt="" />
                        Дата: {currentEvent.date}
                    </p>
                    <p>
                        <img src='/images/image-3.png' style={{ width: '50px', height: 'auto' }} alt="" />
                        Час: {currentEvent.time}
                    </p>
                    <p>
                        <img src='/images/image-2.gif' style={{ width: '50px', height: 'auto' }} alt="" />
                        Локация: {currentEvent.place}
                    </p>
                </div>
                <div className='row'>
                    <BackButton
                        iconClassName='fa-solid fa-backward'
                        title='Обратно към събитията'
                    />
                </div>
            </div>
        </>
    );
}

export default WithMainLayout(EventDetails);
