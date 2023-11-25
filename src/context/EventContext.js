import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { API_URL } from '../constants/api';
import axios from "axios";

const EventContext = createContext();

export function EventProvider({ children }) {

  const [eventsList, setEventsList] = useState([]);
  const DEFAULT_EVENT = { id: null, date: '', time: '', place: '', description: '' };
  const [currentEvent, setCurrentEvent] = useState(DEFAULT_EVENT);
  const navigate = useNavigate();
  const [shownEditForm, setShownEditForm] = useState(false);


  const addEvent = (event) => {
    setEventsList([...eventsList, event]);

  };


  const deleteEvent = (eventId) => {
    setEventsList(eventsList.filter(event => event.id !== eventId));
  };


  const handleInput = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };


  const submitForm = (eventData) => {
    const { id, date, time, place, description } = currentEvent;

    if (!currentEvent.id, !currentEvent.date || !currentEvent.time || !currentEvent.place || !currentEvent.description) {
      alert('Моля, попълнете всички полета.');
      return;
    }

    const url = id == null ? `${API_URL}/events` : `${API_URL}/events/${id}`;
    const axiosMethod = id == null ? axios.post : axios.put;

    axiosMethod(url, eventData)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleSubmitForm = () => {
    submitForm(currentEvent);
    setCurrentEvent({ date: '', time: '', place: '', description: '', id: null });
    setShownEditForm(true);
  };


  return (
    <EventContext.Provider value={{
      eventsList,
      setEventsList,
      currentEvent,
      setCurrentEvent,
      shownEditForm,
      setShownEditForm,
      navigate,
      addEvent,
      deleteEvent,
      handleInput,
      handleSubmitForm,
      submitForm,
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
}
