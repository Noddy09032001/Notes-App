import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./templates/Home";
import Signup from "./templates/auth/signup";
import JobDescription from "./templates/JobDescription";
import Browse from "./templates/Browse";
import Companies from "./templates/admin/Companies";
import CompanyCreate from "./templates/admin/CompanyCreate";
import CompanySetup from "./templates/admin/CompanySetup";
import AdminJobs from "./templates/admin/AdminJobs";
import PostJob from "./templates/admin/PostJob";
import Applicants from "./templates/admin/Applicants";
import ProtectedRoute from "./templates/admin/ProtectedRoute";
import Profile from "./templates/Profile";
import Jobs from "./templates/Jobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  /*{
    path: '/login',
    element: <Login />
  },*/
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
