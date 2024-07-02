import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { getUsersList } from "@/api/users";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUsersList();
        const data = response?.data;
        setTableData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex-1 md:flex h-screen relative">
      <Header />
      <main className="bg-gray-50 py-6 px-9 mt-12 w-full h-fit flex flex-col gap-10">
        <section>
          <DataTable data={tableData} loading={isLoading} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
