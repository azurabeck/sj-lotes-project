'use client';

import Sidebar from './Sidebar';
import { DashboardProps } from "../types/dashboard.types"; 

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="fixed h-full p-6 right-0 left-[256px] flex-grow p-8 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
