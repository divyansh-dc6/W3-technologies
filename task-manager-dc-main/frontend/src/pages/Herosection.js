import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-black to-purple-900 h-screen flex flex-col items-center justify-center text-white px-6 overflow-hidden">
      {/* Text Section */}
      <div className="max-w-4xl text-center mb-8">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Task Management <span className="text-teal-400">Made Easy</span>
        </h1>
        {/* Subheading / Quote */}
        <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 animate__animated animate__fadeIn animate__delay-2s">
          "Productivity is never an accident. It’s the result of commitment to
          excellence, smart planning, and focused effort."
        </p>
        {/* Get Started Button */}
        <button className="bg-teal-500 text-gray-900 font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-teal-400 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
          <Link to="/register">Get Started</Link>{" "}
          {/* Register page ke liye button */}
        </button>
      </div>

      {/* Three Feature Boxes */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1: Track Your Tasks */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-4s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Track Your Tasks
          </h3>
          <p className="text-gray-400">
            Stay on top of your daily tasks with intuitive task management.
          </p>
        </div>
        {/* Feature 2: Collaborate Easily */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-5s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Collaborate Easily
          </h3>
          <p className="text-gray-400">
            Team up, share ideas, and get work done faster together.
          </p>
        </div>
        {/* Feature 3: Achieve Goals */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-6s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Achieve Goals
          </h3>
          <p className="text-gray-400">
            Set goals, track progress, and accomplish more in less time.
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
