import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Stethoscope, Shield, Building2 } from "lucide-react";

const RoleSelection = () => {

  const navigate = useNavigate();

  const roles = [
    {
      id: "donor",
      title: "Donor",
      description: "Register as a blood donor and help save lives",
      icon: Droplet,
      color: "text-red-500",
      path: "/donor/registration"
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Create and manage blood requests for patients",
      icon: Stethoscope,
      color: "text-blue-500",
      path: "/doctor/registration"
    },
    {
      id: "bloodbank",
      title: "Blood Bank",
      description: "Manage blood inventory and respond to requests",
      icon: Building2,
      color: "text-green-500",
      path: "/bloodbank/dashboard"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Oversee the entire blood donation network",
      icon: Shield,
      color: "text-yellow-500",
      path: "/admin/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <Droplet className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">
            Select Your Role
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose how you'd like to contribute to the LifeLink network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {roles.map((role) => {

            const Icon = role.icon;

            return (
              <Card
                key={role.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-red-500"
                onClick={() => navigate(role.path)}
              >

                <CardHeader>
                  <div className="flex items-center gap-4">

                    <div className={`p-3 rounded-lg bg-secondary ${role.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <div>
                      <CardTitle className="text-2xl">
                        {role.title}
                      </CardTitle>

                      <CardDescription className="mt-1">
                        {role.description}
                      </CardDescription>
                    </div>

                  </div>
                </CardHeader>

                <CardContent>
                  <Button className="w-full" variant="outline">
                    Continue as {role.title}
                  </Button>
                </CardContent>

              </Card>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default RoleSelection;