import Image from 'next/image';

const ProductLifecycleSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl h-screen mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              YOUR PRODUCT LIFE CYCLE TRACKER
            </h2>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
              A web app used to track critical milestones across the lifecycle
              of beauty products (e.g. formulation, packaging, compliance,
              production, launch), helping teams spot delays early and keep
              launches on track.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/plant.png"
              alt="Beauty product lifecycle illustration"
              width={500}
              height={540}
              priority
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductLifecycleSection;
