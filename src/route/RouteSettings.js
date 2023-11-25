import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddEvent from "../pages/AddEvent";
import EditEvent from "../pages/EditEvent";
import EventDetails from "../pages/EventDetails";
import { EventProvider } from "../context/EventContext";

export default function RouteSettings() {

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = 'Сигурни ли сте, че искате да напуснете страницата?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  return (
    <BrowserRouter>
      <EventProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/editevent" element={<EditEvent />} />
          <Route path="/editevent/:id" element={<EditEvent />} />
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </EventProvider>
    </BrowserRouter>
  );
}
