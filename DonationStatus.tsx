import { Button } from "@/components/ui/button";
import { CheckCircle2, X, Heart, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const DonationStatus = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const isEligible = location.state?.eligible ?? false;
  const requestId = location.state?.requestId ?? null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">

      <div className="max-w-lg w-full bg-card rounded-2xl shadow-lg p-8">

        {/* ICON */}
        <div className="flex justify-center mb-6">

          {isEligible ? (

            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" strokeWidth={2.5} />
            </div>

          ) : (

            <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-16 h-16 text-red-600" strokeWidth={2.5} />
            </div>

          )}

        </div>


        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-4">

          {isEligible ? "Eligible to Donate!" : "Not Eligible"}

        </h1>


        {/* MESSAGE */}
        {isEligible ? (

          <p className="text-lg text-green-600 font-semibold text-center mb-4">
            You are eligible to donate blood!
          </p>

        ) : (

          <p className="text-lg text-red-600 font-semibold text-center mb-4">
            You are not eligible to donate blood at this time.
          </p>

        )}


        {/* DESCRIPTION */}
        <p className="text-muted-foreground text-center mb-6">

          {isEligible
            ? "Thank you for helping save lives. The hospital will contact you soon."
            : "Please consult a healthcare provider before attempting donation again."}

        </p>


        {/* INFO BOX */}
        {isEligible ? (

          <div className="bg-accent/10 border border-primary/20 rounded-lg p-4 mb-8">

            <div className="flex items-center justify-center gap-2 text-foreground">

              <Heart className="w-5 h-5 text-primary" />

              <span className="font-semibold">
                One donation can save up to 3 lives
              </span>

            </div>

          </div>

        ) : (

          <div className="bg-muted/50 rounded-lg p-4 mb-8">

            <div className="flex items-center justify-center gap-2 text-foreground">

              <Phone className="w-5 h-5" />

              <span className="font-medium">
                Contact your doctor for health guidance
              </span>

            </div>

          </div>

        )}


        {/* BUTTONS */}
        <div className="space-y-3">

          <Button
            className="w-full h-12"
            onClick={() => navigate("/donor/dashboard")}
          >
            Return to Dashboard
          </Button>

          {isEligible && (

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => navigate("/donor/rewards")}
            >
              View Rewards
            </Button>

          )}

        </div>

      </div>

    </div>
  );
};

export default DonationStatus;