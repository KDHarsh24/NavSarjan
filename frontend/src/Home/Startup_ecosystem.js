import React from "react";
import digitalocen from './digitalOcean.png';
import larajobs from './larajobs.jpg';
import CoinCamp from './CoinCamp.png';

function Startup_ecosystem(){
    return(
        <>
            <div class="p-5 pt-8 border ignore border-gray-200 not-prose dark:border-gray-800 relative bg-gray-50 dark:bg-gray-800">
                <div
                    class="absolute w-auto rounded-b-lg border-b uppercase -translate-y-px tracking-wide leading-none border-l border-r border-gray-200 dark:border-gray-800 shadow-sm top-0 left-1/2 -translate-x-1/2 px-3 pt-1 pb-2 bg-white dark:bg-black text-gray-400 text-[0.65rem]">
                    🤩 Our Amazing Sponsors 👇</div>
                <div class="max-w-5xl mx-auto">
                    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 sm:gap-5 not-prose">
                        <a href="#" target="_blank"
                            class="relative flex flex-col items-start justify-between p-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-black bg-white group">
                            <span class="absolute w-full h-full bg-white dark:bg-black inset-0 dark:group-hover:bg-gray-900 group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
                            <div class="flex items-center justify-between w-full mb-4 ">
                                <img src={digitalocen} alt="DigitalOcean" class="relative h-5 md:h-6"/>
                                <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-2.5 text-[0.6rem] group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                                    <span>View Website</span>
                                </span>
                            </div>
                            <span class="relative text-xs md:text-sm text-gray-600 dark:text-gray-400">DigitalOcean offers a simple and reliable cloud hosting solution that enables developers to get their website or application up and running quickly.</span>
                        </a>
                        <a href="#" target="_blank"
                            class="relative flex flex-col items-start justify-between p-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-black bg-white group">
                            <span class="absolute w-full h-full bg-white dark:bg-black inset-0 dark:group-hover:bg-gray-900 group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
                            <div class="flex items-center justify-between w-full mb-4 ">
                                <img src={larajobs} alt="Larajobs" class="relative h-5 md:h-6"/>
                                <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-2.5 text-[0.6rem] group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                                    <span>View Website</span>
                                </span>
                            </div>
                            <span class="relative text-xs md:text-sm text-gray-600 dark:text-gray-400">The official Laravel job board. Find the best and most talented Laravel developers by posting your job on the official Laravel job board.</span>
                        </a>
                        <a href="#" target="_blank"
                            class="relative flex flex-col items-start justify-between p-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-black bg-white group">
                            <span class="absolute w-full h-full bg-white dark:bg-black inset-0 dark:group-hover:bg-gray-900 group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
                            <div class="flex items-center justify-between w-full mb-4 ">
                                <img src={CoinCamp} alt="CoinCamp" class="relative h-5 md:h-6"/>
                                <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-2.5 text-[0.6rem] group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                                    <span>View Website</span>
                                </span>
                            </div>
                            <span class="relative text-xs md:text-sm text-gray-600 dark:text-gray-400">Learn how to code your own blockchain and create your own crypto-currency with the CoinCamp interactive and fun online training platform.</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Startup_ecosystem;