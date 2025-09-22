import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Cloud, TrendingUp, Lightbulb, Building, Heart, MessageCircle, Share } from "lucide-react";
import farmerProfile from "@/assets/farmer-profile.jpg";
import heroImage from "@/assets/hero-agriculture.jpg";

const SocialPage = () => {
  // Sample data
  const weatherData = [
    { day: "Mon", temp: 32, humidity: 65, rainfall: 0 },
    { day: "Tue", temp: 35, humidity: 58, rainfall: 2 },
    { day: "Wed", temp: 33, humidity: 70, rainfall: 5 },
    { day: "Thu", temp: 30, humidity: 75, rainfall: 12 },
    { day: "Fri", temp: 28, humidity: 80, rainfall: 8 },
  ];

  const marketData = [
    { crop: "Rice", price: 2800, change: "+5%" },
    { crop: "Wheat", price: 2500, change: "+2%" },
    { crop: "Corn", price: 1800, change: "-3%" },
    { crop: "Soybean", price: 4200, change: "+8%" },
  ];

  const schemeData = [
    { name: "PM-KISAN", beneficiaries: 12000000 },
    { name: "Crop Insurance", beneficiaries: 8500000 },
    { name: "Soil Health", beneficiaries: 6200000 },
    { name: "Organic Farming", beneficiaries: 4800000 },
  ];

  const cropOverview = [
    { name: "Rice", value: 35, color: "hsl(var(--primary))" },
    { name: "Wheat", value: 28, color: "hsl(var(--success))" },
    { name: "Others", value: 37, color: "hsl(var(--accent))" },
  ];

  const farmerPosts = [
    {
      id: 1,
      name: "Rajesh Kumar",
      content: "Great harvest this season! Thanks to the new irrigation techniques, my yield increased by 25%.",
      contentHi: "इस सीजन बेहतरीन फसल! नई सिंचाई तकनीकों की बदौलत मेरी पैदावार 25% बढ़ गई।",
      image: heroImage,
      likes: 45,
      comments: 12,
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Priya Sharma",
      content: "Organic farming is the future! My tomatoes are healthier and fetch better prices in the market.",
      contentHi: "जैविक खेती ही भविष्य है! मेरे टमाटर स्वस्थ हैं और बाजार में बेहतर कीमत मिलती है।",
      image: null,
      likes: 32,
      comments: 8,
      time: "5 hours ago"
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Social Feed</h1>
        <p className="text-sm text-muted-foreground">सामाजिक फ़ीड</p>
      </div>

      {/* Crop Overview Mini Chart */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Crop Overview / आपकी फसल का अवलोकन</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={cropOverview}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                dataKey="value"
              >
                {cropOverview.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {cropOverview.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="schemes">Schemes</TabsTrigger>
        </TabsList>

        {/* Weather Tab */}
        <TabsContent value="weather" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary" />
                Weather Forecast / मौसम पूर्वानुमान
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weatherData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line type="monotone" dataKey="temp" stroke="hsl(var(--warning))" strokeWidth={2} name="Temp (°C)" />
                  <Line type="monotone" dataKey="humidity" stroke="hsl(var(--primary))" strokeWidth={2} name="Humidity %" />
                  <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--success))" strokeWidth={2} name="Rainfall (mm)" />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 bg-warning/10 rounded">
                  <p className="text-sm font-semibold text-warning">32°C</p>
                  <p className="text-xs">Avg Temp</p>
                </div>
                <div className="p-2 bg-primary/10 rounded">
                  <p className="text-sm font-semibold text-primary">70%</p>
                  <p className="text-xs">Humidity</p>
                </div>
                <div className="p-2 bg-success/10 rounded">
                  <p className="text-sm font-semibold text-success">5mm</p>
                  <p className="text-xs">Rainfall</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Market Prices / बाजार मूल्य
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{item.crop}</span>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price}/quintal</p>
                      <Badge variant={item.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={150} className="mt-4">
                <BarChart data={marketData}>
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Bar dataKey="price" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-4">
          {farmerPosts.map((post) => (
            <Card key={post.id} className="shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img 
                    src={farmerProfile} 
                    alt={post.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-card-foreground">{post.name}</h4>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="text-sm text-card-foreground mb-1">{post.content}</p>
                    <p className="text-xs text-muted-foreground mb-2">{post.contentHi}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments} comments</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Schemes Tab */}
        <TabsContent value="schemes" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Government Schemes / सरकारी योजनाएं
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={schemeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="beneficiaries" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-4">
                {schemeData.map((scheme, index) => (
                  <div key={index} className="p-3 bg-success/5 border border-success/20 rounded-lg">
                    <h4 className="font-semibold text-success">{scheme.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {(scheme.beneficiaries / 1000000).toFixed(1)}M beneficiaries
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Chat Box Placeholder */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Community Chat / सामुदायिक चैट</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Chat feature coming soon!</p>
            <p className="text-sm">चैट सुविधा जल्द आ रही है!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialPage;