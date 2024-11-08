
import React from 'react';


const About = ({ id }) => {
    return (
        <section id={id}>
            <div className="about-section">
                <h1 className="page-title">Why Choose Us?</h1>
                <div className="features-grid">
                    <div className="feature-box">
                        <h2>Unbiased Opinion</h2>
                        <p>We provide honest and impartial reviews of various PG accommodations to help you make the best decision.</p>
                    </div>
                    <div className="feature-box">
                        <h2>Choose Roommate</h2>
                        <p>Select compatible roommates based on your preferences and interests to ensure a harmonious living environment.</p>
                    </div>
                    <div className="feature-box">
                        <h2>PG Student Details</h2>
                        <p>Get detailed information about other PG students to better understand the environment and community.</p>
                    </div>
                    <div className="feature-box">
                        <h2>Suitability Score</h2>
                        <p>Our system evaluates your preferences and provides a score to help you determine whether a PG accommodation is a good fit for you.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
