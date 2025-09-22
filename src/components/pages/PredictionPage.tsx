import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, BarChart3, MapPin, Crop } from "lucide-react";
import { indianStates, cropTypes, seasons, soilFertilityLevels } from "@/data/constants";

const PredictionPage = () => {
  const [predictionType, setPredictionType] = useState("my-crop");
  const [formData, setFormData] = useState({
    state: "",
    acres: "",
    cropType: "",
    season: "",
    soilFertility: "",
  });

  const stateData = [
    { crop: "Rice", actual: 45, predicted: 48 },
    { crop: "Wheat", actual: 38, predicted: 42 },
    { crop: "Corn", actual: 32, predicted: 35 },
    { crop: "Soybean", actual: 25, predicted: 28 },
    { crop: "Cotton", actual: 18, predicted: 22 },
  ];

  // Crop yield prediction algorithm based on input parameters
  const calculatePredictedYield = () => {
    if (!formData.acres || !formData.cropType || !formData.season || !formData.soilFertility) {
      return 0;
    }

    // Base yield per acre for different crops (in quintals)
    const baseYields: { [key: string]: number } = {
      'rice': 25,
      'wheat': 30,
      'corn': 35,
      'soybean': 20,
      'cotton': 15,
      'sugarcane': 500,
      'pulses': 12,
      'millets': 18,
      'barley': 22,
      'mustard': 14
    };

    // Season multipliers
    const seasonMultipliers: { [key: string]: number } = {
      'kharif': 1.0,
      'rabi': 1.2,
      'summer': 0.8
    };

    // Soil fertility multipliers
    const fertilityMultipliers: { [key: string]: number } = {
      'low': 0.7,
      'medium': 1.0,
      'high': 1.3
    };

    const baseYield = baseYields[formData.cropType] || 20;
    const seasonMultiplier = seasonMultipliers[formData.season] || 1.0;
    const fertilityMultiplier = fertilityMultipliers[formData.soilFertility] || 1.0;
    
    const yieldPerAcre = baseYield * seasonMultiplier * fertilityMultiplier;
    const totalYield = yieldPerAcre * parseFloat(formData.acres);
    
    return Math.round(totalYield * 10) / 10; // Round to 1 decimal place
  };

  const predictedYield = calculatePredictedYield();
  const hasValidInputs = formData.acres && formData.cropType && formData.season && formData.soilFertility;

  // Dynamic prediction data based on user input
  const generateMyCropData = () => {
    if (!hasValidInputs) {
      return [
        { month: "Jan", expected: 0, actual: 0 },
        { month: "Feb", expected: 0, actual: 0 },
        { month: "Mar", expected: 0, actual: 0 },
        { month: "Apr", expected: 0, actual: 0 },
        { month: "May", expected: 0, actual: 0 },
        { month: "Jun", expected: 0, actual: 0 },
      ];
    }

    const yieldPerAcre = predictedYield / parseFloat(formData.acres);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    
    return months.map((month, index) => {
      const expectedYield = Math.round((yieldPerAcre * 0.6 + (yieldPerAcre * 0.4 * (index + 1) / 6)) * 10) / 10;
      const actualYield = index < 5 ? Math.round(expectedYield * (0.85 + Math.random() * 0.25) * 10) / 10 : 0; // Future prediction
      
      return {
        month,
        expected: expectedYield,
        actual: actualYield
      };
    });
  };

  const myCropData = generateMyCropData();

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    // Prediction is calculated automatically as user types
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Yield Prediction</h1>
        <p className="text-muted-foreground">उपज की भविष्यवाणी</p>
      </div>

      {/* Predicted Yield Display - Top Section */}
      {hasValidInputs && (
        <Card className="shadow-card bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-primary">
                  Predicted Yield / पूर्वानुमानित उपज
                </h2>
              </div>
              
              <div className="text-5xl font-bold text-primary mb-2">
                {predictedYield} <span className="text-2xl">quintals</span>
              </div>
              
              <div className="text-lg text-muted-foreground mb-4">
                Expected total yield for {formData.acres} acres of {formData.cropType}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-background/60 rounded-lg">
                  <p className="text-sm text-muted-foreground">Per Acre</p>
                  <p className="text-xl font-bold text-primary">
                    {Math.round((predictedYield / parseFloat(formData.acres)) * 10) / 10} quintals
                  </p>
                </div>
                <div className="text-center p-3 bg-background/60 rounded-lg">
                  <p className="text-sm text-muted-foreground">Season</p>
                  <p className="text-lg font-semibold capitalize">{formData.season}</p>
                </div>
                <div className="text-center p-3 bg-background/60 rounded-lg">
                  <p className="text-sm text-muted-foreground">Soil Quality</p>
                  <p className="text-lg font-semibold capitalize">{formData.soilFertility}</p>
                </div>
                <div className="text-center p-3 bg-background/60 rounded-lg">
                  <p className="text-sm text-muted-foreground">Crop Type</p>
                  <p className="text-lg font-semibold capitalize">{formData.cropType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-primary" />
            Prediction Input / भविष्यवाणी इनपुट
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="state">State / राज्य</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="acres">Land Area (acres) / भूमि क्षेत्र</Label>
                <Input
                  id="acres"
                  type="number"
                  value={formData.acres}
                  onChange={(e) => setFormData({...formData, acres: e.target.value})}
                  placeholder="Enter acres"
                />
              </div>
              <div>
                <Label htmlFor="cropType">Crop Type / फसल प्रकार</Label>
                <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.slice(0, 10).map((crop) => (
                      <SelectItem key={crop} value={crop.split(' / ')[0].toLowerCase()}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="season">Season / मौसम</Label>
                <Select value={formData.season} onValueChange={(value) => setFormData({...formData, season: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season.split(' / ')[0].toLowerCase()}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="soilFertility">Soil Fertility / मिट्टी की उर्वरता</Label>
                <Select value={formData.soilFertility} onValueChange={(value) => setFormData({...formData, soilFertility: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fertility level" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilFertilityLevels.map((level) => (
                      <SelectItem key={level} value={level.split(' / ')[0].toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Auto-collected: Rainfall, Fertilizers, Climate History
              </p>
              <p className="text-xs text-muted-foreground">
                स्वचालित एकत्रित: वर्षा, उर्वरक, जलवायु इतिहास
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Prediction Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() => setPredictionType("my-crop")}
          variant={predictionType === "my-crop" ? "default" : "outline"}
          className="h-16 flex flex-col gap-1"
        >
          <TrendingUp className="w-5 h-5" />
          <span>My Crop Data</span>
          <span className="text-xs opacity-70">मेरी फसल डेटा</span>
        </Button>
        
        <Button
          onClick={() => setPredictionType("state-data")}
          variant={predictionType === "state-data" ? "default" : "outline"}
          className="h-16 flex flex-col gap-1"
        >
          <MapPin className="w-5 h-5" />
          <span>State Data</span>
          <span className="text-xs opacity-70">राज्य डेटा</span>
        </Button>
      </div>

      {/* Prediction Results */}
      {predictionType === "my-crop" && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              My Crop Yield Prediction / मेरी फसल उपज की भविष्यवाणी
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={myCropData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Expected Yield"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Actual Yield"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Prediction Result / भविष्यवाणी परिणाम
                </h3>
                <div className="text-3xl font-bold text-primary mb-1">
                  {hasValidInputs ? `${predictedYield} quintals` : 'Enter crop details above'}
                </div>
                <p className="text-muted-foreground">
                  {hasValidInputs ? 'Expected yield for your next harvest' : 'Fill in the form to see prediction'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {hasValidInputs ? 'आपकी अगली फसल की अपेक्षित उपज' : 'भविष्यवाणी देखने के लिए फॉर्म भरें'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Average</p>
                <p className="text-xl font-bold text-success">35 quintals</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className="text-xl font-bold text-warning">+8.6%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {predictionType === "state-data" && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              State Yield Comparison / राज्य उपज तुलना
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <XAxis dataKey="crop" />
                <YAxis />
                <Bar dataKey="actual" fill="hsl(var(--muted))" name="Actual Yield" />
                <Bar dataKey="predicted" fill="hsl(var(--primary))" name="Predicted Yield" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">State Performance Analysis / राज्य प्रदर्शन विश्लेषण</h4>
              {stateData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="font-medium">{item.crop}</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {item.actual} → {item.predicted} quintals
                    </span>
                    <div className="text-xs text-success">
                      +{((item.predicted - item.actual) / item.actual * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionPage;