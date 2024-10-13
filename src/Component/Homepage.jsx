import React, { useEffect, useState } from "react";

import breakfast from "../Images/breakfast.jpg";
import meal from "../Images/meal.jpg";
import dinner from "../Images/dinner.jpg";
import dessert from "../Images/dessert.jpg";
import recipe1 from "../Images/recipe1.jpg";
import recipe2 from "../Images/recipe2.jpg";
import recipe3 from "../Images/recipe3.jpg";
import recipe4 from "../Images/recipe4.jpg";
import recipe5 from "../Images/recipe5.jpg";
import recipe6 from "../Images/recipe6.jpg";

import axios from "axios";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavBar from "./NavBar";

function Homepage() {
  //function declaration for search bar
  const [searchTerm, setSearchTerm] = useState(""); // User input for search
  const [searchResults, setSearchResults] = useState([]); // Store search results
  // const [loading, setLoading] = useState(false); // Loading state
  const [isSearchRecipeModalOpen, setIsSearchRecipeModalOpen] = useState(false); // Control recipe modal
  const [SearchselectedMeal, setSearchSelectedMeal] = useState(null); // Store selected meal details

  //header meal breakfast dessert dinner
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  //function for sign up
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data
    console.log("Full Name:", fullName);
    console.log("Email:", email);

    // Optionally, add your logic for sending data to a backend or displaying a confirmation
    alert("Welcome to Flavor Haven, Explore delicious recipes");

    // Reset form after submission
    setFullName("");
    setEmail("");
  };

  //header meal breakfast dessert dinner
  // Fetch meals from a specific category
  const fetchMeals = (category) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`) // Dynamic category URL
      .then((response) => {
        setMeals(response.data.meals);
        setIsCategoryModalOpen(true);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} meals:`, error)
      )
      .finally(() => setLoading(false));
  };

  const fetchMealDetails = (idMeal) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => {
        setSelectedMeal(response.data.meals[0]);
        setIsRecipeModalOpen(true);
      })
      .catch((error) => console.error("Error fetching meal details:", error))
      .finally(() => setLoading(false));
  };

  const closeCategoryModal = () => setIsCategoryModalOpen(false);
  const closeRecipeModal = () => setIsRecipeModalOpen(false);

  //function code for search bar
  // Function to fetch recipe based on user input
  const searchRecipes = (term) => {
    if (term.trim() === "") return; // Don't search if the input is empty

    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => {
        if (response.data.meals) {
          setSearchResults(response.data.meals); // Store the results
          setIsSearchRecipeModalOpen(true); // Open the modal to display the results
        } else {
          setSearchResults([]); // Clear results if no match is found
        }
      })
      .catch((error) => console.error("Error fetching search results:", error))
      .finally(() => setLoading(false));
  };

  // Debounce function to delay the API call
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchRecipes(searchTerm);
      }
    }, 500); // Adjust the delay (500ms) as needed

    return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or new search term
  }, [searchTerm]);

  // Close recipe modal
  const closeSearchRecipeModal = () => setIsSearchRecipeModalOpen(false);

  return (
    <div>
      <div className="bg-gray-50">
        <NavBar />
        <p className="font-medium text-xl sm:text-2xl lg:text-3xl font-domine  sm:py-9 text-center bg-grey-50">
          Simple recipes made for real, actual, every day life
          
        </p>

        {/* Search bar */}
        <div className="flex items-center justify-center sm:pt-6">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <form>
              <input
                type="text"
                placeholder="Search for a recipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // capture user input
                className="w-full py-3 pl-12 pr-4 bg-white border border-gray-400 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#734060] transition duration-300 ease-in-out"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              </div>
            </form>
          </div>
        </div>

        {/* Recipe Modal for displaying search results */}
        {isSearchRecipeModalOpen && searchResults.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl p-4 sm:p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={closeSearchRecipeModal}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Search Results
              </h2>

              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((meal) => (
                      <div
                        key={meal.idMeal}
                        className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          setSearchSelectedMeal(meal); // Store selected meal details
                          closeSearchRecipeModal(); // Close the modal when a meal is clicked
                        }}
                      >
                        <h3 className="text-lg sm:text-xl font-semibold mb-5">
                          {meal.strMeal}
                        </h3>
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-2 rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Recipe Modal for displaying selected meal details */}
        {SearchselectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl p-4 sm:p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={() => setSearchSelectedMeal(null)} // Close the detailed modal
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                {SearchselectedMeal.strMeal}
              </h2>
              <img
                src={SearchselectedMeal.strMealThumb}
                alt={SearchselectedMeal.strMeal}
                className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded mb-4"
              />
              <p className="mt-4 text-sm sm:text-base">
                {SearchselectedMeal.strInstructions}
              </p>

              <ul className="mt-4 text-sm sm:text-base">
                <h3 className="font-bold">Ingredients:</h3>
                {Array.from({ length: 20 }, (_, index) => {
                  const ingredient =
                    SearchselectedMeal[`strIngredient${index + 1}`];
                  const measure = SearchselectedMeal[`strMeasure${index + 1}`];
                  return (
                    ingredient && (
                      <li key={index}>
                        {ingredient} - {measure}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {/* Responsive layout for recipe categories */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center space-y-6 lg:space-y-0 lg:space-x-6 px-4 sm:pt-16">
          {/* Breakfast Card */}
          <div className="w-full sm:w-64 md:w-72 text-center">
            <img
              src={breakfast}
              alt="breakfast"
              className="h-64 sm:h-72 lg:h-[500px] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
            />
            <div className="pt-4 sm:pt-8">
              <button
                className="text-lg sm:text-2xl font-semibold w-full sm:w-60 bg-gradient-to-r from-[#734060] to-[#a0527f] text-white py-2 sm:py-3 rounded-lg 
          shadow-lg hover:from-[#a0527f] hover:to-[#734060] hover:scale-105 transition-transform
          duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#734060]/50"
                onClick={() => fetchMeals("Breakfast")}
              >
                Breakfast
              </button>
            </div>
          </div>

          {/* Meal Card */}
          <div className="w-full sm:w-64 md:w-72 text-center">
            <img
              src={meal}
              alt="meal"
              className="h-64 sm:h-72 lg:h-[500px] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
            />
            <div className="pt-4 sm:pt-8">
              <button
                className="w-full sm:w-60 bg-gradient-to-r from-[#734060] to-[#a0527f] text-white py-2 sm:py-3 rounded-lg shadow-lg
          hover:from-[#a0527f] hover:to-[#734060] hover:scale-105 transition-transform duration-300 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-[#734060]/50 text-lg sm:text-2xl font-semibold"
                onClick={() => fetchMeals("Chicken")}
              >
                Meal
              </button>
            </div>
          </div>

          {/* Dinner Card */}
          <div className="w-full sm:w-64 md:w-72 text-center">
            <img
              src={dinner}
              alt="dinner"
              className="h-64 sm:h-72 lg:h-[500px] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
            />
            <div className="pt-4 sm:pt-8">
              <button
                className="w-full sm:w-60 bg-gradient-to-r from-[#734060] to-[#a0527f] text-white py-2 sm:py-3 rounded-lg shadow-lg hover:from-[#a0527f]
          hover:to-[#734060] hover:scale-105 transition-transform duration-300 ease-in-out 
          focus:outline-none focus:ring-4 focus:ring-[#734060]/50 text-lg sm:text-2xl font-semibold"
                onClick={() => fetchMeals("Pasta")}
              >
                Dinner
              </button>
            </div>
          </div>

          {/* Dessert Card */}
          <div className="w-full sm:w-64 md:w-72 text-center">
            <img
              src={dessert}
              alt="dessert"
              className="h-64 sm:h-72 lg:h-[500px] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
            />
            <div className="pt-4 sm:pt-8">
              <button
                className="w-full sm:w-60 bg-gradient-to-r from-[#734060] to-[#a0527f] text-white py-2 sm:py-3 rounded-lg shadow-lg hover:from-[#a0527f]
          hover:to-[#734060] hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none 
          focus:ring-4 focus:ring-[#734060]/50 text-lg sm:text-2xl font-semibold"
                onClick={() => fetchMeals("Dessert")}
              >
                Dessert
              </button>
            </div>
          </div>
        </div>

        {/* Category Modal for displaying meals */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl p-4 sm:p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={closeCategoryModal}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Selected Recipes
              </h2>

              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : meals && meals.length > 0 ? ( // Check if meals is not null and has items
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {meals.map((meal) => (
                      <div
                        key={meal.idMeal}
                        className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          fetchMealDetails(meal.idMeal);
                          closeCategoryModal();
                        }}
                      >
                        <h3 className="text-lg sm:text-xl font-semibold mb-5">
                          {meal.strMeal}
                        </h3>
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-2 rounded"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No meals found.</p> // Fallback message
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recipe Modal for displaying selected meal details */}
        {isRecipeModalOpen && selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={closeRecipeModal}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                {selectedMeal.strMeal}
              </h2>
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded mb-4"
              />
              <p className="mt-4 text-sm sm:text-base">
                {selectedMeal.strInstructions}
              </p>

              <ul className="mt-4 text-sm sm:text-base">
                <h3 className="font-bold">Ingredients:</h3>
                {Array.from({ length: 20 }, (_, index) => {
                  const ingredient = selectedMeal[`strIngredient${index + 1}`];
                  const measure = selectedMeal[`strMeasure${index + 1}`];
                  return (
                    ingredient && (
                      <li key={index}>
                        {ingredient} - {measure}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <div>
          <div>
            <p className="font-medium text-xl sm:text-2xl font-domine py-8 sm:py-12 text-center bg-grey-50">
              From our kitchen to yours every dish tells a story!
              
            </p>
          </div>

          {/* Recipe Images Section */}
          <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center space-y-6 lg:space-y-0 lg:space-x-6 px-4 sm:pt-16">
            {[recipe1, recipe2, recipe3, recipe4].map((recipe, index) => (
              <div key={index} className="w-64 md:w-72 text-center">
                <img
                  src={recipe}
                  alt={`recipe${index + 1}`}
                  className="h-80 md:h-[500px] w-full object-cover rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
                />
              </div>
            ))}
          </div>

          {/* Vegetarian Recipes Button */}
          <div className="flex items-center justify-center py-12 sm:py-16">
            <button
              className="font-semibold py-3 w-64 sm:w-96 bg-gradient-to-r from-[#734060] to-[#a0527f] text-white rounded-lg shadow-lg hover:from-[#a0527f] hover:to-[#734060] hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#734060]/50 text-lg sm:text-2xl"
              onClick={() => fetchMeals("Vegetarian")}
            >
              Vegetarian Recipes
            </button>
          </div>

          {/* "I Love Food" Section */}
          <div className="text-center py-10 bg-neutral-500 text-white">
            <h1 className="font-semibold text-2xl sm:text-3xl font-great-vibes text-amber-300 tracking-widest py-6">
              I Love Food
            </h1>
            <p className="text-sm sm:text-base font-semibold">
              In this space, I am always sharing fresh, flavorful, (mostly)
              healthy recipes...
              <br />
              <span className="hidden sm:block">
                My goal is to inspire you with food that is both approachable
                AND exciting...
              </span>
            </p>
          </div>

          {/* Introduction Section with Images */}
          <div className="flex flex-wrap justify-center gap-6 py-16 text-center">
            <div className="w-full md:w-1/3 h-[500px] bg-zinc-200 text-gray-500 font-semibold shadow-lg">
              <p className="text-2xl font-domine py-8 text-black">Hii !</p>
              <p className="font-great-vibes text-customPurple text-4xl tracking-widest">
                Nice to meet you
              </p>
              <p className="py-8">
                You're looking to impress guests or simply enjoy a comforting
                meal...
              </p>
            </div>
            {[recipe5, recipe6].map((recipe, index) => (
              <div key={index} className="w-64 md:w-96">
                <img
                  src={recipe}
                  alt={`recipe${index + 5}`}
                  className="h-[500px] w-full object-cover shadow-lg"
                />
              </div>
            ))}
          </div>

          {/* Pinch of Yum Cookbook Section */}
          <div className="text-center py-16">
            <div className="w-full max-w-2xl mx-auto bg-customPurple p-8 shadow-lg rounded-lg">
              <h3 className="font-semibold text-3xl font-great-vibes text-amber-300 tracking-widest py-6">
                Get It Now
              </h3>
              <p className="text-gray-100 text-2xl sm:text-3xl">
                Pinch of Yum Cookbook
              </p>
              <form className="mt-6 py-6" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Full Name Input */}
                  <div className="flex-1">
                    <label htmlFor="first-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      className="w-full bg-yellow-400 text-white font-bold text-lg sm:text-xl px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
