import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Heart, IdCard, Clock, Phone, CheckCircle2, UserPen } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const DonorDashboard = () => {

  const navigate = useNavigate();

  const [showHealthCheckup, setShowHealthCheckup] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [bloodRequests, setBloodRequests] = useState<any[]>([]);

  const donorProfile = JSON.parse(localStorage.getItem("donorProfile") || "{}");

  const donorName = donorProfile.name || "Donor";
  const donorBloodGroup = donorProfile.bloodGroup || "O+";

  const stats = [
    { label: "Total Donations", value: "8", color: "text-primary" },
    { label: "Lives Impacted", value: "24", color: "text-success" },
    { label: "Blood Group", value: donorBloodGroup, color: "text-primary" },
    { label: "Next Eligible", value: "Mar 15", color: "text-foreground", icon: Calendar },
  ];

  // SAMPLE REQUESTS (for demo like your video)
  useEffect(() => {

    const sampleRequests = [
      {
        _id: "1",
        bloodGroup: donorBloodGroup,
        hospital: "City Care Hospital",
        location: "Visakhapatnam",
        description: "Urgent blood required for surgery patient",
        urgency: "High",
        time: "2 hours ago"
      },
      {
        _id: "2",
        bloodGroup: donorBloodGroup,
        hospital: "Apollo Hospital",
        location: "Vizianagaram",
        description: "Accident case - emergency blood needed",
        urgency: "Critical",
        time: "30 minutes ago"
      },
      {
        _id: "3",
        bloodGroup: donorBloodGroup,
        hospital: "KGH Hospital",
        location: "Visakhapatnam",
        description: "Blood needed for ICU patient",
        urgency: "Medium",
        time: "1 hour ago"
      }
    ];

    setBloodRequests(sampleRequests);

  }, [donorBloodGroup]);

  const handleAcceptRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowHealthCheckup(true);
  };

  const handleConfirmHealthCheckup = () => {

    setShowHealthCheckup(false);

    toast.success("You accepted the donation request!");

    navigate("/donor/donation-status", {
      state: {
        eligible: true,
        requestId: selectedRequestId
      }
    });

  };

  const handleRejectHealthCheckup = () => {

    setShowHealthCheckup(false);

    toast.error("You rejected the donation request");

    navigate("/donor/donation-status", {
      state: {
        eligible: false,
        requestId: selectedRequestId
      }
    });

  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6">

        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-2xl font-bold mb-1">
                Welcome, {donorName}
              </h1>

              <p className="text-sm opacity-90">
                Ready to save lives today?
              </p>

            </div>

            <div className="flex items-center gap-3">

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/donor/id-card")}
                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
              >
                <IdCard className="w-4 h-4 mr-2" />
                My ID Card
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/donor/edit-profile")}
                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
              >
                <UserPen className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.map((stat, index) => (

            <Card key={index}>

              <div className="p-6 text-center">

                {stat.icon && (
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                )}

                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>

                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>

              </div>

            </Card>

          ))}

        </div>

        {/* REQUESTS */}
        <div>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Blood Requests Near You
            </h2>

            <span className="text-primary font-semibold">
              {bloodRequests.length} Matches
            </span>

          </div>

          <div className="space-y-4">

            {bloodRequests.map((request: any) => (

              <Card key={request._id} className="hover:shadow-md transition">

                <div className="p-6">

                  <div className="flex items-start justify-between mb-3">

                    <div className="flex items-start gap-4">

                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                        {request.bloodGroup}
                      </div>

                      <div>

                        <h3 className="font-bold text-lg mb-1">
                          {request.hospital}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.location}</span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {request.description}
                        </p>

                      </div>

                    </div>

                    <Badge variant="destructive">
                      {request.urgency}
                    </Badge>

                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{request.time}</span>
                    </div>

                    <div className="flex items-center gap-3">

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.info("Calling hospital...")}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>

                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        Accept Request
                      </Button>

                    </div>

                  </div>

                </div>

              </Card>

            ))}

          </div>

        </div>

      </div>

      {/* HEALTH CHECK */}
      <Dialog open={showHealthCheckup} onOpenChange={setShowHealthCheckup}>

        <DialogContent className="max-w-lg">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-2 text-xl">
              <Heart className="w-6 h-6 text-primary" />
              Health Check Confirmation
            </DialogTitle>

          </DialogHeader>

          <p className="text-muted-foreground mb-4">
            Before donating blood confirm your health condition.
          </p>

          <div className="flex gap-3">
            <CheckCircle2 className="text-primary" />
            <p>
              I confirm that I am healthy and eligible to donate.
            </p>
          </div>

          <div className="flex gap-3 justify-end mt-6">

            <Button
              variant="outline"
              onClick={() => setShowHealthCheckup(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleRejectHealthCheckup}
            >
              Reject
            </Button>

            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConfirmHealthCheckup}
            >
              Confirm
            </Button>

          </div>

        </DialogContent>

      </Dialog>

      <BottomNav />

    </div>
  );

};

export default DonorDashboard;