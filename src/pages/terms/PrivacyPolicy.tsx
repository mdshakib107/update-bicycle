import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
      {/* navbar */}
      <ResponsiveNavbar />

      {/* policies */}
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-4xl shadow-purple-600 shadow-2xl relative">
                
        {/* back to terms page */}
        <Link 
            to={'/terms'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 text-purple-600 absolute left-8 top-12 hover:text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
        
        <h1 className="text-4xl font-extrabold text-center mb-10 text-green-700">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            At RideVibe, your privacy is our priority. This Privacy Policy
            outlines how we collect, use, and safeguard your personal
            information when you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect personal information such as your name, email,
            shipping address, payment details, and browsing behavior when you
            interact with our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To personalize your shopping experience</li>
            <li>To send updates, promotions, or support-related messages</li>
            <li>To improve our website and customer service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Sharing of Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information. We may share it with
            trusted third-party partners only to facilitate services such as
            payment processing and shipping.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies to improve your browsing experience and analyze
            traffic. You can disable cookies in your browser settings if you
            prefer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement secure protocols and technologies to protect your data,
            but no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, modify, or delete your personal
            information. Please contact us if you would like to exercise these
            rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to update this policy at any time. Changes will
            be posted on this page with a revised effective date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:support@bicycle.com"
              className="text-green-600 underline"
            >
              support@bicycle.com
            </a>
            .
          </p>
        </section>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">Last updated: April 12, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
