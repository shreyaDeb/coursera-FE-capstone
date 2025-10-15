// src/components/ConfirmedBooking.js
import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {
    return (
        <div style={{
            padding: '40px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <div style={{
                backgroundColor: '#f8fff8',
                border: '2px solid #4CAF50',
                borderRadius: '8px',
                padding: '30px'
            }}>
                <h1 style={{ color: '#4CAF50', marginBottom: '20px' }}>
                    ✅ Booking Confirmed!
                </h1>
                <p style={{ fontSize: '18px', marginBottom: '15px' }}>
                    Your reservation has been successfully submitted.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
                    Thank you for choosing Little Lemon Restaurant. We look forward to serving you!
                </p>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/">
                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: '#f4ce14',
                            color: '#333',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            Back to Home
                        </button>
                    </Link>

                    <Link to="/booking">
                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: 'transparent',
                            color: '#4CAF50',
                            border: '2px solid #4CAF50',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            Make Another Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedBooking;