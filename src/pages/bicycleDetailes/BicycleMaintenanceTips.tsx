import { useState } from "react";
import YouTube from "react-youtube"; // Make sure to install this package

const BicycleMaintenanceTips = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const maintenanceTips = {
    cleaning: {
      title: "Cleaning",
      tips: [
        "Wash your bike with mild soap and water to remove dirt and grime",
        "Avoid high-pressure water to prevent bearing damage",
        "Dry and lubricate the chain after cleaning",
      ],
    },
    chain: {
      title: "Chain Care",
      tips: [
        "Lubricate regularly with bike-specific chain lube (wet/dry depending on conditions)",
        "Wipe off excess lube to prevent dirt buildup",
        "Replace the chain if stretched (use a chain checker tool)",
      ],
    },
    tires: {
      title: "Tire Maintenance",
      tips: [
        "Check tire pressure weekly with a pressure gauge",
        "Inspect tires for cuts, wear, or embedded debris",
        "Rotate tires occasionally for even wear",
      ],
    },
    brakes: {
      title: "Brakes",
      tips: [
        "Ensure brake pads are aligned and not worn out",
        "Test brakes before every ride - replace pads if thin or squeaking",
        "Adjust cable tension if brakes feel loose",
      ],
    },
    gears: {
      title: "Gears",
      tips: [
        "Clean and lubricate derailleur and cassette",
        "Check cable tension if gears skip or hesitate",
        "Consider professional tune-up for complex issues",
      ],
    },
  };

  const quickChecks = [
    "Air: Check tire pressure",
    "Brakes: Test functionality",
    "Chain: Check lubrication and wear",
    "Drive train: Inspect gears and shifting",
    "Fasteners: Ensure all bolts are tight",
  ];

  // YouTube video options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bicycle Maintenance Guide
      </h1>
      <p className="text-gray-600 mb-8">
        Keep your bike running smoothly with these essential tips:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(maintenanceTips).map(([key, category]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              activeCategory === key
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onClick={() =>
              setActiveCategory(activeCategory === key ? null : key)
            }
          >
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              {category.title}
            </h3>
            {activeCategory === key && (
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {category.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Pre-Ride ABC Quick Check
        </h2>
        <ul className="space-y-1 text-gray-700">
          {quickChecks.map((check, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block mr-2">•</span>
              {check}
            </li>
          ))}
        </ul>
      </div>

      {/* YouTube Video Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Watch How to Maintain Your Bicycle
        </h3>
        <div className="w-full aspect-w-16 aspect-h-9">
          <YouTube
            videoId="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
            opts={opts}
            className="w-full h-full rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700 mt-8">
        <p>
          <span className="font-bold">Pro Tip:</span> Even with regular
          maintenance, get a professional tune-up annually.
        </p>
      </div>
    </div>
  );
};

export default BicycleMaintenanceTips;
