import React from "react";
import GenerateReviewData from "./GenerateReviewData";
import { useCRContext } from "./context";
import { Loader } from "lucide-react";
import DisplayData from "./DisplayResult";

function Home() {
  const { isLoading, result } = useCRContext();
 

  return (
    <main className="flex gap-3 flex-col">
      <section className="bg-slate-300 h-[70vh] flex justify-center overflow-y-scroll">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader size={50} className="animate-spin mt-14" />
            <p>Fetching Response...</p>
          </div>
        ) : (
          <div className="w-full p-6">
            {result ? (
              <DisplayData data={result} />
            ) : (
              <p>No data available. Please generate a new response.</p>
            )}
          </div>
        )}
      </section>

    
      <GenerateReviewData />
    </main>
  );
}

export default Home;
