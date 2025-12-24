import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight = false }) => {
  return (
    <div
      className={`
        ${smallHeight ? "h-[250px]" : "h-[70vh]"}
        flex flex-col justify-center items-center
        bg-base-100 text-base-content
      `}
    >
      <ScaleLoader
        height={35}
        width={4}
        radius={2}
        margin={2}
        color="currentColor"
      />

      <p className="mt-4 text-sm opacity-70">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
