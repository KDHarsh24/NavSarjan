import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import singin from './Signin.jpg';

// Global variable to store user data
export let userdata = {};

function Signpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true); // Set loading state
    try {
      const response = await axios.post("https://navsarjanbackend-sage.vercel.app/api/login", {
        email,
        password,
      });

      console.log("Response:", JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        // Save user data to the global variable
        userdata = {
          email: response.data.data.email,
          id: response.data.data.id,
          name: response.data.data.name,
          role: response.data.data.role
        };

        console.log("Userdata:", userdata);

        alert("Login Successful!");// Pass the email to the parent component
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Form Section */}
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login to NavSarjan
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don't have an account?{" "}
            </p>
            <Link to="/create-account">
              <p className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">
                Create a free account
              </p>
            </Link>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email to get started"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>

                    <a
                      href="#"
                      title="Forgot Password"
                      className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2.5">
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md ${
                      isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div>
            <img
              className="w-full mx-auto"
              src={singin}
              alt="Login Illustration"
            />

            <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <div className="flex items-center justify-center mt-10 space-x-3">
                <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>
                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signpage;
