import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#FFF2E0] text-gray-900 px-8 py-12 max-w-3xl mx-auto shadow-lg rounded-xl my-12 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#f83002] tracking-wide">
        Privacy Policy
      </h1>

      <p className="mb-6 leading-relaxed text-base">
        This Privacy Policy explains how we collect, use, and protect your personal information when you use our vehicle rental platform, including car and bike rentals.
      </p>

      {/* Section */}
      <SectionHeading number="1" title="Information We Collect" />
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
        <li>Personal details (name, email, phone number, address)</li>
        <li>Government-issued ID or license (e.g., NID, driving license)</li>
        <li>Vehicle documents and photos (for rentees)</li>
        <li>Booking and payment history</li>
        <li>Device and location data (for fraud detection & GPS tracking)</li>
      </ul>

      <SectionHeading number="2" title="How We Use Your Information" />
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
        <li>To process bookings and rentals</li>
        <li>To verify renter and rentee identity</li>
        <li>To improve our platform and services</li>
        <li>To contact you regarding your account or bookings</li>
        <li>To prevent fraud and ensure safety</li>
      </ul>

      <SectionHeading number="3" title="Sharing Your Information" />
      <p className="mb-4 text-base leading-relaxed">
        We do not sell your personal data. We may share your information with:
      </p>
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
        <li>Trusted third-party services (payment processors, verification tools)</li>
        <li>Law enforcement if legally required</li>
        <li>Insurance providers (in case of accidents or claims)</li>
      </ul>

      <SectionHeading number="4" title="Data Security" />
      <p className="mb-6 text-base leading-relaxed">
        We implement appropriate security measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute protection.
      </p>

      <SectionHeading number="5" title="Your Rights" />
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
        <li>Access, update, or delete your personal information</li>
        <li>Withdraw consent at any time</li>
        <li>Contact us for privacy-related questions</li>
      </ul>

      <SectionHeading number="6" title="Cookies & Tracking" />
      <p className="mb-6 text-base leading-relaxed">
        We use cookies to enhance your experience. You can disable them in your browser settings.
      </p>

      <SectionHeading number="7" title="Changes to This Policy" />
      <p className="mb-6 text-base leading-relaxed">
        We may update this policy from time to time. Any changes will be posted on this page.
      </p>

      <SectionHeading number="8" title="Contact Us" />
      <p className="text-base leading-relaxed">
        If you have any questions about this Privacy Policy, please contact us at:
        <br />
        <span role="img" aria-label="email">
          📧
        </span>{" "}
        <a
          href="mailto:support@sawariseva.com"
          className="text-[#f83002] hover:underline font-semibold"
        >
          support@sawariseva.com
        </a>
      </p>
    </div>
  );
};

const SectionHeading = ({ number, title }) => (
  <h2 className="text-2xl font-semibold text-[#f83002] mt-10 mb-4 tracking-tight">
    {number}. {title}
  </h2>
);

export default PrivacyPolicy;
