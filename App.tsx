import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

/* DONOR */
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorRegistration from "./pages/donor/DonorRegistration";
import DonorProfile from "./pages/donor/DonorProfile";
import DonorEditProfile from "./pages/donor/DonorEditProfile";
import DonorIdCard from "./pages/donor/DonorIdCard";
import DonationStatus from "./pages/donor/DonationStatus";
import DonorRewards from "./pages/donor/DonorRewards";

/* DOCTOR */
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorRegistration from "./pages/doctor/DoctorRegistration";
import CreateRequest from "./pages/doctor/CreateRequest";

/* BLOODBANK */
import BloodBankDashboard from "./pages/bloodbank/BloodBankDashboard";
import BloodRequest from "./pages/bloodbank/BloodRequest";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <Toaster />
        <Sonner />

        <BrowserRouter>

          <Routes>

            {/* HOME */}
            <Route path="/" element={<Index />} />

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* ROLE SELECTION */}
            <Route path="/roles" element={<RoleSelection />} />

            {/* ---------------- DONOR FLOW ---------------- */}

            <Route path="/donor/registration" element={<DonorRegistration />} />

            <Route path="/donor/dashboard" element={<DonorDashboard />} />

            <Route path="/donor/profile" element={<DonorProfile />} />

            <Route path="/donor/edit-profile" element={<DonorEditProfile />} />

            <Route path="/donor/id-card" element={<DonorIdCard />} />

            <Route path="/donor/donation-status" element={<DonationStatus />} />

            <Route path="/donor/rewards" element={<DonorRewards />} />

            {/* ---------------- DOCTOR FLOW ---------------- */}

            <Route path="/doctor/registration" element={<DoctorRegistration />} />

            <Route path="/doctor/profile" element={<DoctorProfile />} />

            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

            <Route path="/doctor/create-request" element={<CreateRequest />} />


            {/* ---------------- BLOODBANK FLOW ---------------- */}

            <Route path="/bloodbank/dashboard" element={<BloodBankDashboard />} />

            <Route path="/bloodbank/request" element={<BloodRequest />} />


            {/* ---------------- ADMIN FLOW ---------------- */}

            <Route path="/admin/dashboard" element={<AdminDashboard />} />


            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />

          </Routes>

        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;