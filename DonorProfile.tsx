import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Phone, Mail, MapPin, Droplet, Calendar, IdCard, Pencil } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const DonorProfile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("donorProfile") || "null");

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <User className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No Profile Found</h2>
        <p className="text-muted-foreground text-center">You haven't registered yet. Please complete your registration first.</p>
        <Button onClick={() => navigate("/donor/registration")}>Go to Registration</Button>
      </div>
    );
  }

  const age = profile.dob
    ? Math.floor((Date.now() - new Date(profile.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/donor/dashboard")}
            className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden text-2xl font-bold">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile.name?.charAt(0)?.toUpperCase() || "D"
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-sm opacity-90">{profile.bloodGroup} • {age ? `${age} yrs` : ""}</p>
              <Badge className="mt-1 bg-white/20 text-white border-white/30 text-xs">
                Verified Donor
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Donor ID Card */}
        <Card className="border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <IdCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Donor ID</p>
                  <p className="font-bold text-primary">{profile.id}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate("/donor/id-card")}>
                View ID Card
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Donations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-success">24</p>
              <p className="text-sm text-muted-foreground">Lives Saved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-accent">
                <Droplet className="w-7 h-7 mx-auto text-primary" />
              </p>
              <p className="text-sm text-muted-foreground">{profile.bloodGroup}</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/donor/edit-profile")}
              className="gap-2"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Date of Birth</p>
                <p className="font-medium">
                  {profile.dob ? new Date(profile.dob).toLocaleDateString() : "—"}
                  {age ? ` (${age} years)` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="font-medium capitalize">{profile.gender || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Droplet className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Blood Group</p>
                <p className="font-medium">{profile.bloodGroup}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium">{profile.phone || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="font-medium">{profile.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{profile.address || "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default DonorProfile;
