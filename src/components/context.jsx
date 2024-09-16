import React, { createContext, useContext, useState } from "react";

const CRContext = createContext();

const CRContextProvider = ({ children }) => {
  const [job, setJob] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [result, setResult] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isFinalData, setisFinalData] = useState('');


  return (
    <CRContext.Provider value={{ job, setJob, isFinalData, setisFinalData, customerName, setCustomerName ,result, setResult, setisLoading, isLoading}}>
      {children}
    </CRContext.Provider>
  );
};

const useCRContext = () => {
  const context = useContext(CRContext);

  if (!context) {
    throw new Error("useCRContext must be used within a CRContextProvider");
  }

  return context;
};

export { CRContextProvider, useCRContext };
