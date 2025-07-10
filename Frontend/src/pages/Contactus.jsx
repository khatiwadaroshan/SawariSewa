import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#3b82f6] to-[#0ea5e9] flex items-center justify-center px-6 py-24">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-lg p-10 relative overflow-hidden">
        {/* Soft decorative blurred blobs */}
        <div className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-[#6366f1] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-70px] right-[-50px] w-52 h-52 bg-[#14b8a6] rounded-full opacity-30 blur-3xl"></div>

        <h1 className="text-4xl font-bold text-[#1e3a8a] mb-10 tracking-wide">
          Contact Us
        </h1>

        {/* Phone and Email */}
        <div className="space-y-8">
          <ContactInfo
            label="Phone Number"
            href="tel:9810504351"
            value="+977 9810504351"
          />
          <ContactInfo
            label="Email Address"
            href="mailto:support@sawarisewa.com"
            value="support@sawarisewa.com"
          />
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ label, href, value }) => (
  <div>
    <p className="text-sm font-semibold text-[#3b82f6] mb-1">{label}</p>
    <a
      href={href}
      className="relative text-lg font-medium text-gray-900 hover:text-[#0ea5e9] transition-all duration-300"
    >
      {value}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0ea5e9] transition-all duration-300 group-hover:w-full"></span>
    </a>
  </div>
);

export default ContactUs;
