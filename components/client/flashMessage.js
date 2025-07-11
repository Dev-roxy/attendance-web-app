"use client";
import React, { useState, useEffect } from 'react';

const FlashMessage = ({ message, success ,callback}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0));
    }, 30); // Adjust speed as necessary (30ms per step)

    if (progress === 0) {
      setVisible(false);
      clearInterval(interval);
      callback("");
    }

    return () => clearInterval(interval);
  }, [progress, callback]);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-lg max-w-[300px] text-white 
        ${success ? 'bg-green-500' : 'bg-red-500'} text-gray-400`}
    >
      <div>{message}</div>
      <div className="w-full bg-gray-200 h-1 mt-2 rounded">
        <div
          style={{ width: `${progress}%` }}
          className={`h-1 transition-all duration-75 ${success ? 'bg-green-300' : 'bg-red-300'}`}
        ></div>
      </div>
    </div>
  );
};

export default FlashMessage;
