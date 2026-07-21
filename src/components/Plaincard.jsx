import React from "react";

const PlainCard = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full rounded-2xl border border-gray-500/50 bg-transparent p-6 shadow-[0_0_40px_-12px_#38bdf855] ${className}`}
    >
      {children}
    </div>
  );
};

export default PlainCard;