import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

export function NewsletterSignup() {
  return (
    <section className="w-full bg-white dark:bg-zinc-900 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text + Form */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            JOIN THE CYCLECITY COMMUNITY
          </h1>
          <p className=" text-black mb-12 text-1xl">
            Stay updated with the latest in cycling. Sign up for our newsletter
            to receive exclusive offers, product updates, and tips straight to
            your inbox. Join our biking community today!
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button
              className="g-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
              type="button"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-zinc-500 dark:text-zinc-600">
            We care about your data in our{" "}
            <NavLink to="/terms/policies" className="underline">
              privacy policy
            </NavLink>
            .
          </p>
        </div>

        {/* Illustration */}
        <div className="w-full flex justify-center">
          <img
            src="https://i.ibb.co/nMhqzzrK/h1-cta-2.jpg"
            alt="Newsletter illustration"
            width={400}
            height={400}
            className="dark:brightness-90"
          />
        </div>
      </div>
    </section>
  );
}
