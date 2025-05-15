import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import { ScrollText } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition: React.FC = () => {
  return (
    <div className="w-full space-y-16">
      {/* Navbar */}
      <ResponsiveNavbar />
      <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
            <ScrollText className="w-5 h-5" />
            Legal Notice
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Understand the rules that govern your use of our services and
            platform.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-800 leading-relaxed">
          <Section title="📘 1. Introduction">
            Welcome to RideVibe, your premier destination for all things
            bicycles. By accessing our website, you agree to be bound by the
            following Terms and Conditions. Please read them carefully before
            using our services.
          </Section>

          <Section title="🌐 2. Use of the Website">
            You agree to use this website only for lawful purposes. You must not
            use it in a way that causes or may cause damage or impairment of the
            availability or accessibility of the website.
          </Section>

          <Section title="💳 3. Orders & Payments">
            All purchases made through RideVibe are subject to product
            availability and acceptance of your order. Prices and availability
            are subject to change without notice.
          </Section>

          <Section title="🚚 4. Shipping & Delivery">
            We strive to ship all orders promptly. Delivery times may vary based
            on location and product availability. We are not liable for any
            delays caused by third-party shipping providers.
          </Section>

          <Section title="🔁 5. Return & Refund Policy">
            We offer returns on unused products within 30 days of delivery.
            Refunds will be processed back to the original method of payment
            after inspection.
          </Section>

          <Section title="⚠️ 6. Limitation of Liability">
            RideVibe shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website or
            products.
          </Section>

          <Section title="🔐 7. Privacy">
            We respect your privacy. Please refer to our{" "}
            <Link to="/terms/policies" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            to understand how we collect and use your personal data.
          </Section>

          <Section title="📝 8. Changes to Terms">
            We may revise these terms at any time without prior notice.
            Continued use of the site constitutes your acceptance of any
            changes.
          </Section>

          <div className="text-sm text-gray-500 text-center mt-10">
            Last updated: <strong>April 12, 2025</strong>
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

export default TermsAndCondition;
