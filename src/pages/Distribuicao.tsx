import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KanbanColumn } from "@/components/distribuicao/KanbanColumn";
import { Search, RefreshCw, Filter, Truck, Package, Clock, CheckCircle2 } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  address: string;
  items: number;
  date: string;
  priority: "high" | "normal" | "low";
}

// Mock data for orders in each status
const mockOrders: Record<string, Order[]> = {
  pendente: [
    { id: "PED-001", customer: "João Silva", address: "Rua das Flores, 123 - SP", items: 3, date: "15/01", priority: "high" },
    { id: "PED-004", customer: "Ana Costa", address: "Av. Paulista, 1500 - SP", items: 1, date: "14/01", priority: "normal" },
    { id: "PED-008", customer: "Fernanda Lima", address: "Rua Augusta, 789 - SP", items: 2, date: "12/01", priority: "normal" },
  ],
  separacao: [
    { id: "PED-003", customer: "Pedro Oliveira", address: "Rua dos Pinheiros, 456 - SP", items: 5, date: "14/01", priority: "high" },
    { id: "PED-007", customer: "Roberto Almeida", address: "Av. Brasil, 2000 - RJ", items: 2, date: "12/01", priority: "normal" },
  ],
  enviado: [
    { id: "PED-002", customer: "Maria Santos", address: "Rua Oscar Freire, 300 - SP", items: 4, date: "15/01", priority: "normal" },
    { id: "PED-006", customer: "Lucia Martins", address: "Av. Atlântica, 500 - RJ", items: 1, date: "13/01", priority: "low" },
    { id: "PED-010", customer: "Patricia Rocha", address: "Rua Faria Lima, 1000 - SP", items: 3, date: "11/01", priority: "normal" },
  ],
  entregue: [
    { id: "PED-005", customer: "Carlos Ferreira", address: "Rua Consolação, 800 - SP", items: 2, date: "13/01", priority: "normal" },
    { id: "PED-009", customer: "Marcos Souza", address: "Av. Rebouças, 1200 - SP", items: 6, date: "11/01", priority: "normal" },
  ],
};

const columns = [
  { key: "pendente", title: "Pendente", color: "#f59e0b", icon: Clock },
  { key: "separacao", title: "Em Separação", color: "#3b82f6", icon: Package },
  { key: "enviado", title: "Enviado", color: "#8b5cf6", icon: Truck },
  { key: "entregue", title: "Entregue", color: "#10b981", icon: CheckCircle2 },
];

const Distribuicao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filterOrders = (orders: typeof mockOrders.pendente) => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  };

  const totalOrders = Object.values(mockOrders).flat().length;
  const urgentOrders = Object.values(mockOrders).flat().filter(o => o.priority === "high").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Distribuição</h1>
            <p className="text-muted-foreground">
              Gerencie entregas e logística em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {columns.map((col) => {
            const Icon = col.icon;
            const count = mockOrders[col.key as keyof typeof mockOrders].length;
            return (
              <div key={col.key} className="stat-card flex items-center gap-4 p-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${col.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: col.color }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{col.title}</p>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                </div>
              </div>
            );
          })}
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

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas prioridades</SelectItem>
                <SelectItem value="high">Urgente</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>

            {urgentOrders > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                {urgentOrders} pedido(s) urgente(s)
              </div>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="stat-card overflow-x-auto p-6">
          <div className="flex gap-6 min-w-max">
            {columns.map((col) => (
              <KanbanColumn
                key={col.key}
                title={col.title}
                color={col.color}
                count={filterOrders(mockOrders[col.key as keyof typeof mockOrders]).length}
                orders={filterOrders(mockOrders[col.key as keyof typeof mockOrders])}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Distribuicao;
