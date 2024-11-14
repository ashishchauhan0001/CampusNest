import React from 'react';

const About = () => {
  return (
    <section className="py-16 my-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img 
              src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Unbiased Opinion" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Unbiased Opinion</h2>
              <p>We provide honest and impartial reviews of various PG accommodations to help you make the best decision.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img 
              src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Choose Roommate" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Choose Roommate</h2>
              <p>Select compatible roommates based on your preferences to ensure a harmonious living environment.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img 
              src="https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="PG Student Details" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">PG Student Details</h2>
              <p>Get detailed information about other PG students to understand the environment and community.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img 
              src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Suitability Score" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Suitability Score</h2>
              <p>Our system evaluates your preferences and provides a score to determine if a PG is a good fit for you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
