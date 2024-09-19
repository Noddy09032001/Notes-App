import Navbar from "../shared/navbar";

export default function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Niranjan"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="my-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="niranjan@gmail.com"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="my-2">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="98364327532"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="my-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="jbrkqj3bewken"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <label>Student</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <label>Recruiter</label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>Profile</label>
              <input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 my-4 rounded"
          >
            Signup
          </button>
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}
