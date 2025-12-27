import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { TbFidgetSpinner } from "react-icons/tb";
import useTitle from "../Usetitle/useTitle";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddLoanForm = () => {
  useTitle("Add Loan");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [emiPlans, setEmiPlans] = useState([""]);

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/loans", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan added successfully!");
      reset();
      setEmiPlans([""]);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleEMIChange = (index, value) => {
    const updated = [...emiPlans];
    updated[index] = value;
    setEmiPlans(updated);
  };

  const addEMIField = () => setEmiPlans([...emiPlans, ""]);
  const removeEMIField = (index) =>
    setEmiPlans(emiPlans.filter((_, i) => i !== index));

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.image?.[0]) {
        imageUrl = await imageUpload(data.image[0]);
      }
      const payload = {
        loanImage: imageUrl,
        loanTitle: data.title,
        description: data.description,
        category: data.category,
        interestRate: parseFloat(data.interestRate),
        maxLimit: data.maxLoanLimit,
        emiPlans: emiPlans.filter((p) => p.trim() !== ""),
        requiredDocuments: data.requiredDocuments
          .split(",")
          .map((doc) => doc.trim())
          .filter((doc) => doc !== ""),
        showOnHome: data.showOnHome || false,
        createdBy: user?.email,
        createdAt: new Date().toISOString(),
      };
      await mutateAsync(payload);
    } catch (err) {
      toast.error("Failed to add loan. Please check your connection.");
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-base-content rounded-xl bg-base-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              {...register("title")}
              placeholder="Loan Title"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <select
              {...register("category")}
              required
              className="w-full px-4 py-3 border rounded bg-base-100 text-base-content"
            >
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Home">Home</option>
            </select>
            <input
              {...register("requiredDocuments")}
              placeholder="Required Documents (comma separated)"
              className="w-full px-4 py-3 border rounded"
              required
            />
            {/* Dynamic EMI Plans */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                EMI Plans
              </label>
              {emiPlans.map((plan, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={plan}
                    onChange={(e) => handleEMIChange(index, e.target.value)}
                    placeholder="E.g. 6 months"
                    className="flex-1 px-4 py-2 border rounded"
                    required
                  />
                  {emiPlans.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEMIField(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEMIField}
                className="text-blue-500 mt-1"
              >
                + Add EMI Plan
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <input
              {...register("interestRate")}
              type="number"
              step="0.01"
              placeholder="Interest Rate (%)"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <input
              {...register("maxLoanLimit")}
              type="number"
              placeholder="Max Loan Limit"
              className="w-full px-4 py-3 border rounded"
              required
            />
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border rounded cursor-pointer"
            />

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                {...register("showOnHome")}
                className="w-5 h-5 accent-lime-500"
              />
              <label>Show on Home</label>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full mt-5 btn btn-gradient">
          {isLoading ? (
            <TbFidgetSpinner className="animate-spin mx-auto" />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddLoanForm;
