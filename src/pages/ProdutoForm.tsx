import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProductFormTabs } from "@/components/produtos/ProductFormTabs";
import { useToast } from "@/hooks/use-toast";

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Produto salvo",
      description: "O produto foi salvo com sucesso.",
    });
    navigate("/produtos");
  };

  const handleCancel = () => {
    navigate("/produtos");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Cadastrar Produto
          </h1>
          <p className="text-muted-foreground">
            Preencha as informações do produto nas abas abaixo.
          </p>
        </div>

        <div className="stat-card">
          <ProductFormTabs onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProdutoForm;
