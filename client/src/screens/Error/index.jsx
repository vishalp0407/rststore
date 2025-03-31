import { Link } from "react-router-dom";

import Footer from "@components/Footer";
import Header from "@components/Header";

const ErrorScreen = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <div className="grid flex-grow place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-slate-600">
            couldn&apos;t find the page You&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              className="roundedpmd bg-indigo-600 px-3 5 py-2 5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              to="/"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorScreen;
