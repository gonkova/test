import React, { useState, useEffect } from 'react';
import WithMainLayout from '../layout/WithMainLayout';
import EventForm from '../components/EventForm';
import { EventProvider, useEventContext } from '../context/EventContext';
import BackButton from '../components/BackButton';

function EditEvent() {
  const { currentEvent, setCurrentEvent, handleInput, handleSubmitForm, shownEditForm, setShownEditForm } = useEventContext();

  useEffect(() => {
    return () => {
      setCurrentEvent({ id: null, date: '', time: '', place: '', description: '' });
      setShownEditForm(false);
    };
  }, [setCurrentEvent, setShownEditForm]);

  return (
    <>
      {shownEditForm ? <>
        <EventForm
          currentEvent={currentEvent}
          handleInput={handleInput}
          handleSubmitForm={handleSubmitForm}
          shownEditForm={shownEditForm}
        />
        <div className="row">
          <BackButton
            iconClassName='fa-solid fa-backward'
            title='Обратно към събитията' />
        </div>
      </> : <div className='row mt-3'>
        <BackButton
          iconClassName='fa fa-pencil'
          title='Изберете събитие за реакция' />
      </div>
      }

    </>
  );
}

export default WithMainLayout(EditEvent);