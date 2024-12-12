import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlinePendingActions } from "react-icons/md";
const Timeline = (level) => {
  // Define reusable icons
  console.log(level, 'hello')
  const crossIcon = (
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 9.293l2.146 2.147a1 1 0 001.414-1.414L11.414 8l2.146-2.146a1 1 0 00-1.414-1.414L10 6.586 7.854 4.44a1 1 0 10-1.414 1.414L8.586 8l-2.146 2.146a1 1 0 101.414 1.414L10 9.293z"
        clipRule="evenodd"
      />
    </svg>
  );

  const tickIcon = (
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.293 4.293a1 1 0 00-1.414 0L8 10.586 5.121 7.707a1 1 0 00-1.414 1.414L8 13.414l9.707-9.707a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const bgGreen = 'bg-green-500'; // Green background for successful steps
  const bgRed = 'bg-red-500'; // Red background for incomplete steps
  
  const timelineData = [
    {
      id: 1,
      bgColor: bgRed,
      icon: <MdOutlinePendingActions/>,
      description: (
        <p className="text-sm">
          Applied to Initial Applications
        </p>
      ),
      date: 'Sep 20',
      datetime: '2020-09-20',
    },
    {
      id: 2,
      bgColor: bgRed,
      icon: <MdOutlinePendingActions/>,
      description: (
        <p className="text-sm">
          Evaluation of initial Application
        </p>
      ),
      date: 'Sep 22',
      datetime: '2020-09-22',
    },
    {
      id: 3,
      bgColor: bgRed, // Set to green to indicate completion
      icon: <MdOutlinePendingActions/>,
      description: (
        <p className="text-sm">
          State Level Verification
        </p>
      ),
      date: 'Sep 28',
      datetime: '2020-09-28',
    },
    {
      id: 4,
      bgColor: bgRed,
      icon: <MdOutlinePendingActions/>,
      description: (
        <p className="text-sm">
          Final Approval
        </p>
      ),
      date: 'Sep 30',
      datetime: '2020-09-30',
    },
  ];
  let f = false
  for(let i = timelineData.length-1; i >= 0; i--){
    if (i+1 === level.state)
    {
      timelineData[i].bgColor = bgGreen;
      timelineData[i].icon = tickIcon;
      f = true
    }
    else if (f){
      timelineData[i].bgColor = bgGreen;
      timelineData[i].icon = tickIcon;
    }
  }
  return (
    <div className="flow-root container m-auto p-5 bg-white-100 dark:bg-white-950">
      <ul role="list" className="-mb-8">
        {timelineData.map((item, index) => (
          <li key={item.id}>
            <div className={`relative pb-8 ${index === timelineData.length - 1 ? 'pb-0' : ''}`}>
              {index !== timelineData.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-950"
                  aria-hidden="true"
                ></span>
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full ${item.bgColor} flex items-center justify-center ring-8 ring-white`}>
                    {item.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>{item.description}</div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={item.datetime}>{item.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
