// src/components/EnhancedBookingsTable.js
import React, { useState } from 'react';

const EnhancedBookingsTable = ({ bookingData, onDeleteBooking }) => {
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('asc');

    if (!bookingData || bookingData.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                <p>No bookings yet. Make your first reservation!</p>
            </div>
        );
    }

    // Sort bookings
    const sortedBookings = [...bookingData].sort((a, b) => {
        if (sortField === 'date') {
            return sortDirection === 'asc'
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        }
        if (sortField === 'guests') {
            return sortDirection === 'asc' ? a.guests - b.guests : b.guests - a.guests;
        }
        return 0;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const SortArrow = ({ field }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Booking History ({bookingData.length} reservations)</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4ce14' }}>
                            <th
                                style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left', cursor: 'pointer' }}
                                onClick={() => handleSort('date')}
                            >
                                Date <SortArrow field="date" />
                            </th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                            <th
                                style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left', cursor: 'pointer' }}
                                onClick={() => handleSort('guests')}
                            >
                                Guests <SortArrow field="guests" />
                            </th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Occasion</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBookings.map((booking, index) => (
                            <tr key={booking.id || index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                    {new Date(booking.date).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.time}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.guests}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.occasion}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                    <span style={{
                                        color: 'green',
                                        fontWeight: 'bold',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: '#e8f5e8'
                                    }}>
                                        Confirmed
                                    </span>
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                    <button
                                        onClick={() => onDeleteBooking && onDeleteBooking(booking.id)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#ff6b6b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnhancedBookingsTable;