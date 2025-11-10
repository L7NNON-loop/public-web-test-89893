import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HistoryCard = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Histórico</h2>
          <TabsList className="bg-muted h-8">
            <TabsTrigger value="all" className="text-xs px-3 py-1 data-[state=active]:bg-success data-[state=active]:text-white">
              Tudo
            </TabsTrigger>
            <TabsTrigger value="win" className="text-xs px-3 py-1 data-[state=active]:bg-success data-[state=active]:text-white">
              Ganho
            </TabsTrigger>
            <TabsTrigger value="loss" className="text-xs px-3 py-1 data-[state=active]:bg-success data-[state=active]:text-white">
              Perda
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="text-center py-8 text-muted-foreground text-xs">
            Puxe para baixo para atualizar
          </div>
        </TabsContent>
        <TabsContent value="win" className="mt-0">
          <div className="text-center py-8 text-muted-foreground text-xs">
            Puxe para baixo para atualizar
          </div>
        </TabsContent>
        <TabsContent value="loss" className="mt-0">
          <div className="text-center py-8 text-muted-foreground text-xs">
            Puxe para baixo para atualizar
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
