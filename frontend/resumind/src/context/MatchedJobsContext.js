// src/context/MatchedJobsContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const MatchedJobsContext = createContext();

export const MatchedJobsProvider = ({ children }) => {
  const [matchedJobs, setMatchedJobs] = useState(() => {
    const saved = localStorage.getItem('matchedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('matchedJobs', JSON.stringify(matchedJobs));
  }, [matchedJobs]);

  const addMatchedJob = (job) => {
    setMatchedJobs((prev) => [...prev, job]);
  };

  return (
    <MatchedJobsContext.Provider value={{ matchedJobs, addMatchedJob }}>
      {children}
    </MatchedJobsContext.Provider>
  );
};

export const useMatchedJobs = () => useContext(MatchedJobsContext);