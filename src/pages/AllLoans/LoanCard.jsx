import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  const {
    _id,
    loanImage,
    loanTitle,
    category,
    interestRate,
    maxLimit,
  } = loan;

  return (
    <div className="
        group bg-base-100 border border-base-300
        rounded-2xl overflow-hidden
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl hover:border-pink-500
        cursor-pointer
      ">
      <figure className="px-4 pt-4">
        <img
          src={loanImage}
          alt={loanTitle}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-bold">
          {loanTitle}
        </h2>

        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{category}</span>
        </p>

        <p className="text-sm">
          Interest: <span className="font-semibold">{interestRate}</span>
        </p>

        <p className="text-sm">
          Max Limit: <span className="font-semibold">৳{maxLimit}</span>
        </p>

        <div className="card-actions mt-4">
          <Link
            to={`/loans/${_id}`}
            className="btn btn-gradient w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
