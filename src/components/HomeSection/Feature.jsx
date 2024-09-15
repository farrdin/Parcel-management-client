const features = [
  {
    icon: "🚚",
    title: "Parcel Safety",
    description:
      "Your parcels are secure with us, thanks to our advanced tracking system.",
  },
  {
    icon: "⚡",
    title: "Super Fast Delivery",
    description:
      "Get your parcels delivered swiftly with our efficient delivery system.",
  },
  {
    icon: "💬",
    title: "24/7 Customer Support",
    description:
      "Our support team is available around the clock to assist you.",
  },
];

const Feature = () => {
  return (
    <div>
      <section className="p-6 bg-white text-center">
        <h1 className="text-4xl text-center text-headL dark:text-headD font-sans font-semibold mb-6">
          Our Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 bg-gray-100 rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Feature;
