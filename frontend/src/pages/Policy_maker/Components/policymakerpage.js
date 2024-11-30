import React from "react";
import ProjectMonitoring from './ProjectMonitoring';
import Dashboard from './Dashboard';
import Funding from './Funding';
import Applicant from './Applicant';
import Notifications from './Notifications';
import Reports from './Reports';
import Document from './Document';
import Policy from './Policy';
import Feedback from './Feedback';
import './all.css'

const PolicyMakerLandingPage = () => {
  return (
    <div className="flex min-h-screen">

      <div className="flex-1 bg-gray-100">
        {/* Main Content */}

        <div className="p-8 space-y-8">
          {/* Dashboard Overview */}
          <Dashboard/>

          {/* Project Monitoring and Management */}
          <ProjectMonitoring/>

          {/* Funding Overview */}
          <Funding/>

          {/* Applicant Tracking */}
          <Applicant/>
          {/* Notifications and Alerts */}
          <Notifications/>

          {/* Analytics and Reports */}
          <Reports/>

          {/* Document and File Management */}
          <Document/>

          {/* Policy Management */}
          <Policy/>

          {/* Feedback and Surveys */}
          <Feedback/>

        </div>
      </div>
    </div>
  );
};

export default PolicyMakerLandingPage;