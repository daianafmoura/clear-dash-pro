import { AlertTriangle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const lowStockItems = [
  { id: 1, name: "Produto Premium A", stock: 5, minStock: 20, status: "critical" },
  { id: 2, name: "Produto Standard B", stock: 12, minStock: 25, status: "warning" },
  { id: 3, name: "Produto Basic C", stock: 8, minStock: 15, status: "critical" },
  { id: 4, name: "Produto Economy D", stock: 18, minStock: 30, status: "warning" },
  { id: 5, name: "Produto Especial E", stock: 3, minStock: 10, status: "critical" },
];

const statusConfig = {
  critical: {
    bgColor: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    badgeClass: "bg-red-100 text-red-800 hover:bg-red-100",
    label: "Crítico",
  },
  warning: {
    bgColor: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
    badgeClass: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    label: "Baixo",
  },
};

export function LowStockAlerts() {
  const criticalCount = lowStockItems.filter((item) => item.status === "critical").length;

  return (
    <div className="stat-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Alertas de Estoque
        </h3>
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {criticalCount} críticos
        </Badge>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item) => {
          const config = statusConfig[item.status as keyof typeof statusConfig];
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-lg border p-3 ${config.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-white p-2 shadow-sm`}>
                  <Package className={`h-4 w-4 ${config.textColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mínimo: {item.minStock} unidades
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${config.textColor}`}>
                  {item.stock}
                </span>
                <Badge className={config.badgeClass}>{config.label}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
