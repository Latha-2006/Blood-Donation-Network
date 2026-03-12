import { addDonor } from "@/lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

const DonorRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    photo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("bloodGroup", formData.bloodGroup);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("address", formData.address);

      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      // send to backend
      await addDonor(data);

      // create a clean donor object for frontend
      const donorProfile = {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        photo: formData.photo ? URL.createObjectURL(formData.photo) : null,
      };

      // save locally so other pages can read it
      localStorage.setItem("donorProfile", JSON.stringify(donorProfile));

      toast.success("Registration successful! Donor ID generated.");

      navigate("/donor/id-card");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Donor Registration</h1>
            <p className="text-sm opacity-90">
              Complete your profile to become a donor
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        <Card>

          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Please provide accurate information for your donor profile
            </CardDescription>
          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>

                <div className="flex items-center gap-4">

                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>

                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex-1"
                  />

                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>

                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>

                  </Select>

                </div>

                <div className="space-y-2">
                  <Label>Blood Group *</Label>

                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) =>
                      setFormData({ ...formData, bloodGroup: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>

                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

              </div>

              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-4">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Registering..." : "Register"}
                </Button>

              </div>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  );
};

export default DonorRegistration;