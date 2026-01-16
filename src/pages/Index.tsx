import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { SalesChart } from "@/components/dashboard/SalesChart";

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

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Receita Total"
            value="R$ 45.231"
            change="+20.1% este mês"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Pedidos"
            value="356"
            change="+12.5% este mês"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Produtos em Estoque"
            value="1.234"
            change="15 com estoque baixo"
            changeType="neutral"
            icon={Package}
            iconColor="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Taxa de Crescimento"
            value="23.5%"
            change="+4.2% vs último mês"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesChart />
          <div className="stat-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Produtos Mais Vendidos
            </h3>
            <div className="space-y-4">
              {[
                { name: "Produto Premium A", sales: 1234, percentage: 85 },
                { name: "Produto Standard B", sales: 987, percentage: 70 },
                { name: "Produto Basic C", sales: 756, percentage: 55 },
                { name: "Produto Economy D", sales: 543, percentage: 40 },
              ].map((product) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {product.name}
                    </span>
                    <span className="text-muted-foreground">
                      {product.sales} vendas
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </AdminLayout>
  );
};

export default Index;
