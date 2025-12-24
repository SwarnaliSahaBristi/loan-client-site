import React from "react";
import yoko from '../../../assets/images/istockphoto-1618846975-612x612.jpg';
import sydne from '../../../assets/images/expressive-woman-posing-outdoor_344912-3079.avif';
import alex from '../../../assets/images/young-man-sad-expression_1194-2829.avif';
import { Link } from "react-router";

const teamMembers = [
  { name: "Yoko Boyle", role: "CEO & Founder", img: yoko },
  { name: "Sydnee Cruz", role: "CTO", img: sydne },
  { name: "Alex Morgan", role: "Product Manager", img: alex },
];

const stats = [
  { label: "Loans Processed", value: "15K+" },
  { label: "Happy Borrowers", value: "10K+" },
  { label: "Loan Amount Disbursed", value: "$2M+" },
];

const testimonials = [
  {
    name: "Sarah J.",
    feedback: "LoanLink made the loan process seamless and stress-free. Highly recommended!",
  },
  {
    name: "James P.",
    feedback: "The fastest loan approval I’ve ever experienced. Transparent and reliable.",
  },
];

const AboutUs = () => {
  return (
    <div className="font-sans text-base-content">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-pink-400 opacity-20 rounded-tr-[50%] rounded-bl-[50%] -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
          Welcome to LoanLink
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn delay-150">
          At LoanLink, we simplify borrowing. Fast approvals, low rates, and total transparency – empowering you to achieve your goals.
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-gray-100 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="text-3xl font-bold text-pink-500">{stat.value}</p>
              <p className="mt-2 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-700">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-gray-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="w-36 h-36 rounded-full overflow-hidden mb-4 ring-4 ring-pink-200">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">{member.name}</h3>
              <p className="text-purple-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-700">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-base-100 p-6 rounded-xl shadow-md border-l-4 border-pink-500 transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-base-content italic">"{t.feedback}"</p>
              <p className="mt-4 font-semibold text-right text-purple-700">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-base-content relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-700 opacity-20 rounded-tr-[50%] rounded-bl-[50%] -z-10"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeIn">
          Ready to simplify your loans?
        </h2>
        <p className="mb-6 animate-fadeIn delay-150">
          Join thousands of borrowers who trust LoanLink today.
        </p>
        <Link to="/loan-form" className="bg-base-100 text-purple-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
          Apply for a Loan
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
