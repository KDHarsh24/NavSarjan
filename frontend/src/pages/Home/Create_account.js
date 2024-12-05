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
                                <h3 class="text-4xl font-bold text-white">Join 35k+ web professionals & <br class="hidden xl:block" />build your website</h3>
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
                                        <span class="text-lg font-medium text-white"> Unlimited Exports </span>
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
                                        <span class="text-lg font-medium text-white"> Design Files Included </span>
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

                            <div class="mt-3 space-y-3">
                                <button
                                    type="button"
                                    class="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                                >
                                    <div class="absolute inset-y-0 left-0 p-4">
                                        <svg class="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                            ></path>
                                        </svg>
                                    </div>
                                    Sign in with Google
                                </button>

                                <button
                                    type="button"
                                    class="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                                >
                                    <div class="absolute inset-y-0 left-0 p-4">
                                        <svg class="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                        </svg>
                                    </div>
                                    Sign in with Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create_account;