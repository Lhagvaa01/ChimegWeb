import React, { useState, useEffect } from "react";

const DiscountCountdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = new Date(endDate) - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="text-red-500 text-sm p-1 bg-white rounded shadow">
      Хямдрал дуусахад: <span className="font-bold">{timeLeft.days} өдөр</span>{" "}
      <span className="font-bold">{timeLeft.hours} цаг</span>{" "}
      <span className="font-bold">{timeLeft.minutes} мин</span>{" "}
      <span className="font-bold">{timeLeft.seconds} сек</span>
    </div>
  );
};

export default DiscountCountdown;
