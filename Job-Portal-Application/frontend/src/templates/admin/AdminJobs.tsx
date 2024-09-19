import { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );

  /*return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="w-fit border border-gray-300 rounded p-2"
            placeholder="Filter by name, role"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            New Jobs
          </button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );*/
}
