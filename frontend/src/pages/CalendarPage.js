import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { userdata } from "./Home/Signpage";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    link: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = userdata;
        if (!user || !user.id) {
          console.error("User ID is missing");
          return;
        }

        const response = await axios.post("https://navsarjan-2.onrender.comapi/fetch", {
          collectionName: "events",
          condition: { Participants: user.id },
        });

        const formattedEvents = response.data.data.map((event) => ({
          title: event.Title,
          start: new Date(event.Start),
          end: new Date(event.End),
          description: event.Description,
          link: event.Link || "",
          organizerID: event.OrganizerID,
          participants: event.Participants || [],
          _id: event._id,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Title, start date, and end date are required.");
      return;
    }

    try {
      const user = userdata;
      if (!user || !user.id) {
        console.error("User ID is missing");
        return;
      }

      const eventToSave = {
        Title: newEvent.title,
        Description: newEvent.description,
        Start: newEvent.start,
        End: newEvent.end,
        Link: newEvent.link,
        OrganizerID: user.id,
        Participants: [user.id],
      };

      await axios.post("https://navsarjan-2.onrender.comapi/insert", {
        collectionName: "events",
        data: eventToSave,
      });

      const formattedEvent = {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        description: newEvent.description,
        link: newEvent.link,
        organizerID: user.id,
        participants: [user.id],
      };

      setEvents((prevEvents) => [...prevEvents, formattedEvent]);
      setShowAddEventModal(false);
      setNewEvent({
        title: "",
        description: "",
        start: "",
        end: "",
        link: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("There was an error adding the event.");
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Welcome, {userdata?.name || "User"}!</h1>
        <Button
          className="add-event-button"
          variant="primary"
          onClick={() => setShowAddEventModal(true)}
        >
          Add Event
        </Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", margin: "20px" }}
        defaultView="month"
        views={["month", "week", "day"]}
        onSelectEvent={handleEventSelect}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "lightblue",
            borderRadius: "5px",
            color: "black",
            border: "1px solid blue",
          },
        })}
      />

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedEvent.title}</h4>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format("LLLL")}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format("LLLL")}</p>
            <p><strong>Link:</strong> <a href={selectedEvent.link}>{selectedEvent.link}</a></p>
            <p><strong>Participants:</strong> {selectedEvent.participants.join(", ")}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Add Event Modal */}
      <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventStart">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventEnd">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.link}
                onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddEventModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarPage;
