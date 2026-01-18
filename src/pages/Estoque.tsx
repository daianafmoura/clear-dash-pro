import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockMovementModal } from "@/components/estoque/StockMovementModal";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
} from "lucide-react";

// Mock data for products with stock info
const products = [
  { id: "PRD001", name: "Produto Premium A", stock: 45, minStock: 20, category: "Eletrônicos" },
  { id: "PRD002", name: "Produto Standard B", stock: 8, minStock: 25, category: "Acessórios" },
  { id: "PRD003", name: "Produto Basic C", stock: 0, minStock: 15, category: "Eletrônicos" },
  { id: "PRD004", name: "Produto Economy D", stock: 120, minStock: 30, category: "Casa" },
  { id: "PRD005", name: "Produto Especial E", stock: 3, minStock: 10, category: "Eletrônicos" },
  { id: "PRD006", name: "Produto Luxo F", stock: 22, minStock: 15, category: "Acessórios" },
  { id: "PRD007", name: "Produto Classic G", stock: 0, minStock: 20, category: "Casa" },
  { id: "PRD008", name: "Produto Modern H", stock: 15, minStock: 10, category: "Eletrônicos" },
];

// Mock data for stock movements
const initialMovements = [
  { id: 1, productId: "PRD001", productName: "Produto Premium A", type: "entrada", quantity: 50, date: "2024-01-15 14:30", responsible: "João Silva", reason: "Compra" },
  { id: 2, productId: "PRD002", productName: "Produto Standard B", type: "saida", quantity: 12, date: "2024-01-15 11:20", responsible: "Maria Santos", reason: "Venda" },
  { id: 3, productId: "PRD005", productName: "Produto Especial E", type: "saida", quantity: 5, date: "2024-01-15 09:45", responsible: "Carlos Lima", reason: "Venda" },
  { id: 4, productId: "PRD003", productName: "Produto Basic C", type: "saida", quantity: 20, date: "2024-01-14 16:00", responsible: "Ana Costa", reason: "Perda" },
  { id: 5, productId: "PRD004", productName: "Produto Economy D", type: "entrada", quantity: 100, date: "2024-01-14 10:30", responsible: "João Silva", reason: "Compra" },
  { id: 6, productId: "PRD001", productName: "Produto Premium A", type: "saida", quantity: 5, date: "2024-01-13 15:00", responsible: "Maria Santos", reason: "Venda" },
];

const Estoque = () => {
  const { toast } = useToast();
  const [movements, setMovements] = useState(initialMovements);
  const [movementModalOpen, setMovementModalOpen] = useState(false);
  const [movementType, setMovementType] = useState<"entrada" | "saida">("entrada");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const totalEntries = movements.filter((m) => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0);
  const totalExits = movements.filter((m) => m.type === "saida").reduce((sum, m) => sum + m.quantity, 0);

  const openMovementModal = (type: "entrada" | "saida") => {
    setMovementType(type);
    setMovementModalOpen(true);
  };

  const handleMovementSubmit = (data: { productId: string; quantity: number; reason: string; notes: string }) => {
    const product = products.find((p) => p.id === data.productId);
    if (product) {
      const newMovement = {
        id: movements.length + 1,
        productId: data.productId,
        productName: product.name,
        type: movementType,
        quantity: data.quantity,
        date: new Date().toLocaleString("pt-BR"),
        responsible: "Usuário Atual",
        reason: data.reason,
      };
      setMovements([newMovement, ...movements]);
      toast({
        title: movementType === "entrada" ? "Entrada registrada" : "Saída registrada",
        description: `${data.quantity} unidades de ${product.name}`,
      });
    }
  };

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch =
      movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "Todos" || movement.type === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) {
      return { label: "Sem estoque", className: "bg-red-100 text-red-800 hover:bg-red-100" };
    }
    if (stock <= minStock) {
      return { label: "Abaixo do mínimo", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" };
    }
    return { label: "Normal", className: "bg-green-100 text-green-800 hover:bg-green-100" };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Controle de Estoque</h1>
            <p className="text-muted-foreground">
              Gerencie entradas e saídas do seu inventário.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => openMovementModal("entrada")}
              className="bg-green-600 hover:bg-green-700"
            >
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Entrada
            </Button>
            <Button
              onClick={() => openMovementModal("saida")}
              variant="destructive"
            >
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Saída
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Produtos"
            value={products.length.toString()}
            change="Cadastrados no sistema"
            changeType="neutral"
            icon={Package}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Estoque Baixo"
            value={lowStockProducts.length.toString()}
            change={`${outOfStockProducts.length} sem estoque`}
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-red-100 text-red-600"
          />
          <StatCard
            title="Entradas (período)"
            value={totalEntries.toString()}
            change="Unidades recebidas"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Saídas (período)"
            value={totalExits.toString()}
            change="Unidades expedidas"
            changeType="neutral"
            icon={TrendingDown}
            iconColor="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="stat-card border-l-4 border-l-warning">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Produtos com Estoque Baixo
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {lowStockProducts.map((product) => {
                const status = getStockStatus(product.stock, product.minStock);
                return (
                  <div
                    key={product.id}
                    className={`p-3 rounded-lg border ${
                      product.stock === 0
                        ? "bg-red-50 border-red-200"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <p className="font-medium text-sm text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.id}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold">
                        {product.stock} / {product.minStock} un
                      </span>
                      <Badge className={status.className}>{status.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Movements Filter */}
        <div className="stat-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entradas</SelectItem>
                  <SelectItem value="saida">Saídas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Movements Table */}
        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Histórico de Movimentações
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredMovements.length} movimentação(ões)
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movement.productName}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {movement.productId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {movement.type === "entrada" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <ArrowDownCircle className="mr-1 h-3 w-3" />
                        Entrada
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        <ArrowUpCircle className="mr-1 h-3 w-3" />
                        Saída
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {movement.type === "entrada" ? "+" : "-"}
                    {movement.quantity} un
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{movement.reason}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {movement.date}
                  </TableCell>
                  <TableCell className="text-sm">{movement.responsible}</TableCell>
                </TableRow>
              ))}
              {filteredMovements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhuma movimentação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Movement Modal */}
      <StockMovementModal
        open={movementModalOpen}
        onOpenChange={setMovementModalOpen}
        type={movementType}
        onSubmit={handleMovementSubmit}
      />
    </AdminLayout>
  );
};

export default Estoque;
