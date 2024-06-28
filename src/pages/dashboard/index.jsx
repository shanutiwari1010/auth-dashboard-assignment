import React from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getUsersList } from "@/api/users";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUsersList(),
    queryKey: ["users-list"],
    refetchOnWindowFocus: true,
  });

  return (
    <div className="flex-1 md:flex h-screen relative">
      <Header />
      <main className="bg-gray-50 py-6 px-9 mt-12 w-full h-fit flex flex-col gap-10">
        <section>
          <DataTable data={data?.data} loading={isLoading} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
