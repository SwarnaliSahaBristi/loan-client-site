import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../components/Usetitle/useTitle";
import { imageUpload, saveOrUpdataUser } from "../../utils";

const SignUp = () => {
  useTitle("Sign Up");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const onSubmit = async (data) => {
    const { name, email, password, role, image } = data;
    try {
      const imageUrl = await imageUpload(image[0]);
      await createUser(email, password);
      await updateUserProfile(name, imageUrl);
      await saveOrUpdataUser({ name, email, image: imageUrl, role });
      toast.success("Registration successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-100 shadow">
        <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <input {...register("name", { required: "Name is required" })} placeholder="Full Name" className="input input-bordered w-full" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

          <input type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="file-input file-input-bordered w-full" />
          
          <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email" className="input input-bordered w-full" />

          <select {...register("role", { required: true })} className="select select-bordered w-full">
            <option value="borrower">Borrower</option>
            <option value="manager">Manager</option>
          </select>

          {/* Optimized Password Validation */}
          <input
            type="password"
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                message: "Must include uppercase and lowercase letters"
              }
            })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

          <button type="submit" className="btn btn-primary w-full">
            {loading ? <TbFidgetSpinner className="animate-spin mx-auto" /> : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;