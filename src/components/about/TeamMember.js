import React from 'react';

const TeamMember = ({ name, role, bio, image }) => {
  return (
    <div className="team-member">
      <img src={image} alt={`${name}`} className="team-member-image" />
      <h3 className="team-member-name">{name}</h3>
      <p className="team-member-role">{role}</p>
      <p className="team-member-bio">{bio}</p>
    </div>
  );
};

export default TeamMember;