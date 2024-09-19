import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

export default function LatestJobs() {
  //const allJobs: any = [];

  const { allJobs } = useSelector((store:any) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job:any) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );

  /*return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job: any) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );*/
}
