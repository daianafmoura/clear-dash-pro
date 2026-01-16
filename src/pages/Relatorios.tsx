import { AdminLayout } from "@/components/layout/AdminLayout";

const Relatorios = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize dados e análises do seu negócio.
          </p>
        </div>

        <div className="stat-card flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Área de conteúdo para relatórios e análises
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Relatorios;
