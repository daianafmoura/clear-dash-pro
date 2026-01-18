import {
  DollarSign,
  ShoppingCart,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { SalesBarChart } from "@/components/dashboard/SalesBarChart";
import { ProductsPieChart } from "@/components/dashboard/ProductsPieChart";
import { LowStockAlerts } from "@/components/dashboard/LowStockAlerts";

const Index = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo do seu negócio.
          </p>
        </div>

        {/* Stats Grid - Key Indicators */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Vendas do Dia"
            value="R$ 12.450"
            change="+15.3% vs ontem"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Faturamento do Mês"
            value="R$ 89.230"
            change="+22.1% vs mês anterior"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Pedidos Pendentes"
            value="23"
            change="8 aguardando envio"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Estoque Baixo"
            value="15"
            change="5 em nível crítico"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-red-100 text-red-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesBarChart />
          <ProductsPieChart />
        </div>

        {/* Orders and Alerts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <LowStockAlerts />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
