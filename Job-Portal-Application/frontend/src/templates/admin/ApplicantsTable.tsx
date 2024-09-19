import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";

export default function ApplicantsTable() {

  const shortlistingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store:any) => store.application);
  const {toast} = useToast()

  const statusHandler = async (status: any, id: any) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
        })
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item:any) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status: any, index: any) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );

  /*return (
    <div>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <caption className="text-gray-600 text-sm my-2">
          A list of your recent applied users
        </caption>
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
            <th className="border border-gray-300 px-4 py-2">Resume</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">
              johndoe@example.com
            </td>
            <td className="border border-gray-300 px-4 py-2">1234567890</td>
            <td className="border border-gray-300 px-4 py-2">
              <a
                href="#"
                target="_blank"
                className="text-blue-600 cursor-pointer"
              >
                Resume.pdf
              </a>
            </td>
            <td className="border border-gray-300 px-4 py-2">2024-12-17</td>
            <td className="border border-gray-300 px-4 py-2 text-right">
              <div className="relative inline-block">
                <button className="p-2 rounded hover:bg-gray-200">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10 hidden group-hover:block">
                  <div className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100">
                    <span>Accepted</span>
                  </div>
                  <div className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100">
                    <span>Rejected</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );*/
}
