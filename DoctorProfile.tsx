import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Hospital, Phone, Mail, MapPin, IdCard, Pencil } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("doctorProfile") || "null");

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <User className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No Profile Found</h2>
        <p className="text-muted-foreground text-center">You haven't registered yet. Please complete your registration first.</p>
        <Button onClick={() => navigate("/doctor/registration")}>Go to Registration</Button>
      </div>
    );
  }

  const requests = JSON.parse(localStorage.getItem("doctorRequests") || "[]");
  const pendingCount = requests.filter((r: any) => r.status === "pending").length;
  const fulfilledCount = requests.filter((r: any) => r.status === "fulfilled").length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {profile.doctorName?.charAt(0)?.toUpperCase() || "D"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.doctorName}</h1>
              <p className="text-sm opacity-90">{profile.hospitalName}</p>
              <Badge className="mt-1 bg-white/20 text-white border-white/30 text-xs">
                Verified Doctor
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{requests.length}</p>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-warning">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-success">{fulfilledCount}</p>
              <p className="text-sm text-muted-foreground">Fulfilled</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Professional Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/doctor/registration")}
              className="gap-2"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <IdCard className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Medical Registration ID</p>
                <p className="font-medium">{profile.registrationId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{profile.doctorName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Hospital className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Hospital</p>
                <p className="font-medium">{profile.hospitalName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Hospital Address</p>
                <p className="font-medium">{profile.hospitalAddress || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorProfile;
