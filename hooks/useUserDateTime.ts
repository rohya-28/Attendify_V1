import { useEffect, useState } from 'react';

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date(),
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' }), // e.g., 'Sunday'
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      setCurrentDateTime({
        date: newDate,
        day: newDate.toLocaleDateString('en-US', { weekday: 'long' }),
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return currentDateTime;
};

export default useCurrentDateTime;
