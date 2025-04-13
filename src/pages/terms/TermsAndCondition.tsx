import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition: React.FC = () => {
  return (
    <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
      {/* navbar */}
      <ResponsiveNavbar />

      {/* Terms */}
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-4xl shadow-purple-600 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-green-700">
          Terms & Conditions
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to RideVibe, your premier destination for all things
            bicycles. By accessing our website, you agree to be bound by the
            following Terms and Conditions. Please read them carefully before
            using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of the Website</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use this website only for lawful purposes. You must not
            use it in a way that causes or may cause damage or impairment of the
            availability or accessibility of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Orders & Payments</h2>
          <p className="text-gray-700 leading-relaxed">
            All purchases made through RideVibe are subject to product
            availability and acceptance of your order. Prices and availability
            are subject to change without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Shipping & Delivery
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We strive to ship all orders promptly. Delivery times may vary based
            on location and product availability. We are not liable for any
            delays caused by third-party shipping providers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Return & Refund Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We offer returns on unused products within 30 days of delivery.
            Refunds will be processed back to the original method of payment
            after inspection.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            RideVibe shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website or
            products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            We respect your privacy. Please refer to our{" "}
            <Link
              to={"/terms/policies"}
              className="text-green-600 underline cursor-pointer"
            >
              Privacy Policy
            </Link>{" "}
            to understand how we collect and use your personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may revise these terms at any time without prior notice.
            Continued use of the site constitutes your acceptance of any
            changes.
          </p>
        </section>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">Last updated: April 12, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
