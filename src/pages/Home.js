import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WithMainLayout from '../layout/WithMainLayout';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants/api';
import { EventProvider, useEventContext } from '../context/EventContext';

function Home() {
  const { eventsList, setEventsList, currentEvent, setCurrentEvent, shownEditForm, setShownEditForm, navigate } = useEventContext();

  useEffect(() => {
    loadEvents();
  }, []);

  function loadEvents() {
    axios.get(`${API_URL}/events?_sort=date&_order=asc`)
      .then(response => {
        const eventsData = response.data;

        if (eventsData && Array.isArray(eventsData)) {
          const sortedEvents = eventsData.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
          });
          setEventsList(sortedEvents);
        } else {
          console.error('Error: Events data is not present or not an array.');
        }

      })
      .catch(error => {
        console.error('Error:', error);
        alert('В момента имаме проблем, опитайте по-късно.');
      });
  }


  const handleDeleteEvent = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');

    if (confirmDelete) {
      axios.delete(`${API_URL}/events/${eventId}`)
        .then(() => {
          alert('Event deleted successfully.');
          loadEvents();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to delete the event. Please try again.');
        });
    }
  }


  function edit(event, shownditForm) {
    setCurrentEvent(event);
    setShownEditForm(true);
    navigate('./editevent/:id');
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-12 col-sm-12'>
          <Link to='/addevent' className='btn btn-primary mb-3'>
            Добави събитие
          </Link>

          <ul className='list-group'>
            {eventsList.map(event => (
              <li className='list-group-item d-flex justify-content-between align-items-center padding-5' key={event.id}>
                <div>
                  <Link to={`/events/${event.id}`}>
                    {event.date} {event.time} {event.place} {event.description}
                  </Link>
                </div>
                <div className='btn-group'>
                  <button className='btn btn-warning ' onClick={() => edit(event)}>
                    <i className='fa fa-pencil text-white'></i>
                    <span className="d-none d-md-inline text-white">Редактиране</span>
                  </button>
                  <button className='btn btn-danger ms-3' onClick={() => handleDeleteEvent(event.id)}>
                    <i className="fa-regular fa-trash-can"></i>
                    <span className="d-none d-md-inline text-white">Изтриване</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WithMainLayout(Home);

