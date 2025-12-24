import React from "react";

const Contact = () => {
  return (
    <div className="font-sans text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact LoanLink
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We’re here to help. Send us a message and we’ll get back to you as
          soon as possible.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Reach out to us via email, phone, or send us a message directly.
              </p>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Email:</strong> support@loanlink.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 234 567 890
                </p>
                <p>
                  <strong>Address:</strong> 123 LoanLink Ave, Financial City
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="LoanLink Location"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902263012169!2d90.39602507512252!3d23.81033159461878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4d29f9c3ef%3A0xf2e6e3c0652f8b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1639061740805!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
