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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { FileText, Download, FileSpreadsheet, Calendar, TrendingUp, Package, DollarSign, Users } from "lucide-react";

// Mock data
const salesData = [
  { month: "Jan", vendas: 12500, meta: 15000 },
  { month: "Fev", vendas: 18200, meta: 15000 },
  { month: "Mar", vendas: 15800, meta: 16000 },
  { month: "Abr", vendas: 21000, meta: 18000 },
  { month: "Mai", vendas: 19500, meta: 20000 },
  { month: "Jun", vendas: 24300, meta: 22000 },
];

const categoryData = [
  { name: "Eletrônicos", value: 35, color: "#3b82f6" },
  { name: "Vestuário", value: 25, color: "#10b981" },
  { name: "Acessórios", value: 20, color: "#f59e0b" },
  { name: "Casa & Jardim", value: 12, color: "#8b5cf6" },
  { name: "Outros", value: 8, color: "#6b7280" },
];

const topProducts = [
  { rank: 1, name: "Smartphone XYZ Pro", category: "Eletrônicos", sold: 156, revenue: 467844 },
  { rank: 2, name: "Fone Bluetooth Premium", category: "Eletrônicos", sold: 234, revenue: 46566 },
  { rank: 3, name: "Camiseta Básica", category: "Vestuário", sold: 312, revenue: 24648 },
  { rank: 4, name: "Relógio Smart", category: "Acessórios", sold: 89, revenue: 71111 },
  { rank: 5, name: "Cadeira Ergonômica", category: "Casa & Jardim", sold: 45, revenue: 67455 },
];

const reportTypes = [
  { value: "vendas", label: "Relatório de Vendas", icon: DollarSign },
  { value: "produtos", label: "Relatório de Produtos", icon: Package },
  { value: "clientes", label: "Relatório de Clientes", icon: Users },
  { value: "estoque", label: "Relatório de Estoque", icon: TrendingUp },
];

const Relatorios = () => {
  const [reportType, setReportType] = useState("vendas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const selectedReport = reportTypes.find((r) => r.value === reportType);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">
              Visualize dados e análises do seu negócio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exportar Excel
            </Button>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[160px]"
              />
              <span className="text-muted-foreground">até</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[160px]"
              />
            </div>

            <Button variant="secondary">
              Gerar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faturamento Total</p>
              <p className="text-2xl font-bold text-foreground">R$ 111.300</p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Crescimento</p>
              <p className="text-2xl font-bold text-foreground">+24,5%</p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pedidos</p>
              <p className="text-2xl font-bold text-foreground">836</p>
            </div>
          </div>

          <div className="stat-card flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Novos Clientes</p>
              <p className="text-2xl font-bold text-foreground">142</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales Chart */}
          <div className="stat-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Vendas vs Meta
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" name="Vendas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" fill="hsl(var(--muted))" name="Meta" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="stat-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Vendas por Categoria
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="stat-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Evolução de Vendas
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                name="Vendas"
              />
              <Line
                type="monotone"
                dataKey="meta"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Table */}
        <div className="stat-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Produtos Mais Vendidos
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ranking</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Vendidos</TableHead>
                <TableHead className="text-right">Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.rank}>
                  <TableCell>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        product.rank === 1
                          ? "bg-amber-100 text-amber-700"
                          : product.rank === 2
                          ? "bg-gray-100 text-gray-700"
                          : product.rank === 3
                          ? "bg-orange-100 text-orange-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {product.rank}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="text-center">{product.sold}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {product.revenue.toLocaleString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Relatorios;
