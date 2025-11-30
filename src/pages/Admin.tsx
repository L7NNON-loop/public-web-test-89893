import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff, Send } from "lucide-react";
import { 
  requestNotificationPermission, 
  sendNotification, 
  getNotificationPermissionStatus 
} from "@/lib/notifications";

const Admin = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [totalNotifications, setTotalNotifications] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const permission = getNotificationPermissionStatus();
    setNotificationEnabled(permission === "granted");
    
    const count = localStorage.getItem("totalNotificationsSent");
    if (count) {
      setTotalNotifications(parseInt(count));
    }
  }, []);

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    
    if (granted) {
      setNotificationEnabled(true);
      toast({
        title: "Permissão concedida",
        description: "Você receberá notificações do sistema.",
      });
    } else {
      toast({
        title: "Permissão negada",
        description: "Não foi possível ativar as notificações.",
        variant: "destructive",
      });
    }
  };

  const handleSendNotification = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Erro",
        description: "Preencha o título e mensagem.",
        variant: "destructive",
      });
      return;
    }

    if (!notificationEnabled) {
      toast({
        title: "Erro",
        description: "Permissão de notificações não concedida.",
        variant: "destructive",
      });
      return;
    }

    sendNotification(title, message);
    
    const newTotal = totalNotifications + 1;
    setTotalNotifications(newTotal);
    localStorage.setItem("totalNotificationsSent", newTotal.toString());
    
    toast({
      title: "Notificação enviada",
      description: "A notificação foi enviada com sucesso.",
    });

    setTitle("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Painel Admin</h1>
          <p className="text-muted-foreground">Envie notificações para os usuários</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Status de Notificações</h3>
              <p className="text-sm text-muted-foreground">
                {notificationEnabled ? "Ativadas" : "Desativadas"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {notificationEnabled ? (
                <Bell className="w-8 h-8 text-success" />
              ) : (
                <BellOff className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
          </div>

          {!notificationEnabled && (
            <Button 
              onClick={handleRequestPermission}
              className="w-full"
              size="lg"
            >
              Ativar Notificações
            </Button>
          )}
        </Card>

        <Card className="p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Enviar Notificação</h3>
            <p className="text-sm text-muted-foreground">
              Total enviadas: {totalNotifications}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da notificação"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite a mensagem da notificação"
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button 
              onClick={handleSendNotification}
              className="w-full"
              size="lg"
              disabled={!notificationEnabled}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Notificação
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
