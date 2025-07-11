import React, { useEffect } from 'react';
import HeroSection from './HeroSection';

import About from './About';
import CallToAction from './CallToAction';
import Query from './Query';
import Review from './Review';
import { useLocation } from 'react-router';
import AOS from 'aos';
import PetCategories from './PetCategories';
const Home = () => {
            const location = useLocation();
           
             useEffect(() => {
               AOS.refresh(); // Every route change, refresh AOS
             }, [location]);
    return (
        <div className="space-y-10">
      <div data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up">
        <PetCategories></PetCategories>
      </div>
      <div data-aos="fade-up">
        <CallToAction />
      </div>
      <div data-aos="fade-up">
        <About />
      </div>
      
      <div data-aos="fade-up">
        <Query />
      </div>
      <div data-aos="fade-up">
        <Review />
      </div>
    </div>
    );
};

export default Home;