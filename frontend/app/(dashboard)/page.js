import DashboardSection from "@/components/Dashboard/DashboardSection";
import StatsCards from "@/components/Dashboard/StatsCards";
import React from "react";

const page = () => {
  return (
    <div className="mt-10">
      <StatsCards />
      <DashboardSection />
    </div>
  );
};

export default page;
