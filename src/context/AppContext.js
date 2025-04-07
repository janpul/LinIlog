import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [signatures, setSignatures] = useState(0);

  const incrementSignatures = () => {
    setSignatures(prevSignatures => prevSignatures + 1);
  };

  return (
    <AppContext.Provider value={{ signatures, incrementSignatures }}>
      {children}
    </AppContext.Provider>
  );
};