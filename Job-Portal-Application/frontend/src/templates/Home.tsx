import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import Footer from "./shared/footer";
import Navbar from "./shared/navbar";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs";

export default function Home() {
  useGetAllJobs();
  const { user } = useSelector((store: any) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}
