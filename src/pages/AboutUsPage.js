import React from 'react';
import TeamMember from '../components/about/TeamMember';
import DeveloperInfo from '../components/about/DeveloperInfo';
import './AboutUsPage.css'; // Assuming you will create a CSS file for specific styles

const AboutUsPage = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        We are a dedicated team working towards the conservation of rivers in the Philippines. Our mission is to raise awareness and promote actions that protect these vital waterways.
      </p>
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <TeamMember name="John Doe" role="Project Lead" />
        <TeamMember name="Jane Smith" role="Environmental Scientist" />
        <TeamMember name="Alice Johnson" role="Community Outreach" />
      </div>
      <h2>Developers</h2>
      <DeveloperInfo />
    </div>
  );
};

export default AboutUsPage;