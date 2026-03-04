import Image from 'next/image';

const features = [
  {
    title: 'CRITICAL PATH VISIBILITY',
    description:
      'Instantly see the milestones that directly impact your Ready date, so teams focus on what truly matters.',
    image: '/features/critical-path.png',
  },
  {
    title: 'AUTOMATED WORKFLOW',
    description:
      'Automatically trigger next steps, notifications, and ownership changes as milestones are completed or delayed.',
    image: '/features/automated-workflow.png',
  },
  {
    title: 'EXCEPTION REPORTING',
    description:
      'Automatically surface only what needs attention by highlighting overdue, blocked, or off-track milestones across all products.',
    image: '/features/exception-reporting.png',
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-lime-300 to-white py-20 sm:py-28">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-gray-900 mb-14">
          Features
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition pt-8 pb-8  text-center"
            >
              {/* Icon / Image */}
              <div className="flex justify-center mb-6">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={120}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed px-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
