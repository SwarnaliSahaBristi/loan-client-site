import AddLoanForm from "../../../components/Form/AddLoanForm";

const AddLoan = () => {
  return (
    <div>
      <h1 className="text-center py-8">
        <span className="block text-5xl font-bold text-base-content">Add Loan</span>
        <span className="block text-lg text-gray-500 mt-2">
          Create a new loan offering for your users
        </span>
      </h1>
      {/* Form */}
      <AddLoanForm />
    </div>
  );
};

export default AddLoan;
