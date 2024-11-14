import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const About = () => {
  return (
    <section className="py-16 my-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {/* Card 1 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
              <img
                src="https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Unbiased Opinion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Unbiased Opinion</h2>
                <p>We provide honest and impartial reviews of various PG accommodations to help you make the best decision.</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Card 2 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>

          {/* Card 3 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>

          {/* Card 4 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>

          {/* Card 5 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Amenities Info"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Amenities Info</h2>
                <p>Discover the amenities provided by each PG, including Wi-Fi, meals, laundry, and more.</p>
              </div>
            </div>
          </SwiperSlide>
          {/* Card 6 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>

          {/* Card 7 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>

          {/* Card 8 */}
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-96">
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
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default About;
