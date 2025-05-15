const partners = [
  {
    name: "Veloce",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5MG1jccn-AcOPEmTBXr8z4e0-d8bKvlFHw&s",
  },
  {
    name: "Hero",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt8p1bWg4Z55mVtI7RpS7GomVrjd0lMCo-Hw&s",
  },
  {
    name: "Bianchi",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStNVjdzoAdn_9fHb60mXoEtHIUX49DsqgRxA&s",
  },
  {
    name: "Phoenix",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYc7A6wJOBgON6zI864bdDtj7Z-ILX8tH_Q&s",
  },
  {
    name: "Diamondback",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wU9AkDbZh2z9wFi-WRcLQAtT5m0vbyW5ww&s",
  },
  {
    name: "Giant",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwtMsw2PcAnDmUANN0bydlZ4fhoZHfzPvKQ&s",
  },
  {
    name: "Duranta",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJETdDFCev-j3oRELjgyVC0-0q2gTDw4bjxw&s",
  },
  {
    name: "Schwinn",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftae0g1MCOnegc796Bc3AtIgJqgoO4huddg&s",
  },
];

const OurPartners = () => {
  return (
    <section className="w-full container mx-auto px-4 py-16  ">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
        Trusted by Industry Leaders
      </h2>
      <p className="text-center text-black mb-12 text-1xl">
        We proudly partner with the most trusted names in the Bicycle industry.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
        {partners.map((partner, idx) => (
          <div key={idx} className="w-32 h-20 relative">
            <img
              src={partner?.src}
              alt={partner?.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPartners;
