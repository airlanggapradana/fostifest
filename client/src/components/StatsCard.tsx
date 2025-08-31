import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({title, value, icon: Icon, color}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="w-6 h-6 text-white"/>
        </div>
      </div>
    </div>
  );
};