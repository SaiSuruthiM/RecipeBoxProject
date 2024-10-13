

// ----------------------//
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import chefhat from "../Images/chef-hat.png";
import viewrecipeimg from "../Images/viewrecipeimg.jpg";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import idimg from "../Images/idimg.jpg";
import recipefooterimg from "../Images/recipefooterimg.jpg";
import { useNavigate } from "react-router";
function Recipes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]); // State to hold all recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllRecipesOpen, setIsAllRecipesOpen] = useState(false); // State for all recipes modal
  const [loading, setLoading] = useState(false); // Loading state
  const [mealsByCategory, setMealsByCategory] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State for category modal
  const [mealsByArea, setMealsByArea] = useState([]);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false); // State for Area modal
  const [mealId, setMealId] = useState("");
  const [mealData, setMealData] = useState(null);
  const [error, setError] = useState(null);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false); // Manage modal state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [mealsByIngredient, setMealsByIngredient] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // New state for the second modal
  const [selectedMeal, setSelectedMeal] = useState(null); // For storing selected recipe details
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

  // Function to fetch recipes from API
  const fetchRecipes = async (letter) => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]); // Clear if no results
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]); // Clear results on error
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to fetch all recipes
  const fetchAllRecipes = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      const data = await response.json();
      setAllRecipes(data.categories); // Set all recipes
      setIsAllRecipesOpen(true); // Open the modal to show all recipes
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Fetch recipes when the user types a first letter
  useEffect(() => {
    if (searchTerm.length === 1) {
      fetchRecipes(searchTerm);
      setIsModalOpen(true);
    } else {
      setRecipes([]); // Clear results if no valid search term
      setIsModalOpen(false);
    }
  }, [searchTerm]);

  const handleRecipeClick = (recipe) => {
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  };

  const closeDetailModal = () => {
    setSelectedRecipe(null);
  };

  // Function to split instructions into steps
  const getInstructionSteps = (instructions) => {
    if (!instructions) return []; // Return an empty array if instructions are undefined
    return instructions
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step);
  };
  // Fetch meals by category and open modal
  const filterMealsByCategory = (category) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        setMealsByCategory(response.data.meals);
        setIsCategoryModalOpen(true); // Open modal to show meals
      })
      .catch((error) => console.error("Error fetching meals", error))
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  };
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false); // Close category modal
    setMealsByCategory([]); // Clear meals
  };

  // Fetch meals by area and open modal
  const filterMealsByArea = (area) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => {
        setMealsByArea(response.data.meals);
        setIsAreaModalOpen(true); // Open modal to show meals
      })
      .catch((error) => console.error("Error fetching meals", error))
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  };
  const closeAreaModal = () => {
    setIsAreaModalOpen(false); // Close category modal
    setMealsByArea([]); // Clear meals
  };

  // Function to handle search
  const handleSearch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setMealData(data.meals[0]);
          setError(null);
          setIsIdModalOpen(true); // Open modal on successful search
        } else {
          setError("No meal found with that ID.");
          setMealData(null);
        }
      })
      .catch(() => {
        setError("Error fetching meal details.");
        setMealData(null);
      });
  };

  // Function to close the modal
  const closeModal = () => {
    setIsIdModalOpen(false);
  };

  // Effect to disable body scrolling when modal is open
  useEffect(() => {
    if (isIdModalOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }

    // Cleanup when the component is unmounted
    return () => {
      document.body.style.overflow = "auto"; // Reset to default on cleanup
    };
  }, [isIdModalOpen]);

  const filterMealsByIngredient = (ingredient) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => {
        setMealsByIngredient(response.data.meals);
        setIsIngredientModalOpen(true); // Open modal to show meals
      })
      .catch((error) => console.error("Error fetching meals", error))
      .finally(() => setLoading(false)); // Set loading to false when done
  };

  const fetchMealDetails = (idMeal) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => {
        setSelectedMeal(response.data.meals[0]); // Set selected meal details
        setIsRecipeModalOpen(true); // Open the second modal to show recipe details
      })
      .catch((error) => console.error("Error fetching meal details", error))
      .finally(() => setLoading(false));
  };

  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false); // Close the ingredient modal
    setMealsByIngredient([]); // Clear meals
  };

  const closeRecipeModal = () => {
    setIsRecipeModalOpen(false); // Close the recipe modal
    setSelectedMeal(null); // Clear the selected meal details
  };

  const handlemealRecipeClick = (meal) => {
    closeIngredientModal(); // Close the first modal before opening the second one
    fetchMealDetails(meal.idMeal); // Fetch the selected recipe details
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex justify-center items-center space-x-2 mt-3 mb-2">
        <p className="text-sm text-gray-500">RECIPE BOX</p>
        <ChevronRightIcon className="h-4 w-4 text-gray-500" strokeWidth={2} />
        <p className="text-sm text-gray-500">RECIPES</p>
      </div>

      {/* Header and Search Section */}
      <div className="bg-customPurple text-white p-6 md:p-8">
        <div className="container mx-auto">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-domine font-bold mb-4 mt-8 text-center">
            Recipes
          </h1>
          <p className="mt-6 md:mt-10 mb-5 md:mb-10 text-center text-lg md:text-xl mx-4 md:mx-24">
            We’ve organized these recipes every way we could think of so you
            don't have to! Dietary restrictions, weeknight dinners, meal prep
            recipes, some of our most tried-and-true... no matter how you
            browse, we’re sure you’ll find just what you were looking for.
          </p>

          {/* Search Bar */}
          <div className="relative mt-5 md:mt-16 flex justify-center">
            <div className="relative w-full max-w-3xl border-2 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search by first letter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 text-xl text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
              <button className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon
                  className="h-8 w-8 text-customPurple"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* View All Recipes Button */}
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center space-x-2 mt-10 pb-5">
          <img src={chefhat} alt="chefhat" className="w-8" />
          <h2 className="text-3xl text-customPurple font-domine">
            RECIPE EXPLORER
          </h2>
        </div>
        <p className="text-lg font-domine text-gray-600">
          Discover,Savor,Create-Every Recipe at Your Fingertips!
        </p>
        <div className="relative">
          <img
            src={viewrecipeimg}
            alt="viewrecipeimg"
            className=" w-auto  pt-10 pb-5 pr-20 pl-20"
          />

          <div className=" absolute inset-x-0 bottom-0 flex justify-center mt-6   ">
            <button
              onClick={fetchAllRecipes}
              className="bg-customPurple w-auto text-white text-2xl w-64  px-4 py-2 rounded-md hover:bg-black flex items-center justify-center  space-x-4 transition"
            >
              <PlusIcon class="h-8 w-8 text-white mr-2" strokeWidth={2} />
              View All Categories
            </button>
          </div>
        </div>
        <hr className="mt-10 ml-5 mr-5 border-t-2 "></hr>
      </div>
      {/* Display meals by category */}
      <div>
        <h1 className="text-3xl mt-8 mb-5 text-customPurple font-domine ">
          Popular Categories
        </h1>
        <div className="flex justify-around mr-10 ml-10 mt-10">
          <div>
            <ul className="text-left text-2xl text-gray-500 font-domine space-y-5">
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Beef")}
              >
                Beef
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Breakfast")}
              >
                Breakfast
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Chicken")}
              >
                Chicken
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Dessert")}
              >
                Dessert
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Goat")}
              >
                Goat
              </li>
            </ul>
          </div>

          <div>
            <ul className=" text-left text-2xl text-gray-500 font-domine space-y-5">
              <li
                className="cursor-pointer text-gray-500"
                onClick={() => filterMealsByCategory("Miscellaneous")}
              >
                Miscellaneous
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Pasta")}
              >
                Pasta
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Pork")}
              >
                Pork
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Seafood")}
              >
                Seafood
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByCategory("Vegetarian")}
              >
                Vegetarian
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-10 ml-5 mr-5 border-t-2 "></hr>
      </div>

      {/* Modal for displaying meals by category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeCategoryModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Recipes By Categories</h2>
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mealsByCategory.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => handlemealRecipeClick(meal)}
                    >
                      <h3 className="text-lg mb-5 font-domine font-semibold">
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

      {/* Display meals by area */}
      <div>
        <h1 className="text-3xl mt-8 mb-5 text-customPurple font-domine ">
          Recipes By Area
        </h1>
        <div className="flex justify-around mr-10 ml-10 mt-10">
          <div>
            <ul className="text-left text-2xl text-gray-500 font-domine space-y-5">
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("American")}
              >
                American
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("British")}
              >
                British
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Canadian")}
              >
                Canadian
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Chinese")}
              >
                Chinese
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Indian")}
              >
                Indian
              </li>
            </ul>
          </div>

          <div>
            <ul className=" text-left text-2xl text-gray-500 font-domine space-y-5">
              <li
                className="cursor-pointer text-gray-500"
                onClick={() => filterMealsByArea("Italian")}
              >
                Italian
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Japanese")}
              >
                Japanese
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Russian")}
              >
                Russian
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Spanish")}
              >
                Spanish
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByArea("Vietnamese")}
              >
                Vietnamese
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-10 ml-5 mr-5 border-t-2 "></hr>
      </div>

      {/* Modal for displaying meals by area */}
      {isAreaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeAreaModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-domine font-bold mb-4">
              Recipes By Area
            </h2>
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mealsByArea.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => handlemealRecipeClick(meal)}
                    >
                      <h3 className="text-lg mb-5 font-domine font-semibold">
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

      {/* Display meals by incredient */}
      <div>
        <h1 className="text-3xl mt-8 mb-5 text-customPurple font-domine ">
          Recipes By Ingredient
        </h1>
        <div className="flex justify-around mr-5 ml-24 mt-10">
          <div>
            <ul className="text-left text-2xl text-gray-500 font-domine space-y-5">
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Chicken")}
              >
                Chicken
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Salmon")}
              >
                Salmon
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Avocado")}
              >
                Avocado
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Apple Cider Vinegar")}
              >
                Apple Cider Vinegar
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Asparagus")}
              >
                Asparagus
              </li>
            </ul>
          </div>

          <div>
            <ul className=" text-left text-2xl text-gray-500 font-domine   space-y-5">
              <li
                className="cursor-pointer text-gray-500"
                onClick={() => filterMealsByIngredient("Aubergine")}
              >
                Aubergine
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Baby Plum Tomatoes")}
              >
                Baby Plum Tomatoes
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Bacon")}
              >
                Bacon
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Basil")}
              >
                Basil
              </li>
              <li
                className="cursor-pointer"
                onClick={() => filterMealsByIngredient("Basmati Rice")}
              >
                Basmati Rice
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-10 ml-5 mr-5 border-t-2 "></hr>
      </div>

      {/* Modal for displaying meals by Ingredient*/}
      {isIngredientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeIngredientModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Recipes By Ingredient</h2>
            <div className="max-h-[70vh] overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mealsByIngredient.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => handlemealRecipeClick(meal)} // Call handleRecipeClick here
                    >
                      <h3 className="text-lg mb-5 font-domine font-semibold">
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

      {/* Second Modal for displaying recipe details */}
      {isRecipeModalOpen && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeRecipeModal} // Close the recipe modal
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold font-domine mb-4">
              {selectedMeal.strMeal}
            </h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="w-full h-auto object-cover rounded mt-4 mb-5"
            />
            <span className="font-domine text-xl">Instructions</span>
            <p className="mt-4 text-lg text-left font-domine">
              {selectedMeal.strInstructions
                .split("\n")
                .filter((step) => step.trim() !== "") // Filter out empty lines
                .map((step, index) => (
                  <li key={index} className="mb-2">
                    {step}
                  </li>
                ))}
            </p>

            <ul className="mt-4">
              <h3 className="font-bold mb-4 text-xl font-domine">
                Ingredients:
              </h3>
              {Array.from({ length: 20 }, (_, index) => {
                const ingredient = selectedMeal[`strIngredient${index + 1}`];
                const measure = selectedMeal[`strMeasure${index + 1}`];
                return (
                  ingredient && (
                    <li key={index} className="text-left text-lg font-domine ">
                      {ingredient} - {measure}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* search bar for searching meal by id */}
      <h1 className="font-domine text-3xl text-customPurple mt-8">
        Meal ID Search
      </h1>
      <p className="text-xl mt-3 font-domine text-gray-700">
        Unlock Your Next Favorite Recipe in Seconds!
      </p>
      <img src={idimg} alt="mealidimg" className="p-10 pl-20 pr-20" />
      <div className="meal-search-container">
        {/* Input field for entering meal ID */}
        <input
          type="text"
          value={mealId}
          onChange={(e) => setMealId(e.target.value)}
          placeholder="Enter Meal ID"
          className="border-2 border-gray-300 p-2 rounded text-lg w-1/2"
        />

        {/* Button to trigger the search */}
        <button
          onClick={handleSearch}
          className="bg-customPurple text-white text-lg p-2 text-domine rounded ml-2"
        >
          Search
        </button>

        {/* Display error if no meal is found or API call fails */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Modal to display meal details by id */}
        {isIdModalOpen && mealData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl overflow-y-auto max-h-[100vh]">
              <div className="flex justify-between  items-center mb-4">
                <h2 className="text-xl text-center font-domine font-bold">
                  {mealData.strMeal}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 font-bold text-xl"
                >
                  &times;
                </button>
              </div>
              <img
                src={mealData.strMealThumb}
                alt={mealData.strMeal}
                className="w-full rounded mb-4"
              />
              <p className="mt-2 text-lg">
                <strong>Category:</strong> {mealData.strCategory}
              </p>
              <p className="mt-2 text-lg">
                <strong>Area:</strong> {mealData.strArea}
              </p>
              {/* Instructions Step by Step */}
              <div className="mt-4">
                <h3 className="font-bold mb-5 text-lg">Instructions:</h3>
                <ol className="list-disc text-left pl-6 text-lg space-y-5">
                  {mealData.strInstructions
                    .split("\n")
                    .filter((step) => step.trim() !== "") // Filter out empty lines
                    .map((step, index) => (
                      <li key={index} className="mb-2">
                        {step}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-domine mt-12 text-customPurple">
          Bring Your Love for Cooking to Life
        </h1>
        <img
          src={recipefooterimg}
          alt="footer-img"
          className="p-10 pl-20 pr-20"
        />
        <p className="text-center text-gray-600 font-domine text-xl mb-5 ml-20 mr-20">
          Cooking is a celebration of ingredients, culture, and passion. With
          our recipes, you're never far from your next delicious dish. Take the
          time to enjoy each step of the cooking process, and let the flavors
          unfold in ways you’ve never imagined. The kitchen is a place to
          experiment, express creativity, and share love through food. So, go
          ahead—explore, cook, and relish the joy of creating something
          extraordinary.
        </p>

        <h1 className="text-2xl font-domine text-customPurple pb-3">
          Good Food, Great Memories—Start Cooking Today!
        </h1>
      </div>
      {/* Call to Action Section */}
      <div className="mt-16">
        <div className="w-full mx-auto  bg-customPurple p-8 shadow-lg rounded-lg ">
          <h3 className="text-3xl font-bold font-domine text-center text-white">
            Sign Up
          </h3>
          <p className="text-center text-xl text-gray-100 mt-2 ">
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

      {/* Modal for displaying search results */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="max-h-96 overflow-y-auto">
              {loading ? ( // Show loading text when fetching
                <p className="text-center text-gray-500">Loading...</p>
              ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.idMeal}
                      className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <h3 className="text-xl font-bold font-domine mb-2">
                        {recipe.strMeal}
                      </h3>
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                      <p className="text-gray-600 text-sm text-left">
                        {recipe.strInstructions.slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                searchTerm && (
                  <p className="text-center text-gray-500">
                    No recipes found for "{searchTerm}"
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for All Recipes */}
      {isAllRecipesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsAllRecipesOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">All Categories</h2>
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allRecipes.map((recipe) => (
                    <div
                      key={recipe.strCategory}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {recipe.strCategory}
                      </h3>
                      <img
                        src={recipe.strCategoryThumb}
                        alt={recipe.strCategory}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                      <p className="text-gray-600 text-left text-sm">
                        {recipe.strCategoryDescription.slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Recipe Details */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeDetailModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Recipe Detail Content */}
            <div className="overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold font-domine mb-4">
                {selectedRecipe.strMeal}
              </h2>
              <img
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                className="w-full h-auto object-cover rounded mb-4"
              />
              <h3 className="text-xl mb-5 font-domine  font-semibold">
                Instructions:
              </h3>
              <ul className="list-disc text-left space-y-4 text-lg pl-5">
                {getInstructionSteps(selectedRecipe.strInstructions).map(
                  (step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className=" flex justify-end items-end pt-16 pr-16 pb-10">
        <button
          className="text-white bg-customPurple border px-2 text-lg font-medium "
          onClick={() => navigate("/About")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Recipes;
