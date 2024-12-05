import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Create_account() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    dob: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const dataToSubmit = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      phone: formData.phone,
      dob: formData.dob,
    };

    const formDataWithImage = new FormData();
    for (const key in dataToSubmit) {
      formDataWithImage.append(key, dataToSubmit[key]);
    }
    if (formData.image) {
      formDataWithImage.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', formDataWithImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert('Account created successfully!');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating account. Please check the console for details.');
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Section */}
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
              <img
                className="object-cover object-top w-full h-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/4/girl-thinking.jpg"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative">
              <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                <h3 className="text-4xl font-bold text-white">
                  Join 35k+ web professionals & <br className="hidden xl:block" />
                  build your website
                </h3>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create an Account</h2>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-base font-medium text-gray-900">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Upload your Image</label>
                    <input
                      type="file"
                      name="image"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email to get started"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Create_account;
