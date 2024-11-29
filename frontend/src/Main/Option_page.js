import {Link} from 'react-router-dom';
import Navbar from './Navbar';

function Option_page(){
    return(
        <>
            <Navbar/>
            <div class="lg:flex items-center justify-between p-6 md:p-12 dark:bg-gray-700">
    <div class="lg:w-1/2 w-full">
       
        <h1 role="heading" class="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800 dark:text-white">NavSarjan</h1>
        <p role="contentinfo" class="text-base leading-5 mt-5 text-gray-600 dark:text-gray-200">A platform for all innovators of the world. Initiated by Government of Gujarat.
           
        </p>
       
    </div>
    <div class="xl:w-1/2 p-12 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8" role="list">
        <img src="https://i.ibb.co/0n6DSS3/bgimg.png" class="absolute w-full -ml-12 mt-24" alt="background circle images" />
        <div role="listitem" class="bg-white dark:bg-gray-800 cursor-pointer shadow rounded-lg p-8 relative z-30">
        
            <div class="md:flex items-center justify-between">
                <h2 class="text-2xl font-semibold leading-6 text-gray-800 dark:text-white">Applicant</h2>
                <Link to="/sign-page">
                <button class="text-2xl font-semibold md:mt-0 mt-4  text-gray-800 dark:text-white">Sign-up/Login</button>
                </Link>
            </div>

        </div>
        <div role="listitem" class="bg-white dark:bg-gray-800 cursor-pointer shadow rounded-lg mt-3 pb-3 flex relative z-30">
            <div class="w-2.5 h-auto bg-indigo-700 rounded-tl-md rounded-bl-md"></div>
            <div class="w-full p-8">
            
                <div class="md:flex items-center justify-between">
                    <h2 class="text-2xl font-semibold leading-6 text-gray-800 dark:text-white">Policy Maker</h2>
                    <Link to="/sign-page">
                <button class="text-2xl font-semibold md:mt-0 mt-4  text-gray-800 dark:text-white">Sign-up/Login</button>
                </Link>
                </div>
            </div>
        </div>

        <div role="listitem" class="bg-white  dark:bg-gray-800 cursor-pointer shadow rounded-lg p-10 relative z-30 mt-7">
          
           <div class="md:flex items-center justify-between">
                <h2 class="text-2xl font-semibold leading-6 text-gray-800 dark:text-white">Funder</h2>
                <Link to="/sign-page">
                <button class="text-2xl font-semibold md:mt-0 mt-4  text-gray-800 dark:text-white">Sign-up/Login</button>
                </Link>
            </div>
        
        </div>
    </div>
</div>
        </>
    );
};

export default Option_page;