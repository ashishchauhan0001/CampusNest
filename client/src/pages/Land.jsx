import React, { useEffect } from "react";
import About from "../components/About.jsx";
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Link, useNavigate } from "react-router-dom";


SwiperCore.use([Navigation]);

// const navigate=useNavigate();

const images = [
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Land = () => {
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  useEffect(() => {
    localStorage.setItem("organization", "jiit");
  }, []);

  return (
    <>
      <div className="pageContainer" id="top">
        {/* Top section with text */}
        <div className="topSection">
          <div className="leftText">
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "3.5rem",
                marginBottom: "100px",
              }}
              className="bg-gradient-to-r from-blue-600 via-purple-700 to-pink-700 text-transparent bg-clip-text"
            >
              Find Your{" "}
              <span style={{ color: "#ef4444" }}>
                <Typewriter
                  words={["Campus Nest", "Dream PG", "Dream Flat"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              Here
            </h1>

            <p className="text-slate-600 items-start text-justify">
              We offer unbiased opinions, room selection, PG student details,
              and personalized scores to help you find the perfect home away
              from your home.We offer unbiased opinions, room selection, PG
              student details, and personalized scores to help you find the
              perfect home away from your home.We offer unbiased opinions, room
              selection, PG student details, and personalized scores to help you
              find the perfect home away from your home
            </p>
          </div>
          <div className="rightText">
            <iframe
              className="w-96 h-1/2 mx-auto block"
              src="https://lottie.host/embed/c39d66c5-c05c-4c34-a69a-33fed4dc28f9/xDp3VVSV6t.json"
            ></iframe>
          </div>
        </div>

        {/* Bottom section that has image also  */}
      </div>

      {/* Search By Map */}
      <div class="flex justify-center items-center mb-32">
        <Link to={'/map-search'}>
      <button  className="px-14 py-5 mt-16 text-xl bg-gradient-to-r from-slate-800 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-slate-800 hover:to-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out">
            Search By Map 📌
          </button>
          </Link>
      </div>

      {/* Road  Section */}
      <div className="road-container">
        <h1 className="text-5xl text-center  font-bold text-slate-600">
          Our Expansion{" "}
        </h1>
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
      <Swiper
        spaceBetween={30}
        navigation
        loop={true} // Allows continuous loop sliding
        className="mySwiper mt-32"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index}`}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="text-5xl text-center mt-32 font-bold text-slate-600">
        Why Choose Us?
      </h1>

      <About id="about" />
      <div className="text-center mb-16">
        <Link to={"/search"}>
          {" "}
          <button className="px-14 py-5 mt-16 text-xl bg-gradient-to-r from-slate-800 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-slate-800 hover:to-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out">
            Find Your Nest 🏠
          </button>{" "}
        </Link>
      </div>
    </>
  );
};

export default Land;
