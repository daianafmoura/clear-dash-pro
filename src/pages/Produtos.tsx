import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter } from "lucide-react";

const products = [
  { sku: "PRD001", name: "Produto Premium A", category: "Eletrônicos", price: 1250.00, stock: 45, status: "ativo" },
  { sku: "PRD002", name: "Produto Standard B", category: "Acessórios", price: 89.90, stock: 8, status: "ativo" },
  { sku: "PRD003", name: "Produto Basic C", category: "Eletrônicos", price: 450.00, stock: 0, status: "inativo" },
  { sku: "PRD004", name: "Produto Economy D", category: "Casa", price: 125.50, stock: 120, status: "ativo" },
  { sku: "PRD005", name: "Produto Especial E", category: "Eletrônicos", price: 2100.00, stock: 3, status: "ativo" },
  { sku: "PRD006", name: "Produto Luxo F", category: "Acessórios", price: 890.00, stock: 22, status: "ativo" },
  { sku: "PRD007", name: "Produto Classic G", category: "Casa", price: 199.90, stock: 0, status: "inativo" },
  { sku: "PRD008", name: "Produto Modern H", category: "Eletrônicos", price: 750.00, stock: 15, status: "ativo" },
];

const categories = ["Todas", "Eletrônicos", "Acessórios", "Casa"];
const statuses = ["Todos", "Ativo", "Inativo"];

const Produtos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "Todas" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "Todos" || 
      product.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Sem estoque</Badge>;
    }
    if (stock <= 10) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Baixo: {stock}</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{stock} un</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === "ativo") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
            <p className="text-muted-foreground">
              Gerencie seu catálogo de produtos.
            </p>
          </div>
          <Button onClick={() => navigate("/produtos/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Produto
          </Button>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Lista de Produtos
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} produto(s) encontrado(s)
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead>Nome do Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-center">Estoque</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.sku} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-sm font-medium">
                    {product.sku}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStockBadge(product.stock)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(product.status)}
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Produtos;
