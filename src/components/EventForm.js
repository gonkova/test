import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';

export default function EventForm() {
  const { handleInput, submitForm, currentEvent, setCurrentEvent } = useEventContext();
  const maxWords = 35;

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-12  col-sm-12'>
          <h5 className='text-primary'>{currentEvent.id === null ? 'Форма за добавяне на събитие' : 'Форма за реактиране на събитие'}</h5>
          <input
            type='date'
            name='date'
            placeholder='date'
            className='form-control mb-3'
            onChange={e => handleInput(e, currentEvent.date)}
            value={currentEvent.date}
          />
          <input
            type='time'
            name='time'
            placeholder='time'
            className='form-control mb-3'
            onChange={e => handleInput(e, currentEvent.time)}
            value={currentEvent.time}
          />
          <input
            type='text'
            name='place'
            placeholder='Локация'
            className='form-control mb-3'
            onChange={e => handleInput(e, currentEvent.place)}
            value={currentEvent.place}
            maxLength={maxWords}
          />
          <textarea
            type='text'
            name='description'
            placeholder='Описание'
            className='form-control mb-3'
            onChange={e => handleInput(e, currentEvent.description)}
            value={currentEvent.description}
            maxLength={maxWords}
          />
          <button
            className='btn btn-primary'
            onClick={() => submitForm(currentEvent)}
          >
            {currentEvent.id === null ? 'Добави' : 'Обнови'}
          </button>
        </div>
      </div>
    </div>
  );
}
