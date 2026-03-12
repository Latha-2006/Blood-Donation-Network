import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, Heart, Award, Trophy, Crown, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const DonorRewards = () => {
  const navigate = useNavigate();

  const availableRewards = [
    {
      id: 1,
      title: "Free Health Checkup",
      description: "Complete family health screening at partner hospitals",
      points: 100,
      icon: "🏥",
      category: "Health",
    },
    {
      id: 2,
      title: "Coffee Voucher",
      description: "Free coffee at partner cafes",
      points: 50,
      icon: "☕",
      category: "Food",
    },
  ];

  const myRewards = [
    {
      id: 1,
      title: "Coffee Voucher",
      redeemedDate: "2024-02-15",
      status: "Used",
      icon: "☕",
    },
    {
      id: 2,
      title: "Health Checkup",
      redeemedDate: "2024-01-20",
      status: "Pending",
      icon: "🏥",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Donation",
      description: "Completed your first blood donation",
      earnedDate: "2023-12-01",
      icon: Heart,
      color: "bg-success/10",
      iconColor: "text-success",
    },
    {
      id: 2,
      title: "Life Saver",
      description: "Saved 10 lives through donations",
      earnedDate: "2024-01-15",
      icon: Award,
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 3,
      title: "Regular Donor",
      description: "Donate 5 times in a year",
      earnedDate: "2024-02-01",
      icon: Trophy,
      color: "bg-accent/20",
      iconColor: "text-accent",
    },
    {
      id: 4,
      title: "Champion Donor",
      description: "Donate 20 times (Progress: 8/20)",
      progress: 40,
      icon: Crown,
      color: "bg-muted",
      iconColor: "text-muted-foreground",
      inProgress: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/donor/dashboard")}
            className="mb-4 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-1">Donor Rewards</h1>
          <p className="text-sm opacity-90">Earn points for every life you save</p>
        </div>
      </div>

      {/* Points Card */}
      <div className="max-w-6xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-primary to-accent text-white border-0 mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-300" fill="currentColor" />
                <div>
                  <div className="text-3xl font-bold">240 Points</div>
                  <div className="text-sm opacity-90">Silver Donor</div>
                </div>
              </div>
              <Badge className="bg-yellow-300 text-black hover:bg-yellow-300 font-semibold">
                Level Silver
              </Badge>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress to Gold Donor</span>
                <span>80 points to go</span>
              </div>
              <Progress value={75} className="h-2 bg-white/20" />
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="available">Available Rewards</TabsTrigger>
            <TabsTrigger value="my-rewards">My Rewards</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Available Rewards Tab */}
          <TabsContent value="available" className="space-y-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{reward.title}</h3>
                          <Badge variant="secondary" className="mb-2">
                            {reward.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {reward.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <Star className="w-4 h-4" fill="currentColor" />
                          <span>{reward.points} points</span>
                        </div>
                        <Button className="bg-success hover:bg-success/90">
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* My Rewards Tab */}
          <TabsContent value="my-rewards" className="space-y-4">
            {myRewards.map((reward) => (
              <Card key={reward.id}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{reward.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Redeemed on {reward.redeemedDate}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={reward.status === "Used" ? "secondary" : "destructive"}
                      className={
                        reward.status === "Pending" ? "bg-primary hover:bg-primary" : ""
                      }
                    >
                      {reward.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-full ${achievement.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-7 h-7 ${achievement.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                          {!achievement.inProgress && (
                            <Badge className="bg-success hover:bg-success">
                              Earned
                            </Badge>
                          )}
                        </div>
                        {achievement.inProgress ? (
                          <div className="mt-3">
                            <Progress
                              value={achievement.progress}
                              className="h-2"
                            />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-2">
                            Earned on {achievement.earnedDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default DonorRewards;
