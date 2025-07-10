import React, { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    console.log("Message sent to support:", message);
    toast.success("Message sent to support team!");
    setMessage("");
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/70 border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
           Contact Support
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 transition placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
             Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
