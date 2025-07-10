import React from "react";
import { Button } from "@/components/ui/button";

const Aboutus = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFF2E0] to-white text-gray-800 px-6 py-16 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-[#FF6B00] mb-6 tracking-wide drop-shadow-sm">
          About Our SawariSewa
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          Welcome to our next-gen platform designed to revolutionize how you
          rent cars and bikes in Nepal. We blend smart technology with
          simplicity to bring a seamless experience whether you’re hitting the
          highway or navigating city streets.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left ">
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-[#FF6B00] mb-4">
              🚗 Who We Are
            </h2>
            <p>
              We're a dedicated team aiming to modernize transportation in
              Nepal. Our platform connects renters with verified vehicle owners
              and makes short- or long-term rentals easier than ever.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-[#FF6B00] mb-4">
              🎯 Our Mission
            </h2>
            <p>
              To offer a safe, smart, and smooth vehicle renting experience by
              leveraging modern tech, AI-powered suggestions, and simple user
              interfaces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-[#FF6B00] mb-4">
              ✨ What We Offer
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 ">
              <li>Rent cars or bikes near your location</li>
              <li>AI-suggested vehicles based on user needs</li>
              <li>OCR-based document verification</li>
              <li>Instant booking and smart availability tracking</li>
              <li>Secure payment via eSewa/Khalti</li>
              <li>24/7 live customer support</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-[#FF6B00] mb-4">
              💡 Why Choose Us?
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fast, modern, and mobile-responsive UI</li>
              <li>Verified renters and vehicle owners</li>
              <li>Local language and regional targeting</li>
              <li>Top-rated user reviews and satisfaction</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#FF6B00] mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Behind the code, there’s a passionate group of developers,
            designers, and visionaries committed to building the best vehicle
            rental system for our community.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md w-48 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg ">
              <img
                src="/src\assets\roshan.png"
                alt="Roshan"
                className="rounded-full w-20 h-20 mx-auto mb-2 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold">Roshan Khatiwada</h3>
              <p className="text-sm text-gray-500">Founder & Lead Developer</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md w-48 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <img
                src=""
                alt="Vijay"
                className="rounded-full w-20 h-20 mx-auto mb-2 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold">Vijay Raj Poudel</h3>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
