import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const ChartCard = () => {
  const [trend, setTrend] = useState<"up" | "down">("up");
  const [percentage, setPercentage] = useState(65);
  const [message, setMessage] = useState("🔥 Jogo está pagando!");

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrend = Math.random() > 0.5 ? "up" : "down";
      const newPercentage = Math.floor(Math.random() * 60) + 20;
      
      setTrend(newTrend);
      setPercentage(newPercentage);
      
      if (newTrend === "up") {
        setMessage("🔥 Jogo está pagando!");
      } else {
        setMessage("❄️ Chuva de azuis passando...");
      }
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h2 className="text-sm font-semibold text-foreground mb-3">Gráfico:</h2>
      
      <div className="bg-background rounded-lg p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Tendência Aviator</span>
          <div className={`flex items-center gap-1 ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-xs font-bold">{percentage}%</span>
          </div>
        </div>
        
        <div className="h-24 flex items-end gap-1">
          {[...Array(20)].map((_, i) => {
            const height = Math.random() * 100;
            const isPositive = Math.random() > 0.4;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t ${isPositive ? 'bg-success' : 'bg-destructive'} transition-all duration-500`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>

      <div className={`text-center py-2 px-3 rounded-lg ${trend === "up" ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"}`}>
        <p className={`text-sm font-semibold ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {message}
        </p>
      </div>
    </div>
  );
};