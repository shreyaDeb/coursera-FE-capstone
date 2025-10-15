// src/components/BookingsTable.js
import React from 'react';

const BookingsTable = ({ bookingData }) => {
    if (!bookingData || bookingData.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>No bookings to display</p>
            </div>
        );
    }

    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Booking History</h3>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #ddd'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4ce14' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Guests</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Occasion</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.map((booking, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.date}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.time}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.guests}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.occasion}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <span style={{
                                    color: 'green',
                                    fontWeight: 'bold'
                                }}>
                                    Confirmed
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;