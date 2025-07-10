import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#fffaf4] to-[#ffece5] py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight leading-tight animate-fade-in-up">
          Search, Book & <br className="hidden sm:inline-block" />
          <span className="text-[#ff4f00]">Ride Your Perfect Vehicle</span>
        </h1>

        {/* Subtext */}
        <p className="text-[#475569] mt-6 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up delay-200">
          Experience seamless vehicle rental like never before. Book your next
          car or bike instantly — fast, flexible, and reliable.
        </p>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 max-w-2xl mx-auto animate-fade-in-up delay-300">
          <input
            type="text"
            placeholder=" Search by location, type or price..."
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#ff4f00] focus:outline-none transition-all text-[#1e293b] placeholder:text-[#94a3b8]"
          />
          <Button className="rounded-full px-6 py-3 bg-[#ff4f00] hover:bg-[#e03e00] text-white transition duration-300">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
