import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Activity, TrendingUp, Droplet, Stethoscope } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Donors", value: "1,234", icon: Users, color: "text-primary" },
    { label: "Total Doctors", value: "89", icon: Stethoscope, color: "text-accent" },
    { label: "Active Requests", value: "45", icon: FileText, color: "text-warning" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-success" },
  ];

  const recentDonors = [
    { id: 1, name: "John Doe", bloodGroup: "O+", status: "active", donations: 5 },
    { id: 2, name: "Jane Smith", bloodGroup: "AB-", status: "active", donations: 3 },
    { id: 3, name: "Mike Johnson", bloodGroup: "B+", status: "inactive", donations: 2 },
  ];

  const recentDoctors = [
    { id: 1, name: "Dr. Sarah Wilson", hospital: "City General", requests: 12 },
    { id: 2, name: "Dr. James Brown", hospital: "Memorial Medical", requests: 8 },
    { id: 3, name: "Dr. Emily Davis", hospital: "Central Hospital", requests: 15 },
  ];

  const requests = [
    { id: 1, bloodGroup: "O+", doctor: "Dr. Wilson", status: "fulfilled" },
    { id: 2, bloodGroup: "AB-", doctor: "Dr. Brown", status: "pending" },
    { id: 3, bloodGroup: "B+", doctor: "Dr. Davis", status: "matched" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-warning to-primary text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-sm opacity-90">Network Overview & Management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="donors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="donors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Donors</CardTitle>
                <CardDescription>Overview of all registered blood donors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Droplet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {donor.bloodGroup} • {donor.donations} donations
                          </p>
                        </div>
                      </div>
                      <Badge variant={donor.status === "active" ? "default" : "secondary"}>
                        {donor.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Doctors</CardTitle>
                <CardDescription>Overview of all registered medical professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-accent/10">
                          <Stethoscope className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doctor.requests} requests</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blood Requests</CardTitle>
                <CardDescription>Track all blood donation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{request.bloodGroup}</p>
                          <p className="text-sm text-muted-foreground">{request.doctor}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          request.status === "fulfilled"
                            ? "default"
                            : request.status === "matched"
                            ? "secondary"
                            : "outline"
                        }
                        className={request.status === "fulfilled" ? "bg-success" : ""}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activity Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Network Activity
            </CardTitle>
            <CardDescription>Donation trends over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
              <p className="text-muted-foreground">Activity chart visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default AdminDashboard;
