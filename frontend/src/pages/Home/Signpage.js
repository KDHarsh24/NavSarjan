import React  from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useUser } from '../../context/UserContext'; 

function Signpage({emailValue})
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserData } = useUser(); 

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        try {
     
            const response = await axios.post('http://localhost:8081/home/login', { email, password });
            console.log("response: "+JSON.stringify(response,null,2));
            if (response.data.success) {
              localStorage.setItem('token', response.data.token);
              setUserData({ email }); // Update context with user data
              alert('Login Successful!');
              emailValue(email);
              navigate('/dashboard');
            } else {
              alert(response.data.message);
            }
          } catch (error) {
            alert('Login failed. Please try again.');
          }

    }


    return (
        <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in to NavSarjan</h2>
                <p class="mt-2 text-base text-gray-600">Don't have an account? </p>
                <Link to="/create-account">
                <p class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</p>
                </Link>
    

                <form method="POST" class="mt-8">
                    <div class="space-y-5">
                        <div>
                            <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                            <div class="mt-2.5">
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Enter email to get started"
                                    class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="" class="text-base font-medium text-gray-900"> Password </label>

                                <a href="#" title="" class="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"> Forgot password? </a>
                            </div>
                            <div class="mt-2.5">
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Enter your password"
                                    class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                      
                        <div>
                            <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"   onClick={handleSubmit}>Log in</button>
                        </div>
                      
                    </div>
                </form>
            </div>
        </div>

        <div class="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
                <img class="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

                <div class="w-full max-w-md mx-auto xl:max-w-xl">
                   

                    <div class="flex items-center justify-center mt-10 space-x-3">
                        <div class="bg-orange-500 rounded-full w-20 h-1.5"></div>

                        <div class="bg-gray-200 rounded-full w-12 h-1.5"></div>

                        <div class="bg-gray-200 rounded-full w-12 h-1.5"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    );
};

export default Signpage;