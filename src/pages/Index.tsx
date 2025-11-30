import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { AnalysisCard } from "@/components/AnalysisCard";
import { EntryCard } from "@/components/EntryCard";
import { ChartCard } from "@/components/ChartCard";
import { NotificationCard } from "@/components/NotificationCard";
import { Footer } from "@/components/Footer";
import { WelcomeDialog } from "@/components/WelcomeDialog";
import { LoginSheet } from "@/components/LoginSheet";

type Candle = {
  value: string;
  color: string;
};

type Entry = {
  after: string;
  target: string;
  attempts: number;
} | null;

const Index = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [entry, setEntry] = useState<Entry>(null);
  const [countdown, setCountdown] = useState(10);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateMultiplier = (): number => {
    const rand = Math.random();
    if (rand < 0.5) return parseFloat((Math.random() * 0.99 + 1.0).toFixed(2));
    if (rand < 0.85) return parseFloat((Math.random() * 7.99 + 2.0).toFixed(2));
    return parseFloat((Math.random() * 10 + 10.0).toFixed(2));
  };

  const getColorForMultiplier = (value: number): string => {
    if (value >= 1.0 && value < 2.0) return "text-[#3b82f6]";
    if (value >= 2.0 && value < 10.0) return "text-[#a855f7]";
    return "text-[#ec4899]";
  };

  const calculateEntry = (candlesData: Candle[]): Entry => {
    const values = candlesData.map(c => parseFloat(c.value.replace('x', '')));
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const hasHighValue = values.some(v => v >= 10.0);
    
    if (avg >= 5.0 || hasHighValue) {
      const after = parseFloat((Math.random() * 0.5 + 1.2).toFixed(2));
      const target = parseFloat((Math.random() * 2 + 2.5).toFixed(2));
      return {
        after: `${after}x`,
        target: `${target}x`,
        attempts: Math.random() > 0.5 ? 1 : 2
      };
    }
    
    return null;
  };

  const analyzeCandles = () => {
    setIsAnalyzing(true);
    const newCandles: Candle[] = [];
    
    for (let i = 0; i < 4; i++) {
      const multiplier = generateMultiplier();
      newCandles.push({
        value: `${multiplier}x`,
        color: getColorForMultiplier(multiplier)
      });
    }
    
    setCandles(newCandles);
    const calculatedEntry = calculateEntry(newCandles);
    setEntry(calculatedEntry);
    
    setCountdown(40);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      analyzeCandles();
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (candles.length === 0) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          analyzeCandles();
          return 40;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [candles]);

  const progress = candles.length > 0 ? ((40 - countdown) / 40) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <WelcomeDialog />
      <LoginSheet />
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        <AnalysisCard 
          candles={candles}
          progress={progress}
          countdown={countdown}
          isAnalyzing={isAnalyzing}
        />
        <EntryCard entry={entry} />
        <ChartCard />
        <NotificationCard entry={entry} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
