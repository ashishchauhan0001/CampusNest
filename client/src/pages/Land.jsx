import React, { useEffect } from 'react';
import Map from '../components/Map';
import About from '../components/About';
import SearchBar from '../components/SearchBar';


const Land = () => {
    const cities = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Chennai',
        'Hyderabad',
        'Pune',
        'Kolkata',
        'Ahmedabad'
    ];

    useEffect(() => {
        localStorage.setItem('organization', 'jiit');
    }, [])
    

    return (
        <>

            <div className="pageContainer" id="top">
                {/* Top section with text */}
                <div className="topSection">
                    <div className="leftText">
                        <h1 style={{ fontWeight: 'bold', fontSize: '3.5rem' }}>Campus Nest</h1>


                        <p>We offer unbiased opinions, room selection, PG student details, and personalized scores to help you find the perfect home away from your home.</p>
                    </div>
                    <div className="rightText">
                        <p className="animatedText text1">Best Price!!</p>
                        <p className="animatedText text2">Zero Brokerage!!</p>
                        <p className="animatedText text3">Preffered Room Partner!!</p>
                    </div>
                </div>

                {/* Bottom section that has image also  */}
                <div className="bottomSection" >
                    <div className='bottomSearch'>
                        <SearchBar />
                    </div>

                </div>
            </div>


            {/* Road  Section */}
            <div className="road-container">
                <h1 className="page-title">Our Expansion Journey</h1>
                <div className="road">
                    {cities.map((city, index) => (
                        <div key={index} className="city">
                            <div className="city-circle">{index + 1}</div>
                            <p>{city}</p>
                            {index !== cities.length - 1 && <div className="road-line"></div>}
                        </div>
                    ))}
                </div>
            </div>
            <Map />

            <About id='about' />
        </>

    );
};

export default Land;
