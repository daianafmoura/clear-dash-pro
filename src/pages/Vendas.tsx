import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Eye, Calendar, DollarSign, ShoppingBag, Clock } from "lucide-react";

// Mock orders data
const orders = [
  { id: "PED-001", customer: "João Silva", date: "15/01/2024", total: 499.00, status: "Concluído" },
  { id: "PED-002", customer: "Maria Santos", date: "15/01/2024", total: 1250.00, status: "Enviado" },
  { id: "PED-003", customer: "Pedro Oliveira", date: "14/01/2024", total: 89.90, status: "Pago" },
  { id: "PED-004", customer: "Ana Costa", date: "14/01/2024", total: 350.00, status: "Pendente" },
  { id: "PED-005", customer: "Carlos Ferreira", date: "13/01/2024", total: 720.00, status: "Concluído" },
  { id: "PED-006", customer: "Lucia Martins", date: "13/01/2024", total: 1890.00, status: "Enviado" },
  { id: "PED-007", customer: "Roberto Almeida", date: "12/01/2024", total: 245.00, status: "Pago" },
  { id: "PED-008", customer: "Fernanda Lima", date: "12/01/2024", total: 599.00, status: "Pendente" },
  { id: "PED-009", customer: "Marcos Souza", date: "11/01/2024", total: 1150.00, status: "Concluído" },
  { id: "PED-010", customer: "Patricia Rocha", date: "11/01/2024", total: 320.00, status: "Enviado" },
];

const statusColors: Record<string, string> = {
  "Pendente": "bg-amber-100 text-amber-800 border-amber-200",
  "Pago": "bg-blue-100 text-blue-800 border-blue-200",
  "Enviado": "bg-purple-100 text-purple-800 border-purple-200",
  "Concluído": "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const Vendas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pendente").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = orders.filter((o) => o.status === "Concluído").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendas/Pedidos</h1>
          <p className="text-muted-foreground">
            Acompanhe suas vendas e gerencie pedidos.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Pedidos</p>
              <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faturamento</p>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalRevenue.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
              <p className="text-2xl font-bold text-foreground">{completedOrders}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por pedido ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Enviado">Enviado</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="stat-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/vendas/${order.id}`)}
                >
                  <TableCell className="font-medium text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vendas/${order.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-muted-foreground">
                Nenhum pedido encontrado.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Vendas;
