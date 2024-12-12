import {Link} from 'react-router-dom';

function Create_account(){
    return(
        <>
          <section class="bg-white">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                        <div class="absolute inset-0">
                            <img class="object-cover object-top w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/4/girl-thinking.jpg" alt="" />
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                        <div class="relative">
                            <div class="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                                <h3 class="text-4xl font-bold text-white">Join 2k+ Mentors & <br class="hidden xl:block" />build your startup</h3>
                                <ul class="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    <li class="flex items-center space-x-3">
                                        <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <span class="text-lg font-medium text-white"> Commercial License </span>
                                    </li>
                                    <li class="flex items-center space-x-3">
                                        <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <span class="text-lg font-medium text-white"> Transparency </span>
                                    </li>
                                    <li class="flex items-center space-x-3">
                                        <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <span class="text-lg font-medium text-white"> 120+ Coded Blocks </span>
                                    </li>
                                    <li class="flex items-center space-x-3">
                                        <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <span class="text-lg font-medium text-white"> Middle Man Elimination </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                        <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Create an Account</h2>
                            <form action="#" class="mt-8">
                                
                             <div class="space-y-5">
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Name </label>
                                            <input type="name" name="" id="" placeholder="Enter your name" class="block w-full py-1 pl-2 pr-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"/>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Upload your Image </label>

                                            <input
                                                type="file"
                                                name=""
                                                id=""
                                                placeholder="Enter your image"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                                        

                                            <input
                                                type="email"
                                                name=""
                                                id=""
                                                placeholder="Enter email to get started"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        
                                    </div>
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Date of Birth </label>
                                            <input
                                                type="date"
                                                name=""
                                                id=""
                                                placeholder="DateofBirth"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between">
                                            <label for="" class="text-base font-medium text-gray-900"> Password </label>
                                        </div>
                                        <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                           
                                            <input
                                                type="password"
                                                name=""
                                                id=""
                                                placeholder="Enter your password"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div class="flex items-center justify-between">
                                            <label for="" class="text-base font-medium text-gray-900">Confirm Password </label>
                                        </div>
                                        <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                           

                                            <input
                                                type="password"
                                                name=""
                                                id=""
                                                placeholder="Confirm password"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Address </label>
                                        <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                           

                                            <input
                                                type="address"
                                                name=""
                                                id=""
                                                placeholder="Enter your address"
                                                class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                    <div>
                                        <Link to="/dashboard">
                                        <button
                                            type="submit"
                                            class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                        >
                                            Create Account
                                        </button>
                                        </Link>
                                        
                                    </div>
                                </div>
                            </form>

                            
                               
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create_account;