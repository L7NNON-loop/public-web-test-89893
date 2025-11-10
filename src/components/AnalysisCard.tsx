import { Progress } from "@/components/ui/progress";

type Candle = {
  value: string;
  color: string;
};

type AnalysisCardProps = {
  candles: Candle[];
  progress: number;
  countdown: number;
  isAnalyzing: boolean;
};

export const AnalysisCard = ({ candles, progress, countdown, isAnalyzing }: AnalysisCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
          <h2 className="text-sm font-bold text-[#06b6d4]">Analisando velas</h2>
          {candles.length > 0 && (
            <div className="flex gap-0.5 ml-1">
              <div className="w-1 h-1 rounded-full bg-[#06b6d4] animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-[#06b6d4] animate-pulse delay-75" />
              <div className="w-1 h-1 rounded-full bg-[#06b6d4] animate-pulse delay-150" />
            </div>
          )}
        </div>
        {candles.length > 0 && (
          <span className="text-xs text-muted-foreground font-mono">
            {countdown}s
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        {candles.length === 0 ? (
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-background rounded px-3 py-1.5 border border-border/20 flex-1 text-center"
            >
              <span className="text-muted-foreground/30 font-bold text-sm">--</span>
            </div>
          ))
        ) : (
          candles.map((candle, index) => (
            <div
              key={index}
              className="bg-black rounded px-3 py-1.5 border border-border/20 flex-1 text-center"
            >
              <span className={`${candle.color} font-bold text-sm`}>
                {candle.value}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
