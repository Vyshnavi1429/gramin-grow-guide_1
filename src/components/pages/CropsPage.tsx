import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Droplets, Bug, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCrop } from "@/contexts/CropContext";
import { indianStates, cropTypes, seasons, soilFertilityLevels } from "@/data/constants";
import cropsImage from "@/assets/crops-variety.jpg";

const CropsPage = () => {
  const { registeredCrops, addCrop } = useCrop();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [formData, setFormData] = useState({
    farmerName: "",
    state: "",
    landArea: "",
    soilFertility: "",
    season: "",
    cropType: "",
    plantingDate: "",
    harvestDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.farmerName && formData.state && formData.landArea && formData.cropType && formData.soilFertility && formData.season) {
      addCrop(formData);
      setFormData({
        farmerName: "",
        state: "",
        landArea: "",
        soilFertility: "",
        season: "",
        cropType: "",
        plantingDate: "",
        harvestDate: "",
      });
      toast({
        title: "Crop Registered Successfully!",
        description: "Your crop has been added to the registered crops list.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const suggestions = [
    { icon: Droplets, text: "Water needed tomorrow", type: "info", textHi: "कल पानी की जरूरत" },
    { icon: Bug, text: "Fertilizer required in 3 days", type: "warning", textHi: "3 दिन में उर्वरक की आवश्यकता" },
    { icon: AlertCircle, text: "Rain alert – avoid pesticides", type: "danger", textHi: "बारिश की चेतावनी - कीटनाशक से बचें" },
    { icon: Calendar, text: "Hot weather ahead – protect crops", type: "warning", textHi: "गर्म मौसम आगे - फसलों की सुरक्षा करें" },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-primary mb-4">My Crop Data / मेरी फसल डेटा</h1>
      
      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="registration">Crop Registration</TabsTrigger>
          <TabsTrigger value="registered">Registered Crops</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        {/* Crop Registration */}
        <TabsContent value="registration" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Register New Crop / नई फसल रजिस्टर करें
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmerName">Farmer Name / किसान का नाम *</Label>
                    <Input
                      id="farmerName"
                      value={formData.farmerName}
                      onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                      placeholder="Enter farmer name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / राज्य *</Label>
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
                    <Label htmlFor="landArea">Land Area (acres) / भूमि क्षेत्र *</Label>
                    <Input
                      id="landArea"
                      type="number"
                      value={formData.landArea}
                      onChange={(e) => setFormData({...formData, landArea: e.target.value})}
                      placeholder="Enter land area"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="soilFertility">Soil Fertility / मिट्टी की उर्वरता *</Label>
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
                  <div>
                    <Label htmlFor="season">Season / मौसम *</Label>
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
                    <Label htmlFor="cropType">Crop Type / फसल प्रकार *</Label>
                    <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop.split(' / ')[0].toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Soil Photo / मिट्टी की फोटो अपलोड करें</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <img src={cropsImage} alt="Sample" className="w-24 h-24 mx-auto mb-2 rounded-lg object-cover" />
                    <p className="text-sm text-muted-foreground">Click to upload soil photo</p>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                  Submit Registration / रजिस्ट्रेशन सबमिट करें
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registered Crops */}
        <TabsContent value="registered" className="space-y-4">
          {registeredCrops.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No crops registered yet. / अभी तक कोई फसल पंजीकृत नहीं है।</p>
                <p className="text-sm text-muted-foreground mt-2">Register your first crop in the Registration tab.</p>
              </CardContent>
            </Card>
          ) : (
            registeredCrops.map((crop) => (
              <Card key={crop.id} className="shadow-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <span>{crop.cropType}</span>
                      <Badge variant={crop.status === "Harvested" ? "default" : "secondary"}>
                        {crop.status}
                      </Badge>
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {crop.registrationDate}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Farm Details / खेत विवरण
                      </h4>
                      <p className="text-sm">Farmer: {crop.farmerName}</p>
                      <p className="text-sm">State: {crop.state}</p>
                      <p className="text-sm">Land Area: {crop.landArea} acres</p>
                      <p className="text-sm">Season: {crop.season}</p>
                      <p className="text-sm">Soil Fertility: {crop.soilFertility}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-success" />
                        Crop Status / फसल स्थिति
                      </h4>
                      <p className="text-sm">Crop Type: {crop.cropType}</p>
                      <p className="text-sm">Registration Date: {crop.registrationDate}</p>
                      <Badge variant={crop.status === "Planted" ? "secondary" : "default"}>
                        {crop.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Expected Yield / अपेक्षित उपज:</span>
                      <span className="text-lg font-bold text-primary">{crop.yield} quintals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* AI Suggestions */}
        <TabsContent value="suggestions" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Suggestions / AI सुझाव</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    suggestion.type === 'danger' ? 'border-l-destructive bg-destructive/5' :
                    suggestion.type === 'warning' ? 'border-l-warning bg-warning/5' :
                    'border-l-primary bg-primary/5'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        suggestion.type === 'danger' ? 'text-destructive' :
                        suggestion.type === 'warning' ? 'text-warning' :
                        'text-primary'
                      }`} />
                      <div>
                        <p className="font-medium">{suggestion.text}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.textHi}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropsPage;