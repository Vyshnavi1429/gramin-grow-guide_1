import { BarChart3, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: "home", icon: BarChart3, label: t('home') },
    { id: "crops", icon: TrendingUp, label: t('myCrops') },
    { id: "social", icon: Users, label: t('social') },
    { id: "prediction", icon: BarChart3, label: t('prediction') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary/5 via-white to-primary/5 border-t border-primary/20 shadow-2xl backdrop-blur-sm z-50">
      <div className="flex justify-around items-center py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-3 min-w-0 flex-1 transition-all duration-300 rounded-xl mx-1 ${
                isActive 
                  ? "text-white bg-gradient-to-t from-primary-dark to-primary-glow scale-110 shadow-lg" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${isActive ? "text-white" : ""}`} />
              <span className={`text-sm font-semibold ${isActive ? "text-white" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;