import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } // Added useNavigate
from 'react-router-dom';
import moment from 'moment';
import { Container, Row, Col, Image, Badge, Button, Card, ListGroup, Alert } from 'react-bootstrap'; // Added ListGroup, Alert
import { sampleEvents } from './sampleEventsData'; // Assuming you move sampleEvents to this path

// Helper function to format dates, especially for multi-day events
const formatDateRange = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  if (start.isSame(end, 'day')) {
    return start.format('MMMM Do YYYY, h:mm a');
  } else if (start.isSame(end, 'month')) {
    return `${start.format('MMMM Do')} - ${end.format('Do YYYY')}`;
  } else {
    return `${start.format('MMMM Do, YYYY')} - ${end.format('MMMM Do, YYYY')}`;
  }
};

// Helper function to get individual days if the event is multi-day
const getEventDays = (startDate, endDate) => {
    const days = [];
    let current = moment(startDate);
    const end = moment(endDate);
    while (current.isSameOrBefore(end, 'day')) {
        days.push(current.clone());
        current.add(1, 'day');
    }
    return days;
};


const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For back button

  useEffect(() => {
    // Simulate fetching event data
    const foundEvent = sampleEvents.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      setError('Event not found.');
    }
    setLoading(false);
  }, [eventId]);

  if (loading) {
    return (
      <Container className="py-5 text-center bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading event details...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center bg-black text-white min-vh-100">
        <Alert variant="danger" className="bg-gray-800 text-yellow-400 border-yellow-500">
          {error}
        </Alert>
        <Button variant="outline-warning" onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  if (!event) {
    return null; // Should be handled by error state
  }

  const isPastEvent = moment(event.endDate || event.date).isBefore(moment());
  const eventDays = event.endDate ? getEventDays(event.date, event.endDate) : [moment(event.date)];
  const isMultiDay = eventDays.length > 1;


  return (
    <div className="bg-black text-white min-vh-100 py-5" style={{marginTop: '60px'}}>
      <Container>
        <Button variant="outline-light" size="sm" onClick={() => navigate(-1)} className="mb-4 hover:bg-gray-700">
          &larr; Back to Events
        </Button>

        <Row className="g-4">
          {/* Left Column: Image and Basic Info */}
          <Col md={5} lg={4}>
            <Card className="bg-gray-900 border-gray-700 shadow-lg">
              <Card.Img 
                variant="top" 
                src={event.imageUrl || 'https://placehold.co/600x400/000000/333333?text=No+Image'} 
                alt={event.title}
                className="object-contain" // Tailwind class for object-fit: cover
                style={{maxHeight: '300px'}}
              />
              <Card.Body>
                <h1 className="text-3xl font-bold text-yellow-400 mb-3" style={{color: 'var(--theme-yellow)'}} >{event.title}</h1>
                <div className="mb-3">
                  {event.categories.map((category, index) => (
                    <Badge
                      key={index}
                      pill
                      className="me-1 mb-1 bg-gray-700 text-yellow-300 border border-yellow-500 px-3 py-1 text-xs"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-400 mb-2">
                  <i className="bi bi-calendar-event me-2 text-yellow-500"></i>
                  {formatDateRange(event.date, event.endDate || event.date)}
                </p>
                <p className="text-gray-400">
                  <i className="bi bi-geo-alt-fill me-2 text-yellow-500"></i>
                  {event.location}
                </p>
                 {isPastEvent && (
                    <Badge bg="secondary" className="mt-3 text-white">This event has passed</Badge>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Description, Tickets/Registration */}
          <Col md={7} lg={8}>
            <Card className="bg-gray-900 border-gray-700 shadow-lg p-4">
              <Card.Body>
                <h2 className="text-2xl font-semibold mb-3" style={{color: 'var(--theme-yellow-light)'}}>About the Event</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-5">{event.description}</p>

                {!isPastEvent && (
                  <>
                    {event.isTicketSale ? (
                      <section id="tickets">
                        <h2 className="text-2xl font-semibold mb-4" style={{color: 'var(--theme-yellow-light)'}}>Tickets</h2>
                        {event.ticketTiers && event.ticketTiers.length > 0 ? (
                          <ListGroup variant="flush">
                            {event.ticketTiers.map(tier => (
                              <ListGroup.Item key={tier.id} className="bg-gray-800 text-white border-gray-700 px-0 py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <h5 className="mb-1 text-yellow-400">{tier.name}</h5>
                                    <p className="mb-1 text-sm text-gray-400">{tier.benefits || ''}</p>
                                  </div>
                                  <div className="text-end">
                                    <p className="text-xl font-bold text-yellow-300 mb-0">
                                      {tier.currency} {tier.price.toFixed(2)}
                                      {tier.perDay && isMultiDay && " / day"}
                                    </p>
                                    {tier.perDay && tier.specificDate && (
                                        <p className="text-xs text-gray-500">For: {moment(tier.specificDate).format('MMM Do')}</p>
                                    )}
                                  </div>
                                </div>
                                <Button variant="warning" className="w-100 mt-2 text-black fw-bold hover:bg-yellow-500">
                                  Buy Ticket
                                </Button>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        ) : (
                          <p className="text-gray-400" >Ticket information will be available soon.</p>
                        )}
                      </section>
                    ) : (
                      <section id="registration">
                        <h2 className="text-2xl font-semibold mb-3" style={{color: 'var(--theme-yellow-light)'}}>Registration</h2>
                        <p className="text-gray-300 mb-3">
                          This is a free event or requires external registration. Please follow the link below.
                        </p>
                        <Button 
                          variant="warning" 
                          href={event.registrationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-black fw-bold hover:bg-yellow-500 text-lg px-5 py-2"
                          disabled={!event.registrationUrl}
                        >
                          {event.registrationUrl ? 'Register Now' : 'Registration Info Unavailable'}
                           <i className="bi bi-box-arrow-up-right ms-2"></i>
                        </Button>
                      </section>
                    )}
                  </>
                )}
                {isPastEvent && !event.isTicketSale && event.registrationUrl && (
                     <p className="text-gray-400 mt-4">
                        Registration for this past event was via: <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">{event.registrationUrl}</a>
                    </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* You might want to add a global style for bootstrap icons if not already present */}
        {/* <style jsx global>{`
          @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
          .whitespace-pre-line { white-space: pre-line; }
        `}</style> */}
      </Container>
    </div>
  );
};

export default EventDetailPage;