import { AdminLayout } from "@/components/layout/AdminLayout";

const Configuracoes = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize as configurações do sistema.
          </p>
        </div>

        <div className="stat-card flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Área de conteúdo para configurações do sistema
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Configuracoes;
