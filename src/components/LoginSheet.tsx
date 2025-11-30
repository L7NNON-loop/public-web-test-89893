import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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

  // Check if user is already logged in
  useEffect(() => {
    const loginData = localStorage.getItem("elephantBetLogin");
    if (!loginData) {
      setOpen(true);
    }
  }, []);

  const onSubmit = (data: LoginForm) => {
    // Store login data in localStorage
    localStorage.setItem("elephantBetLogin", JSON.stringify({
      phone: `+258${data.phone}`,
      loggedIn: true,
      timestamp: new Date().toISOString()
    }));
    
    setOpen(false);
    toast({
      title: "Conectado com sucesso! ✓",
      description: "Sua conta ElephantBet foi conectada.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={() => {}}>
      <SheetContent 
        side="bottom" 
        hideClose
        className="h-auto max-h-[90vh] sm:max-h-[450px] rounded-t-2xl border-t-2"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-2xl font-bold">CONECTE-SE</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">Telefone</Label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-muted px-3 rounded-md border border-input h-10 w-24">
                <span className="text-sm">📱</span>
                <span className="text-sm font-medium">+258</span>
              </div>
              <Input
                id="phone"
                type="tel"
                maxLength={9}
                {...register("phone")}
                className={`flex-1 h-10 ${errors.phone ? 'border-destructive' : ''}`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">Senha</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`h-10 ${errors.password ? 'border-destructive' : ''}`}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold mt-6"
          >
            CONECTE-SE
          </Button>

          <div className="bg-muted/50 rounded-lg p-3 mt-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Conecte sua conta de jogador <span className="font-semibold text-foreground">ElephantBet</span> credenciais reais, 
              isso permitirá se conectar ao casino, e receber entradas reais.
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
