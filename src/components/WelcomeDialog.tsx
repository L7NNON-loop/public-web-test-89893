import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react";

export const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenWelcomeDialog");
    if (!hasSeenDialog) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("hasSeenWelcomeDialog", "true");
  };

  const handleRegister = () => {
    window.open("https://ntmp.vercel.app/ebwqlq", "_blank");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg border-2 border-[#10b981] bg-[#1a1f2e] p-4 rounded-xl mx-4">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-6 w-6 text-gray-400" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-[#10b981]">AVISO IMPORTANTE</h2>
        </div>

        <div className="space-y-2 text-gray-300">
          <p className="text-sm">
            Olá, Conecte-se ao robô de previsões clicando no botão Registrar.
          </p>
          
          <p className="text-sm">
            Crie uma nova conta, faça seu depósito. <span className="font-semibold text-white">Valor mínimo: 50.00MT</span>
          </p>

          <div className="flex items-start gap-2 mt-3 p-2 bg-[#0f1621] rounded-lg border border-blue-500/30">
            <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-300">
              Caso já tenha feito esse procedimento, ignore e clique no botão fechar.
            </p>
          </div>

          <div className="flex items-start gap-2 p-2 bg-[#0f1621] rounded-lg border border-green-500/30">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-300">
              Esse procedimento é necessário para o funcionamento do Robô de previsões.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex-1 h-11 text-sm font-bold bg-[#4a5568] hover:bg-[#5a6578] text-white border-0"
          >
            FECHAR
          </Button>
          <Button
            onClick={handleRegister}
            className="flex-1 h-11 text-sm font-bold bg-[#10b981] hover:bg-[#059669] text-white"
          >
            REGISTRAR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
