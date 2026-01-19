import { cn } from "@/lib/utils";
import { KanbanCard } from "./KanbanCard";

interface Order {
  id: string;
  customer: string;
  address: string;
  items: number;
  date: string;
  priority?: "high" | "normal" | "low";
}

interface KanbanColumnProps {
  title: string;
  count: number;
  color: string;
  orders: Order[];
}

export function KanbanColumn({ title, count, color, orders }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[300px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2" style={{ borderColor: color }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <span className="flex items-center justify-center h-6 min-w-[24px] rounded-full bg-muted px-2 text-sm font-medium text-muted-foreground">
          {count}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-300px)] pr-1">
        {orders.map((order) => (
          <KanbanCard key={order.id} order={order} />
        ))}

        {orders.length === 0 && (
          <div className="flex items-center justify-center h-24 rounded-lg border-2 border-dashed border-muted">
            <p className="text-sm text-muted-foreground">Sem pedidos</p>
          </div>
        )}
      </div>
    </div>
  );
}
