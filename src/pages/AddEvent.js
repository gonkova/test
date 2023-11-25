import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WithMainLayout from '../layout/WithMainLayout';
import { API_URL } from '../constants/api';
import EventForm from '../components/EventForm';
import { EventProvider, useEventContext } from '../context/EventContext';
import BackButton from '../components/BackButton';

function AddEvent() {
  const { currentEvent, setCurrentEvent, handleInput, handleSubmitForm } = useEventContext();

  useEffect(() => {
    setCurrentEvent({ date: '', time: '', place: '', description: '', id: null });
    return () => {
    };
  }, [setCurrentEvent]);

  return (
    <>
      <EventForm
        currentEvent={currentEvent}
        handleInput={handleInput}
        handleSubmitForm={handleSubmitForm}
      />
      <div className='row'>
        <BackButton
          iconClassName='fa-solid fa-backward'
          title='Обратно към събитията' />
      </div>
    </>
  );
}

export default WithMainLayout(AddEvent);
