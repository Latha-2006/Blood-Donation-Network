import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const BloodRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalAddress: "",
    contactPerson: "",
    contactNumber: "",
    patientName: "",
    patientAge: "",
    bloodType: "",
    unitsRequired: "",
    urgency: "",
    reasonForRequest: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.hospitalName || !formData.contactNumber || !formData.bloodType || !formData.unitsRequired || !formData.urgency) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Blood request submitted successfully! The blood bank will process your request.");
    navigate("/bloodbank/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-destructive to-primary text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/bloodbank/dashboard")}
            className="text-white hover:bg-white/20 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Droplet className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Blood Request Form</h1>
              <p className="text-sm opacity-90">Request blood from Central Blood Bank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Hospital Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name *</Label>
                <Input
                  id="hospitalName"
                  placeholder="Enter hospital name"
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hospitalAddress">Hospital Address</Label>
                <Input
                  id="hospitalAddress"
                  placeholder="Enter hospital address"
                  value={formData.hospitalAddress}
                  onChange={(e) => handleInputChange("hospitalAddress", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Doctor/Staff name"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="+1 234-567-8900"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Patient Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    placeholder="Enter age"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange("patientAge", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blood Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Blood Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type *</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleInputChange("bloodType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
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
                  <Label htmlFor="unitsRequired">Units Required *</Label>
                  <Input
                    id="unitsRequired"
                    type="number"
                    placeholder="Number of units"
                    min="1"
                    value={formData.unitsRequired}
                    onChange={(e) => handleInputChange("unitsRequired", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => handleInputChange("urgency", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical - Immediate (within 1 hour)</SelectItem>
                    <SelectItem value="urgent">Urgent - Within 4 hours</SelectItem>
                    <SelectItem value="routine">Routine - Within 24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reasonForRequest">Reason for Request</Label>
                <Textarea
                  id="reasonForRequest"
                  placeholder="Surgery, emergency, transfusion, etc."
                  value={formData.reasonForRequest}
                  onChange={(e) => handleInputChange("reasonForRequest", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/bloodbank/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;
