import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type Entry = {
  after: string;
  target: string;
  attempts: number;
} | null;

type EntryCardProps = {
  entry: Entry;
};

export const EntryCard = ({ entry }: EntryCardProps) => {
  const hasEntry = entry !== null;
  const { toast } = useToast();
  const [alertActive, setAlertActive] = useState(false);

  const playAlertSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0vLTgjMGHm7A7+OZSA0PVq3n77BdGAg+ldb0xnMiBS+AxvDejkALEl+47+ynUxQKRp/g8r5sIQUxh9Ly04IzBh5uwO/jmUgND1at5++wXRgIPpXW9MZzIgUvgMbw3o5AChJfuO/sp1MUCkaf4PK+bCEFMYfS8tOCMwYebsDv45lIDQ9Wrefvs=');
    audio.play().catch(e => console.log('Erro ao tocar som:', e));
  };

  const handleActivateAlert = () => {
    if (alertActive) {
      setAlertActive(false);
      toast({
        title: "Alerta Desativado",
        description: "As notificações foram desativadas.",
      });
    } else {
      setAlertActive(true);
      playAlertSound();
      toast({
        title: "Alerta Ativado! 🔔",
        description: "Você será notificado quando houver uma nova entrada.",
      });
    }
  };
  
  return (
    <div className={`bg-card rounded-xl p-3 border-2 transition-all ${
      hasEntry 
        ? 'border-success shadow-lg shadow-success/20' 
        : 'border-border/50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Entrada confirmada</h2>
        {hasEntry && (
          <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-lg animate-pulse">
            AGUARDANDO...
          </span>
        )}
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Depois de</p>
          <p className="text-xl font-bold text-foreground">
            {hasEntry ? entry.after : '...'}
          </p>
        </div>
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Tirar no:</p>
          <p className="text-xl font-bold text-foreground">
            {hasEntry ? entry.target : '...'}
          </p>
        </div>
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Tentativas:</p>
          <p className="text-xl font-bold text-foreground">
            {hasEntry ? `${entry.attempts} vez${entry.attempts > 1 ? 'es' : ''}` : '...'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          className="w-full bg-success hover:bg-success/90 text-white font-bold text-sm h-10 rounded-lg"
          disabled={!hasEntry}
          onClick={() => window.open("https://ntmp.vercel.app/ebwqlq", "_blank")}
        >
          Apostar
        </Button>
        <Button 
          className={`w-full font-bold text-sm h-10 rounded-lg ${
            alertActive 
              ? 'bg-destructive hover:bg-destructive/90' 
              : 'bg-warning hover:bg-warning/90'
          } text-white`}
          disabled={!hasEntry}
          onClick={handleActivateAlert}
        >
          {alertActive ? 'Desativar Alerta' : 'Ativar Alerta'}
        </Button>
      </div>
    </div>
  );
};
