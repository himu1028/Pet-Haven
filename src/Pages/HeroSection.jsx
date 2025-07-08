import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection = () => {
  const slides = [
    {
      image: "https://i.ibb.co/v6fQPFBs/dog.jpg",
      title: "Adopt a Loyal Friend",
      description: "Give a rescued dog a second chance and a forever home."
    },
    {
      image: "https://i.ibb.co/Kxt5QbHp/FELV-cat.jpg",
      title: "Find Your Purr-fect Companion",
      description: "Adopt a cat who’s waiting to be loved and pampered."
    },
    {
      image: "https://i.ibb.co/kgP3gJbK/Golden-Retriever.webp",
      title: "Make a Difference Today",
      description: "Your kindness can change a pet’s life forever."
    },
    {
      image: "https://i.ibb.co/wh64qQ2M/National-Geographic-2572187-16x9.jpg",
      title: "Adopt, Don’t Shop",
      description: "Choose love and save lives by adopting a shelter pet."
    }
  ];

  return (
    <div className="w-full max-w-8xl mx-auto mt-6 rounded-lg overflow-hidden shadow-lg">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={800}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        swipeable={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="h-[500px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
              <h1 className="text-2xl text-pink-500 md:text-4xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm text-blue-500 md:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
