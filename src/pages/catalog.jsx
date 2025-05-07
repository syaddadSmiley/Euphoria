import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import '../styles/catalog.module.css';
// Assuming you have a Header and Footer component
// import Header from './Header'; // Example path
// import Footer from './Footer'; // Example path

// Sample event data (replace with actual API call)
const sampleEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-11-15T10:00:00Z', // Note: Based on current date (May 6, 2025), this is a past event.
      location: 'Convention Center, New York',
      description: 'Join us for the biggest tech conference of the year. Explore new trends and network with industry leaders.',
      // imageUrl: 'https://via.placeholder.com/400x250/FFA07A/000000?Text=Tech+Conference',
      imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/04/website-use-scaled.png', // New URL
      categories: ['Technology', 'Business', 'Networking'],
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      date: '2025-07-20T15:00:00Z', // Upcoming
      location: 'Open Air Park, Chicago',
      description: 'Experience an unforgettable weekend with live music from top artists. Food, fun, and good vibes!',
      // imageUrl: 'https://via.placeholder.com/400x250/20B2AA/FFFFFF?Text=Music+Festival',
      imageUrl: 'https://www.anime-expo.org/wp-content/uploads/2025/03/AnimeExpo_Day1_LFDC-1938-620x350.jpg', // New URL
      categories: ['Music'],
    },
    {
      id: 3,
      title: 'Art Exhibition: Modern Masters',
      date: '2025-03-01T09:00:00Z', // Past event
      location: 'City Art Gallery',
      description: 'A curated collection of works from influential modern artists. A must-see for art enthusiasts.',
      // imageUrl: 'https://via.placeholder.com/400x250/778899/FFFFFF?Text=Art+Exhibition',
      imageUrl: 'https://source.unsplash.com/400x250/?art,gallery,exhibition,painting', // New URL
      categories: ['Arts & Culture'],
    },
    {
      id: 4,
      title: 'Startup Pitch Night',
      date: '2025-09-05T18:00:00Z', // Upcoming
      location: 'Innovation Hub, San Francisco',
      description: 'Watch aspiring entrepreneurs pitch their groundbreaking ideas to a panel of investors.',
      // imageUrl: 'https://via.placeholder.com/400x250/BA55D3/FFFFFF?Text=Startup+Pitch',
      imageUrl: 'https://www.anime-expo.org/wp-content/uploads/2024/12/Anime-Expo-2024-Hero-Shots-Kentia-Hall-13-620x350.jpg', // New URL
      categories: ['Business'],
    },
    {
      id: 5,
      title: 'Food & Wine Expo',
      date: '2024-10-26T12:00:00Z', // Past event
      location: 'Grand Ballroom, Las Vegas',
      description: 'Indulge in a culinary journey with exquisite food pairings and wine tasting sessions.',
      // imageUrl: 'https://via.placeholder.com/400x250/3CB371/FFFFFF?Text=Food+Expo',
      imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/04/website-use-scaled.png', // New URL
      categories: ['Food & Drink'],
    },
    {
      id: 6,
      title: 'Community Charity Run',
      date: '2025-06-08T07:00:00Z', // Upcoming
      location: 'Riverside Park',
      description: 'Run for a cause! Join our annual charity run to support local community projects.',
      // imageUrl: 'https://via.placeholder.com/400x250/FFD700/000000?Text=Charity+Run',
      imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2023/07/Nijigen072024_Profile_Website-1-1024x576.webp', // New URL
      categories: ['Community', 'Business', 'Networking'],
    },
    {
      id: 7,
      title: 'Future of AI Summit',
      date: '2025-12-01T09:30:00Z', // Upcoming
      location: 'Tech Park Auditorium',
      description: 'Explore the advancements and future implications of Artificial Intelligence with leading experts.',
      // imageUrl: 'https://via.placeholder.com/400x250/6495ED/FFFFFF?Text=AI+Summit',
      imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/01/NJG0225_Banner-1024x576.png', // New URL
      categories: ['Technology'],
    },
    {
      id: 8,
      title: 'Historical Society Lecture: Ancient Civilizations',
      date: '2025-04-10T14:00:00Z', // Past event
      location: 'Museum Lecture Hall',
      description: 'Delve into the mysteries of ancient civilizations with our guest historian.',
      // imageUrl: 'https://via.placeholder.com/400x250/DEB887/000000?Text=History+Lecture',
      imageUrl: '', // New URL
      categories: ['Education'],
    }
  ];
  
  // You can now use this updated 'sampleEvents' array in your Catalog.jsx component.

  const Catalog = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setEvents(sampleEvents);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch events. Please try again later.');
          setLoading(false);
          console.error(err);
        }
      };
  
      fetchEvents();
    }, []);
  
    const getEventStatus = (eventDate) => {
      const now = moment();
      const eventMoment = moment(eventDate);
      if (eventMoment.isBefore(now)) {
        return { text: 'Past Event', variant: 'secondary', signatureStyle: 'opacity-75 italic' };
      } else if (eventMoment.isAfter(now)) {
        return { text: 'Upcoming', variant: 'warning', signatureStyle: 'font-semibold' };
      } else {
        return { text: 'Happening Now', variant: 'warning', signatureStyle: 'font-bold animate-pulse' };
      }
    };
  
    const filteredEvents = events
      .filter(event => {
        if (filter === 'upcoming') {
          return moment(event.date).isAfter(moment());
        } else if (filter === 'past') {
          return moment(event.date).isBefore(moment());
        }
        return true;
      })
      .filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) // Updated search for categories
      )
      .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
  
    if (loading) {
      return (
        <Container className="py-5 text-center" style={{marginTop: '60px'}}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading events...</span>
          </div>
          <p className="mt-2 text-lg">Loading exciting events...</p>
        </Container>
      );
    }
  
    if (error) {
      return (
        <Container className="py-5" style={{marginTop: '60px'}}>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="text-warning mb-3">Oops! Something went wrong.</h2>
              <p className="text-lg">{error}</p>
              <img src="https://via.placeholder.com/300x200/000000/FFFF00?Text=Error+Loading" alt="Error" className="img-fluid my-4 rounded shadow" />
            </Col>
          </Row>
        </Container>
      );
    }
  
    return (
      <>
        <div className="bg-black text-white min-h-screen">
          <Container fluid  style={{marginTop: '60px'}} className="py-5 px-lg-5">
            <Row className="mb-5 justify-content-center text-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-3 tracking-tight text-yellow-400">Event Showcase</h1>
                <p className="lead text-gray-300">
                  Discover a world of experiences. Browse through our curated list of past, present, and future events.
                </p>
              </Col>
            </Row>
  
            <Row className="mb-4 sticky-top bg-black/80 backdrop-blur-md py-3 rounded-lg shadow-lg z-10 border have-to-yellow border-yellow-400" style={{borderColor: '#FFC107'}}>
              <Col md={6} className="mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control form-control-lg bg-gray-900 text-white border-yellow-400 placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Search events (title, description, category)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={6} className="d-flex justify-content-md-end align-items-center">
                <div className="btn-group shadow-sm" role="group" aria-label="Filter events">
                  <button
                    type="button"
                    className={`btn btn-lg ${filter === 'all' ? 'btn-warning active text-black' : 'btn-outline-warning text-yellow-400 hover:bg-gray-800'}`}
                    onClick={() => setFilter('all')}
                  >
                    All Events
                  </button>
                  <button
                    type="button"
                    className={`btn btn-lg ${filter === 'upcoming' ? 'btn-warning active text-black' : 'btn-outline-warning text-yellow-400 hover:bg-gray-800'}`}
                    onClick={() => setFilter('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    type="button"
                    className={`btn btn-lg ${filter === 'past' ? 'btn-warning active text-black' : 'btn-outline-warning text-yellow-400 hover:bg-gray-800'}`}
                    onClick={() => setFilter('past')}
                  >
                    Past Events
                  </button>
                </div>
              </Col>
            </Row>
  
            {filteredEvents.length === 0 ? (
              <Row className="justify-content-center text-center">
                <Col md={8}>
                  <div className="p-5 bg-gray-900 rounded-lg shadow-xl border border-yellow-400">
                    <h3 className="text-2xl font-semibold mb-3 text-yellow-400">No Events Found</h3>
                    <p className="text-gray-400">
                      It seems there are no events matching your current filter or search criteria. Try adjusting your search!
                    </p>
                    <img src="https://via.placeholder.com/300x200/000000/FFFF00?Text=No+Results" alt="No events found" className="img-fluid my-4 rounded opacity-75" />
                  </div>
                </Col>
              </Row>
            ) : (
              <Row xs={1} md={2} lg={3} xl={2} className="g-4">
                {filteredEvents.map((event) => {
                  const status = getEventStatus(event.date);
                  return (
                    <Col key={event.id} className="d-flex align-items-stretch">
                      <Card className={`h-100 shadow-lg border-0 bg-gray-900 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/20 ${status.signatureStyle} border border-gray-700 hover:border-yellow-400`}>
                        <div className="relative">
                          {/* <Card.Img variant="top" src={event.imageUrl} alt={event.title} className="rounded-t-md object-cover h-48 w-full" /> */}
                          <div className="aspect-video w-full bg-gray-800 rounded-t-md overflow-hidden">
                            {event.imageUrl ? (
                              <Card.Img 
                                variant="top" 
                                src={event.imageUrl} 
                                alt={event.title} 
                                className="object-cover h-full w-full" 
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <svg 
                                  className="w-full h-16 text-gray-600" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1} 
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <Badge
                            bg={status.variant}
                            className={`position-absolute top-0 end-0 m-2 p-2 text-xs font-bold shadow ${status.variant === 'secondary' ? 'text-white bg-gray-700' : 'text-black bg-yellow-400'}`}
                          >
                            {status.text}
                          </Badge>
                          {moment(event.date).isBefore(moment()) && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-md">
                              <span className="text-yellow-400 text-2xl font-bold uppercase tracking-wider opacity-90" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                                ARCHIVED
                              </span>
                            </div>
                          )}
                          {moment(event.date).isAfter(moment()) && !moment(event.date).isSame(moment(), 'day') && (
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold shadow-md">
                              Coming Soon!
                            </div>
                          )}
                          {moment(event.date).isSame(moment(), 'day') && (
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold shadow-md animate-pulse">
                              Happening Today!
                            </div>
                          )}
                        </div>
                        <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-xl font-bold mb-2 text-yellow-400">{event.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-sm text-gray-400">
                          <i className="bi bi-calendar-event me-2"></i>{moment(event.date).format('MMMM Do YYYY, h:mm a')}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-sm text-gray-400">
                          <i className="bi bi-geo-alt-fill me-2"></i>{event.location}
                        </Card.Subtitle>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          {event.categories.map((category, index) => (
                            <Badge 
                              key={index} 
                              pill 
                              className="px-3 py-1 text-xs bg-gray-800 text-yellow-400 border border-yellow-400"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <Card.Text className="text-gray-300 text-sm mb-4 flex-grow-1">
                          {event.description.substring(0, 100)}{event.description.length > 100 && '...'}
                        </Card.Text>
                        <a href={`/event/${event.id}`} className="btn btn-outline-warning mt-auto w-100 hover:bg-yellow-400 hover:text-black text-yellow-400 font-semibold py-2 rounded-md transition-colors">
                          Learn More
                          <i className="bi bi-arrow-right-short ms-1"></i>
                        </a>
                      </Card.Body>
                        <Card.Footer className="text-xs text-gray-500 border-t border-gray-700">
                          Event ID: {event.id}
                          <span className={`float-end ${status.signatureStyle} ${status.variant === 'warning' ? 'text-yellow-400' : 'text-gray-400'}`}>
                            Status: {status.text}
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
  
        <style jsx global>{`
          .btn-warning {
            background-color: #facc15; /* yellow-400 */
            border-color: #facc15;
            color: #000;
          }
          .btn-warning:hover, .btn-warning:focus, .btn-warning:active {
            background-color: #eab308; /* yellow-500 */
            border-color: #eab308;
            color: #000;
          }
          .btn-outline-warning {
            border-color: #facc15;
            color: #facc15;
          }
          .btn-outline-warning:hover {
            background-color: #facc15;
            color: #000;
          }
          .form-control-lg.bg-gray-900::placeholder {
            color: #9ca3af; /* gray-400 */
          }
          .form-control-lg.bg-gray-900:focus {
            background-color: #111827; /* gray-900 */
            color: white;
            border-color: #facc15;
            box-shadow: 0 0 0 0.25rem rgba(250, 204, 21, 0.25);
          }
          .text-yellow-400 {
            color: #facc15;
          }
          .bg-yellow-400 {
            background-color: #facc15;
          }
          .border-yellow-400 {
            border-color: #facc15 !important;
          }
          .border-yellow-400::after {
            border-color: #facc15;
          }
          .hover\:shadow-yellow-500\/20:hover {
            --tw-shadow-color: rgba(234, 179, 8, 0.2);
            --tw-shadow: var(--tw-shadow-colored);
          }
        `}</style>
      </>
    );
  };
  
  export default Catalog;