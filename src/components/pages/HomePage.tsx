import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Droplets, Sun, AlertTriangle, Heart, MessageCircle, Wheat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCrop } from "@/contexts/CropContext";
import heroImage from "@/assets/hero-agriculture.jpg";
import farmerProfile from "@/assets/farmer-profile.jpg";

const HomePage = () => {
  const { t } = useLanguage();
  const { registeredCrops } = useCrop();
  
  // Chart data for registered crops or default empty state
  const cropData = registeredCrops.length > 0 
    ? registeredCrops.map((crop, index) => ({
        name: crop.cropType.charAt(0).toUpperCase() + crop.cropType.slice(1),
        expected: Math.floor(Math.random() * 30) + 20, // Simulated expected yield
        actual: crop.yield || Math.floor(Math.random() * 25) + 10, // Actual yield or simulated
      }))
    : [
        { name: "No Crops", expected: 0, actual: 0 }
      ];

  const marketData = [
    { day: "Mon", rice: 2500, wheat: 2200 },
    { day: "Tue", rice: 2600, wheat: 2300 },
    { day: "Wed", rice: 2400, wheat: 2100 },
    { day: "Thu", rice: 2700, wheat: 2400 },
    { day: "Fri", rice: 2800, wheat: 2500 },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark to-primary-glow bg-clip-text text-transparent mb-2">
          {t('dashboard')}
        </h1>
        <p className="text-muted-foreground text-lg">{t('intelligentFarming')}</p>
      </div>

      {/* Crop Overview Chart */}
      <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Wheat className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">
              {registeredCrops.length > 0 ? "Registered Crops Overview / पंजीकृत फसल अवलोकन" : "No Registered Crops / कोई पंजीकृत फसल नहीं"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cropData} barCategoryGap="20%">
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 14, fontWeight: 'bold' }}
                axisLine={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <Bar 
                dataKey="expected" 
                fill="hsl(var(--primary))" 
                name={t('expected')}
                radius={[4, 4, 0, 0]}
                strokeWidth={2}
                stroke="hsl(var(--primary-dark))"
              />
              <Bar 
                dataKey="actual" 
                fill="hsl(var(--primary-glow))" 
                name={t('actual')}
                radius={[4, 4, 0, 0]}
                strokeWidth={2}
                stroke="hsl(var(--primary))"
              />
            </BarChart>
          </ResponsiveContainer>
          {registeredCrops.length === 0 && (
            <div className="text-center mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground font-medium">Register your first crop to see data here.</p>
              <p className="text-sm text-muted-foreground">अपना पहला फसल पंजीकृत करें यहाँ डेटा देखने के लिए।</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feed Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
          {t('latestUpdates')}
        </h2>
        
        {/* Government Scheme Card */}
        <Card className="shadow-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">PM-KISAN Scheme Update</h3>
                <p className="text-sm text-muted-foreground mb-2">Your next installment of ₹2,000 will be credited on 15th March</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">75% farmers received payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Prices Card */}
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-info/20 bg-gradient-to-br from-white to-info/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl text-info mb-4 flex items-center gap-2">
              <BarChart className="w-6 h-6 text-info" />
              {t('marketPrices')}
            </h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={marketData}>
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 'bold' }}
                  axisLine={{ stroke: 'hsl(var(--info))', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rice" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="wheat" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={4}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--success))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4 p-3 bg-gradient-to-r from-primary/10 to-success/10 rounded-xl">
              <span className="font-bold text-primary">Rice: ₹2,800/quintal</span>
              <span className="font-bold text-success">Wheat: ₹2,500/quintal</span>
            </div>
          </CardContent>
        </Card>

        {/* Farmer Post Card */}
        <Card className="shadow-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <img 
                src={farmerProfile} 
                alt="Farmer" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-card-foreground">Raj Kumar Patel</h4>
                <p className="text-sm text-muted-foreground mb-2">Excellent wheat harvest this season! Using organic methods increased my yield by 20%.</p>
                <img 
                  src={heroImage} 
                  alt="Crop" 
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary">
                    <Heart className="w-4 h-4" />
                    <span>24 likes</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary">
                    <MessageCircle className="w-4 h-4" />
                    <span>8 comments</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alert Card */}
        <Card className="shadow-xl border-l-8 border-l-warning bg-gradient-to-r from-warning/10 to-amber/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-xl text-warning">{t('weatherAlert')}</h3>
                  <Badge className="bg-gradient-to-r from-warning to-amber-400 text-white font-bold px-3 py-1">
                    Moderate
                  </Badge>
                </div>
                <p className="text-lg text-gray-700 font-medium">High temperature expected tomorrow (38°C). Ensure adequate water supply for crops.</p>
                <div className="flex items-center gap-3 mt-4 p-3 bg-white/80 rounded-xl">
                  <Droplets className="w-6 h-6 text-info" />
                  <span className="font-bold text-info text-lg">30% chance of rain</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;