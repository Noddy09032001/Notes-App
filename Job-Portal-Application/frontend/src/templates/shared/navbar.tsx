import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((store:any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast({
          title: "Success",
          description: res.data.message,
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );

  /*return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <a href="/admin/companies">Companies</a>
            </li>
            <li>
              <a href="/admin/jobs">Jobs</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="/browse">Browse</a>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <a href="/login">
              <button className="border px-4 py-2 rounded-md">Login</button>
            </a>
            <a href="/signup">
              <button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-4 py-2 rounded-md">
                Signup
              </button>
            </a>
          </div>

          <div>
            <div className="cursor-pointer">
              <img
                className="rounded-full w-10 h-10"
                src="profile-photo-url"
                alt="Profile"
              />
            </div>
            <div className="w-80 bg-white shadow-md p-4 rounded-lg">
              <div className="flex gap-2 space-y-2">
                <img
                  className="rounded-full w-10 h-10"
                  src="profile-photo-url"
                  alt="Profile"
                />
                <div>
                  <h4 className="font-medium">User Full Name</h4>
                  <p className="text-sm text-gray-500">User Bio</p>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-600">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <svg className="w-5 h-5"></svg>
                  <button className="text-blue-500 underline">
                    View Profile
                  </button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <svg className="w-5 h-5"></svg>
                  <button className="text-red-500 underline">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );*/
}
