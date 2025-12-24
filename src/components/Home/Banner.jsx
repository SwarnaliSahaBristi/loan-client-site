import { motion } from "framer-motion";
import { Link } from "react-router";
import hero1 from "../../assets/images/hero-main.jpg";
import hero2 from "../../assets/images/icon1.jpg";
import hero3 from "../../assets/images/icon2.jpg";
import hero4 from "../../assets/images/icon3.jpg";
import hero5 from "../../assets/images/icon4.jpg";

const Banner = () => {
  const heroes = [hero1, hero2, hero3, hero4, hero5];

  return (
    <section className="relative overflow-hidden bg-base-100 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 lg:px-0">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-pink-600 mb-6">
            Quick & Flexible Personal Loans
          </h1>
          <p className="text-base-content text-lg mb-8">
            Get your loan approved in 24 hours with easy repayment options
            designed for you. Safe, secure, and fast.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/loan-form" className="btn btn-gradient">
              Apply for Loan
            </Link>
            <Link to="/all-loans" className="btn btn-outline">
              Explore Loans
            </Link>
          </div>
        </div>

        {/* Sliding Hero Images */}
        <div className="flex-1 relative overflow-hidden h-[400px] lg:h-[500px]">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {/* Original set */}
            {heroes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Hero ${index}`}
                className="w-[500px] lg:w-80 h-[400px] object-cover rounded-xl shadow-lg"
              />
            ))}
            {/* Duplicate set for seamless scroll */}
            {heroes.map((img, index) => (
              <img
                key={"dup-" + index}
                src={img}
                alt={`Hero dup ${index}`}
                className="w-[500px] lg:w-80 h-[400px] object-cover rounded-xl shadow-lg"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
