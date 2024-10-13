import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import recipe7 from "../Images/recipe7.jpg";
import { HeartIcon } from "@heroicons/react/24/outline";
import healthy1 from "../Images/healthy1.jpg";
import healthy2 from "../Images/healthy2.jpg";
import healthy3 from "../Images/healthy3.jpg";
import healthy4 from "../Images/healthy4.jpg";
import meal1 from "../Images/meal1.png";
import meal2 from "../Images/meal2.jpg";
import meal3 from "../Images/meal3.png";
import meal4 from "../Images/meal4.png";
import mealHead from "../Images/mealHead.png";
import axios from "axios";
import { useNavigate } from "react-router";
function StartHerePage() {
  const navigate = useNavigate();
  //declaration for sea food
  const [searchSeafoodResults, setSearchSeafoodResults] = useState([]); // Store search results
  // const [loading, setLoading] = useState(false); // Loading state
  const [isSeafoodRecipeModalOpen, setIsSeafoodRecipeModalOpen] =
    useState(false); // Control recipe modal
  const [SeafoodselectedMeal, setSeafoodSelectedMeal] = useState(null); // Store selected meal details
  const [SeafoodmealDetails, setSeafoodMealDetails] = useState(null); // Store detailed meal info

  //declaration for random meals
  const [meal, setMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //declaration for search bar
  const [searchTerm, setSearchTerm] = useState(""); // User input for search (ingredient)
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Loading state
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // Control recipe modal
  const [selectedMeal, setSelectedMeal] = useState(null); // Store selected meal details
  const [mealDetails, setMealDetails] = useState(null); // Store detailed meal info

  // declaration to sign up
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // function to sign up
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data
    console.log("First Name:", firstName);
    console.log("Email:", email);

    // Optionally, add your logic for sending data to a backend or displaying a confirmation
    alert(`Welcome! ${firstName}, we will send new recipes to your Email`);

    // Reset form after submission
    setFirstName("");
    setEmail("");
  };

  //function for search bar
  // Function to fetch recipe based on ingredient input
  const searchRecipes = (term) => {
    if (term.trim() === "") return; // Don't search if the input is empty

    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
      .then((response) => {
        if (response.data.meals) {
          setSearchResults(response.data.meals); // Store the results
          setIsRecipeModalOpen(true); // Open the modal to display the results
        } else {
          setSearchResults([]); // Clear results if no match is found
        }
      })
      .catch((error) => console.error("Error fetching search results:", error))
      .finally(() => setLoading(false));
  };
  // Fetch meal details based on selected meal ID
  const fetchMealDetails = (mealId) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        if (response.data.meals) {
          setMealDetails(response.data.meals[0]); // Store detailed meal info
        }
      })
      .catch((error) => console.error("Error fetching meal details:", error))
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
  const closeRecipeModal = () => setIsRecipeModalOpen(false);

  // Close detailed modal
  const closeDetailsModal = () => {
    setSelectedMeal(null);
    setMealDetails(null);
  };

  //function code for random meals
  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setMeal(data.meals[0]);
      setShowModal(true); // Show modal after fetching the meal
    } catch (error) {
      console.error("Error fetching the meal:", error);
    }
  };
  const closeModal = () => setShowModal(false);


// Function to fetch seafood recipes
  const fetchSeafoodRecipes = () => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((response) => {
        if (response.data.meals) {
          setSearchSeafoodResults(response.data.meals); // Store the seafood results
          setIsSeafoodRecipeModalOpen(true); // Open the modal to display the results
        } else {
          setSearchSeafoodResults([]); // Clear results if no match is found
        }
      })
      .catch((error) => console.error("Error fetching seafood recipes:", error))
      .finally(() => setLoading(false));
  };

