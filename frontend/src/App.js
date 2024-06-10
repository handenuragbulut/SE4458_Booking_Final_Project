import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [people, setPeople] = useState(1);

  const searchHotels = async () => {
    const response = await axios.get(`http://localhost:3000/hotels/search`, {
      params: { destination, startDate, endDate, people }
    });
    setHotels(response.data);
  };

  return (
    <div>
      <h1>Hotel Booking System</h1>
      <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
      <button onClick={searchHotels}>Search Hotels</button>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel._id}>{hotel.roomNumber} - {hotel.capacity}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
