import { Button } from "@/components/ui/button";

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
        >
          Apostar
        </Button>
        <Button 
          className="w-full bg-warning hover:bg-warning/90 text-white font-bold text-sm h-10 rounded-lg"
          disabled={!hasEntry}
        >
          Ativar Alerta
        </Button>
      </div>
    </div>
  );
};
