import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import sarah from '../../assets/images/expressive-woman-posing-outdoor_344912-3079.avif'
import James from '../../assets/images/young-man-sad-expression_1194-2829.avif'
import emily from '../../assets/images/istockphoto-1618846975-612x612.jpg'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    feedback:
      "LoanLink made getting a loan incredibly easy. The approval was fast and transparent.",
    image: sarah,
    rating: 5,
  },
  {
    name: "James Parker",
    role: "Freelancer",
    feedback:
      "I loved how simple the process was. No hidden fees and excellent customer support.",
    image: James,
    rating: 4,
  },
  {
    name: "Emily Chen",
    role: "Startup Founder",
    feedback:
      "LoanLink helped me fund my startup when banks said no. Highly recommended!",
    image: emily,
    rating: 5,
  },
];

const CustomerFeedback = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Real stories from borrowers who trust LoanLink
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex justify-center items-center">
          {testimonials.map((t, index) => {
            const isActive = index === current;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out
                  ${
                    isActive
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-0 scale-95 z-10"
                  }
                `}
              >
                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-10 rounded-3xl shadow-2xl max-w-xl text-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-pink-500"
                  />

                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    “{t.feedback}”
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mt-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < t.rating
                            ? "text-pink-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <h4 className="mt-6 text-lg font-semibold text-gray-800 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                current === i
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
