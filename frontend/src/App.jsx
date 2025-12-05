import { useState } from "react";
import EnquiryForm from "./components/EnquiryForm";
import EnquiryList from "./components/EnquiryList";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleFormSuccess() {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-3 py-4 sm:px-4 sm:py-6">
      <div className="w-full max-w-6xl">
        <header className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            Customer Enquiry Manager
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1 max-w-2xl">
            A small app to collect customer enquiries and view them in a simple list.
          </p>
        </header>

        <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-[1.1fr,1.4fr] items-start">
          {/* Left: Form */}
          <section className="bg-white rounded-xl shadow-sm shadow-slate-200 border border-slate-200/80 p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                New Enquiry
              </h2>
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-medium px-2 py-0.5">
                Create
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mb-2 sm:mb-3">
              Fill in the details below to add a new enquiry.
            </p>
            <EnquiryForm onSuccess={handleFormSuccess} />
          </section>

          {/* Right: List */}
          <section className="bg-white rounded-xl shadow-sm shadow-slate-200 border border-slate-200/80 p-3 sm:p-4 md:p-5">
            <div className="flex flex-col gap-1 mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Enquiries
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Below is the list of all enquiries that have been submitted.
              </p>
            </div>
            <EnquiryList refreshTrigger={refreshTrigger} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
