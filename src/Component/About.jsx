import React, { useState } from 'react'
import aboutimg from "../Images/about.jpg"
import { useNavigate } from "react-router";


const About = () => {
const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data
    console.log("First Name:", firstName);
    console.log("Email:", email);

    // Optionally, add your logic for sending data to a backend or displaying a confirmation
    alert(
      `Thanks for signing up, ${firstName}! We'll send updates to ${email}.`
    );

    // Reset form after submission
    setFirstName("");
    setEmail("");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-domine text-customPurple sm:text-5xl lg:text-6xl">
            About Recipe Box
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Your one-stop solution for storing, organizing, and sharing your
            favorite recipes!
          </p>
        </div>

        {/* Main Content Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Story Section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold font-domine text-gray-800">
              Our Story
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Recipe Box was created with a passion for food and the desire to
              make cooking accessible for everyone. Our platform allows you to
              easily store, organize, and find your favorite recipes, whether
              they're passed down from generations or newly discovered
              creations. We believe in bringing families and friends together
              through the love of cooking and sharing.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold font-domine text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our mission is to simplify the way people approach cooking and
              meal planning. With Recipe Box, you can save time searching for
              recipes, avoid the clutter of recipe books, and enjoy a
              streamlined, user-friendly experience. Whether you're a home cook
              or a professional chef, Recipe Box helps you manage your recipes
              with ease and style.
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="mt-12 text-center">
          <img
            src={aboutimg} // Replace with your image path
            alt="Delicious recipes"
            className="mx-auto w-full max-w-2xl rounded-lg shadow-md"
          />
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold font-domine text-center text-customPurple">
            Why You'll Love Recipe Box
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-domine font-semibold text-gray-700">
                Easy to Use
              </h3>
              <p className="mt-4 text-gray-600">
                A simple, intuitive interface designed to help you find and
                organize your recipes quickly and efficiently.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-domine font-semibold text-gray-700">
                Save & Share
              </h3>
              <p className="mt-4 text-gray-600">
                Easily save your favorite recipes and share them with friends
                and family with just a few clicks.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-domine font-semibold text-gray-700">
                Customizable
              </h3>
              <p className="mt-4 text-gray-600">
                Tailor your recipe collections to suit your preferences with
                customizable categories and notes.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16">
          <div className="max-w-xl mx-auto  bg-customPurple p-8 shadow-lg rounded-lg ">
            <h3 className="text-2xl font-bold font-domine text-center text-white">
              Sign Up
            </h3>
            <p className="text-center text-gray-100 mt-2">
              Your Recipe Collection, Anytime, Anywhere – Get Started!
            </p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* First Name Input */}
                <div className="flex-1">
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                {/* Email Input */}
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white font-bold text-xl px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" flex justify-end items-end pt-16">
        <button
          className="text-white bg-customPurple border px-2 text-lg font-medium "
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default About;