//function code for sea food
  // Fetch meal details based on selected meal ID
  const fetchSeafoodMealDetails = (mealId) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        if (response.data.meals) {
          setSeafoodMealDetails(response.data.meals[0]); // Store detailed meal info
        }
      })
      .catch((error) => console.error("Error fetching meal details:", error))
      .finally(() => setLoading(false));
  };

  // Close recipe modal
  const closeSeafoodRecipeModal = () => setIsSeafoodRecipeModalOpen(false);

  // Close detailed modal
  const closeSeafoodDetailsModal = () => {
    setSeafoodSelectedMeal(null);
    setSeafoodMealDetails(null);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center text-center md:text-left items-center pt-4 md:pt-10">
        <div className="bg-gray-50">
          <img
            src={recipe7}
            alt="recipe7"
            className="w-full sm:w-96 h-auto shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
          />
        </div>
        <div className="md:pl-20 p-4 md:p-10">
          <h1 className="font-domine font-medium text-3xl sm:text-5xl text-customPurple py-4 sm:py-8">
            Welcome To Recipe Box
          </h1>
          <p className="font-medium text-xl sm:text-2xl font-domine">
            Let's Talk Food
            <span className="pl-2 font-great-vibes text-customPurple text-xl sm:text-2xl tracking-widest font-medium">
              Shall We?
            </span>
          </p>
          <p className="font-domine text-base sm:text-lg text-gray-500 py-4 sm:py-10">
            Well, we hope that’s why you’re here. Our recipes are designed for
            real, actual, every
            <br /> day life, and we try to focus on real foods and healthy
            recipes (which honestly means
            <br /> a lot of different things to us, including the perfect
            chocolate chip cookie and cheese
            <br /> on cheese on cheese, because health is all about balance,
            right?).
          </p>
          <p className="font-domine text-base sm:text-lg text-gray-500">
            This is the place to find those recipes — everything from our most
            popular, to meal
            <br /> prep, to Instant Pot recipes, or if you just, like, have some
            sad greens in your fridge to
            <br /> use up and you need some inspiration.
          </p>
          <p className="font-domine text-base sm:text-lg text-gray-500 py-4 sm:py-10">
            You’re here! Have fun. We hope you find something (many things) you
            love.
          </p>
        </div>
      </div>

      <div className="bg-customPurple pt-5 pb-5 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl text-white font-semibold text-center py-6 sm:py-10">
          Search Our Recipes
        </h1>
        <div className="flex items-center justify-center">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by ingredient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-semibold w-full py-3 pl-12 pr-4 bg-white border border-gray-400 rounded-lg shadow-md text-gray-700
                 focus:outline-none focus:ring-4 focus:ring-[#734060] transition duration-300 ease-in-out"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="text-zinc-300 text-lg tracking-widest text-center py-5">
          or browse our favourites
        </div>
      </div>

      {/*function for search bar */}
      {/* Recipe Modal for displaying search results */}
      {isRecipeModalOpen && searchResults.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
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

            <h2 className="text-2xl font-bold mb-4">Search Results</h2>

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
                        setSelectedMeal(meal); // Store selected meal
                        fetchMealDetails(meal.idMeal); // Fetch detailed meal info
                        closeRecipeModal(); // Close the modal when a meal is clicked
                      }}
                    >
                      <h3 className="text-lg mb-5 font-semibold">
                        {meal.strMeal}
                      </h3>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-40 object-cover mb-2 rounded"
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
      {mealDetails && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeDetailsModal} // Close the detailed modal
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

            <h2 className="text-2xl font-bold mb-4">{mealDetails.strMeal}</h2>
            <img
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="mt-4">{mealDetails.strInstructions}</p>
            <ul className="mt-4">
              <h3 className="font-bold">Ingredients:</h3>
              {Array.from({ length: 20 }, (_, index) => {
                const ingredient = mealDetails[`strIngredient${index + 1}`];
                const measure = mealDetails[`strMeasure${index + 1}`];
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

      <div className="flex items-center justify-center py-6 sm:py-10">
        <div>
          <HeartIcon className="h-12 sm:h-16 w-12 sm:w-16 text-gray-500" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl text-customPurple font-semibold font-domine pl-3">
            Random & Healthy Recipes
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-evenly gap-6 py-6">
        {/* Card 1 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={healthy1}
              alt="healthy1"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold">
              Sesame Noodle Bowls
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              Meal Prep Sesame Noodle Bowls! Fork- twirly noodles, an easy
              creamy sesame sauce, perfect browned chicken, and all the veg YUM.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={healthy2}
              alt="healthy2"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold mt-4 sm:mt-8">
              Velvet Sunset Pasta
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600  py-3 sm:py-5">
              This creamy pasta dish captures the essence of a sunset with its
              vibrant blend of sun-dried tomatoes, roasted garlic, and a velvety
              Parmesan sauce.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-evenly gap-6 py-6">
        {/* Card 1 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={healthy3}
              alt="healthy3"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl mt-4 font-bold">
              Saffron Ember Chicken Curry
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              This flavorful dish blends tender chicken with rich spices,
              creating a symphony of warmth and depth. Infused with aromatic
              saffron.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={healthy4}
              alt="healthy4"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold">
              Golden Rice with Papadam
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              This quintessential South Indian dish features fragrant, fluffy
              rice paired with crispy, golden papadam for a delightful contrast
              in texture.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-5">
        <button
          className="bg-[#734060] text-white font-semibold py-2 px-4 w-full sm:w-96 rounded-md shadow-md 
      hover:bg-[#5a3049] hover:scale-105 hover:opacity-90
      focus:ring-4 focus:ring-[#734060] focus:outline-none active:scale-95 
      transition duration-300 ease-in-out"
          onClick={fetchRandomMeal}
        >
          View Random Meals
        </button>
      </div>

      {/*function for random meals */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {meal && (
              <div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="mx-auto mb-4 rounded-lg"
                    style={{ width: "300px" }}
                  />
                  <p className="text-sm">
                    <strong>Category:</strong> {meal.strCategory}
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Area:</strong> {meal.strArea}
                  </p>
                  <p className="text-left mb-4">
                    <strong>Instructions:</strong> {meal.strInstructions}
                  </p>

                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Watch Video Recipe
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* meals recipe */}
      <div className="flex items-center justify-center py-10">
        <div>
          <img
            src={mealHead}
            alt="mealHead"
            className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-gray-500" // Adjust size for different screen sizes
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-customPurple font-semibold font-domine pl-3">
            Meal Prep Recipes
          </h1>
        </div>
      </div>
      {/* for cut area*/}
      <div className="flex flex-wrap justify-center sm:justify-evenly gap-6 py-6">
        {/* Card 1 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={meal1}
              alt="meal1"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl mt-4 font-bold">
              Royal Saffron Chicken Biryani
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              This luxurious biryani is a celebration of tender chicken,
              long-grain basmati rice, and aromatic spices, layered with the
              golden richness of saffron.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={meal2}
              alt="meal2"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold mt-4 sm:mt-8">
              Soulful Harmony Platter
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600  py-3 sm:py-5">
              This comforting meal brings together the simplicity of white rice
              with hearty soups, rich stews, and a flavorful chicken curry.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-evenly gap-6 py-6">
        {/* Card 1 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={meal3}
              alt="meal3"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold">
              Heritage Feast Thaali
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              From spicy curries and tangy sambar to refreshing curd and crispy
              papadam, each dish showcases the rich culinary heritage of the
              region.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex border-2 border-slate-400 w-full sm:w-2/5 h-auto sm:h-64 items-center p-5">
          <div className="flex-shrink-0">
            <img
              src={meal4}
              alt="meal4"
              className="h-36 sm:h-52 w-52 object-cover rounded-lg" // Set a consistent width for the image
            />
          </div>
          <div className="text-left pl-4">
            <h1 className="text-lg sm:text-xl font-bold">
              Heritage Feast Thaali
            </h1>
            <p className="font-domine text-base sm:text-lg text-gray-600 py-3 sm:py-5">
              From spicy curries and tangy sambar to refreshing curd and crispy
              papadam, each dish showcases the rich culinary heritage of the
              region.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-5">
        <button
          className="bg-[#734060] text-white font-semibold py-2 px-4 w-full sm:w-96 rounded-md shadow-md 
      hover:bg-[#5a3049] hover:scale-105 hover:opacity-90
      focus:ring-4 focus:ring-[#734060] focus:outline-none active:scale-95 
      transition duration-300 ease-in-out"
          onClick={fetchSeafoodRecipes}
        >
          View Seafood Recipes
        </button>
      </div>

      {/*function for sea food */}
      {/* Recipe Modal for displaying search results */}
      {isSeafoodRecipeModalOpen && searchSeafoodResults.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeSeafoodRecipeModal}
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
            <h2 className="text-2xl font-bold mb-4">Seafood Recipes</h2>

            <div className="max-h-[70vh] overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchSeafoodResults.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => {
                        setSeafoodSelectedMeal(meal); // Store selected meal
                        fetchSeafoodMealDetails(meal.idMeal); // Fetch detailed meal info
                        closeSeafoodRecipeModal(); // Close the modal when a meal is clicked
                      }}
                    >
                      <h3 className="text-lg mb-5 font-semibold">
                        {meal.strMeal}
                      </h3>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-40 object-cover mb-2 rounded"
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
      {SeafoodmealDetails && SeafoodselectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeSeafoodDetailsModal} // Close the detailed modal
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

            <h2 className="text-2xl font-bold mb-4">
              {SeafoodmealDetails.strMeal}
            </h2>
            <img
              src={SeafoodmealDetails.strMealThumb}
              alt={SeafoodmealDetails.strMeal}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="mt-4">{SeafoodmealDetails.strInstructions}</p>

            <ul className="mt-4">
              <h3 className="font-bold">Ingredients:</h3>
              [10:30 am, 11/10/2024] Dhanu✨:{" "}
              {Array.from({ length: 20 }, (_, index) => {
                const ingredient =
                  SeafoodmealDetails[`strIngredient${index + 1}`];
                const measure = SeafoodmealDetails[`strMeasure${index + 1}`];
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

      <div className="mt-16 text-center">
        <div className="w-full mx-auto  bg-customPurple p-8 shadow-lg rounded-lg ">
          <h3 className="font-semibold text-3xl font-great-vibes text-amber-300 tracking-widest py-6">
            Sign Up
          </h3>
          <p className="text-center text-gray-100 text-3xl">
            For Email Updates
          </p>
          <form className="mt-6 py-6" onSubmit={handleSubmit}>
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
      <div className=" flex justify-end items-end pt-16 pr-16 pb-10">
        <button
          className="text-white bg-customPurple border px-2 text-lg font-medium "
          onClick={() => navigate("/Recipes")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default StartHerePage;
