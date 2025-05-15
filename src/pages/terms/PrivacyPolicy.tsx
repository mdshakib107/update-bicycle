import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import { Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full space-y-16">
      {/* Navbar */}
      <ResponsiveNavbar />
      <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
        {/* Animated Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
            <ShieldCheck className="w-5 h-5" />
            Privacy Matters
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            We respect your privacy. Here's how we handle your data.
          </p>

          {/* Back Button */}
          <Link
            to="/terms"
            className="absolute left-0 top-4 text-purple-600 hover:text-blue-600 transition"
            title="Back to Terms"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          <Section title="📘 Introduction">
            At RideVibe, your privacy is our priority. This Privacy Policy
            outlines how we collect, use, and safeguard your personal
            information when you use our website.
          </Section>

          <Section title="📋 Information We Collect">
            We may collect personal information such as your name, email,
            shipping address, payment details, and browsing behavior when you
            interact with our site.
          </Section>

          <Section title="🔍 How We Use Your Information">
            <ul className="list-disc ml-6 space-y-1">
              <li>To process and fulfill your orders</li>
              <li>To personalize your shopping experience</li>
              <li>To send updates, promotions, or support-related messages</li>
              <li>To improve our website and customer service</li>
            </ul>
          </Section>

          <Section title="📤 Sharing of Information">
            We do not sell your personal information. We may share it with
            trusted third-party partners only to facilitate services such as
            payment processing and shipping.
          </Section>

          <Section title="🍪 Cookies">
            We use cookies to improve your browsing experience and analyze
            traffic. You can disable cookies in your browser settings if you
            prefer.
          </Section>

          <Section title="🔐 Data Security">
            We implement secure protocols and technologies to protect your data,
            but no method of transmission over the internet is 100% secure.
          </Section>

          <Section title="🧾 Your Rights">
            You have the right to access, modify, or delete your personal
            information. Please contact us if you would like to exercise these
            rights.
          </Section>

          <Section title="📅 Changes to This Policy">
            We reserve the right to update this policy at any time. Changes will
            be posted on this page with a revised effective date.
          </Section>

          <Section title="📨 Contact Us">
            If you have any questions about this Privacy Policy, please contact
            us:
            <div className="mt-2 flex items-center gap-2 text-blue-600">
              <Mail className="w-4 h-4" />
              <span>support@bicycle.com</span>
            </div>
          </Section>

          <div className="text-sm text-gray-500 text-center mt-10">
            Last updated: <strong>{new Date().toLocaleDateString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
    <h2 className="text-xl font-semibold text-[#4F46E5] mb-2">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </section>
);

export default PrivacyPolicy;
