import React from 'react';
import HeroSection from '../components/home/HeroSection';
import RiverStats from '../components/home/RiverStats';
import WaterAnimations from '../components/animations/WaterAnimations';

const HomePage = () => {
  return (
    <div>
      <WaterAnimations />
      <HeroSection />
      <RiverStats />
    </div>
  );
};

export default HomePage;