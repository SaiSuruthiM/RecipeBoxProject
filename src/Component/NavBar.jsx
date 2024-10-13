import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function NavBar() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (fullName && email) {
      const signUp = {
        name: fullName,
        email: email,
      };

      alert(
        `Sign-up successful! ${fullName}, we will send new recipes to your ${email}`
      );

      setFullName([...fullName, signUp]);
      setIsModalOpen(false);
      setFullName("");
      setEmail("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    alert("Welcome to Flavor Haven, Explore delicious recipes");

    setFullName("");
    setEmail("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50">
      {/* Sign Up Banner */}
      <div className="bg-customPurple text-zinc-300 p-4 tracking-widest font-bold font-domine text-center">
        <p>
          OUR RECIPES, YOUR INBOX.{" "}
          <button onClick={openModal}>
            <span className="text-white">SIGN UP</span>
          </button>
        </p>
      </div>

      {/* Navbar */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-domine font-semibold text-3xl sm:text-4xl lg:text-5xl text-customPurple">
              Recipe Box
            </h1>
          </div>

          {/* Navigation Links - Visible on all screen sizes */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <p className="text-sm md:text-lg font-semibold cursor-pointer">
              HOME
            </p>
            <p
              className="text-sm md:text-lg font-semibold cursor-pointer"
              onClick={() => navigate("/about")}
            >
              ABOUT
            </p>
            <p
              className="text-sm md:text-lg font-semibold cursor-pointer"
              onClick={() => navigate("/recipes")}
            >
              RECIPES
            </p>

            <p
              className="text-sm md:text-lg font-semibold cursor-pointer"
              onClick={() => navigate("/StartHerePage")}
            >
              START HERE
            </p>

            <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                  placeholder="Enter your Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                  placeholder="Enter your Email Address"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-green-600 text-white hover:bg-green-700 rounded-md p-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
