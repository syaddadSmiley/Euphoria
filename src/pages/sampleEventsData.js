// Updated sampleEventsData.js (or wherever you keep this)
import moment from 'moment';

export const sampleEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024', // Keeping original title/year if specific
    date: '2024-11-15T10:00:00Z',
    endDate: '2024-11-17T18:00:00Z', // Assuming 3-day event
    location: 'Convention Center, New York',
    description: 'Join us for the biggest tech conference of the year. Explore new trends and network with industry leaders. This multi-day event will feature keynote speakers, workshops, and networking sessions.',
    imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/04/website-use-scaled.png',
    categories: ['Technology', 'Business', 'Networking', 'Innovation'], // Added Innovation
    isTicketSale: true,
    ticketTiers: [
      { id: 't1_1', name: 'Early Bird - Full Pass', price: 299, currency: 'USD', perDay: false, benefits: 'Access to all 3 days, all sessions, networking events.' },
      { id: 't1_2', name: 'Standard - Full Pass', price: 399, currency: 'USD', perDay: false, benefits: 'Access to all 3 days, all sessions, networking events.' },
      { id: 't1_3', name: 'One Day Pass - Nov 15', price: 150, currency: 'USD', perDay: true, specificDate: '2024-11-15' },
      { id: 't1_4', name: 'One Day Pass - Nov 16', price: 150, currency: 'USD', perDay: true, specificDate: '2024-11-16' },
      { id: 't1_5', name: 'One Day Pass - Nov 17', price: 150, currency: 'USD', perDay: true, specificDate: '2024-11-17' },
    ],
    registrationUrl: '',
  },
  {
    id: 2,
    title: 'Summer Music Festival',
    date: '2025-07-20T15:00:00Z',
    endDate: '2025-07-20T23:00:00Z', // Single day event
    location: 'Open Air Park, Chicago',
    description: 'Experience an unforgettable weekend with live music from top artists. Food, fun, and good vibes!',
    imageUrl: 'https://www.anime-expo.org/wp-content/uploads/2025/03/AnimeExpo_Day1_LFDC-1938-620x350.jpg',
    categories: ['Music', 'Festival', 'Outdoor'], // Added Outdoor
    isTicketSale: true,
    ticketTiers: [
      { id: 't2_1', name: 'General Admission', price: 75, currency: 'USD', perDay: false, benefits: 'Entry to the festival grounds.' },
      { id: 't2_2', name: 'VIP Pass', price: 150, currency: 'USD', perDay: false, benefits: 'VIP area access, dedicated bar, premium restrooms.' },
    ],
    registrationUrl: '',
  },
  {
    id: 3,
    title: 'Art Exhibition: Modern Masters',
    date: '2025-03-01T09:00:00Z', // This was a past event in your original list, let's keep it for now, or make it future if you prefer for testing registration
    endDate: '2025-03-31T17:00:00Z', // Assuming it runs for a month
    location: 'City Art Gallery',
    description: 'A curated collection of works from influential modern artists. A must-see for art enthusiasts. Free entry, but registration is recommended.',
    imageUrl: 'https://source.unsplash.com/400x250/?art,gallery,exhibition,painting',
    categories: ['Arts & Culture', 'Exhibition'], // Added Exhibition
    isTicketSale: false,
    ticketTiers: [],
    registrationUrl: 'https://example.com/art-exhibition-registration',
  },
  {
    id: 4,
    title: 'Startup Pitch Night',
    date: '2025-09-05T18:00:00Z',
    endDate: '2025-09-05T22:00:00Z', // Single evening
    location: 'Innovation Hub, San Francisco',
    description: 'Watch aspiring entrepreneurs pitch their groundbreaking ideas to a panel of investors. Limited seats available, register to secure your spot!',
    imageUrl: 'https://www.anime-expo.org/wp-content/uploads/2024/12/Anime-Expo-2024-Hero-Shots-Kentia-Hall-13-620x350.jpg',
    categories: ['Business', 'Startups', 'Networking'], // Added Startups
    isTicketSale: false,
    ticketTiers: [],
    registrationUrl: 'https://example.com/startup-pitch-night-signup',
  },
  {
    id: 5,
    title: 'Food & Wine Expo',
    date: '2024-10-26T12:00:00Z', // Past event
    endDate: '2024-10-27T20:00:00Z', // Assuming 2-day event
    location: 'Grand Ballroom, Las Vegas',
    description: 'Indulge in a culinary journey with exquisite food pairings and wine tasting sessions.',
    imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/04/website-use-scaled.png', // Reused image, you can change
    categories: ['Food & Drink', 'Expo'], // Added Expo
    isTicketSale: true,
    ticketTiers: [
        { id: 't5_1', name: 'General Admission - 2024', price: 60, currency: 'USD', perDay: false, benefits: 'Access to both days.' },
        { id: 't5_2', name: 'Day 1 Pass - 2024', price: 35, currency: 'USD', perDay: true, specificDate: '2024-10-26'},
        { id: 't5_3', name: 'Day 2 Pass - 2024', price: 35, currency: 'USD', perDay: true, specificDate: '2024-10-27'},
    ],
    registrationUrl: '',
  },
  {
    id: 6,
    title: 'Community Charity Run',
    date: '2025-06-08T07:00:00Z', // Upcoming
    endDate: '2025-06-08T12:00:00Z', // Assuming it ends midday
    location: 'Riverside Park',
    description: 'Run for a cause! Join our annual charity run to support local community projects. All proceeds go to local charities.',
    imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2023/07/Nijigen072024_Profile_Website-1-1024x576.webp',
    categories: ['Community', 'Charity', 'Sports', 'Business', 'Networking'], // Added Charity, Sports
    isTicketSale: false, // Often charity runs are registration based, sometimes with donation tiers
    ticketTiers: [],
    registrationUrl: 'https://example.com/charity-run-register', // Example registration URL
  },
  {
    id: 7,
    title: 'Future of AI Summit',
    date: '2025-12-01T09:30:00Z', // Upcoming
    endDate: '2025-12-02T17:00:00Z', // Assuming 2-day summit
    location: 'Tech Park Auditorium',
    description: 'Explore the advancements and future implications of Artificial Intelligence with leading experts. Engage in discussions, workshops, and network with pioneers in the AI field.',
    imageUrl: 'https://nijigenexpo.com/wp-content/uploads/2025/01/NJG0225_Banner-1024x576.png',
    categories: ['Technology', 'AI', 'Innovation', 'Future Tech'], // Added AI, Future Tech
    isTicketSale: true,
    ticketTiers: [
      { id: 't7_1', name: 'Full Summit Pass', price: 499, currency: 'USD', perDay: false, benefits: 'Access to all sessions, workshops, and networking events across both days.' },
      { id: 't7_2', name: 'Day 1 Pass - Dec 1', price: 275, currency: 'USD', perDay: true, specificDate: '2025-12-01' },
      { id: 't7_3', name: 'Day 2 Pass - Dec 2', price: 275, currency: 'USD', perDay: true, specificDate: '2025-12-02' },
      { id: 't7_4', name: 'Academic Pass', price: 249, currency: 'USD', perDay: false, benefits: 'Full access for students and faculty. Valid ID required.' },
    ],
    registrationUrl: '',
  },
  {
    id: 8,
    title: 'Historical Society Lecture: Ancient Civilizations',
    date: '2025-04-10T14:00:00Z', // This was a past event, or make it future for testing
    endDate: '2025-04-10T16:00:00Z', // Assuming a 2-hour lecture
    location: 'Museum Lecture Hall',
    description: 'Delve into the mysteries of ancient civilizations with our guest historian. This engaging lecture will cover recent discoveries and ongoing research.',
    imageUrl: '', // You had this as empty, will use placeholder in component
    categories: ['Education', 'History', 'Lecture'], // Added Lecture
    isTicketSale: false, // Assuming lectures might be free or by donation
    ticketTiers: [],
    registrationUrl: 'https://example.com/history-lecture-rsvp', // RSVP link
  }
];