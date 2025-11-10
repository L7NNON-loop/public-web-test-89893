import { Button } from "@/components/ui/button";
import { BellRing, BellOff, Rocket } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";

type Entry = {
  after: string;
  target: string;
  attempts: number;
} | null;

type NotificationCardProps = {
  entry: Entry;
};

export const NotificationCard = ({ entry }: NotificationCardProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const previousEntryRef = useRef<Entry>(null);

  useEffect(() => {
    if (notificationsEnabled && entry && entry !== previousEntryRef.current) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-success" />
            <span>Novo sinal encontrado!</span>
          </div>
        ) as any,
        description: `Entrada após ${entry.after} | Alvo: ${entry.target} | Tentativas: ${entry.attempts}`,
      });
    }
    previousEntryRef.current = entry;
  }, [entry, notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      toast({
        title: "Notificações ativadas!",
        description: "Você será alertado quando um novo sinal for encontrado.",
      });
    } else {
      toast({
        title: "Notificações desativadas",
        description: "Você não receberá mais alertas de sinais.",
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full ${notificationsEnabled ? 'bg-success/20' : 'bg-warning/20'} flex items-center justify-center flex-shrink-0`}>
          {notificationsEnabled ? (
            <BellRing className="w-5 h-5 text-success" />
          ) : (
            <BellOff className="w-5 h-5 text-warning" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {notificationsEnabled ? 'Alertas ativados!' : 'Ative os alertas!'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {notificationsEnabled 
              ? 'Você receberá notificações de novos sinais.' 
              : 'Para receber os sinais mesmo com o app fechado.'}
          </p>
        </div>
      </div>
      <Button 
        onClick={toggleNotifications}
        className={`w-full ${notificationsEnabled ? 'bg-muted hover:bg-muted/90 text-foreground' : 'bg-warning hover:bg-warning/90 text-white'} font-semibold text-sm h-10`}
      >
        {notificationsEnabled ? 'Desativar notificações' : 'Ativar notificações'}
      </Button>
    </div>
  );
};
