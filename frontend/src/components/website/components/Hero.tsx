import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Right-side green gradient blob */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-bl from-lime-300 to-lime-100 rounded-bl-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="max-w-xl">
          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
            Introducing
            <br />
            <span className="block mt-2">CPM</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-2xl font-semibold text-gray-800">
            The Product life cycle tracker
          </p>

          {/* CTA */}
          <div className="mt-10">
            <button className="px-10 py-4 rounded-full bg-lime-400 text-gray-900 font-bold text-lg hover:bg-lime-500 transition">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
