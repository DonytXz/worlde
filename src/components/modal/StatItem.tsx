import React from "react";

export interface StatItemProps {
  value: number | string;
  label: string;
}

export const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-medium font-bold">{value}</span>
      <span className="text-small">{label}</span>
    </div>
  );
};

export default StatItem;
