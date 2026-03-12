import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Clock, CheckCircle, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("doctorProfile") || "null");
  const requests = JSON.parse(localStorage.getItem("doctorRequests") || "[]");

  useEffect(() => {
    if (!profile) {
      navigate("/doctor/registration");
    }
  }, [profile, navigate]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      matched: { variant: "default" as const, icon: CheckCircle, text: "Matched" },
      fulfilled: { variant: "default" as const, icon: CheckCircle, text: "Fulfilled", className: "bg-success" },
    };

    const config = variants[status as keyof typeof variants];
    if (!config) return null;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={"className" in config ? config.className : ""}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const pendingCount = requests.filter((r: any) => r.status === "pending").length;
  const fulfilledCount = requests.filter((r: any) => r.status === "fulfilled").length;

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Doctor Dashboard</h1>
            <p className="text-sm opacity-90">Welcome, Dr. {profile.doctorName}</p>
          </div>
          <button
            onClick={() => navigate("/doctor/profile")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
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

        {/* Create Request Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate("/doctor/create-request")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Blood Request
        </Button>

        {/* Requests List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Blood Requests</h2>
          <div className="space-y-4">
            {requests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No requests yet. Create your first blood request.</p>
            )}
            {requests.map((request: any) => (
              <Card key={request.id} className="hover:shadow-md transition">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{request.bloodGroup}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm font-medium mb-1">{request.hospital}</p>
                      {request.patientName && (
                        <p className="text-xs text-muted-foreground">Patient: {request.patientName}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Requested on {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>

                  {request.urgency && (
                    <div className="mb-3">
                      <Badge
                        variant="outline"
                        className={
                          request.urgency === "critical"
                            ? "border-destructive text-destructive"
                            : request.urgency === "urgent"
                            ? "border-warning text-warning"
                            : "border-muted-foreground text-muted-foreground"
                        }
                      >
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {request.donor && (
                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Matched Donor</p>
                      <p className="text-sm font-medium">{request.donor}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorDashboard;
