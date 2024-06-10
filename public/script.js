document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const people = document.getElementById('people').value;

    const response = await fetch(`http://localhost:3000/hotels/search?destination=${destination}&startDate=${startDate}&endDate=${endDate}&people=${people}`);
    const hotels = await response.json();

    const hotelList = document.getElementById('hotelList');
    hotelList.innerHTML = '';

    hotels.forEach(hotel => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${hotel.roomNumber}</h3>
            <p>Capacity: ${hotel.capacity}</p>
            <button onclick="bookHotel('${hotel._id}')">Book</button>
        `;
        hotelList.appendChild(listItem);
    });
});

async function bookHotel(roomId) {
    const userId = 'user123'; // This should be dynamically set
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            roomId,
            startDate,
            endDate
        })
    });

    if (response.ok) {
        alert('Booking successful!');
    } else {
        alert('Booking failed!');
    }
}
