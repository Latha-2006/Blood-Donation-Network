import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Droplet, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DonorIdCard = () => {

  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [donorData, setDonorData] = useState<any>(null);

  useEffect(() => {

    const stored = localStorage.getItem("donorProfile");

    if (stored) {

      const parsed = JSON.parse(stored);

      // generate donor id if not present
      if (!parsed.id) {
        parsed.id =
          "LL-DN-" +
          Math.floor(1000 + Math.random() * 9000) +
          "-" +
          Math.floor(100000 + Math.random() * 900000);
      }

      setDonorData(parsed);

    } else {

      setDonorData({
        id: "LL-DN-0000-000000",
        name: "Unknown",
        bloodGroup: "N/A",
        address: "N/A",
        phone: "N/A",
        photo: null
      });

    }

  }, []);

  const handleDownload = async () => {

    if (!cardRef.current) return;

    try {

      const canvas = await html2canvas(cardRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "px", [600, 350]);

      pdf.addImage(imgData, "PNG", 0, 0, 600, 350);

      pdf.save("donor-id-card.pdf");

      toast.success("ID Card downloaded successfully!");

    } catch (error) {

      toast.error("Failed to download ID Card");

    }

  };

  if (!donorData) return null;

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
            <h1 className="text-2xl font-bold">Donor ID Card</h1>
            <p className="text-sm opacity-90">
              Your official donor identification
            </p>
          </div>

        </div>

      </div>

      <div className="max-w-4xl mx-auto p-6">

        <div className="space-y-6">

          {/* ID Card */}
          <div ref={cardRef}>

            <Card className="overflow-hidden shadow-xl">

              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">

                <div className="flex items-center gap-3 mb-2">
                  <Droplet className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">LifeLink</h2>
                </div>

                <p className="text-sm opacity-90">
                  Blood Donation Network
                </p>

              </div>

              <CardContent className="p-6">

                <div className="flex flex-col md:flex-row gap-6">

                  {/* Photo */}
                  <div className="flex-shrink-0">

                    {donorData.photo ? (

                      <img
                        src={donorData.photo}
                        alt="Donor"
                        className="w-32 h-32 rounded-lg object-cover border-4 border-primary/20"
                      />

                    ) : (

                      <div className="w-32 h-32 rounded-lg border-4 border-primary/20 bg-secondary flex items-center justify-center">
                        <User className="w-12 h-12 text-muted-foreground" />
                      </div>

                    )}

                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">

                    <div>

                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Donor ID
                      </p>

                      <p className="text-xl font-bold text-primary">
                        {donorData.id}
                      </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Name
                        </p>

                        <p className="font-semibold">
                          {donorData.name}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Blood Group
                        </p>

                        <div className="flex items-center gap-2">

                          <Droplet className="w-5 h-5 text-primary" />

                          <p className="font-semibold text-lg text-primary">
                            {donorData.bloodGroup}
                          </p>

                        </div>

                      </div>

                      <div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Phone
                        </p>

                        <p className="font-medium">
                          {donorData.phone}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Address
                        </p>

                        <p className="font-medium text-sm">
                          {donorData.address}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-6 pt-6 border-t">

                  <p className="text-xs text-muted-foreground text-center">
                    This card certifies that the holder is a registered blood donor with LifeLink
                  </p>

                </div>

              </CardContent>

            </Card>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/donor/dashboard")}
            >
              Back to Dashboard
            </Button>

            <Button
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download ID Card
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DonorIdCard;