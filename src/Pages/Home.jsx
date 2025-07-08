import React from 'react';
import HeroSection from './HeroSection';

import About from './About';
import CallToAction from './CallToAction';
import Query from './Query';
import Review from './Review';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
           
            <About></About>
             <CallToAction></CallToAction>
             <Query></Query>
             <Review></Review>
        </div>
    );
};

export default Home;