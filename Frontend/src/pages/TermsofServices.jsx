import React from "react";


const TermsOfService = () => {
  return (
    
    <div className="bg-white text-gray-800 px-6 py-10 max-w-4xl mx-auto shadow-md rounded-lg my-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Terms of Service
      </h1>
      <p className="text-sm text-center mb-2">
        Effective Date: <span className="font-medium">2082-02-05</span>
      </p>
      <p className="text-sm text-center mb-6">
        Last Updated: <span className="font-medium">2082-03-10</span>
      </p>

      <section className="mb-6">
        <p>
          Welcome to <span className="font-semibold">SawariSewa</span>! These
          Terms of Service ("Terms") govern your use of our vehicle renting
          system for bikes and cars.
        </p>
        <p className="mt-2 font-semibold">
          By using our service, you agree to these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          1. Eligibility
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You must be at least 18 years old.</li>
          <li>A valid driving license is required to rent any vehicle.</li>
          <li>All provided information must be true and up to date.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          2. Booking & Payments
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Bookings must be made through our platform.</li>
          <li>Advance payment is required to confirm the booking.</li>
          <li>We support digital payments like eSewa, Khalti, etc.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          3. Cancellations & Refunds
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Free cancellation within 1 hour of booking.</li>
          <li>
            Partial refund for cancellations made at least 24 hours in advance.
          </li>
          <li>No refund for same-day cancellations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          4. Vehicle Usage Rules
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the vehicle responsibly and legally.</li>
          <li>Only the registered user can drive the vehicle.</li>
          <li>Do not overload or misuse the vehicle.</li>
          <li>Return the vehicle in its original condition.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          5. Damage & Liability
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Renters are liable for any damage, theft, or fines.</li>
          <li>Charges apply for damages, repairs, or cleaning.</li>
        </ul>
      </section>

      <p className="mt-6 text-center">
        Have questions?{" "}
        <a
          href="/Contact"
          className="text-blue-600 hover:underline font-medium"
        >
          Contact our support team
        </a>{" "}
        or email us at{" "}
        <a
          href="mailto:sawarisewa@gmail.com"
          className="text-blue-600 hover:underline font-medium"
        >
          sawarisewa@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
