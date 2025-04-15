import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <ClipLoader color="#4338ca" size={50} />
    </div>
  );
};

export default Loader;
