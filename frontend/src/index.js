import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import Routing from './Main/Routing';
// import Routing from './LandingPage/Routing';
// import SURVEY_FORM from './PAGES/SURVEY_FORM';
import Feedback_form from './PAGES/Feedback_form';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Routing/> */}
    <Feedback_form/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
