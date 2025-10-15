// Testimonies.jsx
import { useRef, useEffect, useState } from 'react';
import TestimonialCard from './testomonyCard';
import '../styles.css';

const Testimonies = () => {
    const testimonials = [
        {
            name: "Jane Doe",
            rating: 4,
            text: "The ambiance is perfect for a date. Had a wonderful time. The staff was very friendly, would recommend! A fine dining experience!",
            avatar: "👩"
        },
        {
            name: "John Doe",
            rating: 5,
            text: "Would recommend 100%. Amazing food and that too at a reasonable price!",
            avatar: "👨"
        },
        {
            name: "Alice Smith",
            rating: 5,
            text: "Food was absolutely delicious! Cozy atmosphere and friendly staff. Highly recommend Little Lemon.",
            avatar: "👩‍🦰"
        },
        {
            name: "Bob Johnson",
            rating: 4,
            text: "Had a wonderful evening. The service was prompt and the food was tasty. Great value!",
            avatar: "👨‍🦱"
        },
        {
            name: "Charlie Brown",
            rating: 5,
            text: "Exceptional service and mouth-watering dishes. Will definitely come back!",
            avatar: "👦"
        },
        {
            name: "Diana Prince",
            rating: 4,
            text: "Lovely atmosphere and delicious food. The dessert was particularly amazing!",
            avatar: "👸"
        }
    ];

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const container = scrollRef.current;
        const total = testimonials.length;

        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % total;
            setCurrentIndex(nextIndex);
            const cardWidth = container.firstChild.offsetWidth + 16; // includes gap
            container.scrollTo({
                left: nextIndex * cardWidth,
                behavior: 'smooth'
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, testimonials.length]);

    return (
        <section className="testimonies-section">
            <div className="testimonies-container">
                <h2 className="testimonies-title">What People Say</h2>
                <div className="testimonies-scroll-wrapper">
                    <div className="testimonies-grid" ref={scrollRef}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                    <div className="scroll-gradient left"></div>
                    <div className="scroll-gradient right"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonies;