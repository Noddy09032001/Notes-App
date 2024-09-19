import { Input } from "@/components/ui/input";
import Navbar from "../shared/navbar";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

export default function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );

  /*return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        //onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="button">Add Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )*/
}

/*
<Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
*/
