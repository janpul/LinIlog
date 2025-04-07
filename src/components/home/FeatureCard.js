import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="feature-card">
      <img src={image} alt={title} className="feature-card-image" />
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

export default FeatureCard;